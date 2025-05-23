import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { shuffle } from 'lodash';
import { throttle } from 'lodash';
import { useRef } from 'react';
// import Style
import "./BioProductsFiltered.css";

// import useContext
import { ImageAddressContext } from '../../../Context/ImageAddressContext.js';
import { AxiosContext } from '../../../Context/AxiosContext.js';



// ! 이 페이지에서 기능
// ! 01 : 좋아요 버튼 작동 (1증가 감소)
// ! 02 : 제품 등록기준 20일 이내일 경우 New 표시

export default function BioProductsFiltered({FILTEREDPRODUCTS}) {

  // TODO : Data 역배열로 위치하기기
  const filteredProduct = [...FILTEREDPRODUCTS].reverse();
  const [filteredProducts, setFilteredProducts] = useState(FILTEREDPRODUCTS);

  const api = useContext(AxiosContext).api;
  // console.log("filteredProducts :", filteredProducts)


  // TODO(좋아요 count 불러오기) 01. '좋아요'의 초기값을 DB로부터 불러오고 useState의 'likeCounts' 변수에 저장한다.
  const [likeCounts, setLikeCounts] = useState([]);
  const likeCountsRef = useRef(likeCounts);
  useEffect(() => {
    api.get('/api/products/likecount/read')
    .then(res => {
      setLikeCounts(res.data)
      // console.log('res.data :', res.data);
    })
    .catch(err => console.log(err))
  }, []);

  


  // TODO(좋아요 count 불러오기) 02. likeCounts의 현재 data는 Array이며, 모든 product의 {productID: 아이디, LikeCounts: 좋아요숫자} 정보를 포함하고잇다.
  // TODO(따봉클릭 시 1증가하는 로직구현) 05. 따봉 onClick={handleLikeCount}을 수행하게 만든다. 클릭한 따봉의 productId와 likeCounts애서 같은 ID를 찾고 count에 1을 더한다.
  // TODO(따봉클릭 시 1증가하는 로직구현) 06. throttle된 함수를 저장할 ref 객체 (productId별 throttle 저장)
  const throttledFunctionsRef = useRef({});
  // * throttled wrapper 생성 함수
  const throttledHandleLikeCount = (productId) => {
    if (!throttledFunctionsRef.current[productId]) {
      throttledFunctionsRef.current[productId] = throttle(() => {
        handleLikeCount(productId);
      }, 1000000); // 1000초
    }
    throttledFunctionsRef.current[productId]();
  }
  
  
  function handleLikeCount(productId) {
    const sameId = likeCounts.find(item => item.ProductID === productId);
    console.log('sameId :',sameId)
    if (!sameId) return;

    const value = {
      newCount: sameId.LikeCounts + 1
    };

    api.put(`/api/products/likecount/update/`+productId, value)
    .then((result) => {
      setLikeCounts((prevCounts) => {
        const updated = prevCounts.map((item) =>
          item.ProductID === productId
          ? { ...item, LikeCounts: value.newCount }
          : item
        );
        
        return [...updated]; // 새 배열을 만들어 리렌더 유도
      });
    })
    .catch(console.error);
  }


  // TODO : 아래처럼 해야 shuffle이 한 번만 진행됨
  useEffect(() => {
    const filteredProducts = shuffle(filteredProduct);
    setFilteredProducts(filteredProducts);
  },[FILTEREDPRODUCTS]);

  // TODO : Manufacturer에 따라 제조사 글씨 다르게 설정하는 것은 제품이 필터링에 의해 매번 업데이트 되기에 이때마다 실행될 수 있도록 한다. 그러므로 },[]); 안하는것임
  useEffect(() => {
  },[filteredProducts]);


  // console.log("filteredProduct :", filteredProducts);

  return (
    <>
      <div className='BioProductsFiltered_Container'>
      {filteredProducts.map((filteredProduct, index) => {

        // TODO : Database 날짜 계산의 조건에 따라서 CSS의 Before 가 시행되거나 제거되게 한다.
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
        // console.log("dDays :", dDays);


        // TODO(좋아요 count 불러오기) 03. filteredProduct에는 product에 대한 고유의 ID가 있음. likeCounts에서 이 ID와 일치하는 것을 찾은 후에 likeCount를 표시
        // TODO(좋아요 count 불러오기) 04. 구조분해 할당을 통하여 객체의 정보를 변수에 저장한다. 
        const count = Array.isArray(likeCounts)
        ? likeCounts.find(item => item.ProductID === filteredProduct.ID)
        : null;
        const likeCount = count?.LikeCounts;
        // console.log('likeCount :', likeCount);


      return (
        <React.Fragment key={`${filteredProduct.ID}-${likeCount}`}>
          <div key={filteredProduct.ID} className='BioProductsFiltered_Box'>
            <div className={`BioProductsFiltered_Box_Image ${isBeforeActive ? 'active' : ''}`}>
              <Link to={`/bioproducts/${filteredProduct.ID}`} style={{textDecoration:"none"}}><img className={`BioProductsFiltered_Box_Image_Part ${isBeforeActive ? 'active' : ''}`} data-id={filteredProduct.ID} src={filteredProduct.ProductMainImage} alt=""/></Link>
            </div>
        
            <div className='BioProductsFiltered_Box_Text'>
              <Link to={`/bioproducts/${filteredProduct.ID}`} style={{textDecoration:"none"}}>
                <p className='BioProductsFiltered_Box_Text_Detail p1'><strong data-id={filteredProduct.ID}>{filteredProduct.ProductName}</strong></p>
              </Link>

              <Link to={`/bioproducts/${filteredProduct.ID}`} style={{textDecoration:"none"}}>
                <p className='BioProductsFiltered_Box_Text_Detail p2' data-id={filteredProduct.ID}>{filteredProduct.ProductMainTitle}</p>
              </Link>

              <Link to={`/bioproducts/${filteredProduct.ID}`} style={{textDecoration:"none"}}>
                <p className='BioProductsFiltered_Box_Text_Detail p3' data-id={filteredProduct.ID}
                style={{
                  color:
                    filteredProduct.ProductManufacturer === "Sartorius"
                      ? "#FFF100"
                      : filteredProduct.ProductManufacturer === "Cytiva"
                      ? "rgba(255, 166, 0, 1)"
                      : filteredProduct.ProductManufacturer === "Merck"
                      ? "rgba(112, 1, 112, 1)"
                      : filteredProduct.ProductManufacturer === "Thermofisher"
                      ? "rgba(255, 0, 0, 1)"
                      : "inherit",
                }}>{filteredProduct.ProductManufacturer}</p>
              </Link>
              
              <div className='BioProductsFiltered_Box_Text_Emotion'>

                {/* 기능을 만들고 있는 중입니다. */}
                <span className='BioProductsFiltered_Box_Text_Emotion_Like emotion' onClick={() => throttledHandleLikeCount(filteredProduct.ID)}>
                  <span className="material-symbols-outlined active">thumb_up</span>
                  <span className='BioProductsFiltered_Box_Text_Emotion_Like_Text'>{likeCount || 0}</span>
                </span>

              </div>
            </div>
          </div>
        </React.Fragment>
      )
    })}
    </div>
    </>
  )
}