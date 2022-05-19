import React from 'react';
import { Link } from 'react-router-dom';
import { BsList } from 'react-icons/bs';

import "./styles/NavBar.css";

const NavBar = () => {
  const menu = () => {
    const links = document.getElementsByClassName("links")[0];
    links.classList.toggle("active")
  };

  return (
    <div className="navbar">
      <div className="responsive">
        <Link to="/home">
          <h1 className="logo">AENIMA TECH STORE</h1>
        </Link>
        <BsList className="toggle" onClick={menu}/>
      </div>

      <ul className='links'>
        <Link to="/home"><li>Home</li></Link>
        <Link to="/addproduct"><li>Add Product</li></Link>
      </ul>
    </div>
  );
};

export default NavBar;