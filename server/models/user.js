// import mongoose
const mongoose = require("mongoose");

// import bcryptjs
const bcrypt = require("bcryptjs");

// create schema for entity
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    followers: [String],
    following: [String]
})

// create model of schema
const User = mongoose.model("User", userSchema);

//create crud function on model
//Create user
async function register(username, password) {
    const user = await getUser(username);
   
    if(user) throw Error('Username already in use');

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        username: username,
        password: hashed
    });

    return newUser;
}

//read user
async function login(username, password) {
    const user = await getUser(username);
    if(!user) throw Error ('User Not Found');

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw Error('Wrong Password');
    
    return user._doc;
}

//update
async function updatePassword(id, password) {
    const user = await User.updateOne({"_id": id}, {$set: {password: password}});
    return user;
}

//delete
async function deleteUser(id) {
    await User.deleteOne({"_id": id});
}

//utility function
async function getUser(username) {
    return await User.findOne({"username": username})
}

//export all functions to routes
module.exports = {register, login, updatePassword, deleteUser
};