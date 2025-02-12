import React from 'react';
import { Link } from 'react-router-dom';
// import Style
import "./LoginKakao.css";
// import Image
import Image02 from '../../../Sources/Images/kakao_login_large_wide.png';
import ImageSarto from '../../../Sources/Images/Sartorius-Logo.png';

export default function LoginKakao() {

  // Login 현 01 : Node js 서버를 거쳐 Kakao에게 Access Token을 요청한다.
  const handleLogin = () => {
    window.location.href = process.env.REACT_APP_SERVER_URL;
  };

  return (
    <div className='LoginKakao_Container'>
      <div className='LoginKakao_Container_Box'>
        <div className='LoginKakao_Container_Box_ButtonBox'>


          <div className='LoginKakao_Container_Box_ButtonBox_ImageBox'>
            <img className='LoginKakao_Container_Box_ButtonBox_ImageBox_Image' src={ImageSarto} alt=''></img>
          </div>


          <div className='LoginKakao_Container_Box_ButtonBox_Text01'>간편하게 로그인하시고<br></br>다양한 서비스를 이용해보세요.</div>



          <button className='LoginKakao_Container_Box_LoginKakao_Container_Box_ButtonBox_Button' onClick={handleLogin}>
            <img className='LoginKakao_Container_Box_ButtonBox_Button_Image' src={Image02} alt=""></img>
          </button>

          <Link to='/home' style={{textDecoration: "none"}}><div className='LoginKakao_Container_Box_ButtonBox_Text02'>돌아가기</div></Link>

        </div>
      </div>
    </div>
  )
}
// Login 현 02 : server.js에서 REACT_APP_SERVER_URL (http://localhost8000/auth/kaka) 에서 리다이렉트 진행한다.