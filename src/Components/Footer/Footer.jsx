import React from "react";
import "./Footer.css";
import footer_logo from "../../assets/footer_logo1.svg";
import user_icon from "../../assets/user_icon.svg";

const Footer = () => {
  return (
    <div className="footer">
      {/* <div className="footer-top">
        <div className="footer-top-left">
          <img loading="lazy" src={footer_logo} alt="" />
          <p>
            {" "}
            I am a full stack developer based in North Carolina, USA with a
            passion for crafting scalable and user-friendly applications.
          </p>
        </div>
        <div className="footer-top-right">
          <div className="footer-email-input">
            <img loading="lazy" src={user_icon} alt="" />
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="footer-subscribe">Subscribe</div>
        </div>
      </div> */}
      <hr />
      <div className="footer-bottom">
          <p className="footer-bottom-left">
            © 2024 Priyam Shah. All rights reserved.
          </p>
          
          <div className="footer-bottom-right">
            <a
              href="https://github.com/priyam-02"
              target="_blank"
              rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/priyamshah22"
              target="_blank"
              rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
          </div>
      </div>

  );
};

export default Footer;
