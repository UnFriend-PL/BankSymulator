import { Link } from 'react-router-dom';
import React from 'react';
import './Navbar.scss';

function Navbar() {
  return (
    <nav className='navbar'>
      <Link to="/" className='navbar__title'>Bank Symulator</Link>
      <div className='navbar__links'>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;