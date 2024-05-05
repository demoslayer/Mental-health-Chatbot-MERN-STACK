// import React, { useState } from 'react'
// import './Booking.css'
// function Booking() {

// const [bookdata,setBookData]=useState({
//     name:"",
//     fathername:"",
//     age:"",
//     address:"",
//     timeslot:""
// })

// const changeHandle=(e)=>{
//     setBookData({...bookdata,[e.target.name]:e.target.value})
// }

// const BookSession=async()=>{
// console.log("session booked",bookdata);
// let responegot;
// await fetch('http://localhost:4000/booking',{
//     method:'POST',
//     headers:{
//         Accept:'application/form-data',
//         'Content-Type':'application/json',
//     },
//     body:JSON.stringify(bookdata),
// }).then((response)=>response.json()).then((data)=>responegot=data)

// if(responegot.success){
//     alert("Booked Successfully");
//     window.location.replace('/home');
// }
// }

//   return (
//     <div className='book'>
//         <div className="book-container">
//             <h1>Book Your Session Here</h1>
//             <div className="book-fields">
//                 <h3>Name</h3>
//                 <input name='name' value={bookdata.name} onChange={changeHandle} type="text" placeholder='Type Here' />
//                 <h3>Phone Number</h3>
//                 <input name='phone' value={bookdata.phone} onChange={changeHandle} type="text" placeholder='Type Here' />
//                 <h3>Age</h3>
//                 <input name='age' value={bookdata.age} onChange={changeHandle} type="text" placeholder='Type Here' />
//                 <h3>Address</h3>
//                 <input name='address' value={bookdata.address} onChange={changeHandle} type="text"  placeholder='Type Here'/>
//                 <h3>Preferred Time Slot</h3>
//                 <select name="timeslot" value={bookdata.timeslot} onChange={changeHandle} className='opt-input'>
//                     <option value="9:30am - 10:00am">9:30am - 10:00am</option>
//                     <option value="10:00am - 10:30am">10:00am - 10:30am</option>
//                     <option value="11:00am - 11:30am">11:00am - 11:30am</option>
//                     <option value="12:00pm - 12:30pm">12:00pm - 12:30pm</option>
//                     <option value="2:00pm - 2:30pm">2:00pm - 2:30pm</option>
//                     <option value="2:30pm - 3:00pm">2:30pm - 3:00pm</option>
//                     <option value="3:00pm - 3:30pm">3:00pm - 3:30pm</option>
//                     <option value="3:30pm - 4:00pm">3:30pm - 4:00pm</option>
//                 </select>
//             </div>
//             <button onClick={()=>BookSession()}>Book</button>
//         </div>
//     </div>
//   )
// }

// export default Booking


import React, { useState } from 'react';
import './Booking.css';
import { Link } from 'react-router-dom';

function Booking() {
  const [bookdata, setBookData] = useState({
    name: "",
    phone: "",
    age: "",
    address: "",
    timeslot: "",
    date:""
  });


  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    age: "",
    address: "",
    timeslot: "",
    date: ""
  });

  const changeHandle = (e) => {
    setBookData({ ...bookdata, [e.target.name]: e.target.value });
  };

  const BookSession = async () => {
    try {

      let valid = true;
    const newFormErrors = { ...formErrors };

    // Check if any field is empty
    for (const key in bookdata) {
      if (bookdata[key].trim() === "") {
        newFormErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
        valid = false;
      }
    }

    setFormErrors(newFormErrors);

    if (!valid) {
      alert("All fields are required and phone number must be 10-digit and age must be a number");
      return; // Don't proceed if form is invalid
    }
    
      // Validate phone number
      if (!/^[0-9]{10}$/.test(bookdata.phone)) {
        newFormErrors['phone'] = 'Phone number must be a 10-digit number';
        valid = false;
        alert("Phone number should be 10 digit");
        return;
      }

      // Validate age
      if (!Number.isInteger(parseInt(bookdata.age))) {
        newFormErrors['age'] = 'Age must be an integer';
        valid = false;
        alert("Age should be number");
        return;
      }


      const authToken = localStorage.getItem('auth-token');
      const response = await fetch('http://localhost:4000/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken
        },
        body: JSON.stringify(bookdata)
      });
      const data = await response.json();
      if (data.success) {
        alert("Booked Successfully");
        window.location.replace('/home');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error booking session');
    }
  };

const [bookings, setBookings] = useState([]);
const [noBookingsMessage, setNoBookingsMessage] = useState('');
const [show,setshow]=useState('noshow');

  const getUserBookings = async () => {
    setshow("show")
    try {
      const authToken = localStorage.getItem('auth-token');
      const response = await fetch('http://localhost:4000/user-bookings', {
        method: 'GET',
        headers: {
          'Authorization': authToken
        }
      });
      const data = await response.json();

      
      if (data.success) {
        if (data.bookings.length === 0) {
          console.log(bookings);
          setNoBookingsMessage('No bookings done yet');
          console.log(noBookingsMessage);

        } else {
          console.log(bookings);
          const bookingElements = data.bookings.map((booking, index) => (
            <div className='use' key={index}>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Phone:</strong> {booking.phone}</p>
              <p><strong>Age:</strong> {booking.age}</p>
              <p><strong>Address:</strong> {booking.address}</p>
              <p><strong>Time Slot:</strong> {booking.timeslot}</p>
<hr />
            </div>
          ));
          setBookings(bookingElements);
          setNoBookingsMessage('');
        }
      } else {
        alert('Error fetching user bookings');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching user bookings');
    }
  };
  


  return (
    <div className='book'>
      {show==="noshow"?<><div className="book-container">
        <h1>Book Your Session Here</h1>
        < div className="book-fields">
          <h3>Name</h3>
          <input name='name' value={bookdata.name} onChange={changeHandle} type="text" placeholder='Type Here' required />
          <h3>Phone Number</h3>
          <input name='phone' value={bookdata.phone} onChange={changeHandle} type="text" placeholder='Type Here'required />
          <h3>Age</h3>
          <input name='age' value={bookdata.age} onChange={changeHandle} type="text" placeholder='Type Here' required />
          <h3>Address</h3>
          <input name='address' value={bookdata.address} onChange={changeHandle} type="text" placeholder='Type Here' required />
          <h3>Preferred Time Slot</h3>
          <select name="timeslot" value={bookdata.timeslot} onChange={changeHandle} className='opt-input' required>
            <option value="9:30am - 10:00am">9:30am - 10:00am</option>
            <option value="10:00am - 10:30am">10:00am - 10:30am</option>
            <option value="11:00am - 11:30am">11:00am - 11:30am</option>
            <option value="12:00pm - 12:30pm">12:00pm - 12:30pm</option>
            <option value="2:00pm - 2:30pm">2:00pm - 2:30pm</option>
            <option value="2:30pm - 3:00pm">2:30pm - 3:00pm</option>
            <option value="3:00pm - 3:30pm">3:00pm - 3:30pm</option>
            <option value="3:30pm - 4:00pm">3:30pm - 4:00pm</option>
          </select>
          <h3>Date</h3>
          <input name='date' value={bookdata.date} onChange={changeHandle} type="date" required />
        </div>
        <button onClick={BookSession}>Book</button>
      </div></>:<div className="user-bookings">
        <h2>User Bookings</h2>
        {bookings}
        <div className='nobook'>
          <p>{noBookingsMessage}</p>
        </div>
      </div>}
      
      
      <button onClick={getUserBookings} className='prev-booking'>Previous Bookings</button>

    </div>
  );
}

export default Booking;
