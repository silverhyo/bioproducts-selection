import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SectionsContainer, Section } from 'react-fullpage';
// import Style css
import "./ProductsNew.css";

import { ImageAddressContext } from '../../../Context/ImageAddressContext';
import { ProductsDataBaseContext } from '../../../Context/ProductsDataBaseContext';




export default function ProductsNew() {

  const productsDataBase = useContext(ProductsDataBaseContext).dtBaseData;
  const imageURL = useContext(ImageAddressContext).imageURL;
  const [productList, setProductList] = useState(productsDataBase || []);

  useEffect(() => {
    if(productsDataBase) {
      setProductList(productsDataBase)
    }
  },[productsDataBase]);

  const adProducts = productsDataBase.filter((item, index) => {
    if(item.Advertise === 'true') {
      return true
    }
  });
  console.log("adProducts :", adProducts);



  let options = {
    activeClass: 'active',         // the class that is appended to the sections links
    anchors: ['sectionOne', 'sectionTwo', 'sectionThree', 'sectionFour'],                   // the anchors for each sections
    arrowNavigation: true,         // use arrow keys
    className: 'SectionContainer', // the class name for the section container
    delay: 1000,                   // the scroll animation speed
    navigation: true,              // use dots navigation
    scrollBar: false,              // use the browser default scrollbar
    sectionClassName: 'Section',   // the section class name
    sectionPaddingTop: '0',        // the section top padding
    sectionPaddingBottom: '0',     // the section bottom padding
    verticalAlign: false           // align the content of each section vertical
  };



  return (
    <SectionsContainer {...options}>
      
      {adProducts.map((item, index) => {
        return (
          <Section key={item.ID}>
            <div className='ProductsNew_Container'>
              <div className='ProductsNew_Container_Box'>
                <div className='ProductsNew_Container_Box_ProductNew'>
                  <div className='ProductNew_Container_Box_ProductNew_ImageBox'>
                    <img className='ProductsNew_Container_Box_ProductNew_ImageBox_Image' src={imageURL+item.ProductMainImage} alt=""></img>
                  </div>
                  <div className='ProductsNew_Container_Box_ProductNew_Info'>
                    <div className='ProductsNew_Container_Box_ProductNew_Info_Title'>{item.ProductName} ({item.ProductManufacturer})</div>
                    <div className='ProductsNew_Container_Box_ProductNew_Info_ShortDescription' >{item.ProductMainTitle}</div>
                    <div className='ProductsNew_Container_Box_ProductNew_Info_Manufacturer'>{item.AdvertiseText}</div>
                  </div>
                </div>
              </div>
            </div>
          </Section>     
        );
      })}
      
      
    </SectionsContainer>
    // <div className='ProductsNew_Container'>
    //   <div className='ProductsNew_Container_Box'>
    //     <p className='ProductsNew_Container_Box_Text'>Introduction of New Products</p>
        
    //     {adProducts.map((item, index) => {
    //       return (
    //         <div className='ProductsNew_Container_Box_ProductNew' key={item.ID}>
    //           <Link to={`/bioproducts/${item.ID}`}><img className='ProductsNew_Container_Box_ProductNew_Image' src={imageAddress+item.ProductMainImage} alt=""></img></Link>
    //           <div className='ProductsNew_Container_Box_ProductNew_Info'>
    //             <div className='ProductsNew_Container_Box_ProductNew_Info_Title'>{item.ProductName} ({item.ProductManufacturer})</div>
    //             <div className='ProductsNew_Container_Box_ProductNew_Info_ShortDescription' >{item.ProductMainTitle}</div>
    //             <div className='ProductsNew_Container_Box_ProductNew_Info_Manufacturer'>{item.AdvertiseText}</div>
    //           </div>
    //         </div>
    //       )
    //     })}
        

    //   </div>
    // </div>
  )
}




