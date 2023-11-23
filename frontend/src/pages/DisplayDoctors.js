import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const DisplayDoctors = () => {
    const navigate = useNavigate();

  const [doctors, setDoctors] = useState([
  ]);
  const [searchDoctor, setSearchDoctor] = useState('');
  const [searchSpecialty, setSearchSpecialty] = useState('');
  const [searchPhoneNumber, setSearchPhoneNumber] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/doctors/', {credentials: 'include'})
      .then(response => response.json())
      .then(data => setDoctors(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.doctor.toLowerCase().includes(searchDoctor.toLowerCase()) &&
    doctor.specialty.toLowerCase().includes(searchSpecialty.toLowerCase()) &&
    doctor.phone_number.toString().includes(searchPhoneNumber.toString())
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
                        <input style={{outlineColor: '#a000df'}} className='focus:outline-none rounded-lg border text-center' type='text' value={searchDoctor} onChange={e => setSearchDoctor(e.target.value)} placeholder='Search by doctor name' />
                    </div>
                    <div>
                        <input style={{outlineColor: '#a000df'}} className='focus:outline-none rounded-lg border text-center' type='text' value={searchSpecialty} onChange={e => setSearchSpecialty(e.target.value)} placeholder='Search by specialty' />
                    </div>
                    <div>
                        <input style={{outlineColor: '#a000df'}} className='focus:outline-none rounded-lg border text-center' type='text' value={searchPhoneNumber} onChange={e => setSearchPhoneNumber(e.target.value)} placeholder='Search by contact number' />
                    </div>
                </div><br />
                <div className='w-full'>
                    <div className='mr-40 ml-40 border-2 p-4 border-[#a000df] justify-between rounded-lg shadow-lg'>
                        <table className='w-full table-fixed'>
                            <thead>
                                <tr>
                                    <th className='width-200px'>Doctor</th>
                                    <th className='width-200px'>Specialty</th>
                                    <th className='width-200px'>Phone Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDoctors.map(doctor => (
                                    <tr key={doctor.id} className='text-center'>
                                    <td>{doctor.doctor}</td>
                                    <td>{doctor.specialty}</td>
                                    <td>{doctor.phone_number}</td>
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
}

export default DisplayDoctors;