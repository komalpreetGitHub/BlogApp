
const { initializeApp } = require("firebase/app")
const { getStorage } = require("firebase/storage");
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/Blogapp")
    .then(() => {
        console.log("mongodb connected")
    })

const firebaseConfig = {
    apiKey: "AIzaSyD4olIgYD-f4oPn5qk7_Ier8eIJHHbJYqM",
    authDomain: "blog-app-d3652.firebaseapp.com",
    projectId: "blog-app-d3652",
    storageBucket: "blog-app-d3652.appspot.com",
    messagingSenderId: "889757447485",
    appId: "1:889757447485:web:740b9c5675c9226d0ec154",
    measurementId: "G-M6JMN8RXXP"
};



const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    password: String
})


const app = initializeApp(firebaseConfig)
const storage = getStorage(app)


const user = mongoose.model("user", userSchema)

const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    img: String
})





const Blog = mongoose.model("blog", blogSchema)

module.exports = { user, storage, Blog };