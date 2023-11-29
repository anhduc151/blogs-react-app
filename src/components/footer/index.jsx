import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer_one">
          <p className="footer_one_logo">
            <Link to="/" className="footer_one_link">
              Slurp
            </Link>
          </p>
          <p className="footer_one_p">
            Quality is the inspiration for every meal
          </p>
        </div>

        <div className="footer_two">
          <h4 className="footer_h4">Services</h4>
          <p className="foot_p">Email Marketing</p>
          <p className="foot_p">Campaigns</p>
          <p className="foot_p">Branding</p>
          <p className="foot_p">Offline</p>
        </div>

        <div className="footer_three">
          <h4 className="footer_h4">About</h4>
          <p className="foot_p">Our Story</p>
          <p className="foot_p">Benefits</p>
          <p className="foot_p">Team</p>
          <p className="foot_p">Careers</p>
        </div>

        <div className="footer_four">
          <h4 className="footer_h4">Follow Us</h4>
          <div className="footer_icons">
            <Link target="blank" to="https://www.facebook.com/leanhduc151/">
              <i className="bx bxl-facebook icon" />
            </Link>
            <Link target="blank" to="/">
              <i className="bx bxl-twitter icon" />
            </Link>
            <Link
              target="blank"
              to="https://www.instagram.com/anhduc.151/?next=%2Fanhduc151%2F"
            >
              <i className="bx bxl-instagram icon" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
