import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
// import Style
import "./BioProductsFiltered.css";
// import ICONS
import { GoHeartFill } from "react-icons/go";
import { AiOutlineLike } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { RiUserVoiceLine } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
// import Components
// import useContext
import { ImageAddressContext } from '../../../Context/ImageAddressContext';


// ! 이 페이지에서 기능
// ! 01 : 좋아요 버튼 작동 (1증가 감소)
// ! 02 : 제품 등록기준 20일 이내일 경우 New 표시

export default function BioProductsFiltered({FILTEREDPRODUCTS}) {

  const imageURL = useContext(ImageAddressContext).imageURL;

  // ! Data 역배열로 놓기기
  const filteredProducts = [...FILTEREDPRODUCTS].reverse();
  console.log("filteredProducts :", filteredProducts)


  // 이미지 클릭 시 클릭된 아이템만 return될 수 있도록 한다.

  // 이미지 또는 Test 클릭 시 클릭한 제품에 대한 상세 정보가 아래쪽으로 나오게 한다.
  // 이 clickedItem을 가지고 modal 창같은 곳에 상세한 정보를 보여주게 한다.
  const [isVisible, setIsVisible] = useState(false);
  const [detailProduct, setDetailProduct] = useState('');

  function callProductDetailWindow(e) {
    setIsVisible(!isVisible); // 상태를 토글

    const dataSet = e.target.dataset;
    console.log("dataSet :", dataSet);
    const clickedImageItem = dataSet.id;
    const clickedItem = filteredProducts.find(item => {
      if(item.ID == clickedImageItem) {
        return true;
      }
    })
    setDetailProduct(clickedItem);
  }
  
  // 매번 같은 화면만 나오면 지루하니 gridbox의 items를 random하게 배치해 보도록 해보자



  // Manufacturer에 따라 제조사 글씨 다르게 설정하기!
  function brandColor() {
    let productBrandColor = document.querySelectorAll('.p3');
    
    for(let i = 0; i < productBrandColor.length; i++ ) {
      if(productBrandColor[i].innerText === "Sartorius") {
        productBrandColor[i].style.color = "#FFF100"
      } else {
        if(productBrandColor[i].innerText === "Cytiva") {
          productBrandColor[i].style.color = "rgba(255, 166, 0, 1)"
        }
        if(productBrandColor[i].innerText === "Merck") {
          productBrandColor[i].style.color = "rgba(112, 1, 112, 1)"
        }
        if(productBrandColor[i].innerText === "Thermofisher") {
          productBrandColor[i].style.color = "rgba(255, 0, 0, 1)"
        }
      }
    }
  }
  // Manufacturer에 따라 제조사 글씨 다르게 설정하는 것은 제품이 필터링에 의해 매번 업데이트 되기에 이때마다 실행될 수 있도록 한다. 그러므로 },[]); 안하는것임
  useEffect(() => {
    brandColor();
  },[filteredProducts]);


  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState('');

  function handleLikeCount() {
    console.log("Hello")
    if(isLiked) {
      // 이미 좋아요 상태일 경우 감소
      setLikeCount((prev) => prev - 1);
    } else {
      // 좋아요 상태가 아닐 경우 증가
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  }

  return (
    <>
    <div className='BioProductsFiltered_Container'>
    {filteredProducts.map((filteredProduct, index) => {

      // ! Database 날짜 계산의 조건에 따라서 CSS의 Before 가 시행되거나 제거되게 한다.
      let databaseDate = filteredProduct.RegiDate; //YYYY-MM-DD 형식
      // console.log("databaseDate :", databaseDate);
      let currentDate = new Date();
      let dbDate = new Date(databaseDate);

      // 데이터베이스 날짜 기준으로 20일 이후 계산
      const diffInDays = Math.floor((currentDate - dbDate) / (1000 * 60 * 60 * 24));
      // console.log("diffInDays :", diffInDays);
      // 조건 : 20일 이하인 경우에만 ::before 활성화
      // dDays 조건을 만들어 20보다 적게 남으면 true이고 20보다 클 경우 false
      // 이 dDays를 BioProductsFiltered_Box_Image_Part className에 잘 이용

      const isBeforeActive = diffInDays <= 20;

      let dDays;
      if(diffInDays <= 20){
        dDays = 'true';
      }else if (diffInDays > 20) {
        dDays= 'false';
      }
      console.log("dDays :", dDays);


      return (
        <div key={filteredProduct.ID} className='BioProductsFiltered_Box'>
          <div className={`BioProductsFiltered_Box_Image ${isBeforeActive ? 'active' : ''}`} onClick={callProductDetailWindow}>
            <Link to={`/bioproducts/${filteredProduct.ID}`} style={{textDecoration:"none"}}><img className={`BioProductsFiltered_Box_Image_Part ${isBeforeActive ? 'active' : ''}`} data-id={filteredProduct.ID} src={filteredProduct.ProductMainImage} alt=""/></Link>
          </div>
      
          <div className='BioProductsFiltered_Box_Text'>
            <Link to={`/bioproducts/${filteredProduct.ID}`} style={{textDecoration:"none"}}><p className='BioProductsFiltered_Box_Text_Detail p1'><strong data-id={filteredProduct.ID} onClick={callProductDetailWindow}>{filteredProduct.ProductName}</strong></p></Link>
            <Link to={`/bioproducts/${filteredProduct.ID}`} style={{textDecoration:"none"}}><p className='BioProductsFiltered_Box_Text_Detail p2' data-id={filteredProduct.ID} onClick={callProductDetailWindow}>{filteredProduct.ProductMainTitle}</p></Link>
            <Link to={`/bioproducts/${filteredProduct.ID}`} style={{textDecoration:"none"}}><p className='BioProductsFiltered_Box_Text_Detail p3' data-id={filteredProduct.ID} onClick={callProductDetailWindow}>{filteredProduct.ProductManufacturer}</p></Link>
            <div className='BioProductsFiltered_Box_Text_Emotion'>
              {/* 기능을 만들고 있는 중입니다. */}
              {/* <div className='BioProductsFiltered_Box_Text_Emotion_Detail emotion'><BiMessageDetail /></div>
              <div className='BioProductsFiltered_Box_Text_Emotion_Voc emotion'><RiUserVoiceLine /></div>
              <div className='BioProductsFiltered_Box_Text_Emotion_Heart emotion'><GoHeartFill /></div>
              <div className='BioProductsFiltered_Box_Text_Emotion_Like emotion' onClick={handleLikeCount}>{isLiked ? <AiOutlineLike /> : <AiFillLike />} {filteredProduct.LikeCount}</div> */}
            </div>
          </div>
        </div>
      )
    })}
    </div>
    </>
  )
}