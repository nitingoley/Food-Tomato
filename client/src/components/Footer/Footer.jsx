import React from "react";
import "./Footer.css";
import { assets } from "@/assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img className="logo" src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi,
            similique, quae natus, blanditiis soluta tempora quo voluptatem quam
            ipsa assumenda officiis dolorum quia ipsum cupiditate iste. Hic
            ratione laboriosam explicabo?
          </p>
          <div className="footer-content-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
     
        <div className="footer-content-center">
         <h4>Our Company</h4>
         <li>Home</li>
         <li>Privacy policy</li>
         <li>About</li>
        </div>
        <div className="footer-content-right">
            <h5>Get in touch</h5>
            <ul>
               <a> <li>+91-7465869517</li></a>
                <li>nitingoley42@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
      &copy; {new Date().getFullYear()} Food Paradise. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
