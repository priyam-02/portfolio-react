import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import About from './Components/About/About'
import Milestones from './Components/Milestones/Milestones'
import MyWork from './Components/MyWork/MyWork'
import Contact from './Components/Contact/Contact'
import '@fortawesome/fontawesome-free/css/all.min.css';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop'
import Footer from './Components/Footer/Footer'

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <MyWork />
      <Milestones />
      <Contact />
      <ScrollToTop />
      <Footer />
    </div>
  )
}

export default App