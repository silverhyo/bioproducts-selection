import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// import Style css
import "./AdminNavbar.css";

// ICONS
import { IoHomeOutline } from "react-icons/io5";

// import Components
import AdminSelection from '../Admin/AdminSelection';
import AdminList from '../Admin/AdminList/AdminList';

export default function AdminNavbar() {

  const [status, setStatus] = useState(true);

  function changeStatusTrue() {
    setStatus(true);
    console.log("status :", status);
  }
  function changeStatusFalse() {
    setStatus(false);
    console.log("status :", status);
  }

  return (
    <>
      <div className='AdminNavbar_Container'>
        <div className='AdminNavbar_Container_Box'>


          <div className='AdminNavbar_Container_Box_Title'>관리자 모드</div>


          <div className='AdminNavbar_Container_Box_Contents'>


            <div className='AdminNavbar_Container_Box_Contents_EventBox'>
              <div className='AdminNavbar_Container_Box_Contents_EventBox_Text'>Event</div>
              {/* <hr className='AdminNavbar_Container_Box_Contents_EventBox_Hr'></hr> */}
              <div className='AdminNavbar_Container_Box_Contents_EventBox_Menu'>
                <div className='AdminNavbar_Container_Box_Contents_EventBox_Event_Register'>등록하기</div>
                <div className='AdminNavbar_Container_Box_Contents_EventBox_Event_Edit'>수정/삭제하기</div>                
              </div>
            </div>


            <div className='AdminNavbar_Container_Box_Contents_ProductBox'>
              <div className='AdminNavbar_Container_Box_Contents_ProductBox_Text'>Products</div>
              {/* <hr className='AdminNavbar_Container_Box_Contents_ProductBox_Hr'></hr> */}
              <div className='AdminNavbar_Container_Box_Contents_ProductBox_Menu'>
                <div className='AdminNavbar_Container_Box_Contents_ProductBox_Menu_Register' onClick={changeStatusTrue}>등록하기</div>
                <div className='AdminNavbar_Container_Box_Contents_ProductBox_Menu_Edit' onClick={changeStatusFalse}>수정/삭제하기</div>
              </div>
              
            </div>

          </div>
        </div>
      </div>

      <div>
        {status ? <AdminSelection /> : <AdminList />}
      </div>
      {/* <AdminSelection /> */}
    </>
  )
}
