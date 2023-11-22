import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const UserWelcome = () => {
    const navigate = useNavigate();
    
  return (
    <div>
        <Navbar>
            <div className='flex flex-row space-x-7 items-center justify-center'>
                <button onClick={() => navigate('/profile')} className='bg-[#a000df] w-[200px] rounded-md font-bold p-2 text-black'>Profile</button>
                <button onClick={() => navigate('/')} className='bg-[#a000df] w-[200px] rounded-md font-bold p-2 text-black'>Log out</button>
            </div>
        </Navbar>
        <div className='flex justify-center mt-24'>
            <div className='mt-4 flex flex-col items-center justify-center w-3/4 border-2 p-4 border-[#a000df] shadow-xl rounded-lg'>
                <h1 className='justify-center text-center font-bold text-5xl p-20 '>
                    Press the buttons below to display all doctors or appointments.
                </h1>
                <div className='flex flex-row justify-center space-x-40'>
                    <button onClick={() => navigate('/display/doctors')} className='m-20 bg-[#a000df] w-[200px] rounded-md font-bold p-2 text-black'>Display Doctors</button>
                    <button onClick={() => navigate('/display/appointments')} className='m-20 bg-[#a000df] w-[200px] rounded-md font-bold p-2 text-black'>Display Appointments</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserWelcome