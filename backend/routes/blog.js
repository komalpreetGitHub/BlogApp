const {storage} = require("../db");
const express = require("express");
const zod = require("zod");
const multer = require("multer");
const {Blog} = require("../db");
const {ref,getDownloadURL,uploadBytesResumable} = require("firebase/storage")



require("dotenv").config();
const blogRouter = express.Router();

const blogValidation = zod.object({
    title: zod.string(),
    description: zod.string()
})

const upload = multer({storage: multer.memoryStorage()})

blogRouter.post("/createpost" ,upload.single("filename"), async (req,res) =>{
    const body = req.body;
if(!req.file){
    console.log("file not uploaded")
}


    const success = blogValidation.safeParse(body);
    if(!success){
        return res.status(403).json({msg: "invaild data"})
    }
try {
    const dataTime = Date.now()
    const storageRef = ref(storage, `ECommerce/${req.file.originalname + " " + dataTime}`)
    const metadata = {
        contentType:req.file.mimetype
    }
    const snapshot = await uploadBytesResumable(storageRef,req.file.buffer,metadata)
    const downloadURL = await getDownloadURL(snapshot.ref)

    const Blogdata = await  Blog.create({
        title:body.title,
        description:body.description,
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

blogRouter.get("/allblogs" , async(req,res) =>{
    try {
        const response = await Blog.find({})
        return res.json({blog:response})
    } catch (error) {
        return res.status(403).json({msg:"error while fetching blogs"})
    }
})

module.exports = blogRouter;