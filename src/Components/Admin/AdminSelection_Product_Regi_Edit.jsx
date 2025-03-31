import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// import Style
import "./AdminSelection_Product_Regi_Edit.scss";

// import Component
import AdminSelection_Product from './AdminSelection_Product';
import AdminList from './AdminList/AdminList';

export default function AdminSelection_Product_Regi_Edit() {

  const [status, setStatus] = useState(true);

  function changeStatusTrue() {
    setStatus(true);
  };
  function changeStatusFalse() {
    setStatus(false);
  };
  
  return (
    <>

      <div className='AdminNavbar_Container'>
        <div className='AdminNavbar_Container_Box'>

          <div className='AdminNavbar_Container_Box_Contents'>
            <div className='AdminNavbar_Container_Box_Contents_ProductBox'>
              <div className='AdminNavbar_Container_Box_Contents_ProductBox_Text'>Products</div>
              <div className='AdminNavbar_Container_Box_Contents_ProductBox_Menu'>
                <div className='AdminNavbar_Container_Box_Contents_ProductBox_Menu_Register' onClick={changeStatusTrue}>등록하기</div>
                <div className='AdminNavbar_Container_Box_Contents_ProductBox_Menu_Edit' onClick={changeStatusFalse}>수정 / 삭제하기</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <>
        {status ? <AdminSelection_Product /> : <AdminList />}
      </>

    </>
  )
}
