import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('email:', email, 'Password:', password);
  };

  return (
    <div className='w-full'>
    <Navbar />
      <div className='text-black text-center flex flex-col text-5xl mt-20'>
        <h1 className='font-bold'>Login Page</h1>
        <form className='min-h-screen items-center text-2xl m-10'>
          <label className='w-1/10 mb-10 block'>
            Email: <br />
            <input style={{outlineColor: '#a000df'}} className='w-1/3 m-4 text-center focus:outline-none rounded-lg border' 
            type='email' 
            name='email' 
            id='email' 
            placeholder='Email' 
            value={email}
            onChange={handleEmailChange}
            maxLength={50}
            required />
          </label>
          <label className='mb-10'>
            Password: <br />  
            <input style={{outlineColor: '#a000df'}} className='w-1/3 m-4 text-center focus:outline-none rounded-lg border' 
            type='password' 
            name='password' 
            id='password' 
            placeholder='Password' 
            value={password}
            maxLength={25}
            onChange={handlePasswordChange}
            required />
          </label>
          <br />
          <button 
            onClick={() => navigate('/displayAppointments')}
            className='mt-20 bg-[#a000df] w-[200px] rounded-md font-bold p-2 text-black'
          >
            Login
          </button>
      </form>
      </div>
    </div>   
  );
};

export default Login;