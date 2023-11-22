import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const DisplayDoctors = () => {
  const [doctors, setDoctors] = useState([
    { id: 1, doctor: 'Dr. Smith', specialty: 'Dentist', contact: '997'  },
    { id: 2, doctor: 'Dr. Johnson', specialty: 'Dentist', contact: '112' },
    { id: 3, doctor: 'Dr. Williams', specialty: 'Dentist', contact: '997' },
    { id: 4, doctor: 'Dr. Williams', specialty: 'Dentist', contact: '997' },
    { id: 5, doctor: 'Dr. Williams', specialty: 'Oncologist', contact: '997' },
  ]);
  const [searchDoctor, setSearchDoctor] = useState('');
  const [searchSpecialty, setSearchSpecialty] = useState('');
  const [searchContact, setSearchContact] = useState('');

  useEffect(() => {
    fetch('')
        .then(response => response.json())
        .then(data => setDoctors(data))
        .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.doctor.toLowerCase().includes(searchDoctor.toLowerCase()) &&
    doctor.specialty.toLowerCase().includes(searchSpecialty.toLowerCase()) &&
    doctor.contact.toString().includes(searchContact)
  );

  return (
    <div>
        <Navbar />
        <div className='flex justify-center'>
            <div className='w-3/4 border-2 p-4 border-[#a000df] shadow-xl rounded-lg'>
                <div className='mr-60 ml-60 flex justify-between'>
                    <div>
                        <input style={{outlineColor: '#a000df'}} className='focus:outline-none rounded-lg border text-center' type='text' value={searchDoctor} onChange={e => setSearchDoctor(e.target.value)} placeholder='Search by doctor name' />
                    </div>
                    <div>
                        <input style={{outlineColor: '#a000df'}} className='focus:outline-none rounded-lg border text-center' type='text' value={searchSpecialty} onChange={e => setSearchSpecialty(e.target.value)} placeholder='Search by specialty' />
                    </div>
                    <div>
                        <input style={{outlineColor: '#a000df'}} className='focus:outline-none rounded-lg border text-center' type='text' value={searchContact} onChange={e => setSearchContact(e.target.value)} placeholder='Search by contact number' />
                    </div>
                </div><br />
                <div className='w-full'>
                    <div className='mr-40 ml-40 border-2 p-4 border-[#a000df] justify-between rounded-lg shadow-lg'>
                        <table className='w-full table-fixed'>
                            <thead>
                                <tr>
                                    <th className='width-200px'>Doctor</th>
                                    <th className='width-200px'>Specialty</th>
                                    <th className='width-200px'>Contact Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDoctors.map(doctor => (
                                    <tr key={doctor.id} className='text-center'>
                                    <td>{doctor.doctor}</td>
                                    <td>{doctor.specialty}</td>
                                    <td>{doctor.contact}</td>
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