import { useRef, useState, useEffect } from "react";
import "./Navbar.css";
import AnchorLink from "react-anchor-link-smooth-scroll";
import logo from "/PP Frame 1.svg";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "mywork", label: "Projects" },
  { id: "milestones", label: "Milestones" },
];

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuref = useRef();
  const overlayRef = useRef();
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsScrolling(true);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 750); // Wait 750ms (0.75 seconds) after scrolling stops
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Scroll spy to update active menu based on scroll position
  useEffect(() => {
    const handleScrollSpy = () => {
      // If at the very top, always select home
      if (window.scrollY < 50) {
        setMenu("home");
        return;
      }

      // Include contact section for tracking (but not in nav display)
      const allSections = [...navItems, { id: "contact" }];

      // Find the current section based on which one is most visible
      let foundSection = null;
      let maxVisibility = 0;

      allSections.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const navbarHeight = 100; // Account for navbar height

          // Calculate how much of the section is visible in viewport
          const viewportHeight = window.innerHeight;
          const elementTop = rect.top - navbarHeight;
          const elementBottom = rect.bottom;

          // Section is considered active if its top is in the upper 40% of viewport
          if (
            elementTop < viewportHeight * 0.4 &&
            elementBottom > navbarHeight
          ) {
            // Calculate visibility score (prefer sections near top of viewport)
            const visibility = viewportHeight - Math.abs(elementTop);
            if (visibility > maxVisibility) {
              maxVisibility = visibility;
              // If contact section, keep the last nav item (milestones) active
              foundSection = item.id === "contact" ? "milestones" : item.id;
            }
          }
        }
      });

      // Only update if we found a valid section
      if (foundSection) {
        setMenu(foundSection);
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    handleScrollSpy(); // Call once on mount

    return () => window.removeEventListener("scroll", handleScrollSpy);
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
    if (menuref.current) {
      menuref.current.classList.add("open");
    }
    if (overlayRef.current) {
      overlayRef.current.classList.add("active");
    }
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    if (menuref.current) {
      menuref.current.classList.remove("open");
    }
    if (overlayRef.current) {
      overlayRef.current.classList.remove("active");
    }
  };

  const shouldExpand = isScrolling || isHovered;

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        className="mobile-menu-overlay"
        onClick={closeMenu}
      ></div>

      <div
        className={`navbar-pill ${isMobileMenuOpen ? "menu-open" : ""} ${shouldExpand ? "expanded" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="navbar-content">
          {/* Left Section - Logo */}
          <div className="navbar-section-left">
            <div className="navbar-logo">
              <img src={logo} alt="Priyam Shah" className="logo-image" />
            </div>
          </div>

          {/* Center Section - Available for Work Indicator */}
          <div className="navbar-section-center">
            <div className={`availability-indicator ${!shouldExpand && !isMobileMenuOpen ? "visible" : "hidden"}`}>
              <span className="availability-dot"></span>
              <span className="availability-text">Available for work</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <ul
            className={`nav-menu desktop ${shouldExpand ? "visible" : "hidden"}`}
          >
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
                </AnchorLink>
              </li>
            ))}
          </ul>

          {/* Right Section - Desktop CTA */}
          <div className="navbar-section-right">
            <div className="navbar-cta desktop">
              <AnchorLink className="cta-link" offset={80} href="#contact">
                <button className="cta-button">Get In Touch</button>
              </AnchorLink>
            </div>
          </div>

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
        </div>

        {/* Mobile Navigation - now inside the pill */}
        <ul
          ref={menuref}
          className="nav-menu mobile"
          onClick={(e) => e.stopPropagation()}
        >
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`nav-item ${menu === item.id ? "active" : ""}`}
            >
              <AnchorLink
                className="nav-link"
                offset={80}
                href={`#${item.id}`}
                onClick={() => {
                  setMenu(item.id);
                  setTimeout(() => closeMenu(), 100);
                }}
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
                href="https://www.linkedin.com/in/priyamshahh/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
