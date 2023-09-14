import React from "react";
import logo_22 from '../photo/logosWebsite/Logo_22.png';
import logo_11 from '../photo/logosWebsite/Logo_11.png';
import { Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <div>

    
    <nav class="navbar navbar-custom fixed-top navbar-expand-lg navbar-dark  shadow-5-strong">
  <div class="container-xl">
    <a class="navbar-brand" href="/">
    <img src={logo_22} alt="ourLogo" class="h-auto" style={{ maxWidth: 175}}/>
      </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto  mb-2 mb-lg-0">
        <li class="nav-item">
            <a class="nav-link font-weight-bold  mx-2" aria-current="page" href="/all-offer">View All Ads</a>
        </li>

        <li class="nav-item">
            <a class="btn btn-primary font-weight-bold  mx-2   " aria-current="page" href="/join-us">Join us</a>
        </li>

        <li class="nav-item">
            <a class="nav-link font-weight-bold  mx-2"  aria-current="page" href="/login">Login</a>
        </li>

        <li class="nav-item">
            <a class="nav-link font-weight-bold  mx-2" aria-current="page" href="/contact">Contact</a>
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
