import { useState } from "react";
import "./Contact.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Contact = () => {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactRef = useRef(null);

  // Parallax scroll progress
  const { scrollYProgress } = useScroll({
    target: contactRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms
  const formY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  // Remove other parallax transforms

  const contactInfo = [
    {
      icon: "fas fa-envelope",
      label: "Email",
      value: "priyam10302@gmail.com",
      link: "mailto:priyam10302@gmail.com",
    },
    {
      icon: "fas fa-phone",
      label: "Phone",
      value: "+1 (704) 337-9395",
      link: "tel:+1(704)337-9395",
    },
    {
      icon: "fas fa-map-marker-alt",
      label: "Location",
      value: "NY, United States",
      link: "https://maps.app.goo.gl/DbSdBonhFKGKKwbNA",
    },
  ];

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending....");

    const formData = new FormData(event.target);
    formData.append("access_key", "709bc5c1-0f84-4498-8a23-76969690945c");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully! I'll get back to you soon.");
        event.target.reset();
      } else {
        setResult("Something went wrong. Please try again.");
      }
    } catch {
      setResult("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact section" ref={contactRef}>
      <div className="container">
        <h2 className="section-title">
          Get In <span className="title-accent">Touch</span>
        </h2>
        <p className="section-subtitle">
          I'm currently available to take on new projects. Feel free to reach
          out if you'd like to discuss potential collaborations or just want to
          say hello!
        </p>

        <div className="contact-content">
          {/* Left Column - Contact Info - static */}
          <div className="contact-info">
            <div className="contact-header">
              <h3>Let&apos;s talk</h3>
              <p>
                I&apos;m always interested in hearing about new opportunities
                and exciting projects. Whether you have a question or just want
                to say hi, I&apos;ll try my best to get back to you!
              </p>
            </div>

            <div className="contact-availability">
              <div className="availability-badge">
                <i className="fas fa-clock"></i>
                <span>Available for new projects</span>
              </div>
              <p className="availability-text">
                Best time to reach me: <strong>9:00 AM - 5:00 PM (EST)</strong>
              </p>
            </div>

            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target={info.link.startsWith("http") ? "_blank" : "_self"}
                  rel={
                    info.link.startsWith("http") ? "noopener noreferrer" : ""
                  }
                  className="contact-item"
                >
                  <div className="contact-icon">
                    <i className={info.icon}></i>
                  </div>
                  <div className="contact-text">
                    <span className="contact-label">{info.label}</span>
                    <span className="contact-value">{info.value}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="contact-social">
              <span className="social-label">Follow me on:</span>
              <div className="social-links">
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
                  href="https://linkedin.com/in/priyamshah22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form with Parallax */}
          <motion.div
            className="contact-form-wrapper"
            style={{ y: formY }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            <form onSubmit={onSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  name="name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  name="email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary contact-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Send Message
                  </>
                )}
              </button>

              {result && (
                <div
                  className={`form-result ${result.includes("successfully") ? "success" : "error"}`}
                >
                  {result}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
