import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// import Style.css
import "./Home.css";

// import Components
import Footer from '../../Common/Footer';
import Navigation from '../../Common/Navigation';

// import Context
import { AuthContext } from '../../../Context/AuthContext';
import { ImageAddressContext } from '../../../Context/ImageAddressContext';

export default function Home({DATABASEDATA}) {
  const userInformation = useContext(AuthContext).userStatus;

  const imageAddress = useContext(ImageAddressContext).imageAddress;

  const [dtBaseData, setDtBaseData] = useState(DATABASEDATA);
  const [productRegisteredNewly, setProductRegisteredNewly] = useState(DATABASEDATA);
  const [productsOfThisMonth, setProductsOfThisMonth] =useState(DATABASEDATA);

  useEffect(() => {
    setDtBaseData(DATABASEDATA)
    setProductRegisteredNewly(DATABASEDATA)
    setProductsOfThisMonth(DATABASEDATA)
  }, [DATABASEDATA]);

  
  //! 아래는 server에서 userInfo를 redirect 통해서 전달할 경우 아래 코드를 사용!!!
  // const [ userName, setUserName ] = useState('');

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search); 
  //   const accessToken = urlParams.get("accessToken"); 
  //   const userName = urlParams.get("userName");

  //   if (accessToken && userName) {
  //     localStorage.setItem('accessToken', accessToken);
  //     localStorage.setItem('userName', userName);
  //     setUserName(userName)
  //   } else {
  //     navigate('/login/kakao'); // 정보가 없으면 로그인 페이지로 이동동
  //   }
  // }, [navigate]);

  // console.log('userName :', userName);


  //! 아래는 server에서 userInfo를 cookie 통해서 전달할 경우 아래 코드를 사용!!! js-cookie 라이브러리 설치 필요
  // const [ userNickName, setUserNickName ] = useState(['']);

  // useEffect(() => {
  //   const accessToken = Cookies.get("accessToken");
  //   const userInfo = Cookies.get("userInfo")
  //     ? JSON.parse(Cookies.get("userInfo"))
  //     : null;

    
  //   console.log("User Info:", userInfo);
  //   const userInformation = ({
  //     id: userInfo.id,
  //     nickName: userInfo.properties.nickname,
  //     profile_image: userInfo.properties.profile_image,
  //   });

  //   setUserNickName(userInformation.nickName)
  // }, []);




  // ! slice를 이용하여 원하는 수만큼의 mpa 돌리기
  const limit01 = 16;
  const PRN = [...productRegisteredNewly].reverse();
  const result01 = PRN.slice(0, limit01);

  // ! Advertise 제품만 찾기
  const limit02 = 6;
  const adProducts = [...productsOfThisMonth].filter((item, index) => {
    if(item.Advertise === 'true') {
      return true;
    }
  });
  const result02 = adProducts.slice(0, limit02);


  return (
    <>
      <Navigation />
      <div className='Home_Container'>
        <div className='Home_Container_Box'>
          <div className='Home_Container_Box_Greeting'>
            {userInformation.isLoggedIn
            ? 
            <div className='Home_Container_Box_Greeting_P1'>{userInformation.userNickName}님 반갑습니다!<br></br><br></br>
            이 webpage를 통하여 bio 제품에 대한 정보를 확인하고, 담당자와의 연락을 통하여 제품에 대하여 궁금한 사항을 빠르게 해소할 수 있습니다.   </div>
            : 
            '' 
            }
            
            <p className='Home_Container_Box_Greeting_P2'> </p>
            <p className='Home_Container_Box_Greeting_P2'></p>
          </div>

          <div className='Product_New_Registered_Container'>
            <div className='Product_New_Registered_Container_Box'>
              <p className='Product_New_Registered_Container_Box_Title01'>Products New Registered</p>
              <p className='Product_New_Registered_Container_Box_Title02'>새롭게 등록된 제품들이예요~. Product에 가셔서 더욱 많은 제품들을 확인해 주세요!😘 </p>
              <div className='Product_New_Registered_Container_Box_ProductBox'>
                {dtBaseData ?
                  result01.map((item, index) => {
                    return (
                      <Link key={index} to={`/bioproducts/${item.ID}`}>
                      <div className='Product_New_Registered_Container_Box_ProductBox_ImageBox'>
                        <img className='Product_New_Registered_Container_Box_ProductBox_ImageBox_Image' src={imageAddress+item.ProductMainImage} alt='' ></img>
                      </div>
                      </Link>
                    )
                  })
                  :
                  ''
                }
              </div>
            </div>
          </div>

          <div className='Product_Of_This_Month_Container'>
            <div className='Product_Of_This_Month_Container_Box'>
            <p className='Product_Of_This_Month_Container_Box_Title01'>Products Of This Month</p>
            <p className='Product_Of_This_Month_Container_Box_Title02'>이 달에 추천되는 제품들 입니다.~ 다이아몬드에 가셔서 더욱 많은 제품들을 확인해 주세요!😘 </p>
            <div className='Product_Of_This_Month_Container_Box_ProductBox'>
                {dtBaseData ?
                  result02.map((item, index) => {
                    return (
                      <Link key={index} to={`/bioproducts/${item.ID}`}>
                      <div className='Product_Of_This_Month_Container_Box_ProductBox_ImageBox'>
                        <img className='Product_Of_This_Month_Container_Box_ProductBox_ImageBox_Image' src={imageAddress+item.ProductMainImage} alt='' ></img>
                      </div>
                      </Link>
                    )
                  })
                  :
                  ''
                }
              </div>
            </div>
          </div>


          <div className='Product_Of_Promotion_Container'>
            <div className='Product_Of_Promotion_Container_Box'>
            <p className='Product_Of_Promotion_Container_Box_Title01'>Promotion Products</p>
            <p className='Product_Of_Promotion_Container_Box_Title02'>Promotion을 진행하는 제품입니다.! 자세한 설명은 담당자에게 연락주세요.😘 </p>
            </div>
          </div>


        </div>
      </div>
      <Footer />
    </>
  )
}
