import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const DisplayAppointments = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [searchDoctor, setSearchDoctor] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/appointments/search/', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setAppointments(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filteredAppointments = appointments.filter(appointment =>
    appointment.date.toLowerCase().includes(searchDate.toLowerCase()) &&
    appointment.doctor.toLowerCase().includes(searchDoctor.toLowerCase())
  );

  const registerForAppointment = (id) => {
    fetch(`http://localhost:8000/api/patient/appointments/${id}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setAppointments(data);
        navigate('/user');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const logout = () => {
    fetch('http://localhost:8000/api/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div>
      <Navbar>
        <div className='flex flex-row space-x-7 items-center justify-center'>
          <button onClick={() => navigate('/profile')} className='bg-[#a000df] w-[200px] rounded-md font-bold p-2 text-black'>Profile</button>
          <button onClick={() => logout()} className='bg-[#a000df] w-[200px] rounded-md font-bold p-2 text-black'>Log out</button>
        </div>
      </Navbar>
      <div className='mt-24 flex justify-center'>
        <div className='w-3/4 border-2 p-4 border-[#a000df] shadow-xl rounded-lg'>
          <div className='mr-60 ml-60 flex justify-between'>
            <div>
              <input
                style={{outlineColor: '#a000df'}} className='focus:outline-none rounded-lg border text-center'
                type="text"
                placeholder="Search by Date"
                value={searchDate}
                onChange={e => setSearchDate(e.target.value)}
              />
            </div>
            <div>
              <input
                style={{outlineColor: '#a000df'}} className='focus:outline-none rounded-lg border text-center'
                type="text"
                placeholder="Search by Doctor"
                value={searchDoctor}
                onChange={e => setSearchDoctor(e.target.value)}
              />
            </div>
          </div><br />
          <div className='w-full'>
            <div className='mr-40 ml-40 border-2 p-4 border-[#a000df] justify-between rounded-lg shadow-lg'>
              <table className='w-full table-fixed'>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Doctor</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map(appointment => (
                    <tr key={appointment.id} className='text-center'>
                      <td>{appointment.date}</td>
                      <td>{appointment.doctor}</td>
                      <td><button
                            className='bg-[#a000df] w-[200px] rounded-md font-bold p-2 text-black'
                            onClick={()=>registerForAppointment(appointment.id)}
                          >Register</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayAppointments;
