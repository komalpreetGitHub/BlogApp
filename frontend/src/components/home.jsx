import Navbar from "./nav";
import React from "react";
import { useEffect, useState } from "react";
import Blog from "./blog";
import axios from "axios";



axios.defaults.baseURL = "http://localhost:4500/";

export default function Home() {

  const [blog, setBlog] = useState([]);

  useEffect(()=>{
    async function serverCall () {
      const response = await axios.get("blog/allblogs")
      setBlog(response.data.blog)
    }
    serverCall();
  },[])
  return (
    <>
    <Navbar/>
    <center>
    <div className="blog-container"> 
      {blog.map((item, index) => (
        <div className="blog-item" key={index}>
             <Blog title = {item.title}
           description= {item.description} image = {item.img}/> 

        </div>
      ))}
    </div>
    </center>
  
    </>
  );
}