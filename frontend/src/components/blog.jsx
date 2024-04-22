import Navbar from "./nav";
import './blog.css';
import { Component } from "react";
export default function Blog() {
  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h1>Create a Blog</h1><br/>
        <form>
          <Labelinput type="text" placeholder="Title" name="Title" />
          <Labelinput type="text" placeholder="Description" name="Description" />
          <Labelinput type="file" placeholder="Insert image" name="Image" />
          <button type="submit" className="form-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

function Labelinput({ type, placeholder, name }) {
  return (
    <div className="label-input">
      <h2>{name}</h2>
      <input type={type} placeholder={placeholder} />
    </div>
  );
}
