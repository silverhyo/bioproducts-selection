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


        <div className='AdminNavbar_Container_Box_Title'>Administrator Mode</div>


        <div className='AdminNavbar_Container_Box_Contents'>


          <div className='AdminNavbar_Container_Box_Contents_HomeBox'>
            <Link to='/home' style={{ textDecoration: "none", color:"white"}}><div className='AdminNavbar_Container_Box_Contents_HomeBox_Home'><IoHomeOutline /></div></Link>
            <hr className='AdminNavbar_Container_Box_Contents_HomeBox_Hr'></hr>
          </div>


          <div className='AdminNavbar_Container_Box_Contents_EventBox'>
            <div className='AdminNavbar_Container_Box_Contents_EventBox_Text'>Event</div>
            <hr className='AdminNavbar_Container_Box_Contents_EventBox_Hr'></hr>
            <Link to='/admin/events/create' style={{textDecoration: "none", color:"white"}}><div className='AdminNavbar_Container_Box_Contents_EventBox_Event_Register'>등록하기</div></Link>
            <Link to='/admin/events/list' style={{textDecoration: "none", color:"white"}}><div className='AdminNavbar_Container_Box_Contents_EventBox_Event_Edit'>수정/삭제하기</div></Link>
          </div>


          <div className='AdminNavbar_Container_Box_Contents_ProductBox'>
            <div className='AdminNavbar_Container_Box_Contents_ProductBox_Text'>Products</div>
            <hr className='AdminNavbar_Container_Box_Contents_ProductBox_Hr'></hr>
            <Link to='/admin/products/create' style={{textDecoration: "none", color:"white"}}><div className='AdminNavbar_Container_Box_Contents_ProductBox_Product_Register'>등록하기</div></Link>
            <Link to='/admin/products/list' style={{textDecoration: "none", color:"white"}}><div className='AdminNavbar_Container_Box_Contents_ProductBox_Product_Edit'>수정/삭제하기</div></Link>
          </div>

        </div>
      </div>
    </div>
  )
}
