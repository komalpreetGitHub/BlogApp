const { storage } = require("../db");
const express = require("express");
const zod = require("zod");
const multer = require("multer");
const { Blog, user } = require("../db");
const Auth = require('../middleware/auth')
const { ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage")



require("dotenv").config();
const blogRouter = express.Router();

const blogValidation = zod.object({
    title: zod.string(),
    description: zod.string()
})

const upload = multer({ storage: multer.memoryStorage() })

const multiple = [Auth, upload.single("filename")]



//api for post 


blogRouter.post("/createpost", multiple, async (req, res) => {
    const body = req.body;
    if (!req.file) {
        console.log("file not uploaded")
    }


    const success = blogValidation.safeParse(body);
    if (!success) {
        return res.status(403).json({ msg: "invaild data" })
    }
    try {
        const dataTime = Date.now();

        const storageRef = ref(storage, `Blog/${req.file.originalname + " " + dataTime}`)
        const metadata = {
            contentType: req.file.mimetype
        }
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata)

        const downloadURL = await getDownloadURL(snapshot.ref)

        const author = await user.findById(req.userId);

        const Blogdata = await Blog.create({
            title: body.title,
            description: body.description,
            img: downloadURL,
            date: Date.now(),
            userId: req.userId,
            authorname: author.firstname
        })
        return res.json({
            msg: "image uploaded"
        })

    } catch (error) {
        console.log(error)
        res.status(403).json({ msg: " image cannot upload" })
    }
}
)


//read all blogs


blogRouter.get("/allblogs", async (req, res) => {
    try {
        const response = await Blog.find({})
        return res.json({ blog: response })
    } catch (error) {
        return res.status(403).json({ msg: "error while fetching blogs" })
    }
})



// api for deleting user blogs
blogRouter.delete("/deleteblog", Auth, async (req, res) => {
    const body = req.body;
    try {
        const check = await Blog.findById(req.id);

        if (check) {
            res.status(403).json({ msg: "Deleting error" });
        }
        const response = await Blog.deleteOne({
            _id: body.id,
        });
        res.json({ msg: "deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Blog not deleted" });
    }
});




module.exports = blogRouter;