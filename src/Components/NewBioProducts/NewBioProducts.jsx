import React from 'react';
import { useContext } from 'react';
// import Style css
import "./NewBioProducts.css";

//import Components
import Navigation from '../Common/Navigation';
import Footer from '../Common/Footer';
import ProductsNew from './Products/ProductsNew';

import { ImageAddressContext } from '../../Context/ImageAddressContext';

export default function NewBioProducts({DATABASEDATA}) {

  const imageAddress = useContext(ImageAddressContext).imageAddress;


  return (
    <>
      {/* <Navigation /> */}
      <div className='NewBioProducts_Container'>
        <div className='NewBioProducts_Container_Box'>
          <ProductsNew DATABASEDATA={DATABASEDATA} />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}
