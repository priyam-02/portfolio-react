import React from 'react'
import './Hero.css'
import profile_img from '../../assets/profile_img4.svg'
import AnchorLink from 'react-anchor-link-smooth-scroll'

const Hero = () => {
  return (
    <div id='home' className='hero'>
      {/* <div className="hero-img"></div> */}
        <img loading='eager' src={profile_img} alt="" />
        <h1><span>I&apos;m Priyam Shah,</span> full-stack developer based in USA.</h1>
        <p>I am a Full-Stack Developer based in North Carolina, USA, with a passion for building applications that solve real-world problems and enhance user satisfaction.</p>
        <div className="hero-action">
        <AnchorLink className='anchor-link' offset={50} href='#contact'><div className="hero-connect">Connect with me</div></AnchorLink>
            <a href="https://drive.google.com/file/d/1kkjZF3X9kPvIF_TLV4Kfiilj55EzF0Vp/view?usp=sharing" target='_blank' style={{textDecoration: 'none', color: 'inherit'}} > <div className="hero-resume">  My Resume</div> </a>
        </div>
    </div>
  )
}

export default Hero