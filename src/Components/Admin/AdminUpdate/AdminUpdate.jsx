import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
// import Style
import "./AdminUpdate.css";

// import Components
import AdminNavbar from '../../Common/AdminNavbar';
import Footer from '../../Common/Footer';
import Navigation from '../../Common/Navigation';

// import Context
import { ImageAddressContext } from '../../../Context/ImageAddressContext';
import { WebInformation } from '../../../Context/WebInformation';
import { ProductsDataBaseContext } from '../../../Context/ProductsDataBaseContext';
import { JsonDataContext } from '../../../Context/JsonDataContext';
import { AxiosContext } from '../../../Context/AxiosContext';

// ! 아래 Props는 App.js로부터
export default function AdminUpdate() {

  const imageURL = useContext(ImageAddressContext).imageURL;
  const URL = useContext(WebInformation).URL;
  const productsDataBase = useContext(ProductsDataBaseContext).dtBaseData; 
  const jsonData01 = useContext(JsonDataContext).jsonData01;
  const api = useContext(AxiosContext).api;

  const {id} = useParams();
  const navigate = useNavigate();


  // ! 01 : 복수의 선택이 가능한 checkbox를 가진 input은 다른 변수를 통하여 formData에 넘긴다.
  const [values, setValues] = useState({
    PName: '',
    PMainImage: '',
    PMainTitle: '',
    PType: '',
    modalityProducts: '',
    PFiltration: '',
    PCellLine: '',
    PManufacturer: '',
    PFileA1: '',
    PTitleA2: '',
    PDescriptionA3: '',
    PFileB1: '',
    PTitleB2: '',
    PDescriptionB3: '',
    PFileC1: '',
    PTitleC2: '',
    PDescriptionC3: '',
    PFileD1: '',
    PTitleD2: '',
    PDescriptionD3: '',
    PFileE1: '',
    PTitleE2: '',
    PDescriptionE3: '',
    SName: '',
    SPosition: '',
    SPhone: '',
    PRelated: '',
    AdDo: '',
    AdText: '',
    PService: '',
  } || []);


  // ! 02 : 정보를 얻어오기 위한 useEffect
  useEffect(() => {
    api.get('/admin/read/'+id)
    .then(res => {
      console.log(res.data[0])
      setValues({
        ...values,
        PName: res.data[0].ProductName,
        PMainImage: res.data[0].ProductMainImage,
        PMainTitle: res.data[0].ProductMainTitle,
        PType: res.data[0].ProductType,
        modalityProducts: res.data[0].ProductModality,
        PFiltration: res.data[0].ProductFiltration,
        PCellLine: res.data[0].ProductCellLine,
        PService: res.data[0].ServiceType,
        PManufacturer: res.data[0].ProductManufacturer,
        PFileA1: res.data[0].ProductImageUrl01,
        PTitleA2: res.data[0].ProductTitle01,
        PDescriptionA3: res.data[0].ProductDescription01,
        PFileB1: res.data[0].ProductImageUrl02,
        PTitleB2: res.data[0].ProductTitle02,
        PDescriptionB3: res.data[0].ProductDescription02,
        PFileC1: res.data[0].ProductImageUrl03,
        PTitleC2: res.data[0].ProductTitle03,
        PDescriptionC3: res.data[0].ProductDescription03,
        PFileD1: res.data[0].ProductImageUrl04,
        PTitleD2: res.data[0].ProductTitle04,
        PDescriptionD3: res.data[0].ProductDescription04,
        PFileE1: res.data[0].ProductImageUrl05,
        PTitleE2: res.data[0].ProductTitle05,
        PDescriptionE3: res.data[0].ProductDescription05,
        SName: res.data[0].SpecialistName,
        SPosition: res.data[0].SpecialistPosition,
        SPhone: res.data[0].SpecialistPhone,
        PRelated: res.data[0].ProductRelated,
        AdDo: res.data[0].Advertise,
        AdText: res.data[0].AdvertiseText
      })
    })
    .catch(err => console.log(err))
  },[]);










  // ! 03 : Image 또는 checkbox 정보일 경우 아래에 추가 / Select 일 경우 패스!!!!

  // MainProductImage
  const [imgFileMain, setImgFileMain] = useState('');
  const imgRefMain = useRef();
  function setProductMainImaging(e) {
    const productMainImage = e.target.files[0];
    setValues({...values, PMainImage: productMainImage});
    //화면에 보여지기기
    const file = imgRefMain.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFileMain(reader.result)
    }
  }

  // Modality
  // ! Modality, Filtration, CellLine과 같이 checkbox 인 것들 어떻게 formData로 넘겼는지 중요!
  function settingModalityProducts(isChecked, value) {
    if(isChecked) {  // 체크가 될 때
      setSelectedModality(prev => [...prev, value])
    }else {  // 체크가 해제될 때
      setSelectedModality(prev => prev.filter((el) => el!==value))
    }
  };
  // console.log("modalityChecked :",checkedValueLists);


  // Filtration
  function settingFilterProducts(isChecked, value) {
    if(isChecked) {
      setProductFiltration(prev => [...prev, value])
    }else {
      setProductFiltration(prev => prev.filter((el) => el!==value))
    }
  }
  // console.log("productFiltration :", productFiltration);


  // CellLine
  function settingCellLine(isChecked, value) {
    if(isChecked) {
      setProductCellLine(prev => [...prev, value])
    }else {
      setProductCellLine(prev => prev.filter((el) => el!==value))
    }
  }
  // console.log("productCellLine :", productCellLine);

  
  // Product Description A
  const [imgFileA, setImgFileA] = useState('');
  const imgRefA = useRef();
  function settingDetailA1(e) {
    const imageA = e.target.files[0];
    setValues({...values, PFileA1: imageA});
    const file = imgRefA.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFileA(reader.result);
    }
  };

  // Product Description B
  const [imgFileB, setImgFileB] = useState('');
  const imgRefB = useRef();
  function settingDetailB1(e) {
    const imageB = e.target.files[0];
    setValues({...values, PFileB1: imageB});
    const file = imgRefB.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFileB(reader.result);
    }
  };

  // Product Description C
  const [imgFileC, setImgFileC] = useState('');
  const imgRefC = useRef();
  function settingDetailC1(e) {
    const imageC = e.target.files[0];
    setValues({...values, PFileC1: imageC});
    
    const file = imgRefC.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFileC(reader.result);
    }
  };

  // Product Description D
  const [imgFileD, setImgFileD] = useState('');
  const imgRefD = useRef();
  function settingDetailD1(e) {
    const imageD = e.target.files[0];
    setValues({...values, PFileD1: imageD});
    
    const file = imgRefD.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFileD(reader.result);
    }
  };

  // Product Description E
  const [imgFileE, setImgFileE] = useState('');
  const imgRefE = useRef();
  function settingDetailE1(e) {
    const imageE = e.target.files[0];
    setValues({...values, PFileE1: imageE});

    const file = imgRefE.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFileE(reader.result);
    }
  };

  //Advertise
  const [trueFalse, setTrueFalse] = useState('');
  function settingBoolean(isChecked) {
    console.log("isChecked :", isChecked);
    if(isChecked) {  // 체크가 될 때
      setTrueFalse(true)
    }else {  // 체크가 해제될 때
      setTrueFalse(false)
    }    
  }
  // console.log("trueFalse :", trueFalse);



  const [selectedModality,setSelectedModality] = useState([]);
  useEffect(() => {
    if (values.modalityProducts){
      setSelectedModality(values.modalityProducts.split(',').map(item => item.trim()))
    }
  },[values.modalityProducts, values.PFiltration, values.PCellLine]);


  const [productFiltration,setProductFiltration] = useState([]);
  useEffect(() => {
    if (values.PFiltration){
      setProductFiltration(values.PFiltration.split(',').map(item => item.trim()))
    }
  },[values.modalityProducts, values.PFiltration, values.PCellLine]);


  const [productCellLine,setProductCellLine] = useState([]);
  useEffect(() => {
    if (values.PCellLine){
      setProductCellLine(values.PCellLine.split(',').map(item => item.trim()))
    }
  },[values.modalityProducts, values.PFiltration, values.PCellLine]);





  function isAdvertiseChecked() {
    let advertiseChecked = document.querySelector('.AdvertiseDo_Container_Box_Small_Input');
    // console.log("================================advertiseChecked_1 :", advertiseChecked);
    let valueOfAdvertise = values?.AdDo;
    // console.log("================================valueOfAdvertise_2 :", valueOfAdvertise);
    if(valueOfAdvertise === 1) {
      advertiseChecked.checked = true;
    } else {
      advertiseChecked.checked = false;
    }
  };

  // 아래의 Funtion들은 Checkbox / Radio Box 에 대하여 Database로부터 가져온 data를 바탕으로 어떤 것이 체크되었는지 확인하고 web에 표현하는 부분이다. : END


  // ! 05 : FormData에 입력 정보 추가
  // Form Tag에서 submit 진행행
  function handleUpdates(e) {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append('PName', values.PName);
    formData.append('PMainImage', values.PMainImage);
    formData.append('PMainTitle', values.PMainTitle);
    formData.append('PType', values.PType);
    formData.append('PModality', selectedModality);
    formData.append('PFiltration', productFiltration);
    formData.append('PCellLine', productCellLine);
    formData.append('PManufacturer', values.PManufacturer);
    formData.append('PFileA1', values.PFileA1);
    formData.append('PTitleA2', values.PTitleA2);
    formData.append('PDescriptionA3', values.PDescriptionA3);
    formData.append('PFileB1', values.PFileB1);
    formData.append('PTitleB2', values.PTitleB2);
    formData.append('PDescriptionB3', values.PDescriptionB3);
    formData.append('PFileC1', values.PFileC1);
    formData.append('PTitleC2', values.PTitleC2);
    formData.append('PDescriptionC3', values.PDescriptionC3);
    formData.append('PFileD1', values.PFileD1);
    formData.append('PTitleD2', values.PTitleD2);
    formData.append('PDescriptionD3', values.PDescriptionD3);
    formData.append('PFileE1', values.PFileE1);
    formData.append('PTitleE2', values.PTitleE2);
    formData.append('PDescriptionE3', values.PDescriptionE3);
    formData.append('SName', values.SName);
    formData.append('SPosition', values.SPosition);
    formData.append('SPhone', values.SPhone);
    formData.append('PRelated', values.PRelated);
    // 광고
    formData.append('AdDo', trueFalse);
    formData.append('AdText', values.AdText);
    formData.append('PService', values.PService);
    
    console.log("formData :", formData);

    api.put('/admin/products/update/'+id, formData)
    .then(res => {
      alert("정상적으로 수정되었습니다.")
      console.log(res)
      navigate('/admin/home')
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    console.log('Hello')
  },[values])

  // ! Return에 적절한 곳에 추가 (AdminCreate와 같은 구조!)
  return (
    <>
    <Navigation />
      <form className='Edit_EditForm_Container' onSubmit={handleUpdates}>
        <div className='Edit_EditForm_Container_Box'>
          <p className='Edit_EditForm_Container_Box_P'>Update</p>

          {/* Product Name */}
          <div className='Edit_ProductName_Container'>
            <div className='Edit_ProductName_Container_Box'>
              <p className='Edit_ProductName_Container_Box_P'><span>😘</span> <strong>Product Name</strong>을 입력해 주세요.</p>
              <label className='Edit_ProductName_Container_Box_Label' htmlFor='Edit_ProductName'></label>
              <input className="Edit_ProductName_Container_Box_Input" name="Edit_ProductName" id="Edit_ProductName" type="text" value={values.PName} onChange={e => setValues({...values, PName: e.target.value})}></input>
            </div>
          </div>


          {/* MainProductImage */}
          <div className='Edit_MainProductImage_Container'>
            <div className='Edit_MainProductImage_Container_Box'>

              <div className='Edit_MainProductImage_Container_Box_Asking'>
                <p className='Edit_MainProductImage_Container_Box_Asking_P'><span>😘</span> 제품에 대한 <strong>메인 이미지 사진</strong>을 첨부해 주세요.</p>
              </div>
              <div className='Edit_MainProductImage_Container_Box_Register'>
                <img className='Edit_MainProductImage_Container_Box_Register_Image' src={imgFileMain ? imgFileMain : values.PMainImage} alt='' />
                <input className='Edit_MainProductImage_Container_Box_Register_Input' type="file" accept="image/*" ref={imgRefMain} name="Edit_MainProductImage" onChange={setProductMainImaging} />
              </div>

            </div>
          </div>


          {/* Product Main Title */}
          <div className='Edit_ProductTitle_Container'>
            <div className='Edit_ProductTitle_Container_Box'>
              <p className='Edit_ProductTitle_Container_Box_P'><span>😘</span> 제품 소개를 위한 간략한 주요 <strong>Title</strong>을 입력해 주세요.</p>
              <label className='Edit_ProductTitle_Container_Box_Label' htmlFor='Edit_ProductTitle'></label>
              <input className="Edit_ProductTitle_Container_Box_Input" id="Edit_ProductTitle" type="text" value={values.PMainTitle} name="Edit_ProductTitle" onChange={e => setValues({...values, PMainTitle: e.target.value})} ></input>
            </div>
          </div>


          {/* Product Type */}
          <div className='Edit_ProductType_Container'>
            <div className='Edit_ProductType_Container_Box'>
              <p className='Edit_ProductType_Container_Box_P'><span>😘</span> <strong>Product Type</strong>을 선택해 주세요.</p>
              <label className='Edit_ProductType_Container_Box_Label' htmlFor='Edit_product_type'></label>
              <select className='Edit_ProductType_Container_Box_Select' id="Edit_product_type" value={values.PType} onChange={e => setValues({...values, PType: e.target.value})}>
                <option className='Edit_ProductType_Container_Box_Option' name="Edit_ProductType" value="">Product Type을 선택해 주세요</option>
                {jsonData01.ProductType.map((Product, index) => {
                  return (
                    <option className='Edit_ProductType_Container_Box_Option' key={index} name="Edit_ProductType" value={Product.Value}>{Product.Title}</option>
                  )
                })};
              </select>
            </div>
          </div>


          {/* Modality Products */}
          <div className='Edit_ModalityProducts_Container'>
            <div className='Edit_ModalityProducts_Container_Box'>
              <p className='Edit_ModalityProducts_Container_Box_P'><span>😘</span> 적용 가능한 <strong>Modality</strong>을 선택해 주세요. (중복 선택 가능)</p>
              {jsonData01.Modality.map((modality, index) => {
                  return (
                    <div className='Edit_ModalityProducts_Container_Box_Small' key={modality.ID}>
                      <input className='Edit_ModalityProducts_Container_Box_Small_Input' 
                        id={'Edit_'+modality.Value} 
                        type="checkbox" 
                        name="Edit_ModalityProducts" 
                        value={modality.Value}
                        checked={selectedModality.includes(`${modality.Value}`)}
                        onChange={e => settingModalityProducts(e.target.checked, e.target.value)}/>
                      <label className='Edit_ModalityProducts_Container_Box_Small_Label' htmlFor={'Edit_'+modality.Value}>{modality.Title}</label>
                    </div>
                  )
                })}  

            </div>
          </div>


          {/* Application Filtration */}
          <div className='Edit_ApplicationFilterProducts_Container'>
            <div className='Edit_ApplicationFilterProducts_Container_Box'>

              <p className='Edit_ApplicationFilterProducts_Container_Box_P'><span>😘</span> <strong>DSP 공정 단계</strong>를 선택해 주세요. (중복 선택 가능)</p>
              {jsonData01.Filtration.map((filtration, index) => {
                return (
                  <div className='Edit_ApplicationFilterProducts_Container_Box_Small' key={filtration.ID}>
                    <input className='Edit_ApplicationFilterProducts_Container_Box_Small_Input' 
                      id={'Edit_'+filtration.Value} 
                      type="checkbox" 
                      name="Edit_FilterProduct" 
                      value={filtration.Value} 
                      checked={productFiltration.includes(`${filtration.Value}`)}
                      onChange={e => settingFilterProducts(e.target.checked, e.target.value)}/>
                    <label className='Edit_ApplicationFilterProducts_Container_Box_Small_Label' htmlFor={'Edit_'+filtration.Value}>{filtration.Title}</label>
                  </div>
                )
              })}        

            </div>
          </div> 


          {/* Application Cell Line */}
          <div className='Edit_ApplicationCellLine_Container'>
            <div className='Edit_ApplicationCellLine_Container_Box'>
              <p className='Edit_ApplicationCellLine_Container_Box_P'><span>😘</span> <strong>Cell Line</strong>을 선택해 주세요. (중복 선택 가능)</p>
              {jsonData01.ApplicationCellLine.map((cellLine, index) => {
                return (
                  <div className='Edit_ApplicationCellLine_Container_Box_Small' key={cellLine.ID}>
                    <input className='Edit_ApplicationCellLine_Container_Box_Small_Input' 
                      name="Edit_ApplicationCellLine" 
                      id={cellLine.Value} 
                      type="checkbox" 
                      value={cellLine.Value} 
                      checked={productCellLine.includes(`${cellLine.Value}`)}
                      onChange={e => settingCellLine(e.target.checked, e.target.value)}/>
                    <label className='Edit_ApplicationCellLine_Container_Box_Small_Label' htmlFor={cellLine.Value}>{cellLine.Title}</label>
                  </div>
                )
              })}        
            </div>
          </div>


          {/* Service */}
          <div className='Edit_ProductType_Container'>
            <div className='Edit_ProductType_Container_Box'>
              <p className='Edit_ProductType_Container_Box_P'><span>😘</span> <strong>Service</strong>를 선택해 주세요.</p>
              <label className='Edit_ProductType_Container_Box_Label' htmlFor='Edit_service_type'></label>
              <select className='Edit_ProductType_Container_Box_Select' id="Edit_service_type" value={values.PService} onChange={e => setValues({...values, PService: e.target.value})}>
                <option className='Edit_ProductType_Container_Box_Option' name="Edit_ServiceType" value="">Service를 선택해 주세요</option>
                {jsonData01.Service.map((item, index) => {
                  return (
                    <option className='Edit_ProductType_Container_Box_Option' key={index} name="Edit_ProductType" value={item.Value}>{item.Title}</option>
                  )
                })};
              </select>
            </div>
          </div>


          {/* Product Manufacturer */}
          <div className='Edit_Manufacturer_Container'>
            
            <div className='Edit_Manufacturer_Container_Box'>
              <p className='Edit_Manufacturer_Container_Box_P'><span>😘</span> <strong>Manufacturer</strong>를 선택해 주세요.</p>

              <label className='Edit_Manufacturer_Container_Box_Label' htmlFor='Edit_manufacturer'></label>
              <select className='Edit_Manufacturer_Container_Box_Select' id="Edit_manufacturer" value={values.PManufacturer} onChange={e => setValues({...values, PManufacturer: e.target.value})}>
                <option className='Edit_Manufacturer_Container_Box_Select_Option' value="">Manufacturer를 선택해 주세요</option>
                {jsonData01.Manufacturer.map((manufacture, index) => {
                  return (
                    <option className='Edit_Manufacturer_Container_Box_Select_Option' key={index} name="Manufacturer" value={manufacture.Value}>{manufacture.Title}</option>
                  )
                })};
              </select>
            </div>
          </div>


          {/* Product Description A */}
          <div className='Edit_DescriptionA_Container'>
            <div className='Edit_DescriptionA_Container_Box'>

              <p className='Edit_DescriptionA_Container_Box_P'><span>제품등록 1</span> : 제품에 대한 <strong>상세 설명</strong>을 입력해 주세요.</p>

              <div className="Edit_DescriptionA_Container_Box_P_Small">
                <p className='Edit_DescriptionA_Container_Box_P_Small_P'></p>
                <img className='Edit_DescriptionA_Container_Box_P_Small_Image' src={imgFileA ? imgFileA : values.PFileA1} alt="" /><br />
                <input className='Edit_DescriptionA_Container_Box_P_Small_Input1' type="file" name="Edit_DescriptionA1" id="Edit_fileInputA" ref={imgRefA} accept="image/*" onChange={settingDetailA1} /><br/><br/>
                <input className='Edit_DescriptionA_Container_Box_P_Small_Input2' type="text" name="Edit_DescriptionA2" value={values.PTitleA2} onChange={e => setValues({...values, PTitleA2: e.target.value})}></input><br/><br/>
                <textarea className='Edit_DescriptionA_Container_Box_P_Small_Textarea' cols="60" rows="10" name="Edit_DescriptionA3" value={values.PDescriptionA3} onChange={e => setValues({...values, PDescriptionA3: e.target.value})} />
              </div>

            </div>
          </div>


          {/* Product Description B */}
          <div className='Edit_DescriptionB_Container'>
            <div className='Edit_DescriptionB_Container_Box'>

              <p className='Edit_DescriptionB_Container_Box_P'><span>제품등록 2</span> : 제품에 대한 <strong>상세 설명</strong>을 입력해 주세요.</p>

              <div className="Edit_DescriptionB_Container_Box_P_Small">
                <p className='Edit_DescriptionB_Container_Box_P_Small_P'></p>
                <img className='Edit_DescriptionB_Container_Box_P_Small_Image' src={imgFileB ? imgFileB : values.PFileB1} alt="" /><br />
                <input className='Edit_DescriptionB_Container_Box_P_Small_Input1' type="file" name="Edit_DescriptionB1" ref={imgRefB} id="Edit_fileInputB" accept="image/*" onChange={settingDetailB1} /><br/><br/>
                <input className='Edit_DescriptionB_Container_Box_P_Small_Input2' type="text" name="Edit_DescriptionB2" value={values.PTitleB2} onChange={e => setValues({...values, PTitleB2: e.target.value})}></input><br/><br/>
                <textarea className='Edit_DescriptionB_Container_Box_P_Small_Textarea' cols="60" rows="10" name="Edit_DescriptionB3" value={values.PDescriptionB3} onChange={e => setValues({...values, PDescriptionB3: e.target.value})} />
              </div>

            </div>
          </div>



          {/* Product Description C */}
          <div className='Edit_DescriptionC_Container'>
            <div className='Edit_DescriptionC_Container_Box'>

              <p className='Edit_DescriptionC_Container_Box_P'><span>제품등록 3</span> : 제품에 대한 <strong>상세 설명</strong>을 입력해 주세요.</p>

              <div className="Edit_DescriptionC_Container_Box_P_Small">
                <p className='Edit_DescriptionC_Container_Box_P_Small_P'></p>
                <img className='Edit_DescriptionC_Container_Box_P_Small_Image' src={imgFileC ? imgFileC : values.PFileC1} alt="" /><br />
                <input className='Edit_DescriptionC_Container_Box_P_Small_Input1' type="file" name="Edit_DescriptionC1" ref={imgRefC} id="Edit_fileInputC" accept="image/*" onChange={settingDetailC1} /><br/><br/>
                <input className='Edit_DescriptionC_Container_Box_P_Small_Input2' type="text" name="Edit_DescriptionC2" value={values.PTitleC2} onChange={e => setValues({...values, PTitleC2: e.target.value})}></input><br/><br/>
                <textarea className='Edit_DescriptionC_Container_Box_P_Small_Textarea' cols="60" rows="10" name="Edit_DescriptionC3" value={values.PDescriptionC3} onChange={e => setValues({...values, PDescriptionC3: e.target.value})} />
              </div>

            </div>
          </div>


          {/* Product Description D */}
          {/* Documentation */}
          <div className='Edit_DescriptionD_Container'>
            <div className='Edit_DescriptionD_Container_Box'>

              <p className='Edit_DescriptionD_Container_Box_P'><span>자료등록 1</span> : 자료에 대한 <strong>정보</strong>를 입력해 주세요.</p>

              <div className="Edit_DescriptionD_Container_Box_P_Small">
                <p className='Edit_DescriptionD_Container_Box_P_Small_P'></p>
                <img className='Edit_DescriptionD_Container_Box_P_Small_Image' src={imgFileD ? imgFileD : values.PFileD1} alt="" /><br />
                <input className='Edit_DescriptionD_Container_Box_P_Small_Input1' type="file" name="Edit_DescriptionD1" ref={imgRefD} id="Edit_fileInputD" accept="image/*" onChange={settingDetailD1}></input>
                <input className='Edit_DescriptionD_Container_Box_P_Small_Input2' type="text" name="Edit_DescriptionD2" value={values.PTitleD2} onChange={e => setValues({...values, PTitleD2: e.target.value})} ></input>
                <input className='Edit_DescriptionD_Container_Box_P_Small_Input3' type='text' name="Edit_DescriptionD3" value={values.PDescriptionD3} onChange={e => setValues({...values, PDescriptionD3: e.target.value})}></input>
              </div>

            </div>
          </div>


          {/* Product Description E */}
          {/* Documentation */}
          <div className='Edit_DescriptionE_Container'>
            <div className='Edit_DescriptionE_Container_Box'>

              <p className='Edit_DescriptionE_Container_Box_P'><span>자료등록 2</span> : 자료에 대한 <strong>정보</strong>를 입력해 주세요.</p>

              <div className="Edit_DescriptionE_Container_Box_P_Small">
                <p className='Edit_DescriptionE_Container_Box_P_Small_P'></p>
                <img className='Edit_DescriptionE_Container_Box_P_Small_Image' src={imgFileE ? imgFileE : values.PFileE1} alt="" /><br />
                <input className='Edit_DescriptionE_Container_Box_P_Small_Input1' type="file" name="Edit_DescriptionE1" id="Edit_fileInputE" ref={imgRefE} accept="image/*" onChange={settingDetailE1}></input>
                <input className='Edit_DescriptionE_Container_Box_P_Small_Input2' type="text" name="Edit_DescriptionE2" value={values.PTitleE2} onChange={e => setValues({...values, PTitleE2: e.target.value})} ></input>
                <input className='Edit_DescriptionE_Container_Box_P_Small_Input3' type='text' name="Edit_DescriptionE3" value={values.PDescriptionE3} onChange={e => setValues({...values, PDescriptionE3: e.target.value})}></input>
              </div>

            </div>
          </div>




          {/* Product Related */}
          <div className='Edit_ProductRelated_Container'>
            <div className='Edit_ProductRelated_Container_Box'>

              <p className='Edit_ProductRelated_Container_Box_P'><span>😜</span> 제품과 관련된 <strong>제품</strong> 또는 <strong>서비스</strong>를 입력해 주세요.</p>
              <div className="Edit_ProductRelated_Container_Box_Related">
                <p className='Edit_ProductRelated_Container_Box_Related_Text'><strong>핵심 키워드를 쉽표로 구분하여 입력해 주세요.</strong></p>
                <input className='Edit_ProductRelated_Container_Box_Related_Text_Key' type="text" name="Edit_ProductRelated" id="Edit_Related" value={values.PRelated} onChange={e => setValues({...values, PRelated: e.target.value})} />
              </div>

            </div>
          </div>





          {/* ApplicationSpecialist */}
          <div className='Edit_ApplicationSpecialist_Container'>
            <div className='Edit_ApplicationSpecialist_Container_Box'>

              <p className='Edit_ApplicationSpecialist_Container_Box_P'><span>😘</span> 제품에 대한 <strong>담당자 정보</strong>를 입력해 주세요. (이름, 직급, 연락처)</p>
              <div className="Edit_ApplicationSpecialist_Container_Box_Specialist">
                <p className='Edit_ApplicationSpecialist_Container_Box_Specialist_Text'><strong>담당자 정보 입력</strong></p>
                <input className='Edit_ApplicationSpecialist_Container_Box_Specialist_Text_Name' type="text" name="Edit_SpecialistName" id="Edit_asname" value={values.SName} onChange={e => setValues({...values, SName: e.target.value})} /><br/><br/>
                <input className='Edit_ApplicationSpecialist_Container_Box_Specialist_Text_Position' type="text" name="Edit_SpecialistPosition" id="Edit_asposition" value={values.SPosition} onChange={e => setValues({...values, SPosition: e.target.value})} ></input><br/><br/>
                <input className='Edit_ApplicationSpecialist_Container_Box_Specialist_Text_Mobile' type="text" name="Edit_SpecialistPhone" id="Edit_asphone" value={values.SPhone} onChange={e => setValues({...values, SPhone: e.target.value})} />
              </div>

            </div>
          </div>






          {/* ADVERTISE : 광고 진행 여부 (True / False) */}
          <div className='AdvertiseDo_Container'>
            <div className='AdvertiseDo_Container_Box'>
              <p className='AdvertiseDo_Container_Box_P'><span>❤️</span> <strong>광고 진행</strong>여부를 선택해 주세요.</p>
              {jsonData01.Boolean.map((item, index) => {
                  return (
                    <div className='AdvertiseDo_Container_Box_Small' key={item.ID}>
                      <input className='AdvertiseDo_Container_Box_Small_Input' id={item.Value} type="checkbox" name="Advertise" onChange={e => settingBoolean(e.target.checked)}/>
                      <label className='AdvertiseDo_Container_Box_Small_Label' htmlFor={item.Value}>{item.Value}</label>
                    </div>
                  )
                })}  

            </div>
          </div>
              
              
          {/* ADVERTISE : 광고 Main Title */}
          <div className='AdvertiseText_Container'>
            <div className='AdvertiseText_Container_Box'>
              <p className='AdvertiseText_Container_Box_P'><span>❤️</span> 제품 광고를 위한 간략한 주요 <strong>Text</strong>를 입력해 주세요.</p>
              <label className='AdvertiseText_Container_Box_Label' htmlFor='Advertisetext'></label>
              <input className="AdvertiseText_Container_Box_Input" id="Advertisetext" type="text" name="Advertisetext" value={values.AdText} placeholder='광고 문구를 입력해 주세요' onChange={e => setValues({...values, AdText: e.target.value})}></input>
            </div>
          </div>





          <input className='Edit_Submit_Button' type="submit" value="수정하기" />

        </div>
      </form>
      
      <div className='Edit_Cancel_Button_Box'>
        <Link to='/admin/home' style={{textDecoration:"none"}}><div className='Edit_Cancel_Button'>취소하기</div></Link>
      </div>
      <Footer />
    </>
  )
}
