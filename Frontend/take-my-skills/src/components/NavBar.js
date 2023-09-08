import React from "react";
import logo_22 from '../photo/Logo_2-DDbiUA2vk-transformed.png';

const NavBar = () => {
  return (
    
    <nav className="navbar">
      <div className="container">
        <div className="left-nav">
          <a href="/" className="logo">
            <img src={logo_22} alt="Your logo" className="logo-img"/>
          </a>
        </div>
        <ul className="nav-links right-links">
        <li><button  className="post-offer" > <a className="post-a" href="/post-offer">Post Your Ads Now FOR FREE</a> </button></li>
         <li><button className="no-background-button"><a  href="/all-offer">View All Ads</a></button> </li>
          <li><button className="join-us" ><a href="/join-us"> Join us</a></button></li>
          <li><button className="no-background-button"><a href="/login">Login</a></button></li>
          <li><button className="no-background-button"><a href="/contact">Contact</a></button></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
