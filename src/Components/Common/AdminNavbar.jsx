import React from 'react';
import { Link } from 'react-router-dom';
// import Style css
import "./AdminNavbar.css";

// ICONS
import { IoHomeOutline } from "react-icons/io5";

export default function AdminNavbar() {
  return (
    <div className='AdminNavbar_Container'>
      <div className='AdminNavbar_Container_Box'>
        <p className='AdminNavbar_Container_Box_Title'>Administrator Mode</p>
        <div className='AdminNavbar_Container_Box_Div'>
          <Link to='/home' style={{ textDecoration: "none"}}><p className='AdminNavbar_Container_Box_Div_P'><IoHomeOutline /></p></Link>
          <Link to='/admin/list' style={{ textDecoration: "none"}}><p className='AdminNavbar_Container_Box_Div_P'>List</p></Link>
          <Link to='/admin/create' style={{ textDecoration: "none"}}><p className='AdminNavbar_Container_Box_Div_P'>Register</p></Link>
        </div>
      </div>
    </div>
  )
}
