import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    const [profile, setProfile] = useState({});

      const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/patient/profile/', {credentials: 'include'})
          .then(response => response.json())
          .then(data => setProfile(data))
          .catch(error => console.error('Error fetching data:', error));
        fetch('http://localhost:8000/api/patient/appointments/', {credentials: 'include'})
            .then(response => response.json())
            .then(data => setAppointments(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleChange = (event) => {
        setProfile({
          ...profile,
          [event.target.name]: event.target.value,
        });
      };

    const cancelAppointment = (id) => {
        fetch(`http://localhost:8000/api/patient/appointments/${id}/cancel/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ id: id }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setAppointments(appointments.filter(appointment => appointment.id !== id));
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const handleSave = (e) => {
      e.preventDefault();
      fetch('http://localhost:8000/api/patient/profile/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
            profile
         })},
    )
    .then(response => response.json())
    .then(data => setProfile(data))
    .catch(error => console.error('Error fetching data:', error));
    }

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
                value={profile.first_name}
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
                value={profile.last_name}
                maxLength='25'
                onChange={handleChange}
                required />
                </label>
            </div>
            <div className='flex justify-center'>
                <label className='mb-10 w-1/4'>
                Phone Number: <br />
                <input style={{outlineColor: '#a000df'}} className='w-4/5 text-black m-4 text-center focus:ring-primary-600 rounded-lg border' 
                type='text' 
                name='phoneNumber' 
                id='phoneNumber' 
                placeholder='Phone number' 
                value={profile.phone_number}
                maxLength='11'
                onChange={handleChange}
                required />
                </label>
                
            </div>
            <button 
                onClick={(e) => handleSave(e)}
                className='bg-[#a000df] w-[200px] rounded-md font-bold p-2 text-black'
            >
                Save
            </button>
            </form>
        </div>
        <div className='w-full'>
            <div className='mr-40 ml-40 border-2 p-4 border-[#a000df] justify-between rounded-lg shadow-lg'>
              <table className='w-full table-fixed'>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Doctor</th>
                    <th>Patient</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(appointment => (
                    <tr key={appointment.id} className='text-center'>
                      <td>{appointment.date}</td>
                      <td>{appointment.doctor}</td>
                      <td>{appointment.patient}</td>
                      <td><button
                            className='bg-[#a000df] w-[200px] rounded-md font-bold p-2 text-black'
                            onClick={()=>cancelAppointment(appointment.id)}
                          >Cancel</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
    </div>
  )
}

export default Profile