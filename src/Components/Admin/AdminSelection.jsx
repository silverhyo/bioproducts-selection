import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';

// import Style
import './AdminSelection.css';  

// import Context
import { JsonDataContext } from '../../Context/JsonDataContext';
import { AuthContext } from '../../Context/AuthContext';


// Import components
import AdminCreate_Media from './AdminCreate/AdminCreate_Media';
import AdminCreate_Reagent from './AdminCreate/AdminCreate_Reagent';
import AdminCreate_Filter from './AdminCreate/AdminCreate_Filter';
import AdminCreate_Chromatography from './AdminCreate/AdminCreate_Chromatography';
import AdminCreate_Service from './AdminCreate/AdminCreate_Service';
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

      {productsType === 'Media' && <AdminCreate_Media productsType={productsType}/>}
      {productsType === 'Reagent' && <AdminCreate_Reagent productsType={productsType}/>}
      {productsType === 'Filter' && <AdminCreate_Filter productsType={productsType}/>}
      {productsType === 'Chromatography' && <AdminCreate_Chromatography productsType={productsType}/>}
      {productsType === 'Service' && <AdminCreate_Service productsType={productsType}/>}

      </>
      :
      <NotFound />
      }
    </>
  )
}
