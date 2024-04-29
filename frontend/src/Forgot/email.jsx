
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const Email = () => {
    const [formData, setFormData] = useState({
        email: ''
    });
    const navigate = useNavigate()
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = {};
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email address is invalid";
        }


        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                navigate("/otp")
            } catch (error) {
                console.error("Error:", error);
                alert("email not found")
            }
        }
    };

    return (
        <div className="signup-form-container">
            <h2>Password assistance</h2>
            <br></br>
            Enter the email address associated with your blog account
            <br></br><br></br>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>


                
                    <button type="submit" className='form_btn'>Log in</button>

            </form>
        </div>
    );
};

export default Email;
