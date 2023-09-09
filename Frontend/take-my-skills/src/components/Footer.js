import React from "react";
import logo_22 from '../photo/logosWebsite/Logo_22.png';
// import logo_11 from '../photo/Logo_11.png';

export default function Footer () {
    return (
        <footer>
        <div class="footer-content">
            <img src={logo_22} alt="Logo" class="logo"/>
            
            <div class="subscription">
                <input type="email" placeholder="Subscribe to newsletter" class="subscription-input"/>
                <label for="age-checkbox" class="age-checkbox">16 or older?</label>
                <input type="checkbox" id="age-checkbox" class="age-checkbox"/>
            </div>
            
            <div class="contact-us">
                <div>
                    <h3>Romania</h3>
                    <input type="email" placeholder="Your email" class="email-input"/>
                    <textarea placeholder="Your message"></textarea>
                </div>
                <div>
                    <h3>Hungary</h3>
                    <input type="email" placeholder="Your email" class="email-input"/>
                    <textarea placeholder="Your message"></textarea>
                </div>
                <div>
                    <h3>Czech Republic</h3>
                    <input type="email" placeholder="Your email" class="email-input"/>
                    <textarea placeholder="Your message"></textarea>
                </div>
            </div>
        </div>
        
        <div class="privacy-link">
            <a href="#">Privacy and Policy</a>
        </div>
        
        <div class="copyright-text">
            &copy;2022 Trade My Skills
        </div>
    </footer>
    )
}