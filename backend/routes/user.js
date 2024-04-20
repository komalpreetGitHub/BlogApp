const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./db");
const SECRET_KEY = require("./data");

const userRouter = express.Router();

const signupValidation = zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    username: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6),

})

//forsignup
userRouter.post("/signup" ,async (req,res) => {
    const body = req.body;
    const success = signupValidation.safeParse(body);

    const emailCheck = await userRouter.findOne({
        email: body.email
    })

    if(emailCheck){
        return res.status(403).json({msg: "email already exist"})
    }
    try {
         const response = await user.create({
            firstname: body.firstname,
            lastname: body.lastname,
            username: body.username,
            email: body.email,
            password: body.password
         })

         const token = jwt.sign(response._id.toHexString() , SECRET_KEY)
         return res.json({token:token})
    } catch (error) {
        console.log(error)
    }

})

module.exports = userRouter;

