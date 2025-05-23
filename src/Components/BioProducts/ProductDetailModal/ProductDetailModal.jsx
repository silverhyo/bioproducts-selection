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
import Comments from '../../Comments/Comments';
// import ICONS
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import ProductsRelated from '../ProductsRelated/ProductsRelated';
// import useContext
import { ImageAddressContext } from '../../../Context/ImageAddressContext';
import { WebInformation } from '../../../Context/WebInformation';
import { JsonDataContext } from '../../../Context/JsonDataContext';
import { AxiosContext } from '../../../Context/AxiosContext';


// ! 아래 Props는 APP.js로부터 받아옴
export default function ProductDetailModal({JSONDATA01}) {

  const api = useContext(AxiosContext).api;
  const {id} = useParams();


  const [productInfo, setProductInfo] = useState('' || '');
  useEffect(() => {
    api.get('/products/'+id)
    .then(res => {
      console.log(res)
      setProductInfo(res.data[0])
    })
    .catch(err => console.log(err))
  },[]);



  useEffect(() => {
    brandColor()
  },[productInfo])



  // ! Manufacturer에 따른 Top 색깔 변화
  function brandColor() {
    let colorBox1 = document.querySelector('.ProductDetail_Container_Box_Product_Info');
    let colorBox2 = document.querySelector('.ProductDetail_Container_Box_Product_Brief');
    if(productInfo.ProductManufacturer === 'Sartorius') {
      colorBox1.style.background = 'black';
      colorBox2.style.background = 'black';
    } else {
      if(productInfo.ProductManufacturer === 'Cytiva'){
        colorBox1.style.background = 'rgba(255, 166, 0, 1)';
        colorBox2.style.background = 'rgba(255, 166, 0, 1)';
      }
      if(productInfo.ProductManufacturer === 'Merck'){
        colorBox1.style.background = 'rgba(112, 1, 112, 1)';
        colorBox2.style.background = 'rgba(112, 1, 112, 1)';
      }
      if(productInfo.ProductManufacturer === 'Thermofisher'){
        colorBox1.style.background = 'rgba(255, 0, 0, 1)';
        colorBox2.style.background = 'rgba(255, 0, 0, 1)';
      }
    }
  };


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

  

  // ! 아래는 Contact Component에 Prop으로 전달 (이 제품에 대한 담당자 연락처, 제조사 정보)
  // ! Contact Component에서 연락처 정보를 통하여 a Tag에 연락처 정보를 넣고자 합
  // ! Contact Component에서 제조사 정보를 통하여 제조사 컨텍 홈페이지로 연결시키고자 함
  const contactInfo ={
    position: productInfo.SpecialistPosition,
    inCharge: productInfo.SpecialistName,
    mobile: productInfo.SpecialistPhone,
    manufacturer:productInfo.ProductManufacturer
  };


  return (
    <>
    <Outlet />
    <div className='ProductDetail_Container'>
      <div className='ProductDetail_Container_Box'>

        <div className='ProductDetail_Container_Box_Product_Info'>
          <div className='ProductDetail_Container_Box_Product_Info_Box'>
            <p className='ProductDetail_Container_Box_Product_Info_P p1'>{productInfo.ProductType} / <span>{productInfo.ProductManufacturer}</span></p>
            {/* <hr className='ProductDetail_Container_Box_Product_Info_hr'/> */}
            <p className='ProductDetail_Container_Box_Product_Info_P p2'>{productInfo.ProductName}</p>
            {/* <p className='ProductDetail_Container_Box_Product_Info_P p3'>{productInfo.ProductManufacturer}</p> */}
          </div>
        </div>

        <div className='ProductDetail_Container_Box_Product_Brief'>
          <p className='ProductDetail_Container_Box_Product_Brief_P'>{productInfo.ProductMainTitle}</p>
        </div>

        <div className='ProductDetail_Container_Box_Product_Detail'>
          <img className='ProductDetail_Container_Box_Product_Detail_Image' src={productInfo.ProductImageUrl01} alt="" />
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

        <div className='ProductDetail_Container_Box_Product_Detail' style={{display:"none"}}>
          <img className='ProductDetail_Container_Box_Product_Detail_Image' src={productInfo.ProductImageUrl02} alt="" />
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

        <div className='ProductDetail_Container_Box_Product_Detail' style={{display:"none"}}>
          <img className='ProductDetail_Container_Box_Product_Detail_Image' src={productInfo.ProductImageUrl03} alt="" />
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

        <div className='ProductDetail_Container_Box_Product_Detail' style={{display:"none"}}>
          <img className='ProductDetail_Container_Box_Product_Detail_Image' src={productInfo.ProductImageUrl04} alt="" />
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

        <div className='ProductDetail_Container_Box_Product_Detail' style={{display:"none"}}>
          {productInfo.ProductImageUrl05 ?
          <img className='ProductDetail_Container_Box_Product_Detail_Image' src={productInfo.ProductImageUrl05} alt="" />
          :
          <img className='ProductDetail_Container_Box_Product_Detail_Image' style={{display:"none"}} src={productInfo.ProductImageUrl05} alt="" />
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





    <div className='ProductDetail_DownloadBox'>
      <a className='ProductDetail_DownloadBox_01' href={productInfo.ProductTitle04}><div className='ProductDetail_DownloadBox_01_Download'>Data-Sheet 다운받기</div></a>
      <a className='ProductDetail_DownloadBox_02' href={productInfo.ProductTitle05}><div className='ProductDetail_DownloadBox_02_Download'>기타 자료 다운받기</div></a>
    </div>





    <div className='ProductDetail_Contact'>
      <Contact CONTACTINFO={contactInfo} productInfo={productInfo}/>
    </div>




    <ProductsRelated PRODUCTINFO={productInfo} />




    <Comments />
    



    <div className='ProductDetail_Container_Bottom'>
      <Link to='/bioproducts' className='ProductDetail_Container_Bottom_Button' style={{textDecoration: "none"}}><MdOutlineArrowBackIosNew /></Link>
    </div>




    <Footer />


    </>
  )
}
