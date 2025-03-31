import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// import Style
import "./AdminSelection0.css";

// import Component
import AdminSelection_Product_Regi_Edit from './AdminSelection_Product_Regi_Edit';
import AdminSelection_Event_Regi_Edit from './AdminSelection_Event_Regi_Edit';

export default function AdminSelection0() {

  const [productsStatus, setProductsStatus] = useState('');

  return (
    <>
      <div className='AdminSelection0_Container'>
        <div className='AdminSelection0_Container_Box'>

          <div className='AdminSelection0_Container_Box_TextBox0'>
            <p className='AdminSelection0_Container_Box_TextBox0_Text'>관리자 모드</p>
          </div>

          <div className='AdminSelection0_Container_Box_TextBox1'>
            <p className='AdminSelection0_Container_Box_TextBox1_Text'>관리하고자 하는 제품의 Type을 선택해 주세요.</p>
          </div>

          <div className='AdminSelection0_Container_Box_SelectBox'>
            <label className='AdminSelection0_Container_Box_SelectBox_Label' htmlFor='Selection'></label>
            <select className='AdminSelection0_Container_Box_SelectBox_Select' id='Selection' onChange={(e) => setProductsStatus(e.target.value)}>
              <option className='AdminSelection0_Container_Box_SelectBox_Select_Option' value=''>선택해 주세요</option>
              <option className='AdminSelection0_Container_Box_SelectBox_Select_Option' value='event'>Event</option>
              <option className='AdminSelection0_Container_Box_SelectBox_Select_Option' value='product'>Product</option>
            </select>
          </div>

        </div>
      </div>

      {productsStatus === 'event' && <AdminSelection_Event_Regi_Edit />}
      {productsStatus === 'product' && <AdminSelection_Product_Regi_Edit />}
    </>
  )
}
