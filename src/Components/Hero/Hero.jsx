import React from 'react'
import './Hero.css'
import profile_img from '../../assets/profile_img3.svg'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-img"></div>
        {/* <img src={profile_img} alt="" /> */}
        <h1><span>I&apos;m Priyam Shah,</span> full-stack developer based in USA.</h1>
        <p> I am a full stack developer based in North Carolina, USA with a passion for crafting scalable and user-friendly applications.</p>
        <div className="hero-action">
            <div className="hero-connect">Connect with me</div>
            <a href="https://drive.google.com/file/d/1kkjZF3X9kPvIF_TLV4Kfiilj55EzF0Vp/view?usp=sharing" target='_blank' style={{textDecoration: 'none', color: 'inherit'}} > <div className="hero-resume">  My Resume</div> </a>
        </div>
    </div>
  )
}

export default Hero