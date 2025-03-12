import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// import Components
import AdminNavbar from '../../Common/AdminNavbar';
import Footer from '../../Common/Footer';

//import Style
import './AdminEventsUpdate.css';

// import Context
import { AxiosContext } from '../../../Context/AxiosContext';
import { ImageAddressContext } from '../../../Context/ImageAddressContext';
import { JsonDataContextEvent } from '../../../Context/JsonDataContextEvent';

import { useParams } from 'react-router-dom';

export default function AdminEventsUpdate() {

  const api = useContext(AxiosContext).api;
  const imageURL = useContext(ImageAddressContext).imageURL;
  const jsonDataEvent = useContext(JsonDataContextEvent).jsonDataEvent;
  const {id} = useParams();
  const navigate = useNavigate();

  // * 수정된 정보가 이 value로 들어온다!!
  const [values, setValues] = useState({
    eventMainImage: '',
    eventBannerImage: '',
    eventName: '',
    eventTitle: '',
    eventURL: '',
    eventType: '',
    eventPurpose: '',
    descriptionA1: '',
    descriptionA2: '',
    descriptionA3: '',
    descriptionB1: '',
    descriptionB2: '',
    descriptionB3: '',
    descriptionC1: '',
    descriptionC2: '',
    descriptionC3: '',
    manufacturer: '',
  } || []);

  console.log("AdminEventUpgrade[values] :", values);


  // * input 정보를 불러오기!
  useEffect(() => {
    api.get('/admin/events/read/'+id)
    .then(res => {
      setValues({
        eventMainImage: res.data[0].EventImageURL || '',
        eventBannerImage: res.data[0].EventBannerImageURL,
        eventName: res.data[0].EventName,
        eventTitle: res.data[0].EventTitle,
        eventURL: res.data[0].EventURL,
        eventType: res.data[0].EventType,
        eventPurpose: res.data[0].EventPurpose,
        descriptionA1: res.data[0].EventDescriptionA1,
        descriptionA2: res.data[0].EventDescriptionA2,
        descriptionA3: res.data[0].EventDescriptionA3,
        descriptionB1: res.data[0].EventDescriptionB1,
        descriptionB2: res.data[0].EventDescriptionB2,
        descriptionB3: res.data[0].EventDescriptionB3,
        descriptionC1: res.data[0].EventDescriptionC1,
        descriptionC2: res.data[0].EventDescriptionC2,
        descriptionC3: res.data[0].EventDescriptionC3,
        manufacturer: res.data[0].Manufacturer,
      })
    })
    .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    isEventChecked()
  },[values]);

  // * 기존 Data 상태를 Form에 삽입한다.
  // Event Main Image
  const [imgFileMain, setImageFileMain] = useState('');
  const imgRef = useRef();
  function handleEventImageURL(e) {
    const eventMainImage = e.target.files[0];
    setValues({...values, eventMainImage: eventMainImage});
    // 화면에 보여지기
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageFileMain(reader.result)
    }
  };

  // Event Banner Image
  const [imgFileBanner, setImageFileBanner] = useState('');
  const imgRefBanner = useRef();
  function handleEventBannerImageURL(e) {
    const eventBannerImage = e.target.files[0];
    setValues({...values, eventBannerImage: eventBannerImage});
    // 화면에 보여지기
    const file = imgRefBanner.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageFileBanner(reader.result)
    }
  };

  // Product Description A
  const [imgFileA, setImgFileA] = useState('');
  const imgRefA = useRef();
  function settingDetailA1(e) {
    const imageA = e.target.files[0];
    setValues({...values, descriptionA1: imageA});
    
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
    setValues({...values, descriptionB1: imageB});
    
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
    setValues({...values, descriptionC1: imageC});
    
    const file = imgRefC.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFileC(reader.result);
    }
  };

  // CheckBox : Purpose 중복 처리
  const [checkedEventPurpose, setCheckedEventPurpose] = useState([]);
  function settingEventPurpose(isChecked, checkedValue) {
    if(isChecked) {
      setCheckedEventPurpose([...checkedEventPurpose, checkedValue])
    } else {
      setCheckedEventPurpose(checkedEventPurpose.filter((el) => el!==checkedValue))
    }
  };

  // * CheckBox 중복 
  function isEventChecked() {
    let purposeChecked = document.querySelectorAll('.EventPurpose_Container_Box_Small_Input');
    let valueOfEventPurpose = values.eventPurpose;
    let eventPurposeIsChecked = valueOfEventPurpose?.split(',');
    for(let i = 0; i < purposeChecked.length; i++) {
      if(eventPurposeIsChecked?.includes(purposeChecked[i].value)) {
        purposeChecked[i].checked = true;
      }
    }
    setCheckedEventPurpose(eventPurposeIsChecked);
  }


  // * FormData에 새로운 정보 추가하여 서버에 보내기
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append('EMainImage', values.eventMainImage || '');
    formData.append('EBannerImage', values.eventBannerImage || '');
    formData.append('EName', values.eventName || '');
    formData.append('ETitle', values.eventTitle || '');
    formData.append('EUrl', values.eventURL || '');
    formData.append('EType', values.eventType || '');
    formData.append('EPurpose', checkedEventPurpose || '');
    formData.append('EdescriptionA1', values.descriptionA1 || '');
    formData.append('EdescriptionA2', values.descriptionA2 || '');
    formData.append('EdescriptionA3', values.descriptionA3 || '');
    formData.append('EdescriptionB1', values.descriptionB1 || '');
    formData.append('EdescriptionB2', values.descriptionB2 || '');
    formData.append('EdescriptionB3', values.descriptionB3 || '');
    formData.append('EdescriptionC1', values.descriptionC1 || '');
    formData.append('EdescriptionC2', values.descriptionC2 || '');
    formData.append('EdescriptionC3', values.descriptionC3 || '');
    formData.append('EManufacturer', values.manufacturer || '');

    console.log("formData :", formData);

    api.put('/admin/events/update/'+id, formData)
    .then(res => {
      alert('정상적으로 업데이트 되었습니다')
      navigate('/admin/events/list')
    })
    .catch(err => console.log(err))
  }





  return (
    <>
    <AdminNavbar />
      <form className='RegisterForm_Container_Box_Form' onSubmit={handleSubmit} encType="multipart/form-data" style={{background:"rgb(44, 44, 41)"}}>
          
        {/* Event Main Image */}
        <div className='EventUpdateImageURL_Container'>
          <div className='EventUpdateImageURL_Container_Box'>
  
            <div className='EventUpdateImageURL_Container_Box_Asking'>
              <p className='EventUpdateImageURL_Container_Box_Asking_P'><span>😜</span> Event 진행하는 제품의 <strong>메인 이미지</strong>를 첨부해 주세요.</p>
            </div>
            <div className='EventUpdateImageURL_Container_Box_Register'>
              <img className='EventUpdateImageURL_Container_Box_Register_Image' src={imgFileMain ? imgFileMain : imageURL+values.eventMainImage} alt='' />
              <input className='EventUpdateImageURL_Container_Box_Register_Input' type="file" accept="image/*" ref={imgRef} name="EventImageURL" onChange={handleEventImageURL} />
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
              <img className='EventBannerImageURL_Container_Box_Register_Image' src={imgFileBanner ? imgFileBanner : imageURL+values.eventBannerImage} alt='' />
              <input className='EventBannerImageURL_Container_Box_Register_Input' type="file" accept="image/*" ref={imgRefBanner} name="EventImageBannerURL" onChange={handleEventBannerImageURL} />
            </div>
  
          </div>
        </div>
  
  
  
        {/* Event Name */}
        <div className='EventName_Container'>
          <div className='EventName_Container_Box'>
            <p className='EventName_Container_Box_P'><span>😜</span> <strong>Event</strong>명을 입력해 주세요.</p>
            <label className='EventName_Container_Box_Label' htmlFor='EventName'></label>
            <input className="EventName_Container_Box_Input" name="EventName" id="EventName" type="text" value={values.eventName} onChange={e => setValues({...values, eventName: e.target.value})}></input>
          </div>
        </div>
        
  
  
        {/* Event Main Title */}
        <div className='EventTitle_Container'>
          <div className='EventTitle_Container_Box'>
            <p className='EventTitle_Container_Box_P'><span>😜</span> Event의 주요 <strong>Title</strong>을 간략하게 입력해 주세요.</p>
            <label className='EventTitle_Container_Box_Label' htmlFor='EventTitle'></label>
            <input className="EventTitle_Container_Box_Input" id="EventTitle" type="text" name="EventTitle" value={values.eventTitle} onChange={e => setValues({...values, eventTitle: e.target.value})}></input>
          </div>
        </div>
  
  
  
  
        {/* Event URL */}
        <div className='EventURL_Container'>
          <div className='EventURL_Container_Box'>
            <p className='EventURL_Container_Box_P'><span>😜</span> Event <strong>연결주소</strong>를 입력해 주세요.</p>
            <label className='EventURL_Container_Box_Label' htmlFor='EventURL'></label>
            <input className="EventURL_Container_Box_Input" id="EventURL" type="text" name="EventURL" value={values.eventURL} onChange={e => setValues({...values, eventURL: e.target.value})}></input>
          </div>
        </div>
  
  
  
  
        {/* Event Type */}
        <div className='EventType_Container'>
          <div className='EventType_Container_Box'>
            <p className='EventType_Container_Box_P'><span>😜</span> <strong>Event Type</strong>을 선택해 주세요.</p>
            <label className='EventType_Container_Box_Label' htmlFor='EventType'></label>
            <select className='EventType_Container_Box_Select' id="EventType" value={values.eventType} onChange={e => setValues({...values, eventType: e.target.value})}>
              <option className='EventType_Container_Box_Option' name="EventType" value=''>Event Type을 선택해 주세요</option>
              {jsonDataEvent.EventType.map((item, index) => {
                return (
                  <option className='EventType_Container_Box_Option' key={index} name="EventType" value={item.Value}>{item.Title}</option>
                )
              })};
            </select>
          </div>
        </div>
            
            
            
        {/* Event CLosed */}
        {/* <div className='EventClosed_Container'>
          <div className='EventClosed_Container_Box'>
            <p className='EventClosed_Container_Box_P'><span>😜</span> Event의 <strong>종료일</strong>을 입력해 주세요.</p>
            <label className='EventClosed_Container_Box_Label' htmlFor='EventClosed'></label>
            <input className="EventClosed_Container_Box_Input" id="EventClosed" type="date" name="EventClosed" value={values.eventClosed} required onChange={e => setValues(e.target.value)}></input>
          </div>
        </div> */}
            
            
            
            
            
        {/* Event Purpose */}
        <div className='EventPurpose_Container'>
          <div className='EventPurpose_Container_Box'>
            
            <p className='EventPurpose_Container_Box_P'><span>😜</span> <strong>Event</strong>의 목적을 선택해 주세요. (중복 선택)</p>
            {jsonDataEvent.Filtration.map((item, index) => {
              return (
                <div className='EventPurpose_Container_Box_Small' key={item.ID}>
                  <input className='EventPurpose_Container_Box_Small_Input' id={`Edit`+item.Value} type="checkbox" name="EventPurpose" value={item.Value} onChange={e => settingEventPurpose(e.target.checked, e.target.value)}/>
                  <label className='EventPurpose_Container_Box_Small_Label' htmlFor={`Edit`+item.Value}>{item.Title}</label>
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
              <img className='DescriptionA_Container_Box_P_Small_Image' src={imgFileA ? imgFileA : imageURL+values.descriptionA1} alt="" /><br />
              <input className='DescriptionA_Container_Box_P_Small_Input1' type="file" name="DescriptionA1" id="fileInputA" ref={imgRefA} accept="image/*" onChange={settingDetailA1} /><br/><br/>
              <input className='DescriptionA_Container_Box_P_Small_Input2' type="text" name="DescriptionA2" value={values.descriptionA2} onChange={e => setValues({...values, descriptionA2: e.target.value})}></input><br/><br/>
              <textarea className='DescriptionA_Container_Box_P_Small_Textarea' cols="60" rows="10" name="DescriptionA3" value={values.descriptionA3} onChange={e => setValues({...values, descriptionA3: e.target.value})} />
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
              <input className='DescriptionB_Container_Box_P_Small_Input2' type="text" name="DescriptionB2" value={values.descriptionB2} onChange={e => setValues({...values, descriptionB2: e.target.value})}></input><br/><br/>
              <textarea className='DescriptionB_Container_Box_P_Small_Textarea' cols="60" rows="10" name="DescriptionB3" value={values.descriptionB3} onChange={e => setValues({...values, descriptionB3: e.target.value})} />
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
              <input className='DescriptionC_Container_Box_P_Small_Input2' type="text" name="DescriptionC2" value={values.descriptionC2} onChange={e => setValues({...values, descriptionC2: e.target.value})}></input><br/><br/>
              <textarea className='DescriptionC_Container_Box_P_Small_Textarea' cols="60" rows="10" name="DescriptionC3" value={values.descriptionC3} onChange={e => setValues({...values, descriptionC3: e.target.value})} />
            </div>
          
          </div>
        </div>
          
          
        {/* Manufacturer */}
        <div className='Manufacturer_Container'>
            
          <div className='Manufacturer_Container_Box'>
            <p className='Manufacturer_Container_Box_P'><span>😜</span> <strong>Manufacturer</strong>를 선택해 주세요.</p>
            <label className='Manufacturer_Container_Box_Label' htmlFor='manufacturer'></label>
            <select className='Manufacturer_Container_Box_Select' id="manufacturer" value={values.manufacturer} onChange={e => setValues({...values, manufacturer: e.target.value})}>
              <option className='Manufacturer_Container_Box_Select_Option' value="">Manufacturer를 선택해 주세요</option>
              {jsonDataEvent.Manufacturer.map((item, index) => {
                return (
                  <option className='Manufacturer_Container_Box_Select_Option' key={index} name="Manufacturer" value={item.Value}>{item.Title}</option>
                )
              })};
            </select>
          </div>
        </div>
            
            
        <input className='EditUpdate_Submit_Button' type="submit" value="수정하기" />
              
        </form>

        <div className='Edit_Cancel_Button_Box'>
          <Link to='/admin/events/list' style={{textDecoration:"none"}}><div className='Edit_Cancel_Button'>취소하기</div></Link>
        </div>
        <Footer />
    </>
  )
}
