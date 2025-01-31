import React from 'react';
import { Link } from 'react-router-dom';
// import Style css
import "./Footer.css";
// ICONS
import { TfiEmail } from "react-icons/tfi"

export default function Footer() {
  return (
    <div className='FooterSection_Container'>
      <div className='FooterSection_Container_Box'>

        <a href="mailto:silverhyo1@naver.com" className='FooterSection_Container_Box_Email'>
          <TfiEmail />
        </a>

        <div className='FooterSection_Container_Box_Text'>
          <Link to='/admin/home' style={{textDecoration:"none", color:"white", cursor:"pointer"}}><p>Copyright 2024. silverhyo All rights reserved.</p></Link>
        </div>
      </div>
    </div>
  )
}
