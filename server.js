const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors());
app.use(express.json())



const posts = require('./route/posts');
const users = require('./route/users');
//route
app.use('/api/posts', posts);
app.use('/api/users', users);

app.listen(3000,()=>console.log("Listening on port 3000"));