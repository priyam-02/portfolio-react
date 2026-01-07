import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import About from "./Components/About/About";
import Experience from "./Components/Experience/Experience";
import Milestones from "./Components/Milestones/Milestones";
import MyWork from "./Components/MyWork/MyWork";
import Contact from "./Components/Contact/Contact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import Footer from "./Components/Footer/Footer";

const App = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Ensure page starts at top on refresh
  useEffect(() => {
    // Disable scroll restoration to prevent browser from remembering scroll position
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // Force scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="app-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Smooth scroll progress bar */}
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX }}
      />
      <Navbar />
      <motion.div className="sections-container">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-200px" }}
        >
          <Hero />
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-200px" }}
        >
          <About />
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-200px" }}
        >
          <Experience />
        </motion.section>
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-200px" }}
        >
          <MyWork />
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-200px" }}
        >
          <Milestones />
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-200px" }}
        >
          <Contact />
        </motion.section>
      </motion.div>
      <ScrollToTop />
      <Footer />
    </motion.div>
  );
};

export default App;
