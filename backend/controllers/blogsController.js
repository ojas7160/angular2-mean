const Blog = require('../models/blog');

exports.createBlog = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  console.log(req)
  const blog = new Blog(
    {
      title: req.body.title,
      description: req.body.description,
      imagePath: url + '/images/' + req.file.filename,
      userId: req.body.userId
    }
  );
  blog.save()
  .then((newBlog) => {
    res.status(201).json({
      message: 'Success',
      blog: {...newBlog}
    });
  }).catch((err) => {
    res.json({
      message: 'false',
      error: err
    });
  });
}

exports.getAllBlogs = (req, res) => {
  Blog.find()
  .then((blogs) => {
    res.status(201).json({
      message: 'All blogs',
      blogs: blogs
    });
  }).catch((err) => {
    res.json({
      message: 'something went wrong',
      error: err
    });
  });
}

exports.deleteBlog = (req, res) => {
  Blog.deleteOne({_id: req.params.id})
  .then((resposne) => {
    res.status(201).json({
      message: 'Deleted',
    })
  });
}

exports.getBlog = (req, res) => {
  Blog.findById({_id: req.params.id})
  .then((response) => {
    res.status(200).json({
      message: 'Blog',
      blog: response
    });
  });
}

exports.updateBlog = (req, res) => {
  console.log(req);
  let imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename
  } else {
    imagePath = req.body.image
  }
  const blog = {
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    imagePath: imagePath
  }
  Blog.updateOne({_id: req.body.id}, blog)
  .then((response) => {
    console.log(response);
    res.status(200).json({
      message: 'Updated successfully',
      data: response
    });
  })
}