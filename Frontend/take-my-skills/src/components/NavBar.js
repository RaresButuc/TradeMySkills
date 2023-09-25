import React from "react";
import logo_22 from '../photo/logosWebsite/Logo_22.png';
// import logo_11 from '../photo/logosWebsite/Logo_11.png';
import { Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <div>

    
    <nav className="navbar navbar-custom fixed-top navbar-expand-md navbar-dark  shadow-5-strong">
  <div className="container-xl">
    <a className="navbar-brand" href="/">
    <img src={logo_22} alt="ourLogo" className="h-auto" style={{ maxWidth: 175}}/>
      </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto  mb-2 mb-lg-0">
        <li className="nav-item">
            <a className="nav-link font-weight-bold  mx-2" aria-current="page" href="/all-ads">View All Ads</a>
        </li>

        <li className="nav-item">
            <a className="btn btn-primary font-weight-bold  mx-2   " aria-current="page" href="/join-us">Join us</a>
        </li>

        <li className="nav-item">
            <a className="nav-link font-weight-bold  mx-2"  aria-current="page" href="/login">Login</a>
        </li>

        <li className="nav-item">
            <a className="nav-link font-weight-bold  mx-2" aria-current="page" href="/contact">Contact</a>
        </li>
      </ul>

    </div>
  </div>
</nav>
<main>
  <Outlet />
</main>
</div>
  );
};

export default NavBar;
