import React from 'react';
import Header from './Header';
import NotFound from './NotFoundComponent';
import Footer from './Footer';
import '../css/style.css';

function NotfoundPage() {
  return (
    <div>
      <Header />
      <NotFound/>
      <Footer />
    </div>
  );
}

export default NotfoundPage;