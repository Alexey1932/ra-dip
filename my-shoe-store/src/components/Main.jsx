import React from 'react';
import TopSalesComponent from './TopSalesComponent'; 
import CatalogComponent from './CatalogComponent';
import '../css/main.css'; 

function Main() {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <section className="top-sales">
            <TopSalesComponent />
            </section>
          <h2 className="text-center">Каталог</h2>
          <section className="catalog">
            <CatalogComponent />
            </section>
        </div>
      </div>
    </main>
  );
}

export default Main;
