import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
// import Style
import './ProductsRelated.css';
// import Context
import { ProductsDataBaseContext } from '../../../Context/ProductsDataBaseContext';
// import Image
import ImageOfSartorius from '../../../Sources/image_logo/sartorius-logo-black.png';
import ImageOfMerck from '../../../Sources/image_logo/sartorius-logo-black.png';
import ImageOfCytiva from '../../../Sources/image_logo/sartorius-logo-black.png';
import ImageOfThermo from '../../../Sources/image_logo/sartorius-logo-black.png';


export default function ProductsRelated({PRODUCTINFO}) {
  const productsDataBase = useContext(ProductsDataBaseContext).dtBaseData;

  // ! 아래 매우 중요 : 주어진 조건을 만족하기 위해 두 데이터(PRODUCTINFO.ProductRelated와 item.ProductRelated)를 쉼표로 구분된 문자열로 간주하고, 이를 배열로 변환한 후 공통 요소가 있는지 확인해야 합니다. 이 경우 split(', ')를 활용해 문자열을 배열로 나누고, 배열 간의 교집합을 확인하여 일치 항목이 있는지를 판단합니다.
  const ProductRelated = [...productsDataBase].filter((item, index) => {
    const productInfoArray = PRODUCTINFO.ProductRelated?.split(', ').map((s) => s.trim());
    const itemProductArray = item.ProductRelated?.split(', ').map((s) => s.trim());
    return productInfoArray?.some((value) => itemProductArray?.includes(value));
  });
  console.log("ProductRelated :", ProductRelated)


  // ! 화면을 새로 고쳐서 관련 제품 페이지로 이동
  const navigate = useNavigate();
  const { id } = useParams();
  function pageMove(ID) {
    navigate(`/bioproducts/${ID}`)
    navigate(0);
  }


    // Manufacturer에 따라 박스의 테두리 색을 다르게 설정하기!
    function brandColor() {
      let productBrandColor = document.querySelectorAll('.ProductsRelated_Container_Box_ProductsRelated_Item');
      let logoImage = document.querySelectorAll('.ProductsRelated_Container_Box_ProductsRelated_Item_ImageBox1_Image')

      
      for(let i = 0; i < productBrandColor.length; i++ ) {
        if(ProductRelated[i].ProductManufacturer === "Sartorius") {
          productBrandColor[i].style.border = "2px solid #FFF100"
          logoImage[i].src = `${ImageOfSartorius}`
        } else {
          if(ProductRelated[i].ProductManufacturer === "Cytiva") {
            productBrandColor[i].style.border = "2px solid rgba(255, 166, 0, 1)"
            logoImage[i].src = `${ImageOfCytiva}`
          }
          if(ProductRelated[i].ProductManufacturer === "Merck") {
            productBrandColor[i].style.border = "2px solid rgba(112, 1, 112, 1)"
            logoImage[i].src = `${ImageOfMerck}`
          }
          if(ProductRelated[i].ProductManufacturer === "Thermofisher") {
            productBrandColor[i].style.border = "2px solid rgba(255, 0, 0, 1)"
            logoImage[i].src = `${ImageOfThermo}`
          }
        }
      }
    }
    // Manufacturer에 따라 제조사 글씨 다르게 설정하는 것은 제품이 필터링에 의해 매번 업데이트 되기에 이때마다 실행될 수 있도록 한다. 그러므로 },[]); 안하는것임
    useEffect(() => {
      brandColor();
    },[ProductRelated]);




  return (
    <div className='ProductsRelated_Container'>
      <div className='ProductsRelated_Container_Box'>
        <div className='ProductsRelated_Container_Box_Title'>
          관련 제품 및 서비스
        </div>
        {/* <div className='ProductsRelated_Container_Box_Description'>
          위 제품과 관련된 다른 제품 및 서비스를 안내해 드립니다.
        </div> */}

        <div className='ProductsRelated_Container_Box_ProductsRelated'>
        
        {ProductRelated.map((item, index) => {
          return (
            <Link key={index} to={`/bioproducts/${item.ID}`} style={{textDecoration:"none"}}>
              <div className='ProductsRelated_Container_Box_ProductsRelated_Item' onClick={(e) => pageMove(item.ID)}>
                
                <div className='ProductsRelated_Container_Box_ProductsRelated_Item_ImageBox'>
                  <img className='ProductsRelated_Container_Box_ProductsRelated_Item_ImageBox_Image' src={item.ProductMainImage} alt=''></img>
                </div>
                <div className='ProductsRelated_Container_Box_ProductsRelated_Item_ImageBox1'>
                  <img className='ProductsRelated_Container_Box_ProductsRelated_Item_ImageBox1_Image'src='' alt=''></img>
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
