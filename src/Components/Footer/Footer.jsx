import "./Footer.css";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";
import { useReducedMotion } from '../../hooks/useReducedMotion';
import CursorGlowText from '../CursorGlowText/CursorGlowText';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const reducedMotion = useReducedMotion();

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <motion.footer
      className="footer"
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container">
        <motion.div
          className="footer-content"
          variants={reducedMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Footer Brand */}
          <motion.div className="footer-brand" variants={reducedMotion ? {} : itemVariants}>
            <div className="footer-logo">
              <span className="logo-text">Priyam Shah</span>
            </div>
            <p className="footer-description">
              Full-Stack Engineer & AI Researcher.
            </p>
            <div className="footer-social">
              <motion.a
                href="https://github.com/priyam-02"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
                whileHover={reducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <i className="fab fa-github"></i>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/priyamshahh/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
                whileHover={reducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <i className="fab fa-linkedin"></i>
              </motion.a>
              <motion.a
                href="mailto:shahpriyam001@gmail.com"
                className="social-link"
                aria-label="Email"
                whileHover={reducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <i className="fas fa-envelope"></i>
              </motion.a>
            </div>
          </motion.div>

          {/* Footer Links */}
          <motion.div className="footer-links" variants={reducedMotion ? {} : itemVariants}>
            <h4>Quick Links</h4>
            <ul>
              {[
                { href: "#home", icon: "fas fa-home", label: "Home" },
                { href: "#about", icon: "fas fa-user", label: "About" },
                { href: "#experience", icon: "fas fa-briefcase", label: "Experience" },
                { href: "#mywork", icon: "fas fa-code", label: "Projects" },
                { href: "#milestones", icon: "fas fa-trophy", label: "Milestones" },
                { href: "#contact", icon: "fas fa-envelope", label: "Contact" }
              ].map((link) => (
                <motion.li key={link.href}>
                  <AnchorLink href={link.href} offset={80}>
                    <motion.span
                      whileHover={reducedMotion ? {} : { x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <i className={link.icon}></i>{' '}
                      {link.label}
                    </motion.span>
                  </AnchorLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Footer Contact */}
          <motion.div className="footer-contact" variants={reducedMotion ? {} : itemVariants}>
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
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className="footer-bottom"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="footer-copyright">
            <p>© {currentYear} Priyam Shah. All rights reserved.</p>
          </div>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </motion.div>

        {/* Cursor-Reactive Text */}
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CursorGlowText />
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
