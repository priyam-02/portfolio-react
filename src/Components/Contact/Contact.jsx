import React from 'react'
import './Contact.css'
import location_icon from '../../assets/location_icon.svg'
import call_icon from '../../assets/call_icon.svg'
import mail_icon from '../../assets/mail_icon.svg'
import underline from "../../assets/nav_underline3.svg";


const Contact = () => {
    const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "709bc5c1-0f84-4498-8a23-76969690945c");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      alert(data.message);
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <div id='contact' className='contact'>
        <div className="title-box">
            <h1>Get in touch </h1>
            <img src={underline} alt="" />
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
            <form onSubmit={onSubmit} className='contact-right'>
                    <label htmlFor=""> Name </label>
                    <input type="text" placeholder='Enter your name' name='name' required />

                    <label htmlFor=""> Email </label>
                    <input type="email" placeholder='Enter your email' name='email' required />

                    <label htmlFor=""> Message </label>
                    <textarea name="message" rows='8' placeholder='Write your message here...' required></textarea>

                    <button type='submit' className='contact-submit'>Submit now</button>
                </form>
        </div>

    </div>
  )
}

export default Contact