import React from 'react'
import Chatbot from './Components/Chatbot/Chatbot'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import LoginSignup from './Components/LoginSignup/LoginSignup'
import Booking from './Components/Booking/Booking'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Check from './Components/Check/Check'
import BeforeHome from './Components/BeforeHome/BeforeHome'
function App() {
  return(
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<BeforeHome/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/login' element={<LoginSignup/>}/>
    <Route path='/chatbot' element={<Chatbot/>}/>
    <Route path='/booking' element={<Booking/>}/>
    <Route path='/check' element={<Check/>}/>

    </Routes>
    
    
    </BrowserRouter>


  
  )
}

export default App