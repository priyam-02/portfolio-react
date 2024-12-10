import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import About from './Components/About/About'
import Milestones from './Components/Milestones/Milestones'

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Milestones />
    </div>
  )
}

export default App