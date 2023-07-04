// import mongoose
const mongoose = require("mongoose");

// create schema for entity
const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: String }],
    locations: [String]
});

// create model of schema
const Post = mongoose.model("Post", postSchema);

// CRUD functions for posts

// Create post
async function createpost(id, title, content, createdAt, locations) {
    const newPost = await Post.create({
        userId: id,
        title: title,
        content: content,
        createdAt: createdAt,
        likes: 0,
        locations: locations
    });

    return newPost;
}

// Read post
async function getpost(id) {
    const post = await Post.find({"userId": id});
    return post;
  }

// Update post
async function updatepost(id, title, content) {
    const post = await Post.updateOne({"_id": id}, 
    {$set: { content: content, title: title}});
    return post;
}

// Delete post
async function deletePost(id) {
    await Post.deleteOne({"_id": id});
}

// Export all functions to routes
module.exports = {createpost, getpost, updatepost, deletePost};






