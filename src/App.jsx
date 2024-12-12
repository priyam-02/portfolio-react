import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import About from './Components/About/About'
import Milestones from './Components/Milestones/Milestones'
import MyWork from './Components/MyWork/MyWork'
import Contact from './Components/Contact/Contact'
import '@fortawesome/fontawesome-free/css/all.min.css';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop'

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
    </div>
  )
}

export default App