import React, { useState } from 'react'
import './LoginSignup.css'
function LoginSignup() {
  const [state,setState]=useState("Signup");

  
  const [formData,setFormData]=useState({
    username:"",
    password:"",
    email:""
  })


  const login=async()=>{
    console.log("Login function");
    let responsedata;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
      Accept:'application/form-data',
      'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responsedata=data)

    if(responsedata.success){
      localStorage.setItem('auth-token',responsedata.token);
      console.log("Logged in");
      window.location.replace('/home');
    }
    else
    alert(responsedata.error);
  }

  const signup=async()=>{
    console.log("Signup Function",formData);
    let responsedata;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
      Accept:'application/form-data',
      'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responsedata=data)

    if(responsedata.success){
      localStorage.setItem('auth-token',responsedata.token);
      console.log("Signed up");
      window.location.replace('/home');
    }
    else
    alert(responsedata.errors);
  }

  const changeHandler=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Signup"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your name' />:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>{state}</button>
        {state==="Signup"?<p className='loginsignup-login'>Already have an account ? <span onClick={()=>setState("Login")}>Login</span></p>
        :<p className='loginsignup-login'>Don't have an account?<p className='loginsignup-login'>   
        Create an account <span onClick={()=>setState("Signup")}>Click here</span></p> </p>
  }
      </div>
    </div>
  )
}

export default LoginSignup