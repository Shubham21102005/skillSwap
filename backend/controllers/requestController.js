const { json } = require('body-parser');
const Post = require('../models/Post.js')
const User= require('../models/User.js');

const sendRequest = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user; 

    const post = await Post.findById(postId); 
    if (!post) {
      return res.status(404).json({ message: `Post doesn't exist` });
    }

    if (String(userId) === String(post.createdBy)) {
      return res.status(400).json({ message: `Can't send request on your own post` });
    }

    if (post.requests.includes(userId)) { 
      return res.status(400).json({ message: `Request already sent` });
    }

    post.requests.push(userId);
    await post.save();

    res.status(200).json({ message: `Request sent successfully` });

  } catch (error) {
    res.status(500).json({ message: `Couldn't send request`, error: error.message });
  }
};

const acceptRequest = async (req, res) => {
    try {
      const { postId } = req.params;
      const { acceptedId } = req.body; // This is correct now
  
      const currentUser = req.user;
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: `Post doesn't exist` });
      }
  
      if (String(currentUser) !== String(post.createdBy)) {
        return res.status(403).json({ message: `Only the post creator can accept requests` });
      }
  
      if (!post.requests.includes(acceptedId)) {
        return res.status(400).json({ message: 'This user did not request this post' });
      }
  
      post.acceptedRequest = acceptedId;
      post.status = 'ongoing';
  
      await post.save();
  
      res.status(200).json({ message: 'Request accepted successfully', post });
  
    } catch (error) {
      res.status(500).json({ message: `Couldn't accept request`, error: error.message });
    }
};

const withdrawRequest = async (req, res) => {
    try {
      const { postId } = req.params;
      const userId = req.user;
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: `Post doesn't exist` });
      }
  
      const requestIndex = post.requests.findIndex(
        (reqId) => String(reqId) === String(userId)
      );
  
      if (requestIndex === -1) {
        return res.status(400).json({ message: `You haven't requested this post` });
      }
  
      post.requests.splice(requestIndex, 1); // Remove the user's request
      await post.save();
  
      res.status(200).json({ message: `Request withdrawn successfully` });
    } catch (error) {
      res.status(500).json({ message: `Couldn't withdraw request`, error: error.message });
    }
  };

  const completeSwap = async (req, res) => {
    try {
      const { postId } = req.params;
      const currentUser = req.user;
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: `Post doesn't exist` });
      }
  
      if (String(post.createdBy) !== String(currentUser)) {
        return res.status(403).json({ message: 'Only the post creator can complete the swap' });
      }
  
      if (post.status !== 'ongoing') {
        return res.status(400).json({ message: 'Swap is not ongoing and cannot be completed' });
      }
  
      post.status = 'completed';
      await post.save();
  
      res.status(200).json({ message: 'Swap marked as completed', post });
    } catch (error) {
      res.status(500).json({ message: 'Could not complete swap', error: error.message });
    }
};

const rejectRequest = async (req, res) => {
    try {
      const { postId } = req.params;
      const { rejectedId } = req.body;
      const currentUser = req.user;
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: `Post doesn't exist` });
      }
  
      if (String(post.createdBy) !== String(currentUser)) {
        return res.status(403).json({ message: 'Only the post creator can reject requests' });
      }
  
      const requestIndex = post.requests.findIndex(
        (id) => String(id) === String(rejectedId)
      );
  
      if (requestIndex === -1) {
        return res.status(400).json({ message: 'This user has not requested this post' });
      }
  
      post.requests.splice(requestIndex, 1);
      await post.save();
  
      res.status(200).json({ message: 'Request rejected successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Could not reject request', error: error.message });
    }
  };
  
module.exports={sendRequest,acceptRequest,withdrawRequest,completeSwap,rejectRequest}