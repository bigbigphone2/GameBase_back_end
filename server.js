const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors());
app.use(express.json())


const home = require('./route/home');
const posts = require('./route/posts');
const users = require('./route/users');
//route
app.use('/', home);
app.use('/api/posts', posts);
app.use('/api/users', users);
let port = process.env.PORT || 3000;
app.listen(port,()=>console.log("Listening on port 3000"));