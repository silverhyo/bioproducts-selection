import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
// import Style css
import "./ProductDetailModal.css";
// import Components
import Footer from '../../Common/Footer';
import Contact from '../../Contact/Contact';
// import ICONS
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import CommentsReact from '../../Comments/CommentsReact';
import ProductsRelated from '../ProductsRelated/ProductsRelated';
// import useContext
import { ImageAddressContext } from '../../../Context/ImageAddressContext';
import { WebInformation } from '../../../Context/WebInformation';


// ! 아래 Props는 APP.js로부터 받아옴
export default function ProductDetailModal({JSONDATA01}) {

  const imageAddress = useContext(ImageAddressContext).imageAddress;
  const LocalAddress = useContext(WebInformation).localAddress;
  const jsonData = JSONDATA01;
  
  const {id} = useParams();

  const [productInfo, setProductInfo] = useState('' || '');
  useEffect(() => {
    axios.get(`${LocalAddress.localServer}`+`/bioproducts/`+id)
    // axios.get(`${LocalAddress.localServer}`+`/bioproducts/`+id)
    .then(res => {
      setProductInfo(res.data[0])
    })
    .catch(err => console.log(err))
  },[]);
  console.log("productInfo :", productInfo)






  const [descriptionTextA, setDescriptionTextA] = useState();
  const [descriptionTextB, setDescriptionTextB] = useState();
  const [descriptionTextC, setDescriptionTextC] = useState();
  const [descriptionTextD, setDescriptionTextD] = useState();
  const [descriptionTextE, setDescriptionTextE] = useState();


  let descriptionA = productInfo.ProductDescription01;
  let descriptionB = productInfo.ProductDescription02;
  let descriptionC = productInfo.ProductDescription03;
  let descriptionD = productInfo.ProductDescription04;
  let descriptionE = productInfo.ProductDescription05;
  console.log("descriptionA :", descriptionA)


  useEffect(() => {
    if (productInfo) {
      // setDetailProductInfo(detailProduct)
      setDescriptionTextA(descriptionA)
      setDescriptionTextB(descriptionB)
      setDescriptionTextC(descriptionC)
      setDescriptionTextD(descriptionD)
      setDescriptionTextE(descriptionE)
    }
  },[productInfo]);



  // 이 페이지가 불러져올때 페이지의 위치를 최상단으로 하고 싶어!!

  function closePopupWindow() {

  }
  

  // ! 아래는 Contact Component에 Prop으로 전달 (이 제품에 대한 담당자 연락처, 제조사 정보)
  // ! Contact Component에서 연락처 정보를 통하여 a Tag에 연락처 정보를 넣고자 합
  // ! Contact Component에서 제조사 정보를 통하여 제조사 컨텍 홈페이지로 연결시키고자 함
  const contactInfo ={
    mobile: productInfo.SpecialistPhone,
    manufacturer:productInfo.ProductManufacturer
  };


  return (
    <>
    <Outlet />
    <div className='ProductDetail_Container'>
      <div className='ProductDetail_Container_Box'>
      {/* <div className='ProductDetail_Container_Box' style={{display:"none"}}> */}

        {/* <div className='ProductDetail_Container_Box_ImageBox'>
          <img className='ProductDetail_Container_Box_Image' src={imageAddress+productInfo.ProductMainImage} alt="" />
        </div> */}

        <div className='ProductDetail_Container_Box_Product_Info'>
          <p className='ProductDetail_Container_Box_Product_Info_P p1'>{productInfo.ProductName}</p>
          <hr className='ProductDetail_Container_Box_Product_Info_hr'/>
          <p className='ProductDetail_Container_Box_Product_Info_P p2'>{productInfo.ProductType}</p>
          <p className='ProductDetail_Container_Box_Product_Info_P p3'>{productInfo.ProductManufacturer}</p>
        </div>

        <div className='ProductDetail_Container_Box_Product_Brief'>
          <p className='ProductDetail_Container_Box_Product_Brief_P'>{productInfo.ProductMainTitle}</p>
        </div>

        <div className='ProductDetail_Container_Box_Product_Detail'>
          <img className='ProductDetail_Container_Box_Product_Detail_Image' src={imageAddress+productInfo.ProductImageUrl01} alt="" />
          <p className='ProductDetail_Container_Box_Product_Detail_P1'>{productInfo.ProductTitle01}</p>
          <p className='ProductDetail_Container_Box_Product_Detail_P2'>{descriptionTextA?.split('\n').map((line) => {
            return (
              <span key={productInfo.ProductDescription01}>
                {line}
                <br />
              </span>
            )
          })}</p>
        </div>

        <div className='ProductDetail_Container_Box_Product_Detail'>
          <img className='ProductDetail_Container_Box_Product_Detail_Image' src={imageAddress+productInfo.ProductImageUrl02} alt="" />
          <p className='ProductDetail_Container_Box_Product_Detail_P1'>{productInfo.ProductTitle02}</p>
          <p className='ProductDetail_Container_Box_Product_Detail_P2'>{descriptionTextB?.split('\n').map((line) => {
            return (
              <span key={productInfo.ProductDescription02}>
                {line}
                <br />
              </span>
            )
          })}</p>
        </div>

        <div className='ProductDetail_Container_Box_Product_Detail'>
          <img className='ProductDetail_Container_Box_Product_Detail_Image' src={imageAddress+productInfo.ProductImageUrl03} alt="" />
          <p className='ProductDetail_Container_Box_Product_Detail_P1'>{productInfo.ProductTitle03}</p>
          <p className='ProductDetail_Container_Box_Product_Detail_P2'>{descriptionTextC?.split('\n').map((line) => {
            return (
              <span key={productInfo.ProductDescription03}>
                {line}
                <br />
              </span>
            )
          })}</p>
        </div>

        <div className='ProductDetail_Container_Box_Product_Detail'>
          <img className='ProductDetail_Container_Box_Product_Detail_Image' src={imageAddress+productInfo.ProductImageUrl04} alt="" />
          <p className='ProductDetail_Container_Box_Product_Detail_P1'>{productInfo.ProductTitle04}</p>
          <p className='ProductDetail_Container_Box_Product_Detail_P2'>{descriptionTextD?.split('\n').map((line) => {
            return (
              <span key={productInfo.ProductDescription04}>
                {line}
                <br />
              </span>
            )
          })}</p>
        </div>

        <div className='ProductDetail_Container_Box_Product_Detail'>
          {imageAddress+productInfo.ProductImageUrl05 ?
          <img className='ProductDetail_Container_Box_Product_Detail_Image' src={imageAddress+productInfo.ProductImageUrl05} alt="" />
          :
          <img className='ProductDetail_Container_Box_Product_Detail_Image' style={{display:"none"}} src={imageAddress+productInfo.ProductImageUrl05} alt="" />
          }

          {productInfo.ProductTitle05 ?
          <p className='ProductDetail_Container_Box_Product_Detail_P1'>{productInfo.ProductTitle05}</p>
          :
          <p className='ProductDetail_Container_Box_Product_Detail_P1' style={{display:"none"}}>{productInfo.ProductTitle05}</p>
          }
          
          {descriptionTextE ?
          <p className='ProductDetail_Container_Box_Product_Detail_P2'>{descriptionTextE?.split('\n').map((line) => {
            return (
              <span key={productInfo.ProductDescription05}>
                {line}
                <br />
              </span>
            )
          })}</p>
          :
          <p className='ProductDetail_Container_Box_Product_Detail_P2' style={{display:"none"}}>{descriptionTextE?.split('\n').map((line) => {
            return (
              <span key={productInfo.ProductDescription05}>
                {line}
                <br />
              </span>
            )
          })}</p>
          }
          
        </div>
      </div>
      
    </div>
    <Contact CONTACTINFO={contactInfo} JSONDATA01={jsonData} />

    {/* <CommentsReact /> */}

    <ProductsRelated PRODUCTINFO={productInfo} />

    {/* <Comments /> */}

    <Footer />

    <div className='ProductDetail_Container_Bottom'>
      <Link to='/bioproducts' className='ProductDetail_Container_Bottom_Button' style={{textDecoration: "none"}}><MdOutlineArrowBackIosNew /></Link>
    </div>
    </>
  )
}
