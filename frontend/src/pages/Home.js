import React, { Component } from 'react'
import Typed from 'react-typed';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
    const navigate = useNavigate();

  return (
    <div>
        <Navbar />
        <div className='text-black text-center flex flex-col min-h-screen items-center text-2xl mt-20'>
        
        <h1 className='justify-center font-bold text-5xl p-20 '>Schedule your appointment today!</h1>
        <p>
            Use our app to schedule an appointment with one of the doctors.
        </p>
        <p>
            Before you could schedule an appointment, you need to login first.
        </p>
        <button 
          onClick={() => navigate('/login')} 
          className='bg-[#a000df] w-[200px] rounded-md font-bold my-6 mx-auto p-3 text-black'
        >
          Login
        </button>
        <p className='p-4'>
            Don't have an account?
        </p>
          <button 
            onClick={() => navigate('/register')} 
            className='bg-[#a000df] w-[200px] rounded-md font-bold my-6 mx-auto py-3 text-black'
          >
            Register
          </button>
        </div>
    </div>
  )
}

export default Home