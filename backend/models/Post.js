const mongoose= require('mongoose')

const postSchema= mongoose.Schema({
    skillOffered:{
        type:String,
        required:true
    },
    skillWanted:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:['pending','ongoing','completed'],
        default:'pending'
    },
    requests:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    acceptedRequest:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
const Post= mongoose.model('Post',postSchema)

module.exports= Post