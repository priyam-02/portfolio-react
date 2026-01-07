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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const menuref = useRef();
  const overlayRef = useRef();
  const scrollTimeoutRef = useRef(null);

  // Combined and throttled scroll handler for performance
  useEffect(() => {
    let rafId = null;
    let lastScrollY = 0;

    const handleScroll = () => {
      // Cancel previous RAF if it hasn't executed yet
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      // Use RAF to throttle to ~60fps max
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Only update if scroll position changed significantly
        if (Math.abs(currentScrollY - lastScrollY) < 5) {
          rafId = null;
          return;
        }

        lastScrollY = currentScrollY;

        // Update scroll state
        setIsScrolled(currentScrollY > 50);
        setIsScrolling(true);

        // Clear existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Set timeout to detect when scrolling stops
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 750);

        // Scroll spy logic - only run if scrolled past top
        if (currentScrollY < 50) {
          setMenu("home");
        } else {
          // Expensive DOM operations - only do when needed
          const allSections = [...navItems, { id: "contact" }];
          let foundSection = null;
          let maxVisibility = 0;

          allSections.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) {
              const rect = element.getBoundingClientRect();
              const navbarHeight = 100;
              const viewportHeight = window.innerHeight;
              const elementTop = rect.top - navbarHeight;
              const elementBottom = rect.bottom;

              if (
                elementTop < viewportHeight * 0.4 &&
                elementBottom > navbarHeight
              ) {
                const visibility = viewportHeight - Math.abs(elementTop);
                if (visibility > maxVisibility) {
                  maxVisibility = visibility;
                  foundSection = item.id === "contact" ? "milestones" : item.id;
                }
              }
            }
          });

          if (foundSection) {
            setMenu(foundSection);
          }
        }

        rafId = null;
      });
    };

    // Passive listener - tells browser we won't preventDefault
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Call once on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);


  // Auto-close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);

      // Reset expansion states when transitioning between mobile/desktop
      setIsHovered(false);
      setIsScrolling(false);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      if (isMobileMenuOpen && !mobile) {
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
            <AnchorLink
              className="navbar-logo"
              offset={80}
              href="#home"
              onClick={() => setMenu("home")}
            >
              <img src={logo} alt="Priyam Shah" className="logo-image" />
            </AnchorLink>
          </div>

          {/* Center Section - Available for Work Indicator */}
          <div className="navbar-section-center">
            <div className={`availability-indicator ${
              isMobile
                ? (!isMobileMenuOpen ? "visible" : "hidden")
                : (!shouldExpand && !isMobileMenuOpen ? "visible" : "hidden")
            }`}>
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
