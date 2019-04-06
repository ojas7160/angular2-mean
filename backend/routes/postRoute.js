const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('', postController.createPost)
router.get('/posts', postController.getAllPosts)
router.get('/userPosts', postController.getAllPostsForParticularUser)

module.exports = router;