import Navbar from "./nav";
import React from "react";
import { useEffect, useState } from "react";
import Blog from "./blog";
import axios from "axios";
import './blog.css'



axios.defaults.baseURL = "http://localhost:4500/";

export default function Home() {

  const [blog, setBlog] = useState([]);

  useEffect(() => {
    async function serverCall() {

      const response = await axios.get("blog/allblogs")
      setBlog(response.data.blog);
      console.log(response.data.blog)

    }
    serverCall();
  }, [])

  const username = localStorage.getItem("name")?.slice(0, 1)

  return (
    <>
      <Navbar />
      <center>
        <div className="blog-container">
          {blog.map((item, index) => (
            <div className="blog-item" 
             key={index}>
              <Blog title={item.title}
                description={item.description} image={item.img}
                date={item.date}
                username={item.username} />

            </div>
          ))}
        </div>
      </center>

    </>
  );
}