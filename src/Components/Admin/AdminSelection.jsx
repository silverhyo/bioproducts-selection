import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';

// import Style
import './AdminSelection.css';  

// import Context
import { JsonDataContext } from '../../Context/JsonDataContext';
import { AuthContext } from '../../Context/AuthContext';


// Import components
import NotFound from '../Common/NotFound';


export default function AdminSelection() {

  const jsonData = useContext(JsonDataContext).jsonData01;
  const products = jsonData.ProductType;
  const userInformation = useContext(AuthContext).userDatabaseInfo;
  const [productsType, setProductsType] = useState('')

  console.log("jsonData :", jsonData)
  return (
    <>
      {userInformation.databaseLevel == 'Admin' ?
      
      
      <>

      <div className='AdminSelection_Container'>
        <div className='AdminSelection_Container_Box'>

          <div className='AdminSelection_Container_Box_TextBox'>
            <p className='AdminSelection_Container_Box_TextBox_Text'>등록 하고자 하는 제품의 Type을 선택해 주세요.</p>
          </div>

          <div className='AdminSelection_Container_Box_SelectBox'>
            <label className='AdminSelection_Container_Box_SelectBox_Label' htmlFor='Selection'></label>
            <select className='AdminSelection_Container_Box_SelectBox_Select' id='Selection' onChange={(e) => setProductsType(e.target.value)}>
              <option className='AdminSelection_Container_Box_SelectBox_Select_Option' value=''>선택해 주세요</option>
              {products.map((item, index) => {
                return (
                  <option className='AdminSelection_Container_Box_SelectBox_Select_Option' key={item.ID} value={item.Value}>{item.Title}</option>
                )
              })}
            </select>
          </div>

        </div>
      </div>

      </>
      :
      <NotFound />
      }
    </>
  )
}
