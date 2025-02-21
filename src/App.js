import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

// import Components
import Landing from './Components/Page/Landing/Landing';
import Home from './Components/Page/Home/Home';
import Bioproducts from './Components/BioProducts/Bioproducts';
import NewBioProducts from './Components/NewBioProducts/NewBioProducts';
import ProductDetailModal from './Components/BioProducts/ProductDetailModal/ProductDetailModal';
import ScrollToTop from './Components/Common/ScrollToTop';

import AdminCreate from './Components/Admin/AdminCreate/AdminCreate';
import AdminHome from './Components/Admin/AdminHome/AdminHome';
import AdminList from './Components/Admin/AdminList/AdminList';
import AdminUpdate from './Components/Admin/AdminUpdate/AdminUpdate';

import LoginKakao from './Components/Log_in_out_Kakao/LoginKakao/LoginKakao';
import LogoutKakao from './Components/Log_in_out_Kakao/LogoutKakao/LogoutKakao';
import UserInfo from './Components/Log_in_out_Kakao/UserInfo/UserInfo';
import Event from './Components/Event/Event';

// import Context
import { WebInformation } from './Context/WebInformation';
import { AuthContext } from './Context/AuthContext';
import { ImageAddressContext } from './Context/ImageAddressContext';
import { ProductsDataBaseContext } from './Context/ProductsDataBaseContext';
// import PrivateRoute from './Components/Log_in_out_Kakao/PrivateRoute/PrivateRoute';

// import JSON Data
import jsonData_01 from "./Data/jsonData_01.json";


















