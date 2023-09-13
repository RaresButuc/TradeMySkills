import React from "react";
import logo_22 from "../photo/logosWebsite/Logo_22.png";
// import logo_11 from '../photo/Logo_11.png';

export default function Footer() {
  return (
    <div class="container-xl ">
      <footer class="py-3 my-4">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
          <li class="nav-item">
            <a href="/" class="nav-link px-2 text-muted">
              Home
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              Privacy and Policy
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              FAQs
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">
              About
            </a>
          </li>
        </ul>
        <p class="text-center text-muted">&copy;2022 Trade My Skills</p>
      </footer>
    </div>
  );
}
