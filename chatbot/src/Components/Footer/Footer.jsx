import React from 'react'
import './Footer.css';

function Footer() {
  return (
    <div className="footer-line">
    <div className="footer">
        <h1>Contact Us</h1>
    <div className="container">
        <div className="name">
            <p>WELLBOT</p>
        </div>
        <div className="contact">
            <p>8542821917</p>
        </div>
        <div className="email">
            <p>wellbot@gmail.com</p>
        </div>
    </div>
    </div>
    <hr />
    <p className="copyright">Copyright © WellBot</p>
    </div>
  )
}

export default Footer;