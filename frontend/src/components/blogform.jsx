// import Navbar from "./nav";
// import './blog.css';
// import axios from 'axios'; 
// import { useNavigate } from 'react-router-dom';
// import { useState } from "react";

// axios.defaults.baseURL = "http://localhost:4500/";

// export default function Blog() {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "", 
//   });
//   const [image, setImage] = useState(null);

//   const navigate = useNavigate();

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target; // Corrected access to event target value
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData);
//     let errors = {};
//     if (!formData.title) {
//       errors.title = "Title is required";
//     }
//     if (!formData.description) {
//       errors.description = "Description is required"; // Corrected typo here
//     }

//     setErrors(errors);

//     if (Object.keys(errors).length === 0) {
//         const data = new FormData();
//         data.append('title', formData.title);
//         data.append('description', formData.description);
//         data.append('filename', image);

//         console.log(data)
//       try {
//         const response = await axios.post("/blog/createpost", data);
//         console.log(response);
//         // Clear form data after successful submission if needed
//         setFormData({
//           title: "",
//           description: "", // Corrected typo here
//         });
//         navigate("/");
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     }
//   };

   
 
//   return (
//     <div>
//       <Navbar />
//       <div className="form-container">
//         <h1>Create a Blog</h1><br/>
//         <form onSubmit={handleSubmit}>
//           <Labelinput type="text" placeholder="Title" name="Title" 
//            onChange={handleChange}
//            errors={errors.title} />

//           <Labelinput type="text" placeholder="Description" name="Description"
//           onChange={handleChange}
//           errors={errors.description} />

          

//           <Labelinput type="file" placeholder="Insert image" name="Image" 
//             onChange={(e) => {
//               setImage(e.target.files[0])}}/>
//           <button type="submit" className="form-button">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// function Labelinput({ type, placeholder, name, onchange, errors }) {
//   return (
//     <div className="label-input">
//       <h2>{name}</h2>
//       <input type={type} placeholder={placeholder} name={name} onChange={onchange} />
//       {errors && <span className="error">{errors}</span>}
//     </div>
//   );
// }





import Navbar from "./nav";
import "./blogform.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

axios.defaults.baseURL = "http://localhost:4500/";

export default function Crtblog() {
  const [formData, setFormData] = useState({
    title: "",
    description: "", // Corrected typo here
  });
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target; // Corrected access to event target value
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    let errors = {};
    if (!formData.title) {
      errors.title = "Title is required";
    }
    if (!formData.description) {
      errors.description = "Description is required"; // Corrected typo here
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('filename', image);

        console.log(data)
      try {
        const response = await axios.post("/blog/createpost", data);
        console.log(response);
        // Clear form data after successful submission if needed
        setFormData({
          title: "",
          description: "", // Corrected typo here
        });
        navigate("/");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Create a new Blog</h1>
          <br></br>
          <LabeledInput
            type="text"
            placeholder="Title"
            name="title" // Corrected capitalization here
            onChange={handleChange}
            errors={errors.title}
          />
          <br></br>
          <label>
            <h9>Description</h9>
            <br></br>
            <textarea
              type="text"
              className="description"
              name="description" // Corrected capitalization here
              onChange={handleChange}
            />
             {errors.description && <span className="error">{errors.description}</span>}
          </label>
          <br></br>
          <LabeledInput
            type="file"
            placeholder="Insert Image"
            onChange={(e) => {
              setImage(e.target.files[0]) // Corrected setting image state
            }}
            name="Image: "
          />
          <br></br>
          <button type="submit" className="form-button">
            Post
          </button>
        </form>
      </div>
    </>
  );
}

function LabeledInput({ type, placeholder, name, onChange, errors }) {
  return (
    <div className="label-input">
    <label>
      <h2>{name}</h2>
      <input type={type} placeholder={placeholder} name={name} onChange={onChange}  />
      {errors && <span className="error">{errors}</span>}
    </label>
    </div>
  );
}