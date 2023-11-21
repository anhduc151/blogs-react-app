import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation(); // Lấy thông tin về URL hiện tại
  const [activePage, setActivePage] = useState("");

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    // Tìm trang active dựa trên pathname trong location
    const pathname = location.pathname;
    setActivePage(pathname);
  }, [location]);

  return (
    <nav className="nav">
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
        <li className={`nav_links_li ${activePage === "/create" ? "active" : ""}`}>
          <Link to="/create">Create</Link>
        </li>
        <li className={`nav_links_li ${activePage === "/blog-list" ? "active" : ""}`}>
          <Link to="/blog-list">List</Link>
        </li>
        <li className={`nav_links_li ${activePage === "/contact" ? "active" : ""}`}>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
