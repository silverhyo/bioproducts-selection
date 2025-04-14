import React from 'react';
import { Link } from 'react-router-dom';
// import Style css
import "./Landing.css";

// import IMAGE
import Image01 from '../../../Sources/image_logo/background_01.png'
import Image02 from '../../../Sources/image_logo/sartorius-logo-white.png';
import LandingImage from '../../../Sources/Images/LandingImage.svg';

export default function Landing() {


  return (
    <Link to='/bioproducts'>
    <div className='Landing_Container'>
      <div className='Landing_Container_Box'>
        <div className='Landing_Container_Box_ImageBox'>
          <img className='Landing_Container_Box_ImageBox_Image' src={LandingImage} alt=''></img>
        </div>

        <div className='Landing_Container_Box_LogoImageBox'>
          <img className='Landing_Container_Box_LogoImageBox_Image' src='{Image02}' alt=''></img>
        </div>

      </div>
    </div>
    </Link>
  )
}