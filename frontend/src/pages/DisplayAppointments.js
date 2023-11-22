import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const DisplayAppointments = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([
    { id: 1, date: '2022-01-01', doctor: 'Dr. Smith', patient: 'John Doe' },
    { id: 2, date: '2022-01-02', doctor: 'Dr. Johnson', patient: 'Jane Doe' },
    { id: 3, date: '2022-01-03', doctor: 'Dr. Williams', patient: 'Jim Doe' },
    { id: 4, date: '2022-01-03', doctor: 'Dr. Williams', patient: 'Jim Done' },
    { id: 5, date: '2022-01-03', doctor: 'Dr. Williams', patient: 'Jim David' },
  ]);
  const [searchDate, setSearchDate] = useState('');
  const [searchDoctor, setSearchDoctor] = useState('');
  const [searchPatient, setSearchPatient] = useState('');

  useEffect(() => {
    fetch('')
      .then(response => response.json())
      .then(data => setAppointments(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filteredAppointments = appointments.filter(appointment =>
    appointment.date.toLowerCase().includes(searchDate.toLowerCase()) &&
    appointment.doctor.toLowerCase().includes(searchDoctor.toLowerCase()) &&
    appointment.patient.toLowerCase().includes(searchPatient.toLowerCase())
  );

  return (
    <div>
      <Navbar>
        <div className='flex flex-row space-x-7 items-center justify-center'>
          <button onClick={() => navigate('/profile')} className='bg-[#a000df] w-[200px] rounded-md font-bold p-2 text-black'>Profile</button>
          <button onClick={() => navigate('/')} className='bg-[#a000df] w-[200px] rounded-md font-bold p-2 text-black'>Log out</button>
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
            <div>
              <input
                style={{outlineColor: '#a000df'}} className='focus:outline-none rounded-lg border text-center'
                type="text"
                placeholder="Search by Patient"
                value={searchPatient}
                onChange={e => setSearchPatient(e.target.value)}
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
                    <th>Patient</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map(appointment => (
                    <tr key={appointment.id} className='text-center'>
                      <td>{appointment.date}</td>
                      <td>{appointment.doctor}</td>
                      <td>{appointment.patient}</td>
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
