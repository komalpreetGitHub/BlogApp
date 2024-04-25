import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './nav.css';
import { useState } from 'react';
import { IoMdMenu } from "react-icons/io";
import { FaTimes } from "react-icons/fa";

export default function Navbar () {
const navigate = useNavigate();
    const[isMobile,setIsMobile] = useState(false);

    function logout(){
        localStorage.removeItem("token")
        navigate("/signup")
    }


    return(
        <nav className='navbar'>
             <h3 className='logo'>BLOG</h3>
             <ul className={isMobile? "nav-links-mobile" : "nav-links"}
             onClick={() => setIsMobile(false)}>
                 <Link to="/crtblog" className='blog'>
                    <li><button className='form_btn'>Add Blog</button></li>
                   </Link>
                   <Link to="/" className='home'>
                    <li>Home</li>
                   </Link>
    
                   <li className='logout' onClick={logout}>
                    Logout</li>
                   
             </ul>
             <button className='mobile-menu-icon'
             onClick={() => setIsMobile(!isMobile)}>
                    {isMobile? 
                    (<FaTimes />):
                    (<IoMdMenu />)
                    }
             </button>
        </nav>
    ); 
}

 