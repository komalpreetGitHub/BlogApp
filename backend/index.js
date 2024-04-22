const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const app = express();
const blogRouter = require('./routes/blog')
app.use(cors());
app.use(express.json());


//for reg
app.use("/user" , userRouter)

//for blog
app.use("/blog" , blogRouter)

app.listen(4500, () => {
    console.log("server is running")
})