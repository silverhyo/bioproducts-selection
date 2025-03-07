import React from 'react';
// import Style css
import "./Bioproducts.css";
// import Components
import Navigation from '../Common/Navigation';
import Footer from '../Common/Footer';
import Filtering_V1 from './Filtering_V1/Filtering_V1';
import NavigationBottom from '../Common/NavigationBottom';
import EventBanner from '../Event/EventBanner';
// Context

export default function Bioproducts() {

  return (
    <>
      <Navigation />
      <EventBanner />
      <div className='Bioproducts_Container'>
        <div className='Bioproducts_Container_Box'>
          <div className='Bioproducts_Container_Component01'>
            <Filtering_V1 />
          </div>
        </div>
        <div className='Bioproducts_Container_Box_01'>
          <NavigationBottom />
        </div>
      </div>
      <Footer />
    </>
  )
}
