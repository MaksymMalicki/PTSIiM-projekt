import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [personalId, setPersonalId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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
              Personal Identity Number: <br />
              <input style={{outlineColor: '#a000df'}} className='w-4/5 text-black m-4 text-center focus:ring-primary-600 rounded-lg border' 
              type='text' 
              name='personalId' 
              id='personalId' 
              placeholder='Personal Identity Number' 
              value={personalId}
              maxLength='11'
              onChange={(e) => setPersonalId(e.target.value)}
              required />
            </label>
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
            onClick={(e) => {navigate('/user');}}
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