const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken');
const config = require('config');

const pool = require("../db");
const {validateUser} = require('../models/user');
// const { Client } = require('pg');

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

//view all user information
router.get("/allUser", async(req,res) =>{
        try {
            const allUsers = await pool.query("SELECT * FROM accounts");
            res.json(allUsers.rows);
        } catch (err) {
            console.error(err.message);
        }
    });
//view your own information
router.get("/me", async(req,res) =>{
        try {
            const singleUsers = await pool.query("SELECT * FROM accounts WHERE user_id = $1 ",[req.user.id]);
            res.json(singleUsers.rows);
        } catch (err) {
            console.error(err.message);
        }
    });
//get user name
router.get('/:id',async(req,res)=>{
    try {
      const userName = await pool.query("SELECT * FROM accounts WHERE user_id = $1 ",[req.params.id]);
      res.json(userName.rows[0].username);
  } catch (err) {
      console.error(err.message);
  }
})
//create user
router.post("/create_user", async (req, res) => {
    const { error } = validateUser(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    try {
      const { name, email } = req.body;
      const newUser = await pool.query(
        "INSERT INTO accounts (username , password, email) VALUES($1,$2,$3) RETURNING *",
        [name, hashedPassword ,email]
      );
  
      res.json(newUser.rows[0]);
    } catch (err) {
      res.status(400).send('Server error');
      console.log(err.message)
    }
  });
//login
router.post("/login",async(req,res)=>{

    try {
        const user = await pool.query("SELECT * FROM accounts WHERE email = $1 ",[req.body.email]);
        if (user.rows[0] == null) {
            return res.status(400).send('This email is not registered')
        }
        //console.log(user.rows[0])
        if(await bcrypt.compare(req.body.password, user.rows[0].password)) {
            //res.send('Success')
            const userEmail = req.body.email;
            const userName = user.rows[0].username;
            const userID = user.rows[0].user_id;
            const token = { email: userEmail, name: userName,id: userID}
            const accessToken = generateAccessToken(token)
            //const refreshToken = jwt.sign(user, config.get('jwtPrivateKey'))
            //refreshTokens.push(refreshToken)
            res.json({ accessToken: accessToken})//, refreshToken: refreshToken 
          } else {
            res.send('Wrong Password')
          }
    } catch (err) {
        res.status(500).send()
        console.error(err.message);
    }

})
function generateAccessToken(user) {
    return jwt.sign(user, config.get('jwtPrivateKey'))//, { expiresIn: '15m' }
    }
router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
    })
module.exports = router; 