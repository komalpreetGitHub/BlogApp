import React, { useState } from 'react';
import './signup.css'; 
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';



const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        if (!formData.password) {
            errors.password = "Password is required";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        }
    

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("http://localhost:4000/user/login",formData)
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("name", response.data.name)
                navigate("/")
            } catch (error) {
                console.error("Error:", error);
                alert("user not found")
            }
        }
    };

    return (
        <div className="signup-form-container">
            <h2>Log in</h2>
            <br></br>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <Link to="/email">Forgot Password</Link><br></br><br></br>
                <button type="submit" className='form_btn'>Log in</button>
                Don't have an account <span>   </span>
                <Link to='/signup'>
               signup
                </Link>
            </form>
        </div>
    );
};

export default Login;