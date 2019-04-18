const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');
const Blog = require('../models/blog');
const authGuard = require('../middleware/auth-guard');
const extractFile = require('../middleware/file-upload');

router.get('/all-blogs', blogsController.getAllBlogs);
// router.post('/create', blogsController.createBlog);
router.post("/create", authGuard, extractFile, blogsController.createBlog);
router.delete('/:id/delete-blog', authGuard, blogsController.deleteBlog);
router.put('/:id', authGuard, extractFile, blogsController.updateBlog);
router.get('/:id', blogsController.getBlog);

module.exports = router;