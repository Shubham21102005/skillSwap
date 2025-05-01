const mongoose= require('mongoose')

const userSchema= mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        default:0
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }]
})

const User= mongoose.model('User',userSchema);

module.exports = User;
