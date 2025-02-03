import React from 'react';
import { useContext } from 'react';
// import Style css
import "./Bioproducts.css";
// import Components
import Navigation from '../Common/Navigation';
import Footer from '../Common/Footer';
import Filtering_V1 from './Filtering_V1/Filtering_V1';

import { ImageAddressContext } from '../../Context/ImageAddressContext';

export default function Bioproducts({DATABASEDATA, JSONDATA01}) {

  // =============================================Props : Start
  const imageAddress = useContext(ImageAddressContext).imageAddress;
  const dtBaseData = DATABASEDATA;
  const jsonData01 = JSONDATA01;
  // =============================================Props : Rnd

  return (
    <>
      <Navigation />
      <div className='Bioproducts_Container'>
        <div className='Bioproducts_Container_Box'>
          <Filtering_V1 DATABASEDATA={dtBaseData} JSONDATA01={jsonData01} />
        </div>
      </div>
      <Footer />
    </>
  )
}
