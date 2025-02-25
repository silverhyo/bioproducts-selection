import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
// import Style css
import "./NewBioProducts.css";
// import ICONS
import { MdOutlineArrowBackIosNew } from "react-icons/md";

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

      <div className='ProductDetail_Container_Bottom'>
        <Link to='/bioproducts' className='ProductDetail_Container_Bottom_Button' style={{textDecoration: "none"}}><MdOutlineArrowBackIosNew /></Link>
      </div>
      {/* <Footer /> */}
    </>
  )
}
