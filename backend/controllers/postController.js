const Post = require('../models/post');

exports.createPost = (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  })

  post.save()
  .then((newPost) => {

    res.status(201).json({
      message: 'new post success',
      post: newPost
    })
  }).catch((error) => {

  })
}

exports.getAllPosts = (req, res, next) => {
  let fetchedPosts;
  Post.find()
  .then((posts) => {
    res.status(201).json({
      message: 'All Posts',
      posts: posts
    });
  }).catch((error) => {

    res.status(500).json({
      error: error
    });
  });
}