import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const handleRegister = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/api/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: email, email: email, password: password, patient: {first_name: firstName, last_name: lastName, phone_number: phoneNumber}}),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            navigate('/user');
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }
  return (
    <div>
      <Navbar />
      <div className='text-black text-center flex flex-col text-5xl'>
        <h1 className='font-bold text'>Register Page</h1>
        <form className=' min-h-screen items-center text-2xl m-10'>
          <div className='flex justify-center items-center'>
            <label className='mb-10 w-1/4'>
            Email: <br />
            <input style={{outlineColor: '#a000df'}} className='w-4/5 text-black m-4 text-center focus:ring-primary-600 rounded-lg border' 
              type='email' 
              name='email' 
              id='email' 
              placeholder='Email' 
              value={email}
              minLength='5'
              maxLength='25'
              onChange={(e) => setEmail(e.target.value)}
              required />
            </label>
            <label className='mb-10 w-1/4'>
            Password: <br />
            <input style={{outlineColor: '#a000df'}} className='w-4/5 text-black m-4 text-center focus:ring-primary-600 rounded-lg border' 
              type='password' 
              name='password'
              id='password' 
              placeholder='Password' 
              value={password}
              maxLength='25'
              onChange={(e) => setPassword(e.target.value)}
              required />
            </label>
          </div>
          <div className='flex justify-center'>
            <label className='mb-10 w-1/4'>
              First Name: <br />
              <input style={{outlineColor: '#a000df'}} className='w-4/5 text-black m-4 text-center focus:ring-primary-600 rounded-lg border' 
              type='text' 
              name='firstName' 
              id='firstName' 
              placeholder='First Name' 
              value={firstName}
              maxLength='25'
              onChange={(e) => setFirstName(e.target.value)}
              required />
            </label>
            <label className='mb-10 w-1/4'>
              Last Name: <br />
              <input style={{outlineColor: '#a000df'}} className='w-4/5 text-black m-4 text-center focus:ring-primary-600 rounded-lg border' 
              type='text' 
              name='lastName' 
              id='lastName' 
              placeholder='Last Name' 
              value={lastName}
              maxLength='25'
              onChange={(e) => setLastName(e.target.value)}
              required />
            </label>
          </div>
          <div className='flex justify-center'>
            <label className='mb-10 w-1/4'>
              Phone Number: <br />
              <input style={{outlineColor: '#a000df'}} className='w-4/5 text-black m-4 text-center focus:ring-primary-600 rounded-lg border' 
              type='tel' 
              name='phoneNumber' 
              id='phoneNumber' 
              placeholder='Phone Number' 
              value={phoneNumber}
              maxLength={9}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required />
            </label>
          </div>
          <button 
            onClick={(e) => {handleRegister(e)}}
            className='bg-[#a000df] w-[200px] rounded-md font-bold p-2 text-black'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;