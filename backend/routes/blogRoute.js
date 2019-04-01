const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');

module.exports = router;

router.get('/all-blogs', blogsController.getAllBlogs);
router.post('/create-blogs', blogsController.createBlog);
router.delete('/:id/delete-blog', blogsController.deleteBlog);
router.put('/:id', blogsController.updateBlog);
router.get('/:id', blogsController.getBlog);