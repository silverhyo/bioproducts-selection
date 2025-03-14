import React from 'react';
import { useContext } from 'react';

// import css
import Slider from 'react-slick';

//import Style
import './EventBanner.css';
import './slick.css';
import './slick-theme.css';

// import Context
import { UserEventDataBaseContext } from '../../Context/UserEventDataBaseContext';
import { ImageAddressContext } from '../../Context/ImageAddressContext';

export default function EventBanner() {

  const eventDataBase = useContext(UserEventDataBaseContext).eventBaseData || [];
  const imageURL = useContext(ImageAddressContext).imageURL;
  console.log("eventDataBase :", eventDataBase);

  let settings = {
    dots: true, // 사진 및에 뜨는  동그라미 적용 여부
    infinite: true, // 슬라이드 반복 여부, true일 경우 마지막 슬ㄹ라이드 다음이 다시 처음 슬라이드가 된다.
    speed: 500, // 슬라이드 넘어가는 속도(ms)
    autoplay: true, // 자동재생
    autoplaySpeed: 2000, // 자동재생 속도 (ms)
    slidesToShow: 1, // 한 화면에 표시할 수 있는 슬라이드의 개수
    slidesToScroll: 1, // 한 번에 넘어가는 슬라이드의 수
    pauseOnHover: true, // Hover시 일시 정지
    cssEase: 'linear', // css easing 모션션
    arrows: false, // 슬라이드 양 옆에 뜨는 화살표 표시 여부
  };


  return (
    <div className='EventBanner_Container'>
      <div className='EventBanner_Container_Box'>

      <Slider {...settings}>

        {eventDataBase.map((item, index) => {
          return (
            <div key={index} className='EventBanner_Container_Box_MapBox'>
              <img className='EventBanner_Container_Box_MapBox_ImageBox_Image' style={{width:"100%"}} src={item.EventBannerImageURL} alt=''></img>
            </div>
          )
        })}
        
      </Slider>        
      </div>      
    </div>
  )
}
