import React from 'react';
import { useContext } from 'react';
// import Style CSS
import "./Contact.css"
// import ICONS
import { FaPhoneAlt } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
// Context
import { JsonDataContext } from '../../Context/JsonDataContext';

// ! 아래 Prop은 ProductDetailModal로부터 받아온 것 (CONTACTINFO(mobile, manufacturer))
export default function Contact({CONTACTINFO}) {

  // ! a Tag의 정보를 넣기 위해 받아옴
  const contactInfo = CONTACTINFO;
  const jsonData01 = useContext(JsonDataContext).jsonData01.Contact;

  
  // ! 내가 부여한 조건에 맞는 값을 변수에 할당할 수 있다!!!
  let vendorEmail;
  if(contactInfo.manufacturer === 'Sartorius') {
    vendorEmail = jsonData01[0].Sartorius;
  }else if (contactInfo.manufacturer === 'Merck') {
    vendorEmail = jsonData01[0].Merck;
  }else if (contactInfo.manufacturer === 'Cytiva') {
    vendorEmail = jsonData01[0].Cytiva;
  }else if (contactInfo.manufacturer === 'Thermo') {
    vendorEmail = jsonData01[0].Thermo;
  }
  
  console.log("contactInfo :", contactInfo);


  return (
    <div className='Contact_Container'>
      <div className='Contact_Container_Box'>
        <p>이 제품에 대해서 궁금하세요? 아래 연락처로 문의 주세요!</p>
        <div className='Contact_Container_Box_SmallBox'>
          <div className='Contact_Container_Box_SmallBox_EmailBox'>
            <a href={`tel:${contactInfo.mobile}`} className='Contact_Container_Box_SmallBox_EmailBox_Icon'><FaPhoneAlt /></a>
            <a className='Contact_Container_Box_SmallBox_EmailBox_Text'>{contactInfo.inCharge} {contactInfo.position}</a>
          </div>
            
          <div className='Contact_Container_Box_SmallBox_MobileBox'>
            <a href={`${vendorEmail}`} className='Contact_Container_Box_SmallBox_MobileBox_Icon'><MdContactMail /></a>
            <a className='Contact_Container_Box_SmallBox_MobileBox_Text'>{contactInfo.manufacturer} Web</a>
          </div>
        </div>
      </div>
    </div>
  )
};
