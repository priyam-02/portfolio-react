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

  // Optimized scroll handler + Intersection Observer (no layout thrashing)
  useEffect(() => {
    let rafId = null;
    let lastScrollY = 0;

    // Lightweight scroll handler ONLY for navbar styling (no DOM queries)
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Only update if scroll position changed significantly
        if (Math.abs(currentScrollY - lastScrollY) < 5) {
          rafId = null;
          return;
        }

        lastScrollY = currentScrollY;

        // Update scroll state for navbar appearance
        setIsScrolled(currentScrollY > 50);
        setIsScrolling(true);

        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 750);

        rafId = null;
      });
    };

    // Intersection Observer for active section detection (NO forced layouts!)
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -60% 0px', // Navbar height offset + bottom threshold
      threshold: [0, 0.25, 0.5, 0.75, 1.0]
    };

    let activeSection = 'home';

    const observerCallback = (entries) => {
      let maxRatio = 0;
      let mostVisibleSection = null;

      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisibleSection = entry.target.id;
        }
      });

      if (mostVisibleSection && mostVisibleSection !== activeSection) {
        activeSection = mostVisibleSection;
        setMenu(mostVisibleSection === 'contact' ? 'milestones' : mostVisibleSection);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const allSections = [...navItems, { id: 'contact' }];
    allSections.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    // Passive listener for scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      observer.disconnect();
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
