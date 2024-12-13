import React from 'react'
import './Hero.css'
import profile_img from '../../assets/profile_img3.svg'
import AnchorLink from 'react-anchor-link-smooth-scroll'

const Hero = () => {
  return (
    <div id='home' className='hero'>
      <div className="hero-img"></div>
        {/* <img src={profile_img} alt="" /> */}
        <h1><span>I&apos;m Priyam Shah,</span> full-stack developer based in USA.</h1>
        <p> I am a full stack developer based in North Carolina, USA with a passion for crafting scalable and user-friendly applications.</p>
        <div className="hero-action">
            <div className="hero-connect"><AnchorLink className='anchor-link' offset={50} href='#contact'>Connect with me</AnchorLink></div>
            <a href="https://drive.google.com/file/d/1kkjZF3X9kPvIF_TLV4Kfiilj55EzF0Vp/view?usp=sharing" target='_blank' style={{textDecoration: 'none', color: 'inherit'}} > <div className="hero-resume">  My Resume</div> </a>
        </div>
    </div>
  )
}

export default Hero