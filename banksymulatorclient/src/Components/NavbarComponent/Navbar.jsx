import { Link } from 'react-router-dom';
import React from 'react';
import './Navbar.scss';

function Navbar() {
  return (
    <nav className='navbar'>
      <h1>Bank Symulator</h1>
      <div className='navbar__links'>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;