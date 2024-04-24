import React, { useState } from 'react'
import './Booking.css'
function Booking() {

const [bookdata,setBookData]=useState({
    name:"",
    fathername:"",
    age:"",
    address:"",
    timeslot:""
})

const changeHandle=(e)=>{
    setBookData({...bookdata,[e.target.name]:e.target.value})
}

const BookSession=async()=>{
console.log("session booked",bookdata);
let responegot;
await fetch('http://localhost:4000/booking',{
    method:'POST',
    headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
    },
    body:JSON.stringify(bookdata),
}).then((response)=>response.json()).then((data)=>responegot=data)

if(responegot.success){
    alert("Booked Successfully");
    window.location.replace('/home');
}
}

  return (
    <div className='book'>
        <div className="book-container">
            <h1>Book Your Session Here</h1>
            <div className="book-fields">
                <h3>Name</h3>
                <input name='name' value={bookdata.name} onChange={changeHandle} type="text" placeholder='Type Here' />
                <h3>Father's Name</h3>
                <input name='fathername' value={bookdata.fathername} onChange={changeHandle} type="text" placeholder='Type Here' />
                <h3>Age</h3>
                <input name='age' value={bookdata.age} onChange={changeHandle} type="text" placeholder='Type Here' />
                <h3>Address</h3>
                <input name='address' value={bookdata.address} onChange={changeHandle} type="text"  placeholder='Type Here'/>
                <h3>Preferred Time Slot</h3>
                <select name="timeslot" value={bookdata.timeslot} onChange={changeHandle} className='opt-input'>
                    <option value="9:30am - 10:00am">9:30am - 10:00am</option>
                    <option value="10:00am - 10:30am">10:00am - 10:30am</option>
                    <option value="11:00am - 11:30am">11:00am - 11:30am</option>
                    <option value="12:00pm - 12:30pm">12:00pm - 12:30pm</option>
                    <option value="2:00pm - 2:30pm">2:00pm - 2:30pm</option>
                    <option value="2:30pm - 3:00pm">2:30pm - 3:00pm</option>
                    <option value="3:00pm - 3:30pm">3:00pm - 3:30pm</option>
                    <option value="3:30pm - 4:00pm">3:30pm - 4:00pm</option>
                </select>
            </div>
            <button onClick={()=>BookSession()}>Book</button>
        </div>
    </div>
  )
}

export default Booking