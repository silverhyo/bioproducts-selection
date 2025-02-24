import React from 'react';
// import Style css
import "./Bioproducts.css";
// import Components
import Navigation from '../Common/Navigation';
import Footer from '../Common/Footer';
import Filtering_V1 from './Filtering_V1/Filtering_V1';
// Context

export default function Bioproducts() {

  return (
    <>
      <Navigation />
      <div className='Bioproducts_Container'>
        <div className='Bioproducts_Container_Box'>
          <Filtering_V1 />
        </div>
      </div>
      <Footer />
    </>
  )
}
