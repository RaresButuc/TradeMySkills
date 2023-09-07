import React from "react";
import logo_11 from '../Logo_11.png';

const NavBar = () => {
  return (
    <div className="App">
    <nav className="navbar">
      <div className="container">
        <div className="left-nav">
          <a href="/" className="logo">
            <img src={logo_11} alt="Your logo" className="logo-img"/>
          </a>
        </div>
        <ul className="nav-links right-links">
        <li><button  className="post-offer"href="#">Post Offer</button></li>
         <li><a  href="/all-offer">See all Offer</a></li>
          <li><a href="/join-us">Join us</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  </div>
  

  );
};

export default NavBar;