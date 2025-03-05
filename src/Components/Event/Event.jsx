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

export default function Event() {
  
  const eventDataBase = useContext(UserEventDataBaseContext).eventBaseData || [];
  const imageAddress = useContext(ImageAddressContext).imageURL;
  console.log("imageAddress :", imageAddress);

  return (
    <>
    <Navigation />
      <div className='Event_Container'>
        <div className='Event_Container_Box'>Events
          <div className='Event_Container_Box_EventItems'>
            
            {eventDataBase?.map((item, index) => {
              return (
                <div key={index} className='Event_Container_Box_EventItems_Item'>
                  <div className='Event_Container_Box_EventItems_Item_ImageBox'>
                    <img className='Event_Container_Box_EventItems_Item_ImageBox_Image' src={imageAddress+item.EventImageURL} alt=''></img>
                  </div>
                  <div className='Event_Container_Box_EventItems_Item_TextBox0'></div>
                  <a href={item.EventURL} style={{textDecoration:"none", color:"black"}}>
                    <div className='Event_Container_Box_EventItems_Item_TextBox'>
                      <div className='Event_Container_Box_EventItems_Item_TextBox_Text'>
                        자세히
                      </div>
                    </div>
                  </a>
                </div>
              )
            })}
            
          </div>
        </div>
        <div className='Event_Container_NavigationBottom'>
          <NavigationBottom />
        </div>
      </div>
    </>
  )
};
