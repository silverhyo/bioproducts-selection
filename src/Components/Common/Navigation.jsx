import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
// import Style css
import "./Navigation.css";
// ICONS
import { GrHomeRounded } from "react-icons/gr";
import { MdFiberNew } from "react-icons/md";
import { LiaProductHunt } from "react-icons/lia";
import { CiLogin } from "react-icons/ci";
import { RiAdvertisementLine } from "react-icons/ri";
import { SlDiamond } from "react-icons/sl";
import { CiLogout } from "react-icons/ci";
// import Context
import { UserInfoContext } from '../../Context/UserInfoContext';
import { AuthContext } from '../../Context/AuthContext';


export default function Navigation() {

  const userInformation = useContext(AuthContext).userStatus;


  useEffect(() => {
    console.log("hi");
  },[userInformation]);
  console.log("Navigation-userInformation :", userInformation)











  // ! Logout 구현하기
  const navigate = useNavigate();
  function handleLogout() {
    // * 쿠키 삭제
    
    Cookies.remove("accessToken", {path: '/'});
    Cookies.remove("userInfo", {path: '/'});

    // * 로컬 스토리지 초기화
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");

    // * 리다이렉트 처리
    setTimeout(window.location.reload(), 1000);
    // window.location.reload();
    navigate("/home");
  }











  
  return (
    <div className='HomeChildNav01_Container'>
      <nav className='HomeChildNav01_Container_NavBox'>
        <Link to="/home"><div className='HomeChildNav01_Container_NavBox_Menu'>HOME</div></Link>
        <Link to="/Event"><div className='HomeChildNav01_Container_NavBox_Menu'>EVENT</div></Link>
        <Link to="/newbioproducts"><div className='HomeChildNav01_Container_NavBox_Menu'>AD</div></Link>
        <Link to="/bioproducts"><div className='HomeChildNav01_Container_NavBox_Menu'>SEARCH</div></Link>
        
        {userInformation.isLoggedIn ?
        <Link to="/login/kakao"><div className='HomeChildNav01_Container_NavBox_Menu' onClick={handleLogout}>LOGOUT</div></Link>
        :
        <Link to="/login/kakao"><div className='HomeChildNav01_Container_NavBox_Menu'>LOGIN</div></Link>
        }
      </nav>
      
      {/* <hr className='HomeChildNav01_Container_Hr'></hr> */}
      
      {userInformation.isLoggedIn ?
        <>
          <div className='HomeChildNav01_Container_UserBox'>
          <img className='HomeChildNav01_Container_UserBox_Image' src={userInformation.currentUserThumbnailImage} alt=''></img>
          </div>
        </>
        :
        ''
      }
    </div>
  )
}
