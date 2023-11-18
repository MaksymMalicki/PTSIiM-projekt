import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function DisplayAppointments() {
  const [appointments, setAppointments] = useState([
    { id: 1, date: '2022-01-01', doctor: 'Dr. Smith', patient: 'John Doe' },
    { id: 2, date: '2022-01-02', doctor: 'Dr. Johnson', patient: 'Jane Doe' },
    { id: 3, date: '2022-01-03', doctor: 'Dr. Williams', patient: 'Jim Doe' },
  ]);

  useEffect(() => {
    fetch('https://localhost:8000/api/appointments/search/') 
      .then((response) => response.json())
      .then((data) => setAppointments(data));
  }, []);

  const [searchDate, setSearchDate] = useState('');
  const [searchDoctor, setSearchDoctor] = useState('');
  const [searchPatient, setSearchPatient] = useState('');

  const handleSearch = () => {
    setAppointments(appointments.filter(appointment => 
      appointment.date.includes(searchDate) && 
      appointment.doctor.includes(searchDoctor) && 
      appointment.patient.includes(searchPatient)
    ));
  };

  return (
    <div>
        <Navbar /> 
        <div className='w-full flex justify-center items-center'> 
            <div className='w-3/4 text-center' style={{ border: '2px solid black', borderCollapse: 'collapse' }}>
                <div className='ml-40 mr-40 flex justify-between'>   
                    <input className='m-4' type='text' placeholder='Search by date' onChange={e => setSearchDate(e.target.value)} />
                    <input className='m-4' type='text' placeholder='Search by doctor' onChange={e => setSearchDoctor(e.target.value)} />
                    <input className='m-4' type='text' placeholder='Search by patient' onChange={e => setSearchPatient(e.target.value)} />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div>
                    <tablev>
                        <thead>
                        <tr>
                            <th className='pr-20'>Date</th>
                            <th className='pr-20'>Doctor</th>
                            <th className='pr-20'>Patient</th>
                        </tr>
                        </thead>
                        <tbody>
                        {appointments.map((appointment) => (
                            <tr className='pr-20' key={appointment.id}>
                            <td className='pr-20' >{appointment.date}</td>
                            <td className='pr-20'>{appointment.doctor}</td>
                            <td className='pr-20'>{appointment.patient}</td>
                            </tr>
                        ))}
                        </tbody>
                    </tablev>
                </div>
            </div>
        </div> 
    </div>
  );
}

export default DisplayAppointments;