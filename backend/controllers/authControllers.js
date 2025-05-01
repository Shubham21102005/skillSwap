const bcrypt= require('bcrypt');
const User = require('../models/User');
const jwt= require('jsonwebtoken')

const registerUser= async (req,res)=>{
    try{
        const{name,email,password}= req.body;
    if(!name||!email||!password) return res.status(400).json({message:`Provide all the credentials`});
    const exists=await User.findOne({email});
    if(exists) return res.status(400).json({message:`user with this email exists`});
    const salt= await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const user= new User({
        name,
        email,
        password:hashedPassword
    });
    await user.save();
    const returnData= user.toObject();
    delete returnData.password;
    res.status(200).json(returnData);
    
    }catch(error){
        return res.status(400).json({message:`Error occured`,error});
    }

}

const loginUser= async (req,res)=>{
    try{
        const {email,password}= req.body;
        if(!email||!password) return res.status(400).json({message:`provide all credentials`});

        const user= await User.findOne({email});
        if(!user)return res.status(404).json({message:`User doesn't exists`});

        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:`Incorrect Password`})
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });

    }catch(error){
        return res.status(500).json({message:error.message});;
    }
}

module.exports={loginUser,registerUser};