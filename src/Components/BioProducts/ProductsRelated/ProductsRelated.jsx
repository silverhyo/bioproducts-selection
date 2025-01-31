import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
// import Style
import './ProductsRelated.css';
// import Context
import { ImageAddressContext } from '../../../Context/ImageAddressContext';
import { ProductsDataBaseContext } from '../../../Context/ProductsDataBaseContext';

export default function ProductsRelated({PRODUCTINFO}) {
  const productsList = useContext(ProductsDataBaseContext).dtBaseData;
  const imageAddress = useContext(ImageAddressContext).imageAddress;
  console.log(imageAddress);


  // ! 아래 매우 중요 : 주어진 조건을 만족하기 위해 두 데이터(PRODUCTINFO.ProductRelated와 item.ProductRelated)를 쉼표로 구분된 문자열로 간주하고, 이를 배열로 변환한 후 공통 요소가 있는지 확인해야 합니다. 이 경우 split(', ')를 활용해 문자열을 배열로 나누고, 배열 간의 교집합을 확인하여 일치 항목이 있는지를 판단합니다.
  const ProductRelated = [...productsList].filter((item, index) => {
    const productInfoArray = PRODUCTINFO.ProductRelated?.split(', ').map((s) => s.trim());
    const itemProductArray = item.ProductRelated?.split(', ').map((s) => s.trim());
    return productInfoArray?.some((value) => itemProductArray?.includes(value));
  });
  console.log("ProductRelated :", ProductRelated)


  // const ProductRelated = [...productsList].filter((item, index) => {
  //   if(typeof item.ProductRelated === 'string' && typeof PRODUCTINFO.ProductRelated === 'string') {
  //     return item.ProductRelated.toLowerCase().includes(PRODUCTINFO.ProductRelated.toLowerCase());
  //   }
  //   return false;
  // });
  // console.log("ProductRelated :", ProductRelated)


  return (
    <div className='ProductsRelated_Container'>
      <div className='ProductsRelated_Container_Box'>
        <div className='ProductsRelated_Container_Box_Title'>
          관련 제품 및 서비스
        </div>
        <div className='ProductsRelated_Container_Box_Description'>
          위의 제품과 관련된 제품 및 서비스를 안내해 드려요.
          아래에서 관련 제품 또는 서비스를 확인해 주세요!😍
        </div>

        <div className='ProductsRelated_Container_Box_ProductsRelated'>
        
        {ProductRelated.map((item, index) => {
          return (
            <Link key={index} to={`/bioproducts/${item.ID}`} style={{textDecoration:"none"}}>
              <div className='ProductsRelated_Container_Box_ProductsRelated_Item'>
                
                <div className='ProductsRelated_Container_Box_ProductsRelated_Item_ImageBox'>
                  <img className='ProductsRelated_Container_Box_ProductsRelated_Item_ImageBox_Image' src={imageAddress+item.ProductMainImage} alt=''></img>
                </div>
                <div className='ProductsRelated_Container_Box_ProductsRelated_Item_Title'>{item.ProductName}</div>
                
              </div>
            </Link>
          )
        })}

        </div>

      </div>
    </div>
  )
}