export default function App() {








  // ========================================IMAGE 저장 경로로 : Start
  const imageAddress = process.env.REACT_APP_IMAGE_LOCATION;
  // ========================================FrontEnd 및 Server 주소 : START
  const localAddress = ({
    localFrontEnd:process.env.REACT_APP_FRONTEND_ADDRESS,
    localServer:process.env.REACT_APP_SERVER_ADDRESS,
  });















  // ! 아래는 database로부터 products 정보를 가져오기 위한 code임임
  const [dtBaseData, setDtBaseData] = useState('' || '')
  useEffect(() => {
    axios.get(`${localAddress.localServer}`+`/api`, {
      origin: process.env.REACT_APP_FRONTEND_ADDRESS,
      // baseURL: process.env.REACT_APP_PUBLIC_BASE_URL,
      withCredentials: true,
      credentials: true,
      headers: {
        "Content-Type": "application/json",
        "xcustomheader": "silverhyo",
        Accept: "application/json",
      }
    })
    .then(res => setDtBaseData(res.data))
    .catch(err => console.log(err))
  }, []);
  console.log("dtBaseData :", dtBaseData);
  



  useEffect(() => {
    axios.create({
      origin: process.env.REACT_APP_FRONTEND_ADDRESS,
      // baseURL: process.env.REACT_APP_PUBLIC_BASE_URL,
      withCredentials: true,
      credentials: true,
      headers: {
        "Content-Type": "application/json",
        "xcustomheader": "silverhyo",
        Accept: "application/json",
      }
    })
  },[])


















  // ! LogIn01 코드 삽입 부
  // ! 새로운 코드(kakao로부터 전달 받은 고객 정보)

  const [userId, setUserId] = useState('')
  const [userDatabaseInfo, setUserDatabaseInfo] = useState({
    databaseID: '',
    databaseLevel: '',
    databaseProfileImage : '',
    databaseProfileImageThumbnail: '',
    databaseUserId: '',
  });
  const [userStatus, setUserStatus] = useState({
    currentUserId: '',
    currentUserFullName: '',
    currentUserImg: '',
    currentUserThumbnailImage: '',
    isLoggedIn: false,
  });

  useEffect(() => {
    const userInfo = Cookies.get('userInfo')
      ? JSON.parse(Cookies.get('userInfo'))
      : null;

    if (userInfo) {
      setUserStatus({
        currentUserId: userInfo?.id,
        currentUserFullName: userInfo?.properties?.nickname,
        currentUserImg: userInfo?.properties?.profile_image,
        currentUserThumbnailImage: userInfo?.properties?.thumbnail_image,
        isLoggedIn: true,
      });
      sessionStorage.setItem('isLoggedIn', 'true');
      Cookies.set('userInfo', JSON.stringify(userInfo), {expires: 1 })


      
    } else {
      setUserStatus({
        currentUserId: '',
        currentUserFullName: '',
        currentUserImg: '',
        currentUserThumbnailImage: '',
        isLoggedIn: false,
      });
      sessionStorage.setItem('isLoggedIn', 'false');
    }
  }, [setUserStatus]);


  // ! useContext로 App.js로부터 user 정보인 UserInformation 을 가지고 온다. 이 정보를 logInInformation 정보에 넣는다.
  // ! logInInformation에서 userId 정보를 가져오고 이 정보를 database에 요청하여 이 id에 맞는 user 정보를 database 로부터 가져온다.
  // ! 왜 여기서 가져오나?
  // ! Login 진행 시 변동된 data는 (nickname, Image, Thumbnail, Email 등등) database에 업데이트 된다.
  // ! 즉 database의  user 데이터는 user가 로그인 진행할 때마다 최신으로 update가 된다.
  // ! 그래서 database로부터 이 user의 data를 가져오는 것이며, 이 data가 바로 setUserDatabaseInfo에 전달되어 결국 userDatabaseInfo로 저장이 된다.




  
  useEffect(() => {
    if(userStatus?.isLoggedIn) {
      setUserId(userStatus.currentUserId);
      axios.get(`${localAddress.localServer}`+`/userinfo/`+`${userStatus.currentUserId}`)
      .then(res => setUserDatabaseInfo(
        {
          databaseID: res?.data[0].ID,
          databaseLevel: res?.data[0].level,
          databaseProfileImage : res?.data[0].profileImage,
          databaseProfileImageThumbnail: res?.data[0].profileImageThumbnail,
          databaseUserId: res?.data[0].user_id
        }))
      .then(console.log("User 정보를 Database로부터 가져왔습니다."))
      .catch(err => console.log(err));
    } else {
      console.log("로그인된 user가 없습니다!")
    }
  },[userStatus?.isLoggedIn]);
  console.log("userDatabaseInfo :", userDatabaseInfo);






  
  return (
    <div className="App_Container">
      <BrowserRouter>
        <ScrollToTop />
        <ProductsDataBaseContext.Provider value={{dtBaseData}} >
        <ImageAddressContext.Provider value={{imageAddress}} >
        <WebInformation.Provider value={{localAddress}} >
        <AuthContext.Provider value={{userStatus, userDatabaseInfo}}>
        <Routes>
          <Route path="/login/kakao" element={<LoginKakao />} />
          {/* <Route path="/login/kakao/user" element={<KakaoLogin />} /> */}
          <Route path="/logout/kakao" element={<LogoutKakao />} />
          <Route path="/user/userinfo" element={<UserInfo />} />

          <Route path="/" element={<Landing />}></Route>
          <Route path="/home" element={<Home DATABASEDATA={dtBaseData}/>} ></Route>
          <Route path="/event" element={<Event />} ></Route>
          <Route path="/newbioproducts" element={<NewBioProducts DATABASEDATA={dtBaseData} />}></Route>
          <Route path="/bioproducts" element={<Bioproducts DATABASEDATA={dtBaseData} JSONDATA01={jsonData_01} />}></Route>
          <Route path="/bioproducts/:id" element={<ProductDetailModal JSONDATA01={jsonData_01} />}></Route>



          {/* <Route 
            path="/admin/home"
            element={
              <PrivateRoute roles={["admin"]} message="Hello Admin!" data={{LOCALADDRESS:`${localAddress}`}}>
                <AdminHome />
              </PrivateRoute>
            }>
          </Route> */}

          <Route path="/admin/create" element={<AdminCreate JSONDATA01={jsonData_01} />}></Route>
          <Route path="/admin/list" element={<AdminList DATABASEDATA={dtBaseData} JSONDATA01={jsonData_01} />}></Route>
          <Route path="/admin/update/:id" element={<AdminUpdate DATABASEDATA={dtBaseData} JSONDATA01={jsonData_01} />}></Route>



          <Route path="/admin/home" element={<AdminHome />}></Route>
          {/* <Route path="/admin/create" element={<AdminCreate JSONDATA01={jsonData_01} LOCALADDRESS={localAddress}/>}></Route>
          <Route path="/admin/list" element={<AdminList DATABASEDATA={dtBaseData} IMAGEADDRESS={imageAddress} JSONDATA01={jsonData_01} LOCALADDRESS={localAddress}/>}></Route>
          <Route path="/admin/update/:id" element={<AdminUpdate DATABASEDATA={dtBaseData} JSONDATA01={jsonData_01} IMAGEADDRESS={imageAddress} LOCALADDRESS={localAddress}/>}></Route> */}




        </Routes>
        </AuthContext.Provider>
        </WebInformation.Provider>
        </ImageAddressContext.Provider>
        </ProductsDataBaseContext.Provider>
      </BrowserRouter>


    </div>
  );
};
