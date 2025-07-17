import { useRef, useState, useEffect } from "react";
import "./Navbar.css";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuref = useRef();
  const overlayRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (isMobileMenuOpen && window.innerWidth >= 1024) {
        closeMenu();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  const openMenu = () => {
    setIsMobileMenuOpen(true);
    menuref.current.style.right = "0px";
    if (overlayRef.current) {
      overlayRef.current.classList.add("active");
    }
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    menuref.current.style.right = "-350px";
    if (overlayRef.current) {
      overlayRef.current.classList.remove("active");
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "mywork", label: "Projects" },
    { id: "milestones", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
            <span className="logo-text">Priyam Shah</span>
          </div>

          {/* Desktop Navigation */}
          <ul className="nav-menu desktop">
            {navItems.map((item) => (
              <li
                key={item.id}
                className={`nav-item ${menu === item.id ? "active" : ""}`}
                onClick={() => setMenu(item.id)}
              >
                <AnchorLink
                  className="nav-link"
                  offset={80}
                  href={`#${item.id}`}
                  onClick={() => setMenu(item.id)}
                >
                  {item.label}
                  {menu === item.id && <div className="nav-indicator" />}
                </AnchorLink>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
            onClick={isMobileMenuOpen ? closeMenu : openMenu}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Mobile Navigation */}
          <div
            ref={overlayRef}
            className="mobile-menu-overlay"
            onClick={closeMenu}
          ></div>
          <ul ref={menuref} className="nav-menu mobile">
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">Menu</span>
              <button className="mobile-menu-close" onClick={closeMenu}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            {navItems.map((item) => (
              <li
                key={item.id}
                className={`nav-item ${menu === item.id ? "active" : ""}`}
                onClick={() => {
                  setMenu(item.id);
                  closeMenu();
                }}
              >
                <AnchorLink
                  className="nav-link"
                  offset={80}
                  href={`#${item.id}`}
                >
                  {item.label}
                </AnchorLink>
              </li>
            ))}
            <div className="mobile-menu-footer">
              <div className="social-links">
                <a
                  href="https://github.com/priyam-02"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href="https://linkedin.com/in/priyamshah22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </ul>

          {/* Desktop CTA */}
          <div className="navbar-cta desktop">
            <AnchorLink className="anchor-link" offset={80} href="#contact">
              <button className="btn btn-primary">
                <i className="fas fa-paper-plane"></i>
                Get In Touch
              </button>
            </AnchorLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
