const Post= require('../models/Post')

const getAllPost= async (req,res)=>{
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createPost = async (req, res) => {
    try {
      const { skillOffered, skillWanted, createdBy } = req.body;
  
      if (!skillOffered || !skillWanted || !createdBy) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const post = new Post({
        skillOffered,
        skillWanted,
        createdBy,
      });
  
      await post.save();
  
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

const getSinglePost= async (req,res)=>{
    try {
        const {id} = req.params;
        const post=await Post.findById(id);
        if(!post){
            return res.status(404).json({message:`Post Not Found`});
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deletePost = async (req, res) => {
    try {
      const { id } = req.params;
  
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: 'Post Not Found' });
      }
  
      await Post.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Post deleted successfully', post });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
  
const updatePost = async (req, res) => {
    try {
      const { id } = req.params;
      const { skillOffered, skillWanted, } = req.body;
  
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: 'Post Not Found' });
      }
  
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { skillOffered, skillWanted },
        { new: true }
      );
  
      res.status(200).json({ message: 'Post updated successfully', updatedPost });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
module.exports= {getAllPost,createPost,getSinglePost,deletePost,updatePost};