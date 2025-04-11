import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
// import Style
import './Event.css';
// import Components
import Navigation from '../Common/Navigation';
import NavigationBottom from '../Common/NavigationBottom';
// import Context
import { UserEventDataBaseContext } from '../../Context/UserEventDataBaseContext';
import { ImageAddressContext } from '../../Context/ImageAddressContext';
import Footer from '../Common/Footer';

export default function Event() {
  
  const eventDataBase = useContext(UserEventDataBaseContext).eventBaseData || [];
  const imageURL = useContext(ImageAddressContext).imageURL;

  // ! eventDataBase 역배열로 놓기
  const eventDataBaseReverse = eventDataBase.reverse();

  return (
    <>
    <Navigation />
      <div className='Event_Container'>
        <div className='Event_Container_Box'>Events
          <div className='Event_Container_Box_EventItems'>
            
            {eventDataBaseReverse?.map((item, index) => {
              return (
                <div key={index} className='Event_Container_Box_EventItems_Item'>
                  
                  <div className='Event_Container_Box_EventItems_Item_ImageBox'>
                    <img className='Event_Container_Box_EventItems_Item_ImageBox_Image' src={item.EventImageURL} alt=''></img>
                  </div>

                  <div className='Event_Container_Box_EventItems_Item_TextBox'>
                    <a className='Event_Container_Box_EventItems_Item_TextBox_Link' href={item.EventURL}>
                      <div className='Event_Container_Box_EventItems_Item_TextBox_Text'>
                        자세히 보기
                      </div>
                    </a>
                  </div>

                </div>
              )
            })}
            
          </div>
        </div>
        <div className='Event_Container_NavigationBottom'>
          <NavigationBottom />
        </div>
      </div>
      <Footer />
    </>
  )
};
