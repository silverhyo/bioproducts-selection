import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
// import Style css
import "./AdminEventsCreate.css";
import Footer from '../../Common/Footer';
import AdminNavbar from '../../Common/AdminNavbar';
// import Components
import NotFound from '../../Common/NotFound';
import Navigation from '../../Common/Navigation';
// useContext
import { AuthContext } from '../../../Context/AuthContext';
import { useContext } from 'react';
import { WebInformation } from '../../../Context/WebInformation';
import { AxiosContext } from '../../../Context/AxiosContext';
import { JsonDataContext } from '../../../Context/JsonDataContext';
import { JsonDataContextEvent } from '../../../Context/JsonDataContextEvent';

export default function AdminEventsCreate() {


  const userInformation = useContext(AuthContext).userDatabaseInfo;
    const jsonDataEvent = useContext(JsonDataContextEvent).jsonDataEvent;
    const api = useContext(AxiosContext).api;

    // ! 01 : state 정의 내리는 곳
  
    
    const [eventMainImage, setEventMainImage] = useState('');
    const [eventBannerImage, setEventBannerImage] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventTitle, setEventTitle] = useState('');
    const [eventURL, setEventURL] = useState('');
    const [eventType, setEventType] = useState('');
    const [eventClose, setEventClose] = useState('');
    const [eventPurpose, setEventPurpose] = useState(['']);
    const [descriptionA1, setDescriptionA1] = useState('');
    const [descriptionA2, setDescriptionA2] = useState('');
    const [descriptionA3, setDescriptionA3] = useState('');
    const [descriptionB1, setDescriptionB1] = useState('');
    const [descriptionB2, setDescriptionB2] = useState('');
    const [descriptionB3, setDescriptionB3] = useState('');
    const [descriptionC1, setDescriptionC1] = useState('');
    const [descriptionC2, setDescriptionC2] = useState('');
    const [descriptionC3, setDescriptionC3] = useState('');
    const [manufacturer, setManufacturer] = useState('');

  
  
    
    // ! Input의 Data가 IMAGE File 또는 Check박스일 경우 아래에 먼저 onChange 함수 정의하고 01에 state 정의함
    // Event Main Image
    const [imgFile, setImgFile] = useState('');
    const imgRef = useRef();
    const handleEventImageURL = (e) => {
      setEventMainImage(e.target.files[0]);
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgFile(reader.result)
      }
    }


    // Event Banner Image
    const [imgFileBanner, setImgFileBanner] = useState('');
    const imgRefBanner = useRef();
    const handleEventBannerImageURL = (e) => {
      setEventBannerImage(e.target.files[0]);
      const file = imgRefBanner.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgFileBanner(reader.result)
      }
    }
  
  
    // Event Purpose
    const [eventPropose1, setEventPurpose1] = useState([]);
    const settingEventPurpose = (isChecked, checkedValue) => {
      if(isChecked) {
        setEventPurpose1([...eventPropose1, checkedValue])
        setEventPurpose([...eventPropose1, checkedValue])
      }else {
        setEventPurpose1(eventPropose1.filter((el) => el!==checkedValue));
        setEventPurpose(eventPropose1.filter((el) => el!==checkedValue))
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
  
  
    const navigate = useNavigate();
  
    // ! 03 : state 변수를 아래의 FormData에 추가애햐 함
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('EMainImage', eventMainImage || '');
      formData.append('EBannerImage', eventBannerImage || '');
      formData.append('EName', eventName);
      formData.append('ETitle', eventTitle);
      formData.append('EUrl', eventURL);
      formData.append('EType', eventType);
      formData.append('EClose', eventClose);
      formData.append('EPurpose', eventPurpose);
      formData.append('EdescriptionA1', descriptionA1 || '');
      formData.append('EdescriptionA2', descriptionA2);
      formData.append('EdescriptionA3', descriptionA3);
      formData.append('EdescriptionB1', descriptionB1 || '');
      formData.append('EdescriptionB2', descriptionB2);
      formData.append('EdescriptionB3', descriptionB3);
      formData.append('EdescriptionC1', descriptionC1 || '');
      formData.append('EdescriptionC2', descriptionC2);
      formData.append('EdescriptionC3', descriptionC3);
      formData.append('EManufacturer', manufacturer);
      
      console.log("formData :", formData);
      
      api.post('/admin/events/create', formData)
      .then(res => {
        alert("정상적으로 등록되었습니다.")
        console.log(res)
        navigate('/admin/home')
      })
      .catch(err => console.log(err))
    }


  return (
    <>
    
    {userInformation.databaseLevel == 'Admin' ?
    <>
      <form className='EventRegisterForm_Container_Box_Form' onSubmit={handleSubmit} encType="multipart/form-data">
        
        {/* Event Main Image */}
        <div className='EventImageURL_Container'>
          <div className='EventImageURL_Container_Box'>

            <div className='EventImageURL_Container_Box_Asking'>
              <p className='EventImageURL_Container_Box_Asking_P'><span>😜</span> Event 진행하는 제품의 <strong>메인 이미지</strong>를 첨부해 주세요.</p>
            </div>
            <div className='EventImageURL_Container_Box_Register'>
              <img className='EventImageURL_Container_Box_Register_Image' src={imgFile ? imgFile : ``} alt='' />
              <input className='EventImageURL_Container_Box_Register_Input' type="file" accept="image/*" ref={imgRef} name="EventImageURL" required onChange={handleEventImageURL} />
            </div>

          </div>
        </div>



        {/* Banner Image */}
        <div className='EventBannerImageURL_Container'>
          <div className='EventBannerImageURL_Container_Box'>

            <div className='EventBannerImageURL_Container_Box_Asking'>
              <p className='EventBannerImageURL_Container_Box_Asking_P'><span>😜</span><strong> Banner 이미지</strong>를 첨부해 주세요.</p>
            </div>
            <div className='EventBannerImageURL_Container_Box_Register'>
              <img className='EventBannerImageURL_Container_Box_Register_Image' src={imgFileBanner ? imgFileBanner : ``} alt='' />
              <input className='EventBannerImageURL_Container_Box_Register_Input' type="file" accept="image/*" ref={imgRefBanner} name="EventImageBannerURL" required onChange={handleEventBannerImageURL} />
            </div>

          </div>
        </div>



        {/* Event Name */}
        <div className='EventName_Container'>
          <div className='EventName_Container_Box'>
            <p className='EventName_Container_Box_P'><span>😜</span> <strong>Event</strong>명을 입력해 주세요.</p>
            <label className='EventName_Container_Box_Label' htmlFor='EventName'></label>
            <input className="EventName_Container_Box_Input" name="EventName" id="EventName" type="text" placeholder='Enter Product Name' required onChange={e => setEventName(e.target.value)}></input>
          </div>
        </div>
        


        {/* Event Main Title */}
        <div className='EventTitle_Container'>
          <div className='EventTitle_Container_Box'>
            <p className='EventTitle_Container_Box_P'><span>😜</span> Event의 주요 <strong>Title</strong>을 간략하게 입력해 주세요.</p>
            <label className='EventTitle_Container_Box_Label' htmlFor='EventTitle'></label>
            <input className="EventTitle_Container_Box_Input" id="EventTitle" type="text" name="EventTitle" placeholder='Enter Product Main Title' required onChange={e => setEventTitle(e.target.value)}></input>
          </div>
        </div>




        {/* Event URL */}
        <div className='EventURL_Container'>
          <div className='EventURL_Container_Box'>
            <p className='EventURL_Container_Box_P'><span>😜</span> Event <strong>연결주소</strong>를 입력해 주세요.</p>
            <label className='EventURL_Container_Box_Label' htmlFor='EventURL'></label>
            <input className="EventURL_Container_Box_Input" id="EventURL" type="text" name="EventURL" placeholder='Event URL' required onChange={e => setEventURL(e.target.value)}></input>
          </div>
        </div>




        {/* Event Type */}
        <div className='EventType_Container'>
          <div className='EventType_Container_Box'>
            <p className='EventType_Container_Box_P'><span>😜</span> <strong>Event Type</strong>을 선택해 주세요.</p>
            <label className='EventType_Container_Box_Label' htmlFor='EventType'></label>
            <select className='EventType_Container_Box_Select' id="EventType" required onChange={e => setEventType(e.target.value)}>
              <option className='EventType_Container_Box_Option' name="EventType" value="">Event Type을 선택해 주세요</option>
              {jsonDataEvent.EventType.map((item, index) => {
                return (
                  <option className='EventType_Container_Box_Option' key={index} name="EventType" value={item.Value}>{item.Title}</option>
                )
              })};
            </select>
          </div>
        </div>



        {/* Event CLose */}
        <div className='EventClose_Container'>
          <div className='EventClose_Container_Box'>
            <p className='EventClose_Container_Box_P'><span>😜</span> Event의 <strong>종료일</strong>을 입력해 주세요.</p>
            <label className='EventClose_Container_Box_Label' htmlFor='EventClose'></label>
            <input className="EventClose_Container_Box_Input" id="EventClose" type="date" name="EventClose" placeholder='Enter Product Main Title' required onChange={e => setEventClose(e.target.value)}></input>
          </div>
        </div>




            
        {/* Event Purpose */}
        <div className='EventPurpose_Container'>
          <div className='EventPurpose_Container_Box'>

            <p className='EventPurpose_Container_Box_P'><span>😜</span> <strong>Event</strong>의 목적을 선택해 주세요. (중복 선택)</p>
            {jsonDataEvent.Filtration.map((item, index) => {
              return (
                <div className='EventPurpose_Container_Box_Small' key={item.ID}>
                  <input className='EventPurpose_Container_Box_Small_Input' id={item.Value} type="checkbox" name="EventPurpose" value={item.Value} onChange={e => settingEventPurpose(e.target.checked, e.target.value)}/>
                  <label className='EventPurpose_Container_Box_Small_Label' htmlFor={item.Value}>{item.Title}</label>
                </div>
              )
            })}        

          </div>
        </div>


        {/* DescriptionA */}
        <div className='DescriptionA_Container'>
          <div className='DescriptionA_Container_Box'>
            <p className='DescriptionA_Container_Box_P'><span>Event 1</span> : Event에 대한 <strong>이미지 자료를</strong> 입력해 주세요.</p>
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
            <p className='DescriptionB_Container_Box_P'><span>Event 2</span> : Event에 대한 <strong>이미지 자료를</strong> 입력해 주세요.</p>
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
            <p className='DescriptionC_Container_Box_P'><span>Event 3</span> : Event에 대한 <strong>이미지 자료를</strong> 입력해 주세요.</p>
            <div className="DescriptionC_Container_Box_P_Small">
              <p className='DescriptionC_Container_Box_P_Small_P'></p>
              <img className='DescriptionC_Container_Box_P_Small_Image' src={imgFileC ? imgFileC : ``} alt="" /><br />
              <input className='DescriptionC_Container_Box_P_Small_Input1' type="file" name="DescriptionC1" ref={imgRefC} id="fileInputC" accept="image/*" onChange={settingDetailC1} /><br/><br/>
              <input className='DescriptionC_Container_Box_P_Small_Input2' type="text" name="DescriptionC2" placeholder="주요 문구를 입력해 주세요" onChange={e => setDescriptionC2(e.target.value)}></input><br/><br/>
              <textarea className='DescriptionC_Container_Box_P_Small_Textarea' cols="60" rows="10" name="DescriptionC3" placeholder="간단한 설명을 입력해 주세요" onChange={e => setDescriptionC3(e.target.value)} />
            </div>

          </div>
        </div>


        {/* Manufacturer */}
        <div className='EventManufacturer_Container'>
            
          <div className='EventManufacturer_Container_Box'>
            <p className='EventManufacturer_Container_Box_P'><span>😜</span> <strong>Manufacturer</strong>를 선택해 주세요.</p>
            <label className='EventManufacturer_Container_Box_Label' htmlFor='manufacturer'></label>
            <select className='EventManufacturer_Container_Box_Select' id="manufacturer" required onChange={e => setManufacturer(e.target.value)}>
              <option className='EventManufacturer_Container_Box_Select_Option' value="">Manufacturer를 선택해 주세요</option>
              {jsonDataEvent.Manufacturer.map((item, index) => {
                return (
                  <option className='EventManufacturer_Container_Box_Select_Option' key={index} name="Manufacturer" value={item.Value}>{item.Title}</option>
                )
              })};
            </select>
          </div>
        </div>


        <input className='EventRegisterForm_Container_Box_Form_Input' type="submit" value="등록하기"></input>
        

      </form>
    </>
    :
    <NotFound />
    }
    
    </>
  )
}
