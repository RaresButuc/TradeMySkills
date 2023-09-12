import React from "react";
import logo_22 from '../photo/logosWebsite/Logo_22.png';
import logo_11 from '../photo/logosWebsite/Logo_11.png';

const NavBar = () => {
  return (
    
    // <nav className="navbar">
    //   <div className="container">
    //     <div className="left-nav">
    //       <a href="/" className="logo">
    //         <img src={logo_22} alt="ourLogo" className="logo-img"/>
    //       </a>
    //     </div>
    //     <ul className="nav-links right-links">
    //      <li><button className="no-background-button"><a  href="/all-offer">View All Ads</a></button> </li>
    //       <li><button className="join-us" ><a href="/join-us"> Join us</a></button></li>
    //       <li><button className="no-background-button"><a href="/login">Login</a></button></li>
    //       <li><button className="no-background-button"><a href="/contact">Contact</a></button></li>
    //     </ul>
    //   </div>
    // </nav>

    <nav class="navbar navbar-expand-lg navbar-dark shadow-5-strong">
  <div class="container-xl">
    <a class="navbar-brand" href="/">
    <img src={logo_11} alt="ourLogo" class="h-auto" style={{ maxWidth: 175}}/>
      </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto  mb-2 mb-lg-0">
        <li class="nav-item">
            <a class="nav-link font-weight-bold active mx-2" aria-current="page" href="/all-offer">View All Ads</a>
        </li>

        <li class="nav-item">
            <a class="nav-link font-weight-bold active mx-2   " aria-current="page" href="/join-us">Join us</a>
        </li>

        <li class="nav-item">
            <a class="nav-link font-weight-bold active mx-2"  aria-current="page" href="/login">Login</a>
        </li>

        <li class="nav-item">
            <a class="nav-link font-weight-bold active mx-2" aria-current="page" href="/contact">Contact</a>
        </li>
      </ul>

    </div>
  </div>
</nav>
  );
};

export default NavBar;
