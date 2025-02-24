import React from 'react';
import { useContext } from 'react';
// import Style css
import "./NewBioProducts.css";

//import Components
import Navigation from '../Common/Navigation';
import Footer from '../Common/Footer';
import ProductsNew from './Products/ProductsNew';

import { ImageAddressContext } from '../../Context/ImageAddressContext';

export default function NewBioProducts() {

  const imageURL = useContext(ImageAddressContext).imageURL;


  return (
    <>
      {/* <Navigation /> */}
      <div className='NewBioProducts_Container'>
        <div className='NewBioProducts_Container_Box'>
          <ProductsNew />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}
