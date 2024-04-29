import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './nav.css';
import { useState } from 'react';
import { IoMdMenu } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
// import { PiGitlabLogoBold } from "react-icons/pi";

export default function Navbar() {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const [login, setLogin] = useState(false);


    useEffect(() => {
        if (localStorage.getItem("token")) {
            setLogin(!login);
        }
    }, []);

    const username = localStorage.getItem("name")?.slice(0, 1)

    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        navigate("/signup")
    }


    return (
        <nav className='navbar'>
            <h3 className='logo'>BLOG<span>     </span> </h3>
            <ul className={isMobile ? "nav-links-mobile" : "nav-links"}
                onClick={() => setIsMobile(false)}>



                <Link to="/crtblog" className='blog'>
                    <li><button className='form_btn'>Add Blog</button></li>
                </Link>

                  {login ? (
                    <Link to ="/" className='avatar'> <li>{username}</li></Link>
                      ) : null}
                

                <Link to="/" className='home'>
                    <li>Home</li>
                </Link>
                {login ? (
                    <li className='logout' onClick={logout}>
                        Logout
                    </li>) : null}


            </ul>
            <button className='mobile-menu-icon'
                onClick={() => setIsMobile(!isMobile)}>
                {isMobile ?
                    (<FaTimes />) :
                    (<IoMdMenu />)
                }
            </button>
        </nav>
    );
}

