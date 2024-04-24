import React from 'react'
import './Navbar.css'
import wellbot from './wellbot.jpg'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <div className='navbar'>
      {/* <div className="nav-logo">
        <img src={wellbot} alt="" /> */}
        <p>wellbot</p>
      {/* </div> */}
      <ul className="nav-menu">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="nav-login">
      <Link to='/login'><button>Login</button></Link>
      </div>
{/* <div className="testbot">
  <Link to='/check'><button>Chatbot</button></Link>
</div> */}
    </div>
  )
}

export default Navbar