import React from 'react';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
// import Style css
import "./AdminCreate.css";
import Footer from '../../Common/Footer';
import AdminNavbar from '../../Common/AdminNavbar';
// import Components
import NotFound from '../../Common/NotFound';
import Navigation from '../../Common/Navigation';
// useContext
import { AuthContext } from '../../../Context/AuthContext';
import { useContext } from 'react';
import { WebInformation } from '../../../Context/WebInformation';
import { JsonDataContext } from '../../../Context/JsonDataContext';
import { AxiosContext } from '../../../Context/AxiosContext';




export default function AdminCreate() {

  // ! 자 이 페이지는 Admin 인 user만 접근할 수 있어야 하겠지? User 중에서 Admin 레벨인 user에게만 접근 가능!!
  // ! 데이터베이스 Users 정보에서 Level이 Admin인 사람을 찾고 이 사람에게만 권한 부여
  // ! 아래 userInformation의 UserId 정보와 데이터베이스에서 가져와야하며 정보는 App.js로부터 가져온다.

  const userInformation = useContext(AuthContext).userDatabaseInfo;
  const URL = useContext(WebInformation).URL;
  const jsonData01 = useContext(JsonDataContext).jsonData01;
  const api = useContext(AxiosContext).api;

  // ! 01 : state 정의 내리는 곳

  const [productName, setProductName] = useState('');
  const [productMainImage, setProductMainImage] = useState('');
  const [productTitle, setProductTitle] =useState('');
  const [productType, setProductType] = useState('');
  const [modalityProducts, setModalityProducts] = useState(['']);
  const [productFiltration, setProductFiltration] = useState(['']);
  const [productCellLine, setProductCellLine] = useState(['']);
  const [service, setService] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [descriptionA1, setDescriptionA1] = useState('');
  const [descriptionA2, setDescriptionA2] = useState('');
  const [descriptionA3, setDescriptionA3] = useState('');
  const [descriptionB1, setDescriptionB1] = useState('');
  const [descriptionB2, setDescriptionB2] = useState('');
  const [descriptionB3, setDescriptionB3] = useState('');
  const [descriptionC1, setDescriptionC1] = useState('');
  const [descriptionC2, setDescriptionC2] = useState('');
  const [descriptionC3, setDescriptionC3] = useState('');
  const [descriptionD1, setDescriptionD1] = useState('');
  const [descriptionD2, setDescriptionD2] = useState('');
  const [descriptionD3, setDescriptionD3] = useState('');
  const [descriptionE1, setDescriptionE1] = useState('');
  const [descriptionE2, setDescriptionE2] = useState('');
  const [descriptionE3, setDescriptionE3] = useState('');
  const [relatedProducts, setRelatedProducts] = useState('');
  const [applicationSpecialistName, setApplicationSpecialistName] = useState('');
  const [applicationSpecialistPosition, setApplicationSpecialistPosition] = useState('');
  const [applicationSpecialistPhone, setApplicationSpecialistPhone] = useState('');


  
  // ! Input의 Data가 IMAGE File 또는 Check박스일 경우 아래에 먼저 onChange 함수 정의하고 01에 state 정의함
  // Product Main Image
  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();
  const handleSetProductMainImage = (e) => {
    setProductMainImage(e.target.files[0]);
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result)
    }
  }

  // Product Modality
  const [checkedValueLists, setCheckedValueLists] = useState([]);
  const settingModalityProducts = (isChecked, checkedValue) => {
    if(isChecked) {
      setCheckedValueLists([...checkedValueLists, checkedValue])
      setModalityProducts([...checkedValueLists, checkedValue])
    }else {
      setCheckedValueLists(checkedValueLists.filter((el) => el!==checkedValue));
      setModalityProducts(checkedValueLists.filter((el) => el!==checkedValue))
    }
  };

  // Application Filtration
  const [filterProduct, setFilterProduct] = useState([]);
  const settingFilterProducts = (isChecked, checkedValue) => {
    if(isChecked) {
      setFilterProduct([...filterProduct, checkedValue])
      setProductFiltration([...filterProduct, checkedValue])
    }else {
      setFilterProduct(filterProduct.filter((el) => el!==checkedValue));
      setProductFiltration(filterProduct.filter((el) => el!==checkedValue))
    }
  }

  // DescriptionA
  const [imgFileA, setImgFileA] = useState('');
  const imgRefA = useRef();
  const settingDetailA1 = (e) => {
    setDescriptionA1(e.target.files[0])
    const file = imgRefA.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFileA(reader.result);
    }
  }

  // DescriptionB
  const [imgFileB, setImgFileB] = useState('');
  const imgRefB = useRef();
  const settingDetailB1 = (e) => {
    setDescriptionB1(e.target.files[0]);
    const file = imgRefB.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFileB(reader.result);
    }
  }

  // DescriptionC
  const [imgFileC, setImgFileC] = useState('');
  const imgRefC = useRef();
  const settingDetailC1 = (e) => {
    setDescriptionC1(e.target.files[0]);
    const file = imgRefC.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFileC(reader.result);
    }
  }


  // DescriptionD
  const [imgFileD, setImgFileD] = useState('');
  const imgRefD = useRef();
  const settingDetailD1 = (e) => {
    setDescriptionD1(e.target.files[0]);
    const file = imgRefD.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFileD(reader.result);
    }
  }

  // DescriptionE
  const [imgFileE, setImgFileE] = useState('');
  const imgRefE = useRef();
  const settingDetailE1 = (e) => {
    setDescriptionE1(e.target.files[0]);
    const file = imgRefE.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFileE(reader.result);
    }
  }

  // Application Cell Line
  const [cellLine, setCellLine] = useState([]);
  const settingCellLine = (isChecked, checkedValue) => {
    if(isChecked) {
      setCellLine([...cellLine, checkedValue])
      setProductCellLine([...cellLine, checkedValue])
    }else {
      setCellLine(cellLine.filter((el) => el!==checkedValue));
      setProductCellLine(cellLine.filter((el) => el!==checkedValue))
    }
  }






  const navigate = useNavigate();
  // const config = {"Content-Type": 'application/json'}
  // const config = {"Content-Type": 'multipart/form-data'}

  // ! 03 : state 변수를 아래의 FormData에 추가애햐 함
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('PName', productName);
    formData.append('PMainImage', productMainImage || '');
    formData.append('PMainTitle', productTitle);
    formData.append('PType', productType);
    formData.append('PModality', modalityProducts);
    formData.append('PFiltration', productFiltration);
    formData.append('PCellLine', productCellLine);
    formData.append('PService', service || '');
    formData.append('PManufacturer', manufacturer);
    formData.append('PFileA1', descriptionA1 || '');
    formData.append('PTitleA2', descriptionA2);
    formData.append('PDescriptionA3', descriptionA3);
    formData.append('PFileB1', descriptionB1 || '');
    formData.append('PTitleB2', descriptionB2);
    formData.append('PDescriptionB3', descriptionB3);
    formData.append('PFileC1', descriptionC1 || '');
    formData.append('PTitleC2', descriptionC2);
    formData.append('PDescriptionC3', descriptionC3);
    formData.append('PFileD1', descriptionD1 || '');
    formData.append('PTitleD2', descriptionD2);
    formData.append('PDescriptionD3', descriptionD3);
    formData.append('PFileE1', descriptionE1 || '');
    formData.append('PTitleE2', descriptionE2);
    formData.append('PDescriptionE3', descriptionE3);
    formData.append('PRelated', relatedProducts);
    formData.append('SName', applicationSpecialistName);
    formData.append('SPosition', applicationSpecialistPosition);
    formData.append('SPhone', applicationSpecialistPhone);
    
    console.log("formData :", formData);
    

    // axios.post('/admin/create', formData, {
    //   origin: `${process.env.REACT_APP_CLIENT_URL}`,
    //   withCredentials: "true",
    //   credentials: "true",
    //   headers: { 
    //     "xcustomheader": "silverhyo",
    //     "Content-Type": "multipart/form-data",
    //   },
    // })

    api.post('/admin/products/create', formData)
    .then(res => {
      alert("정상적으로 등록되었습니다.")
      console.log(res)
      navigate('/admin/products/list')
    })
    .catch(err => console.log(err))
  }
  




  return (
    <>
    <Navigation />
    <AdminNavbar />
    
    {userInformation.databaseLevel == 'Admin' ?
    <>
      <form className='RegisterForm_Container_Box_Form' onSubmit={handleSubmit} encType="multipart/form-data" style={{background:"rgb(44, 44, 41)"}}>
        {/* Product Name */}
        <div className='ProductName_Container'>
          <div className='ProductName_Container_Box'>
            <p className='ProductName_Container_Box_P'><span>😜</span> <strong>Product Name</strong>을 입력해 주세요.</p>
            <label className='ProductName_Container_Box_Label' htmlFor='ProductName'></label>
            <input className="ProductName_Container_Box_Input" name="ProductName" id="ProductName" type="text" placeholder='Enter Product Name' required onChange={e => setProductName(e.target.value)}></input>
          </div>
        </div>


        {/* Product Main Image */}
        <div className='MainProductImage_Container'>
          <div className='MainProductImage_Container_Box'>

            <div className='MainProductImage_Container_Box_Asking'>
              <p className='MainProductImage_Container_Box_Asking_P'><span>😜</span> 제품에 대한 <strong>메인 이미지 사진</strong>을 첨부해 주세요.</p>
            </div>
            <div className='MainProductImage_Container_Box_Register'>
              <img className='MainProductImage_Container_Box_Register_Image' src={imgFile ? imgFile : ``} alt='' />
              <input className='MainProductImage_Container_Box_Register_Input' type="file" accept="image/*" ref={imgRef} name="MainProductImage" required onChange={handleSetProductMainImage} />
            </div>

          </div>
        </div>


        {/* Product Main Title */}
        <div className='ProductTitle_Container'>
          <div className='ProductTitle_Container_Box'>
            <p className='ProductTitle_Container_Box_P'><span>😜</span> 제품 소개를 위한 간략한 주요 <strong>Title</strong>을 입력해 주세요.</p>
            <label className='ProductTitle_Container_Box_Label' htmlFor='ProductTitle'></label>
            <input className="ProductTitle_Container_Box_Input" id="ProductTitle" type="text" name="ProductTitle" placeholder='Enter Product Main Title' required onChange={e => setProductTitle(e.target.value)}></input>
          </div>
        </div>


        {/* Product Type */}
        <div className='ProductType_Container'>
          <div className='ProductType_Container_Box'>
            <p className='ProductType_Container_Box_P'><span>😜</span> <strong>Product Type</strong>을 선택해 주세요.</p>
            <label className='ProductType_Container_Box_Label' htmlFor='product_type'></label>
            <select className='ProductType_Container_Box_Select' id="product_type" required onChange={e => setProductType(e.target.value)}>
              <option className='ProductType_Container_Box_Option' name="ProductType" value="">Product Type을 선택해 주세요</option>
              {jsonData01.ProductType.map((Product, index) => {
                return (
                  <option className='ProductType_Container_Box_Option' key={index} name="ProductType" value={Product.Value}>{Product.Title}</option>
                )
              })};
            </select>
          </div>
        </div>


        {/* Product Modality */}
        <div className='ModalityProducts_Container'>
          <div className='ModalityProducts_Container_Box'>
            <p className='ModalityProducts_Container_Box_P'><span>😜</span> 적용 가능한 <strong>Modality</strong>을 선택해 주세요. (중복 선택)</p>
            {jsonData01.Modality.map((modality, index) => {
                return (
                  <div className='ModalityProducts_Container_Box_Small' key={modality.ID}>
                    <input className='ModalityProducts_Container_Box_Small_Input' id={modality.Value} type="checkbox" name="ModalityProducts" value={modality.Value} onChange={e => settingModalityProducts(e.target.checked, e.target.value)}/>
                    <label className='ModalityProducts_Container_Box_Small_Label' htmlFor={modality.Value}>{modality.Title}</label>
                  </div>
                )
              })}  

          </div>
        </div>

            
        {/* Application Filtration */}
        <div className='ApplicationFilterProducts_Container'>
          <div className='ApplicationFilterProducts_Container_Box'>

            <p className='ApplicationFilterProducts_Container_Box_P'><span>😜</span> <strong>Filtration</strong>의 목적을 선택해 주세요. (중복 선택)</p>
            {jsonData01.Filtration.map((filter, index) => {
              return (
                <div className='ApplicationFilterProducts_Container_Box_Small' key={filter.ID}>
                  <input className='ApplicationFilterProducts_Container_Box_Small_Input' id={filter.Value} type="checkbox" name="FilterProduct" value={filter.Value} onChange={e => settingFilterProducts(e.target.checked, e.target.value)}/>
                  <label className='ApplicationFilterProducts_Container_Box_Small_Label' htmlFor={filter.Value}>{filter.Title}</label>
                </div>
              )
            })}        

          </div>
        </div>


        {/* Application Cell Line */}
        <div className='ApplicationCellLine_Container'>
          <div className='ApplicationCellLine_Container_Box'>
            <p className='ApplicationCellLine_Container_Box_P'><span>😜</span> <strong>Cell Line</strong>을 선택해 주세요. (중복 선택)</p>
            {jsonData01.ApplicationCellLine.map((cellLine, index) => {
              return (
                <div className='ApplicationCellLine_Container_Box_Small' key={cellLine.ID}>
                  <input className='ApplicationCellLine_Container_Box_Small_Input' name="ApplicationCellLine" id={cellLine.Value} type="checkbox" value={cellLine.Value} onChange={e => settingCellLine(e.target.checked, e.target.value)}/>
                  <label className='ApplicationCellLine_Container_Box_Small_Label' htmlFor={cellLine.Value}>{cellLine.Title}</label>
                </div>
              )
            })}        
          </div>
        </div>



        {/* Service */}
        {/* 변경해야할 곳 (strong(textNode) / label(htmlFor) / select(id, onChange함수) / option(name, textNode) / map함수(jsonData) */}
        <div className='ProductType_Container'>
          <div className='ProductType_Container_Box'>
            <p className='ProductType_Container_Box_P'><span>😜</span> <strong>Service</strong>를 선택해 주세요.</p>
            <label className='ProductType_Container_Box_Label' htmlFor='service_type'></label>
            <select className='ProductType_Container_Box_Select' id="service_type" onChange={e => setService(e.target.value)}>
              <option className='ProductType_Container_Box_Option' name="ServiceType" value="">Service를 선택해 주세요</option>
              {jsonData01.Service.map((item, index) => {
                return (
                  <option className='ProductType_Container_Box_Option' key={index} name="ProductType" value={item.Value}>{item.Title}</option>
                )
              })};
            </select>
          </div>
        </div>


        {/* Manufacturer */}
        <div className='Manufacturer_Container'>
            
          <div className='Manufacturer_Container_Box'>
            <p className='Manufacturer_Container_Box_P'><span>😜</span> <strong>Manufacturer</strong>를 선택해 주세요.</p>

            <label className='Manufacturer_Container_Box_Label' htmlFor='manufacturer'></label>
            <select className='Manufacturer_Container_Box_Select' id="manufacturer" required onChange={e => setManufacturer(e.target.value)}>
              <option className='Manufacturer_Container_Box_Select_Option' value="">Manufacturer를 선택해 주세요</option>
              {jsonData01.Manufacturer.map((manufacture, index) => {
                return (
                  <option className='Manufacturer_Container_Box_Select_Option' key={index} name="Manufacturer" value={manufacture.Value}>{manufacture.Title}</option>
                )
              })};
            </select>
          </div>
        </div>



        {/* DescriptionA */}
        <div className='DescriptionA_Container'>
          <div className='DescriptionA_Container_Box'>
            
            <p className='DescriptionA_Container_Box_P'><span>제품등록 1</span> : 제품에 대한 <strong>상세 설명</strong>을 입력해 주세요.</p>

            <div className="DescriptionA_Container_Box_P_Small">
              <p className='DescriptionA_Container_Box_P_Small_P'></p>
              <img className='DescriptionA_Container_Box_P_Small_Image' src={imgFileA ? imgFileA : ``} alt="" /><br />
              <input className='DescriptionA_Container_Box_P_Small_Input1' type="file" name="DescriptionA1" id="fileInputA" ref={imgRefA} accept="image/*" onChange={settingDetailA1} /><br/><br/>
              <input className='DescriptionA_Container_Box_P_Small_Input2' type="text" name="DescriptionA2" placeholder="주요 문구를 입력해 주세요" onChange={e => setDescriptionA2(e.target.value)}></input><br/><br/>
              <textarea className='DescriptionA_Container_Box_P_Small_Textarea' cols="60" rows="10" name="DescriptionA3" placeholder="간단한 설명을 입력해 주세요" onChange={e => setDescriptionA3(e.target.value)} />
            </div>

          </div>
        </div>


        {/* DescriptionB */}
        <div className='DescriptionB_Container'>
          <div className='DescriptionB_Container_Box'>
            
            <p className='DescriptionB_Container_Box_P'><span>제품등록 2</span> : 제품에 대한 <strong>상세 설명</strong>을 입력해 주세요.</p>

            <div className="DescriptionB_Container_Box_P_Small">
              <p className='DescriptionB_Container_Box_P_Small_P'></p>
              <img className='DescriptionB_Container_Box_P_Small_Image' src={imgFileB ? imgFileB : ``} alt="" /><br />
              <input className='DescriptionB_Container_Box_P_Small_Input1' type="file" name="DescriptionB1" ref={imgRefB} id="fileInputB" accept="image/*" onChange={settingDetailB1} /><br/><br/>
              <input className='DescriptionB_Container_Box_P_Small_Input2' type="text" name="DescriptionB2" placeholder="주요 문구를 입력해 주세요" onChange={e => setDescriptionB2(e.target.value)}></input><br/><br/>
              <textarea className='DescriptionB_Container_Box_P_Small_Textarea' cols="60" rows="10" name="DescriptionB3" placeholder="간단한 설명을 입력해 주세요" onChange={e => setDescriptionB3(e.target.value)} />
            </div>

          </div>
        </div>



        {/* DescriptionC*/}
        <div className='DescriptionC_Container'>
          <div className='DescriptionC_Container_Box'>
            
            <p className='DescriptionC_Container_Box_P'><span>제품등록 3</span> : 제품에 대한 <strong>상세 설명</strong>을 입력해 주세요.</p>

            <div className="DescriptionC_Container_Box_P_Small">
              <p className='DescriptionC_Container_Box_P_Small_P'></p>
              <img className='DescriptionC_Container_Box_P_Small_Image' src={imgFileC ? imgFileC : ``} alt="" /><br />
              <input className='DescriptionC_Container_Box_P_Small_Input1' type="file" name="DescriptionC1" ref={imgRefC} id="fileInputC" accept="image/*" onChange={settingDetailC1} /><br/><br/>
              <input className='DescriptionC_Container_Box_P_Small_Input2' type="text" name="DescriptionC2" placeholder="주요 문구를 입력해 주세요" onChange={e => setDescriptionC2(e.target.value)}></input><br/><br/>
              <textarea className='DescriptionC_Container_Box_P_Small_Textarea' cols="60" rows="10" name="DescriptionC3" placeholder="간단한 설명을 입력해 주세요" onChange={e => setDescriptionC3(e.target.value)} />
            </div>

          </div>
        </div>



        {/* DescriptionD */}
        <div className='DescriptionD_Container'>
          <div className='DescriptionD_Container_Box'>
            
            <p className='DescriptionD_Container_Box_P'><span>제품등록 4</span> : 제품에 대한 <strong>상세 설명</strong>을 입력해 주세요.</p>

            <div className="DescriptionD_Container_Box_P_Small">
              <p className='DescriptionD_Container_Box_P_Small_P'></p>
              <img className='DescriptionD_Container_Box_P_Small_Image' src={imgFileD ? imgFileD : ``} alt="" /><br />
              <input className='DescriptionD_Container_Box_P_Small_Input1' type="file" name="DescriptionD1" ref={imgRefD} id="fileInputD" accept="image/*" onChange={settingDetailD1} /><br/><br/>
              <input className='DescriptionD_Container_Box_P_Small_Input2' type="text" name="DescriptionD2" placeholder="주요 문구를 입력해 주세요" onChange={e => setDescriptionD2(e.target.value)}></input><br/><br/>
              <textarea className='DescriptionD_Container_Box_P_Small_Textarea' cols="60" rows="10" name="DescriptionD3" placeholder="간단한 설명을 입력해 주세요" onChange={e => setDescriptionD3(e.target.value)} />
            </div>

          </div>
        </div>


        {/* DescriptionE */}
        <div className='DescriptionE_Container'>
          <div className='DescriptionE_Container_Box'>
            
            <p className='DescriptionE_Container_Box_P'><span>제품등록 5</span> : 제품에 대한 <strong>상세 설명</strong>을 입력해 주세요.</p>

            <div className="DescriptionE_Container_Box_P_Small">
              <p className='DescriptionE_Container_Box_P_Small_P'></p>
              <img className='DescriptionE_Container_Box_P_Small_Image' src={imgFileE ? imgFileE : ``} alt="" /><br />
              <input className='DescriptionE_Container_Box_P_Small_Input1' type="file" name="DescriptionE1" ref={imgRefE} id="fileInputE" accept="image/*" onChange={settingDetailE1} /><br/><br/>
              <input className='DescriptionE_Container_Box_P_Small_Input2' type="text" name="DescriptionE2" placeholder="주요 문구를 입력해 주세요" onChange={e => setDescriptionE2(e.target.value)}></input><br/><br/>
              <textarea className='DescriptionE_Container_Box_P_Small_Textarea' cols="60" rows="10" name="DescriptionE3" placeholder="간단한 설명을 입력해 주세요" onChange={e => setDescriptionE3(e.target.value)} />
            </div>

          </div>
        </div>



        {/* Related Product Name */}
        <div className='RelatedProducts_Container'>
          <div className='RelatedProducts_Container_Box'>

            <p className='RelatedProducts_Container_Box_P'><span>😜</span> 제품과 관련된 <strong>제품</strong> 또는 <strong>서비스</strong>를 입력해 주세요.</p>
            <div className="RelatedProducts_Container_Box_Related">
              <p className='RelatedProducts_Container_Box_Related_Text'><strong>핵심 키워드를 쉽표로 구분하여 입력해 주세요.</strong></p>
              <input className='RelatedProducts_Container_Box_Related_Text_Name' type="text" name="relatedProduct" id="relatedProducts" placeholder="관련 제품 또는 서비스를 입력해 주세요." onChange={e => setRelatedProducts(e.target.value)} /><br/><br/>
            </div>

          </div>
        </div>

        

        {/* Application Specialist Information */}
        <div className='ApplicationSpecialist_Container'>
          <div className='ApplicationSpecialist_Container_Box'>

            <p className='ApplicationSpecialist_Container_Box_P'><span>😜</span> 제품에 대한 <strong>담당자 정보</strong>를 입력해 주세요. (이름, 직급, 연락처)</p>
            <div className="ApplicationSpecialist_Container_Box_Specialist">
              <p className='ApplicationSpecialist_Container_Box_Specialist_Text'><strong>담당자 정보 입력</strong></p>
              <input className='ApplicationSpecialist_Container_Box_Specialist_Text_Name' type="text" name="SpecialistName" id="asname" placeholder="담당자 이름을 입력해 주세요" onChange={e => setApplicationSpecialistName(e.target.value)} /><br/><br/>
              <input className='ApplicationSpecialist_Container_Box_Specialist_Text_Position' type="text" name="SpecialistPosition" id="asposition" placeholder="담당작 직급을 입력해 주세요" onChange={e => setApplicationSpecialistPosition(e.target.value)}></input><br/><br/>
              <input className='ApplicationSpecialist_Container_Box_Specialist_Text_Mobile' type="text" name="SpecialistPhone" id="asphone" placeholder="담당자 연락처를 입력해 주세요" onChange={e => setApplicationSpecialistPhone(e.target.value)} />
            </div>

          </div>
        </div>





        {/* ADVERTISE : 광고 진행 여부 (True / False) */}
        {/* <div className='AdvertiseDo_Container'>
          <div className='AdvertiseDo_Container_Box'>
            <p className='AdvertiseDo_Container_Box_P'><span>❤️</span> 적용 가능한 <strong>Modality</strong>을 선택해 주세요. (중복 선택)</p>
            {jsonData.Modality.map((modality, index) => {
                return (
                  <div className='AdvertiseDo_Container_Box_Small' key={modality.ID}>
                    <input className='AdvertiseDo_Container_Box_Small_Input' id={modality.Value} type="checkbox" name="ModalityProducts" value={modality.Value} required onChange={e => settingModalityProducts(e.target.checked, e.target.value)}/>
                    <label className='AdvertiseDo_Container_Box_Small_Label' htmlFor={modality.Value}>{modality.Title}</label>
                  </div>
                )
              })}  
          </div>
        </div> */}


        {/* ADVERTISE : 광고 Main Title */}
        {/* <div className='Advertise_Container'>
          <div className='Advertise_Container_Box'>
            <p className='Advertise_Container_Box_P'><span>❤️</span> 제품 소개를 위한 간략한 주요 <strong>Title</strong>을 입력해 주세요.</p>
            <label className='Advertise_Container_Box_Label' htmlFor='ProductTitle'></label>
            <input className="Advertise_Container_Box_Input" id="ProductTitle" type="text" name="ProductTitle" placeholder='Enter Product Main Title' required onChange={e => setProductTitle(e.target.value)}></input>
          </div>
        </div> */}

        

        <hr className='RegisterForm_Container_Box_Form_Hr01'></hr>
        <input className='RegisterForm_Container_Box_Form_Input' type="submit" value="등록하기"></input>
        <hr className='RegisterForm_Container_Box_Form_Hr02'></hr>
        

      </form>
    </>
    :
    <NotFound />
    }
    

    <Footer />
    </>
  )
}
