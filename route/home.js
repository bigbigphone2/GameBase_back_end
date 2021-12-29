const express = require('express');
const router = express.Router();

router.get("/", async(req,res)=>{
    res.send("This is GameBase API")
  });

  module.exports = router;