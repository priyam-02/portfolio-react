import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Footer Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-text">Priyam Shah</span>
            </div>
            <p className="footer-description">
              Full-Stack Developer passionate about creating innovative web
              solutions and building applications that make a difference.
            </p>
            <div className="footer-social">
              <a
                href="https://github.com/priyam-02"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/priyamshahh/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="mailto:shahpriyam001@gmail.com"
                className="social-link"
                aria-label="Email"
              >
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#home">
                  <i className="fas fa-home"></i>
                  Home
                </a>
              </li>
              <li>
                <a href="#about">
                  <i className="fas fa-user"></i>
                  About
                </a>
              </li>
              <li>
                <a href="#mywork">
                  <i className="fas fa-code"></i>
                  Projects
                </a>
              </li>
              <li>
                <a href="#milestones">
                  <i className="fas fa-trophy"></i>
                  Experience
                </a>
              </li>
              <li>
                <a href="#contact">
                  <i className="fas fa-envelope"></i>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Footer Contact */}
          <div className="footer-contact">
            <h4>Get In Touch</h4>
            <ul>
              <li>
                <i className="fas fa-envelope"></i>
                <a href="mailto:shahpriyam001@gmail.com">
                  shahpriyam001@gmail.com
                </a>
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>United States</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>© {currentYear} Priyam Shah. All rights reserved.</p>
          </div>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
