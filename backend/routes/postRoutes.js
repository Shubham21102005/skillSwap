const express= require('express');
const { getAllPost, getSinglePost, createPost, deletePost, updatePost } = require('../controllers/postControllers');
const router= express.Router();

router.get('/',getAllPost);
router.get('/:id',getSinglePost);
router.post('/',createPost);
router.delete('/:id',deletePost)
router.patch('/:id',updatePost);

module.exports=router