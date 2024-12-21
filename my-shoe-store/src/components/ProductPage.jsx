import React from 'react';
import Header from './Header';
import Product from './ProductComponent';
import Footer from './Footer';
import '../css/style.css';


function HomePage() {
  return (
    <div>
      <Header />
      <Product />
      <Footer />
    </div>
  );
}

export default HomePage;