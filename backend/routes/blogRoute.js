const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogsController');
const multer = require('multer');
const Blog = require('../models/blog');
const MIME_TYPE_ARRAY = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    let isValid = MIME_TYPE_ARRAY[file.mimetype];
    let error = new Error('Invalid mimetype');
    if (isValid) {
      error = null
    }
    callback(error, 'backend/images')
    
  },
  filename: (req, file, callback) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_ARRAY[file.mimetype];
    callback(null, name + '-' + Date.now() + '.' + ext)}
});
router.get('/all-blogs', blogsController.getAllBlogs);
// router.post('/create', blogsController.createBlog);
router.post("/create", (multer({storage: storage}).single('image')), blogsController.createBlog);
router.delete('/:id/delete-blog', blogsController.deleteBlog);
router.put('/:id', (multer({storage: storage}).single('image')), blogsController.updateBlog);
router.get('/:id', blogsController.getBlog);

module.exports = router;