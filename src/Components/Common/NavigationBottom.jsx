import React from 'react';
import { Link } from 'react-router-dom';

// import Icons
import { HiOutlineHome } from "react-icons/hi2";

import './NavigationBottom.css';

export default function NavigationBottom() {
  return (
    <div className='NavigationBottom_Container'>
      <div className='NavigationBottom_Container_Box'>
        <div className='NavigationBottom_Container_Box_IconContainer'>

          <Link to='/home' style={{textDecoration:"none", color:"black"}}>
          <div className='NavigationBottom_Container_Box_IconBox'>
            <div className='NavigationBottom_Container_Box_IconBox_Icon'><HiOutlineHome /></div>
            <div className='NavigationBottom_Container_Box_IconBox_Text'>Home</div>
          </div>
          </Link>


          <Link to='/event' style={{textDecoration:"none", color:"black"}}>
          <div className='NavigationBottom_Container_Box_IconBox'>
            <div className='NavigationBottom_Container_Box_IconBox_Icon'><HiOutlineHome /></div>
            <div className='NavigationBottom_Container_Box_IconBox_Text'>Event</div>
          </div>
          </Link>


          <Link to='/bioproducts' style={{textDecoration:"none", color:"black"}}>
          <div className='NavigationBottom_Container_Box_IconBox'>
            <div className='NavigationBottom_Container_Box_IconBox_Icon'><HiOutlineHome /></div>
            <div className='NavigationBottom_Container_Box_IconBox_Text'>New</div>
          </div>
          </Link>


        </div>
      </div>
    </div>
  )
}
