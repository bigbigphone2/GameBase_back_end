const express = require('express');
const router = express.Router();

const pool = require("../db");
const authenticateToken = require('../middleware/auth')
const {validatePost}= require("../models/posts");

//all_post
router.get("/", async(req,res)=>{
    try {
      const allPosts = await pool.query("SELECT * FROM posts");
      res.json(allPosts.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
//allPostsbyUser
router.get('/user/:id',async(req,res)=>{
    try {
        const allPostsbyUser = await pool.query("SELECT * FROM posts WHERE user_id = $1 ",[req.params.id]);
        res.json(allPostsbyUser.rows);
    } catch (err) {
        console.error(err.message);
    }
});
//get post (id)
router.get('/:id',async(req,res)=>{
    try {
      const allPostsbyUser = await pool.query("SELECT * FROM posts WHERE post_id = $1 ",[req.params.id]);
      res.json(allPostsbyUser.rows);
  } catch (err) {
      console.error(err.message);
  }
})
//create_post
router.post("/create_post",authenticateToken, async (req, res) => {
    const { error } = validatePost(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    try {
      const { user_id ,title, type, content, price, place, contact } = req.body;
      const newUser = await pool.query(
        "INSERT INTO posts (user_id, title,type, content, price, place, contact) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",
        [user_id,title,type, content, price, place, contact]
      );
  
      res.json(newUser.rows[0]);
    } catch (err) {
      res.status(400).send('Server error');
      console.log(err.message)
    }
  });
  //find post by key word
  router.post("/find", async (req, res) => {
    try {
      const { keyword } = req.body;
      const allPostsWithKeyWords = await pool.query(`SELECT * FROM posts WHERE title LIKE ANY (array['%${keyword}%'])`);
      res.json(allPostsWithKeyWords.rows);
    } catch (err) {
        console.error(err.message);
    }
  });
//edit post
router.put("/edit",authenticateToken, async (req,res)=>{
  const { error } = validatePost(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  try {
      const { post_id ,title, type, content, price, place, contact } = req.body;
      const newUser = await pool.query(
        "UPDATE posts SET title = $1,type = $2, content = $3,price = $4, place= $5,contact= $6 WHERE post_id = $7 RETURNING *",
        [title,type, content, price, place, contact, post_id]
      );
  
      res.json(newUser.rows[0]);
    } catch (err) {
      res.status(400).send('Server error');
      console.log(err.message)
    }
})
//delete post
router.delete("/delete", async (req,res)=>{
  try {
      const { post_id } = req.body;
      const newUser = await pool.query(
        "DELETE FROM posts WHERE post_id = $1",
        [post_id]
      );
  
      res.status(200).send('Successfully delete the post');
    } catch (err) {
      res.status(400).send('Server error');
      console.log(err.message)
    }
})
module.exports = router;