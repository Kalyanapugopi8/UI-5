const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router
//read post
.post('/getpost', async (req, res) => {
    try {
      let noteget = await Post.getpost(req.body.id);
      res.send(noteget)
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

//create post
  .post('/createpost', async (req, res) => {
    try {
      let postcreates = await Post.createpost(req.body.id, req.body.title, req.body.content, req.body.createdAt, req.body.locations);
      res.send(postcreates)
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  //update post
  .post('/updatepost', async (req, res) => {
    try {
      let postupdate = await Post.updatepost(req.body.id, req.body.title, req.body.content);
      res.send(postupdate)
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })
  
  //delete post
  .post('/deletepost', async (req, res) => {
    try {
      let postdeletes= await Post.deletepost(req.body.id);
      res.send(postdeletes)
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })
module.exports=router;