import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Cookies from 'js-cookie';

// import Style css
import "./Navigation.css";

// ICONS
// import Context
import { AuthContext } from '../../Context/AuthContext';
import { AxiosContext } from '../../Context/AxiosContext';
import { GrLogin } from "react-icons/gr";
import { GrLogout } from "react-icons/gr";

// import Image
import LogoSartoriusWhite from '../../Sources/image_logo/sartorius-logo-white.png';
import SartoriusOn from '../../Sources/Images/on.png';

export default function Navigation() {

  const userInformation = useContext(AuthContext).userStatus;
  const api = useContext(AxiosContext).api;





  // ! Logout 구현하기
  function handleLogout() {
    // * 쿠키 삭제
    api.post('/api/logout')
    .then((response) => {
      if(response.status === 200) {
        Cookies.remove("accessToken", {path: '/'});
        Cookies.remove("userInfo", {path: '/'});
        Cookies.remove("accessToken"); // 옵션 없이 한 번 더 삭제 시도
        Cookies.remove("userInfo");
        // * 로컬 스토리지 초기화
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userInfo");

        setTimeout(() => window.location.reload(), 100);
      } else {
        
      }
    })
    .catch((error) => console.error("Error logging out:", error));
  }







  
  return (
    <div className='Navigation_Container'>
      <div className='Navigation_Container_Box'>

        <div className='Navigation_Container_ImageBox01'>
          <Link to='/bioproducts'><img className='Navigation_Container_ImageBox_Image01' src={LogoSartoriusWhite} alt=""></img></Link>
        </div>

        <div className='Navigation_Container_ImageBox02'>
          <img className='Navigation_Container_ImageBox_Image02' src={SartoriusOn} alt=""></img>
        </div>

        

        <div className='Navigation_Container_NavBox'>
          {/* <Link to="/home"><div className='Navigation_Container_NavBox_Menu'>HOME</div></Link> */}
          {/* <Link to="/event"><div className='Navigation_Container_NavBox_Menu'>Event</div></Link> */}
          {/* <Link to="/newbioproducts"><div className='Navigation_Container_NavBox_Menu'>AD</div></Link> */}
          {/* <Link to="/bioproducts"><div className='Navigation_Container_NavBox_Menu'>Home</div></Link> */}

          {userInformation.isLoggedIn ?
          <div className='Navigation_Container_NavBox_Menu' onClick={handleLogout}><GrLogout /></div>
          // <Link to="/login/kakao"><div className='Navigation_Container_NavBox_Menu' onClick={handleLogout}>LOGOUT</div></Link>
          :
          <Link to="/login/kakao"><div className='Navigation_Container_NavBox_Menu'><GrLogin /></div></Link>
          }
        </div>


        {userInformation.isLoggedIn ?
        <div className='Navigation_Container_UserBox'>
          <div className='Navigation_Container_UserBox_ImageBox'>
            <img className='Navigation_Container_UserBox_ImageBox_Image' src={userInformation.currentUserThumbnailImage} alt=''></img>
          </div>
        </div>
        :
        ''
        }

      </div>
    </div>
  )
}
