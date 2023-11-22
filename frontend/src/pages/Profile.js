import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        email: 'ten',
        password: 'numer',
        firstName: 'numer',
        lastName: 'to',
        personalId: 'klopoty',
        phoneNumber: '997',
      });

    useEffect(() => {
        fetch('')
        .then(response => response.json())
        .then(data => setProfile(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleChange = (event) => {
        setProfile({
          ...profile,
          [event.target.name]: event.target.value,
        });
      };

  return (
    <div className='text-black text-center text-2xl'>
        <Navbar className='flex flex-row space-x-7 items-center justify-center'>
            <button onClick={() => navigate('/')} className='bg-[#a000df] w-[200px] rounded-md font-bold p-2 text-black'>Log out</button>
        </Navbar>
        <div className='flex flex-col justify-center mt-24 text-5xl'>
            <h1 className='font-bold'>Personal Data Page</h1>
            <form className=' min-h-screen items-center text-2xl m-10'>
            <div className='flex justify-center items-center'>
                <label className='mb-10 w-1/4'>
                    Email: <br />
                    <input style={{outlineColor: '#a000df'}} className='w-4/5 text-black m-4 text-center focus:ring-primary-600 rounded-lg border' 
                    type='email' 
                    name='email' 
                    id='email' 
                    placeholder='Email' 
                    value={profile.email}
                    minLength='5'
                    maxLength='25'
                    onChange={handleChange}
                    required />
                    </label>
                    <label className='mb-10 w-1/4'>
                    Password: <br />
                    <input style={{outlineColor: '#a000df'}} className='w-4/5 text-black m-4 text-center focus:ring-primary-600 rounded-lg border' 
                    type='password' 
                    name='password'
                    id='password' 
                    placeholder='Password' 
                    value={profile.password}
                    maxLength='25'
                    onChange={handleChange}
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
                value={profile.firstName}
                maxLength='25'
                onChange={handleChange}
                required />
                </label>

                <label className='mb-10 w-1/4'>
                Last Name: <br />
                <input style={{outlineColor: '#a000df'}} className='w-4/5 text-black m-4 text-center focus:ring-primary-600 rounded-lg border' 
                type='text' 
                name='lastName' 
                id='lastName' 
                placeholder='Last Name' 
                value={profile.lastName}
                maxLength='25'
                onChange={handleChange}
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
                value={profile.personalId}
                maxLength='11'
                onChange={handleChange}
                required />
                </label>
                <label className='mb-10 w-1/4'>
                Phone Number: <br />
                <input style={{outlineColor: '#a000df'}} className='w-4/5 text-black m-4 text-center focus:ring-primary-600 rounded-lg border' 
                type='tel' 
                name='phoneNumber' 
                id='phoneNumber' 
                placeholder={profile.phoneNumber} 
                value={profile.phoneNumber}
                maxLength={9}
                onChange={handleChange}
                required />
                </label>
                
            </div>
            <button 
                onClick={(e) => {navigate('/profile');}}
                className='bg-[#a000df] w-[200px] rounded-md font-bold p-2 text-black'
            >
                Save
            </button>
            </form>
        </div>
    </div>
  )
}

export default Profile