const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// anonymous way
exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email})
  .then((user) => {
    if(!user){
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then((result) => {
    if(!result){
      return res.status(401).json({
        message: 'Auth failed'
      });
    }

    const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, 'secretLongEnough', {expiresIn: '1h'})
    res.json({
      message: 'Success',
      token: token,
      body: fetchedUser,
      expiresIn: 3600
    })
  })
  .catch((error) => {
    return res.status(401).json({
      message: 'Auth failed',
      error: error
    });
  });
}

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hashedPassword => {
    const user = new User({
      email: req.body.email, 
      password: hashedPassword
    })

    user.save()
    .then(newUser => {
      res.status(201).json({
        message: 'Success',
        user: newUser
      });
    }).catch(error => {
      res.status(500).json({
        message: error
      })
    });
  })
}

exports.getUser = (req, res, next) => {
  console.log(req)
  let user = {_id: req.query.user_id}
  User.find(user)
  .then((data) => {
    res.status(201).json({
      user: data,
      message: 'User found'
    })
  })
}
// ordinary way
// exports.userLogin = function(req, res, next){}