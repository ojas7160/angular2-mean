const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const postsRoutes = require('./routes/postRoute');
const blogRoute = require('./routes/blogRoute');

// it is just to create an express app
// express provided lots of functionalioty to behave lika middleware b/w req and resp
const app = express();

// const postsRoutes = require('./routes/posts')
// const usersRoutes = require('./routes/users');

// use keyword is used to create a middleware
// app.use((req, res, next) => {
// 	console.log('first middleware');
// 	//it will pass a request to next middleware
// 	next();
// });

// app.use((req, res, next) => {
// 	// response object is more powerful than node js response object
// 	//send method is used to send back the rssponse back to the browser, but it automatically do the othe rimportnat tasks like setting up the header etc.
// 	console.log("second middleware");
// 	res.send('calling from middleware');
// });

// body-parser is an npm module which allow to parse the body of the request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use("/images", express.static(path.join("backend/images"))); // allowing the routes starting with /images access the image folder

mongoose.connect('mongodb://localhost/new-mean-course').then(() => {
	console.log('connected to databse successfully');
}).catch(() => {
	console.log('connected to databse failed');
});
// cross origin
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Authorization, Content-Type, Accept');
	res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH,PUT, DELETE, OPTIONS');
	next();
});

// just to aware express about the post routes
app.use("/api/posts",postsRoutes);

app.use("/api/users",userRoute);
app.use("/api/blogs", blogRoute);
//to export the express js app
module.exports = app;



//next() -> is a method which pass the middleware forward if there exist any
//app.use -> is a middleware

// app.use((req, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept');
// 	res.setHeader('Access-Control-Access-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
// 	next(); // to pass it to the next middleware if any
// })


// mongoose.connect('mongodb://localhost/my-new-db')
// .then(() => {
// 	console.log('db connected')
// })
// .catch(() => {
// 	console.log('oops, db not connected')
// })





