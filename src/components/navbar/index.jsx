import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const [activePage, setActivePage] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [previousScroll, setPreviousScroll] = useState(0);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const isScrolledDown = currentScrollPos > previousScroll;

    // Check the scroll direction
    if (isScrolledDown && currentScrollPos > 200) {
      setIsNavVisible(false);
    } else {
      setIsNavVisible(true);
    }

    setPreviousScroll(currentScrollPos);
  };

  useEffect(() => {
    setPreviousScroll(window.scrollY);
  }, []);

  useEffect(() => {
    const pathname = location.pathname;
    setActivePage(pathname);

    // Add scroll event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove scroll event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location, isNavVisible, previousScroll]);

  return (
    <nav className={`nav ${isNavVisible ? "nav_visible" : "nav_hidden"}`}>
      <div className="nav_icons">
        <div className="nav_logo">
          <Link to="/">
            <p className="nav_logo_p">Slurp</p>
          </Link>
        </div>

        <div className="nav_icon" onClick={toggleNav}>
          {isNavOpen ? (
            <i className="bx bx-x"></i>
          ) : (
            <i className="bx bx-menu"></i>
          )}
        </div>
      </div>

      <ul className={`nav_links ${isNavOpen ? "nav_links_open" : ""}`}>
        <Link to="/create">
          {" "}
          <li
            className={`nav_links_li ${
              activePage === "/create" ? "active" : ""
            }`}
          >
            Create
          </li>
        </Link>
        <Link to="/blog-list">
          {" "}
          <li
            className={`nav_links_li ${
              activePage === "/blog-list" ? "active" : ""
            }`}
          >
            List
          </li>
        </Link>
        <Link to="/contact">
          <li
            className={`nav_links_li ${
              activePage === "/contact" ? "active" : ""
            }`}
          >
            Contact
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
