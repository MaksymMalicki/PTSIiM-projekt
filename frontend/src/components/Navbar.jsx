import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

const Navbar = ({children}) => {
  const navigate = useNavigate();

  return (
    <div className='text-white flex justify-between items-center px-10 py-5'>
        <HomeIcon onClick={() => navigate('/')} style={{ color: '#a000df' }} fontSize='large'/>
        {children}
    </div>
  );
};

export default Navbar;