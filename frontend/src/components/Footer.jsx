import React from 'react';

import { BsLinkedin } from 'react-icons/bs';
import { BsGithub } from 'react-icons/bs';

import './styles/Footer.css';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <a href='https://brian-sanchez.github.io/react-portfolio' target='_blank' rel="noreferrer" className='footer__logo'>BRIAN SANCHEZ</a>

      <div className='footer__socials'>
        <a href='https://www.linkedin.com/in/brian-sanchez-2003' target='_blank' rel="noreferrer"><BsLinkedin/></a>
        <a href='https://github.com/Brian-sanchez' target='_blank' rel="noreferrer"><BsGithub/></a>
      </div>

      <div className='footer__copyright'>
        <small>© 2022 Brian Sanchez, All rights reserved</small>
      </div>
    </div>
  );
};

export default Footer;