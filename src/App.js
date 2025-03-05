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
import AdminEventsCreate from './Components/Admin/AdminEvents/AdminEventsCreate';
import AdminEventsList from './Components/Admin/AdminEvents/AdminEventsList';
import AdminEventsUpdate from './Components/Admin/AdminEvents/AdminEventsUpdate';

import LoginKakao from './Components/Log_in_out_Kakao/LoginKakao/LoginKakao';
import LogoutKakao from './Components/Log_in_out_Kakao/LogoutKakao/LogoutKakao';
import UserInfo from './Components/Log_in_out_Kakao/UserInfo/UserInfo';
import Event from './Components/Event/Event';

// import Context
import { WebInformation } from './Context/WebInformation';
import { AuthContext } from './Context/AuthContext';
import { ImageAddressContext } from './Context/ImageAddressContext';
import { ProductsDataBaseContext } from './Context/ProductsDataBaseContext';
import { JsonDataContext } from './Context/JsonDataContext';
import { AxiosContext } from './Context/AxiosContext';
import { JsonDataContextEvent } from './Context/JsonDataContextEvent';
import { UserEventDataBaseContext } from './Context/UserEventDataBaseContext';
// import JSON Data
import jsonData01 from "./Data/jsonData_01.json";
import jsonDataEvent from "./Data/jsonData_02.json";






export default function App() {

  const imageURL = process.env.REACT_APP_IMAGE_URL; // * Image 저장 URL
  const URL = ({
    clientURL:process.env.REACT_APP_CLIENT_URL, // * Client URL
    serverURL:process.env.REACT_APP_SERVER_URL, // * Server URL
  });
  console.log("[App]-URL :", URL);




  const api = axios.create({
    // origin: `${process.env.REACT_APP_CLIENT_URL}`, // * axios.create() 설정에서는 존재하지 않는 옵션
    // secure: "true", // * axios에서 지원하지 않는 옵션
    // credentials: "true", // * axios에서 지원하지 않는 옵션, fetch에서 지원하는 옵션
    // sameSite: "none", // * axios에서 지원하지 않는 옵션, 서버에서 쿠키를 설정할 때 사용하는 옵션임
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    withCredentials: true, // * withCredentials는 boolean값이어야 하므로 string인 "true" 가 아니라 true로 설정
    headers: {
      Accept: "application/json",
      // "Content-Type": "application/json",
      "xcustomheader": "silverhyo",
    }
  })




  // ! 아래는 database로부터 products 정보를 가져오기 위한 code임
  const [dtBaseData, setDtBaseData] = useState('' || '')
  useEffect(() => {
    api.get('/api')
    .then(res => setDtBaseData(res.data))
    .catch(err => console.log(err))
  }, [setDtBaseData]);
  console.log("[APP]-dtBaseData :", dtBaseData);
  

  // ! 아래는 database로부터 Event Data 가져오게하기
  const [eventBaseData, setEventDtBaseData] = useState('' || '')
  useEffect(() => {
    api.get('/api/event')
    .then(res => setEventDtBaseData(res.data))
    .catch(err => console.log(err))
  }, [setEventDtBaseData]);
  console.log("[APP]-eventBaseData :", eventBaseData);



  // useEffect(() => {
  //   const api = axios.create({
  //     // origin: `${process.env.REACT_APP_CLIENT_URL}`, // * axios.create() 설정에서는 존재하지 않는 옵션
  //     // secure: "true", // * axios에서 지원하지 않는 옵션
  //     // credentials: "true", // * axios에서 지원하지 않는 옵션
  //     // sameSite: "none", // * axios에서 지원하지 않는 옵션, 서버에서 쿠키를 설정할 때 사용하는 옵션임
  //     baseURL: `${process.env.REACT_APP_BASE_URL}`,
  //     withCredentials: true, // * withCredentials는 boolean값이어야 하므로 string인 "true" 가 아니라 true로 설정
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       "xcustomheader": "silverhyo",
  //     }
  //   })
  // },[])





  // ! 새로운 코드(kakao로부터 전달 받은 고객 정보)

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

  // ! USERINFORMATION를 Cookie로부터 전달 받기
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
      Cookies.set('userInfo', JSON.stringify(userInfo), {expires: 0.1 }) // TODO : expires 에 따라서 쿠키에 남아있는 기간 설정(2시간간)
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
      axios.get('/userinfo/'+`${userStatus.currentUserId}`, {
        baseURL: `${process.env.REACT_APP_BASE_URL}`,
        withCredentials: true,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "xcustomheader": "silverhyo",
          Accept: "application/json",
        },
      })
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
        <AxiosContext.Provider value={{api}} >
        <UserEventDataBaseContext.Provider value={{eventBaseData}}>
        <ProductsDataBaseContext.Provider value={{dtBaseData}} >
        <JsonDataContext.Provider value={{jsonData01}} >
        <JsonDataContextEvent.Provider value={{jsonDataEvent}} >
        <ImageAddressContext.Provider value={{imageURL}} >
        <WebInformation.Provider value={{URL}} >
        <AuthContext.Provider value={{userStatus, userDatabaseInfo}}>
        <Routes>
          <Route path="/login/kakao" element={<LoginKakao />} />
          <Route path="/logout/kakao" element={<LogoutKakao />} />
          <Route path="/user/userinfo" element={<UserInfo />} />

          <Route path="/" element={<Landing />}></Route>
          <Route path="/home" element={<Home />} ></Route>
          <Route path="/event" element={<Event />} ></Route>
          <Route path="/newbioproducts" element={<NewBioProducts />}></Route>
          <Route path="/bioproducts" element={<Bioproducts />}></Route>
          <Route path="/bioproducts/:id" element={<ProductDetailModal />}></Route>

          {/* <Route 
            path="/admin/home"
            element={
              <PrivateRoute roles={["admin"]} message="Hello Admin!" data={{LOCALADDRESS:`${localAddress}`}}>
                <AdminHome />
              </PrivateRoute>
            }>
          </Route> */}
          <Route path="/admin/home" element={<AdminHome />}></Route>

          <Route path="/admin/products/create" element={<AdminCreate />}></Route>
          <Route path="/admin/products/list" element={<AdminList />}></Route>
          <Route path="/admin/products/update/:id" element={<AdminUpdate />}></Route>
          
          <Route path="/admin/events/create" element={<AdminEventsCreate />}></Route>
          <Route path="/admin/events/list" element={<AdminEventsList />}></Route>
          <Route path="/admin/events/update/:id" element={<AdminEventsUpdate />}></Route>
          

        </Routes>
        </AuthContext.Provider>
        </WebInformation.Provider>
        </ImageAddressContext.Provider>
        </JsonDataContextEvent.Provider>
        </JsonDataContext.Provider>
        </ProductsDataBaseContext.Provider>
        </UserEventDataBaseContext.Provider>
        </AxiosContext.Provider>
      </BrowserRouter>
    </div>
  );
};
