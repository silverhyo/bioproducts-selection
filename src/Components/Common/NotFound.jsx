import React from 'react';
import image_NotFound from '../../Sources/Images/NotFound.jpg'

// import Style.css
import './NotFound.css';

export default function NotFound() {
  return (
    <div className='NotFound_Container'>
      <div className='NotFound_Container_Box'>
        <img className='NotFound_Container_Box_Image' src={image_NotFound} alt=''></img>
      </div>
    </div>
  )
}
