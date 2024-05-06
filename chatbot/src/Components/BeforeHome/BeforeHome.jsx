import React, { useEffect, useState } from 'react'
import './BeforeHome.css'
import mental_bot_image from './beforehome.jpg'
import bot1 from './bot1.png'
import bot22 from './bot22.jpg'
import bot444 from './bot444.jpg'
import chatbot_img from './chatbot.png';
import girl_image from './homechat.png';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer'
function Home() {

  
  const[allthoughts,setAllThoughts]=useState({});

  const fetchInfo=async()=>{
    await fetch('http://localhost:4000/goodthoughts')
    .then((resp)=>resp.json())
    .then((data)=>{
      console.log(data);
      setAllThoughts(data)});
  }
  useEffect(()=>{
    fetchInfo();
  },[]);

  return (
    <div className='home'>

        <div className="headers">
          <div className="upper">
            <h1>Welcome to Mental Health Chatbot</h1>
            <div className="girl-thought">
            <img src={girl_image} alt="" />
            <p>"{allthoughts.joketext}"</p>
            </div>
            </div>
            <div className="image-bot">
            <img src={chatbot_img} alt="" />
            </div>
        </div>
        <div className="about">
        <Link to='/login'><button className='signup-btn'>SignUp</button></Link>
    </div>
        <Footer/>
    </div>
  )
}

export default Home;