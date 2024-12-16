import React, { useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo9.svg";
import underline from "../../assets/nav_underline1.svg";
import AnchorLink from "react-anchor-link-smooth-scroll";
import menu_open from "../../assets/menu_open.svg";
import menu_close from "../../assets/menu_close.svg";


const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const menuref = useRef();

  const openMenu = () => {
    menuref.current.style.right = "0px";
  }

  const closeMenu = () => {
    menuref.current.style.right = "-350px";
  }

  return (
    <>
      <div className="navbar">
        <img className="logo" loading="lazy" src={logo} alt="Logo" />
        {/* <img src={menu_open} onClick={openMenu} alt="" className="nav-mob-open"/> */}
        <p className="nav-mob-open"><i onClick={openMenu}  className="fa-solid fa-bars"></i></p>
        <ul ref={menuref} className="nav-menu">
        <p className="nav-mob-close"><i onClick={closeMenu} className="fa-solid fa-xmark "></i></p>
          {/* <img src={menu_close} onClick={closeMenu} alt="" className="nav-mob-close"/> */}
          {["home", "about", "projects", "milestones", "contact"].map((item) => (
            <li
              key={item}
              className={`nav-item ${menu === item ? "active" : ""}`}
              onClick={() => setMenu(item)}
            >
              <AnchorLink className="anchor-link" offset={50} href={`#${item}`}>
                <div className="menu-square">
                  {menu === item && (
                    <img className="underline-image" src={underline} alt="" />
                  )}
                  <p>{item.charAt(0).toUpperCase() + item.slice(1)}</p>
                </div>
              </AnchorLink>
            </li>
          ))}
        </ul>

        <div className="nav-connect-icons">
          <AnchorLink className="anchor-link" offset={50} href="#contact">
            <div className="nav-connect">Connect With Me</div>
          </AnchorLink>
          <div className="icons">
            <a
              href="https://github.com/priyam-02"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/priyamshah22"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;