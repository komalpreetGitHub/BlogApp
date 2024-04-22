const storage = require("../db");
const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const Blog = require("../db");
const {ref,getDownloadURL,uploadBytesResumable} = require("firebase/storage")
const { uploadBytesResumable } = require("firebase/storage");


require("dotenv").config();
const blogRouter = express.Router();

const blogValidation = zod.object({
    title: zod.string(),
    description: zod.string()
})

const upload = multer({storage:multer.memoryStorage})

blogRouter.post("/createpost" ,upload.single("filename"), async (req,res) =>{
    const body = req.body;

    const success = blogValidation.safeParse(body);
    if(!success){
        return res.status(403).json({msg: "invaild data"})
    }
try {
    const dataTime = Date.now()
    const storageRef = ref(storage, `${req.file.original + " " + dataTime}`)
    const metadata = {
        contentType:req.file.mimetype
    }
    const snapshot = await uploadBytesResumable(storageRef,req.file.buffer,metadata)
    const downloadURL = await getDownloadURL(snapshot.ref)

    const Blogdata = await  Blog.create({
        title:body.title,
        description:body.title,
        img:downloadURL

    })
    return res.json({
        msg:"image uploaded"
    })

} catch (error) {
    console.log(error)
    res.status(403).json({msg:"cannot upload"})
}
}
)

module.exports = blogRouter;