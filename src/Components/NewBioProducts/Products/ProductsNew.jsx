import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
// import Style css
import "./ProductsNew.css";

import { ImageAddressContext } from '../../../Context/ImageAddressContext';

export default function ProductsNew({DATABASEDATA}) {

  const dataBaseData = DATABASEDATA;
  const imageAddress = useContext(ImageAddressContext).imageAddress;

  const [productList, setProductList] = useState(dataBaseData || []);

  useEffect(() => {
    if(dataBaseData) {
      setProductList(dataBaseData)
    }
  },[dataBaseData]);

  console.log("dataBaseData :", dataBaseData);

  const adProducts = productList.filter((item, index) => {
    if(item.Advertise === 'true') {
      return true
    }
  });
  console.log("adProducts :", adProducts);

  

  return (
    <div className='ProductsNew_Container'>
      <div className='ProductsNew_Container_Box'>
        <p className='ProductsNew_Container_Box_Text'>Introduction of New Products</p>
        
        {adProducts.map((item, index) => {
          return (
            <div className='ProductsNew_Container_Box_ProductNew' key={item.ID}>
              <Link to={`/bioproducts/${item.ID}`}><img className='ProductsNew_Container_Box_ProductNew_Image' src={imageAddress+item.ProductMainImage} alt=""></img></Link>
              <div className='ProductsNew_Container_Box_ProductNew_Info'>
                <div className='ProductsNew_Container_Box_ProductNew_Info_Title'>{item.ProductName} ({item.ProductManufacturer})</div>
                <div className='ProductsNew_Container_Box_ProductNew_Info_ShortDescription' >{item.ProductMainTitle}</div>
                <div className='ProductsNew_Container_Box_ProductNew_Info_Manufacturer'>{item.AdvertiseText}</div>
              </div>
            </div>
          )
        })}
        

      </div>
    </div>
  )
}
