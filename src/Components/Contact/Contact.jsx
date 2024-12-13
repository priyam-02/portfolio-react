import React from 'react'
import './Contact.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import location_icon from '../../assets/location_icon.svg'
import call_icon from '../../assets/call_icon.svg'
import mail_icon from '../../assets/mail_icon.svg'

const Contact = () => {
  return (
    <div id='contact' className='contact'>
        <div className="title-box">
            <h1>Get in touch </h1>
            <img src={theme_pattern} alt="" />
        </div>
        <div className="contact-section">
            <div className="contact-left">
                <h1>Let&apos;s talk</h1>
                <p>I&apos;m currently avaliable to take on new projects, so feel free to send me a message about anything that you want me to work on.</p>
                <p>You can contact me anytime between: <br />9:00 AM - 5:00 PM (EST)</p>
                <div className="contact-details">
                    <div className="contact-detail">
                        <img src={mail_icon} alt="" /> <a style={{textDecoration: 'none'}} href="mailto:priyam10302@gmail.com">priyam10302@gmail.com</a>
                    </div>
                    <div className="contact-detail">
                        <img src={call_icon} alt="" /> <a style={{textDecoration: 'none'}} href="tel:+1(704)337-9395">+1 (704) 337-9395</a>
                    </div>
                    <div className="contact-detail">
                        <img src={location_icon} alt="" /> <a style={{textDecoration: 'none'}} href="https://maps.app.goo.gl/AgroZM2CbKgHjaSZ9" target="_blank" rel="noopener noreferrer">NC, United States</a>
                    </div>
                </div>
            </div>
            <form className='contact-right'>
                    <label htmlFor=""> Name </label>
                    <input type="text" placeholder='Enter your name' name='name' />

                    <label htmlFor=""> Email </label>
                    <input type="email" placeholder='Enter your email' name='email' />

                    <label htmlFor=""> Message </label>
                    <textarea name="message" rows='8' placeholder='Write your message here...'></textarea>

                    <button type='submit' className='contact-submit'>Submit now</button>
                </form>
        </div>

    </div>
  )
}

export default Contact