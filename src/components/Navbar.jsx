
import React, {useState } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

import "../styles/navbar.css";

import IB_LOGO from "../assets/models/IB_LOGO.png";


const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);


  const closeMenu = () => {
    setMenuOpen(false);
  };


  return (

    <header className="navbar">

      <div className="navbar-container">


        {/* =====================================
            LOGO
        ===================================== */}

        <a
          href="/"
          className="navbar-logo"
          onClick={closeMenu}
        >

          <div className="logo-mark">

            <img
              src={IB_LOGO}
              alt="Innovative Blossom logo"
            />

          </div>

          <span>
            Innovative Blossom
          </span>

        </a>


        {/* =====================================
            DESKTOP NAVIGATION
        ===================================== */}

        <nav className="navbar-links">

          <a href="#home">
            Home
          </a>

          <a href="#about">
            About
          </a>

          <a href="#contact">
            Services
          </a>

          <a href="#projects">
            Products
          </a>

        </nav>


        {/* =====================================
            DESKTOP CONTACT
        ===================================== */}

        <a
          href="#contact"
          className="navbar-button"
        >

          Contact Us

   
        </a>


        {/* =====================================
            MOBILE MENU BUTTON
        ===================================== */}

        <button
          className="menu-button"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label="Toggle navigation menu"
        >

          {menuOpen ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}

        </button>

      </div>


      {/* =====================================
          MOBILE NAVIGATION
      ===================================== */}

      <div
        className={`mobile-menu ${
          menuOpen ? "mobile-menu-open" : ""
        }`}
      >

        <nav className="mobile-nav-links">

          <a
            href="#home"
            onClick={closeMenu}
          >
            Home
          </a>

          <a
            href="#about"
            onClick={closeMenu}
          >
            About
          </a>

          <a
            href="#contact"
            onClick={closeMenu}
          >
            Services
          </a>

          <a
            href="#projects"
            onClick={closeMenu}
          >
            Products
          </a>

          <a
            href="#contac"
            onClick={closeMenu}
          >

            Contact Us

           
          </a>

        </nav>

      </div>

    </header>

  );

};


export default Navbar;