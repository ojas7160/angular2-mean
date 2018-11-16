const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

module.exports = router;

router.post('', postController.createPost)
router.get('/posts', postController.getAllPosts)