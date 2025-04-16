import React from 'react';
import { Link } from 'react-router-dom';
// import Style css
import "./Footer.css";
// ICONS
import { TfiEmail } from "react-icons/tfi";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";

export default function Footer() {
  return (
    <div className='FooterSection_Container'>
      <div className='FooterSection_Container_Box'>

        <div className='FooterSection_Container_Box_Email'>
          <a href="mailto:silverhyo1@naver.com" className='FooterSection_Container_Box_Email_Text'>
            <FaInstagram />
          </a>

          <a href="mailto:silverhyo1@naver.com" className='FooterSection_Container_Box_Email_Text'>
            <TfiEmail />
          </a>

          <a href="mailto:silverhyo1@naver.com" className='FooterSection_Container_Box_Email_Text'>
            <FiFacebook />
          </a>
        </div>

        <div className='FooterSection_Container_Box_Text'>
          <Link to='/admin/home' style={{textDecoration:"none", color:"white", cursor:"pointer"}}><p>Copyright 2025. Sartorius All rights reserved.</p></Link>
        </div>

      </div>
    </div>
  )
}
