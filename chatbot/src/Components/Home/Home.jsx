import React, { useEffect, useState } from 'react'
import './Home.css'
import mental_bot_image from './Mental_health_chatbot.jpg'
import bot1 from './bot1.png'
import bot22 from './bot22.jpg'
import bot444 from './bot444.jpg'
import girl_image from './homechat.png';
import back_img from './signupill.png'
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
            <img src={back_img} alt="" />
            </div>
        </div>
        <div className="abouts">
         <Link to='/check'><button class="btn">
         TRY CHATBOT
        </button></Link> 
          <div className="about-topic">
          
    <h1>About Chatbot</h1>
          </div>
        
        </div>
        <div className="details">
           <div className="para1">
          <img src={bot1} alt=""  className='img-para1'/>
            <p className='p-para1'>Mental health chatbot is an innovative digital tool designed to provide support, guidance, and resources to individuals struggling with mental health issues.</p>
            </div> 
           <div className="para1">
          <img src={bot22} alt="" className='img-para2'/>

            <p className='p-para2'>With a mental health chatbot, users can engage in conversations about various topics related to mental well-being, including stress management, anxiety, depression, self-care techniques, and coping strategies</p>
            </div> 
            <div className="para1">
          <img src={bot444} alt="" className='img-para3' />

              <p className='p-para3'>Mental health chatbots have the potential to improve access to mental health support, reduce barriers to seeking help, and empower individuals to take proactive steps towards better mental well-being. </p>
              </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Home;