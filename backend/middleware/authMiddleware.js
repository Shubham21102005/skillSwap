const jwt= require('jsonwebtoken')
const dotenv= require('dotenv')

const auth= async (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({ message: 'No header found' });
        }
        const token= authHeader.split(' ')[1];
        const decoded= await jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user= decoded.id
        next();
    }catch(error){
        res.status(403).json({message:error.message})
    }
}

module.exports=auth;