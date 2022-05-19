import React from 'react';
import Filters from './Filters';

import NavBar from './NavBar';
import Products from './Products';
import Footer from './Footer';

const Home = () => {
  return (
    <div>
      <NavBar/>
      <Filters/>
      <Products/>
      <Footer/>
    </div>
  );
};

export default Home;