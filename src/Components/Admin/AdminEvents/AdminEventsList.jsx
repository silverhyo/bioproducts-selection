import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// import Style
import './AdminEventsList.css';

// import Context
import { UserEventDataBaseContext } from '../../../Context/UserEventDataBaseContext';
import { ImageAddressContext } from '../../../Context/ImageAddressContext';
import { AuthContext } from '../../../Context/AuthContext';
import { AxiosContext } from '../../../Context/AxiosContext';

// import ICON
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

// import Components
import AdminNavbar from '../../Common/AdminNavbar';
import NotFound from '../../Common/NotFound';
import Footer from '../../Common/Footer';

export default function AdminEventsList() {


  const eventDataBase = useContext(UserEventDataBaseContext).eventBaseData || [];
  const imageURL = useContext(ImageAddressContext).imageURL;
  const userInformation = useContext(AuthContext).userDatabaseInfo;
  const api = useContext(AxiosContext).api;


  const [eventDtBase, setEventDtBase] = useState(eventDataBase || []);
  useEffect(() => {
    if(eventDataBase) {
      setEventDtBase(eventDataBase)
    }
  }, [eventDataBase]);



  // 삭제를 위한 함수
  const handleDelete = (id) => {
    api.delete('/admin/events/delete/'+id)
    .then(res => {
      alert("삭제되었습니다.")
      console.log(res);
      window.location.reload();
    })
    .catch(err => console.log(err))
  }


  return (
    <>
    <AdminNavbar />

    {userInformation.databaseLevel == 'Admin' ?
    <>
      <div className='AdminListEvent_Container'>
        <div className='AdminListEvent_Container_Box'>
          <div className='AdminListEvent_Container_Box_Count'>{eventDtBase.length}개의 Event가 있습니다</div>

          {eventDtBase?.map((item, index) => {
            return (
              <div key={item.ID} className='AdminListEvent_Container_Box_ProductBox'>
                <div className='AdminListEvent_Container_Box_ProductBox_ImageBox'>
                  <img className='AdminListEvent_Container_Box_ProductBox_ImageBox_Image' src={item.EventImageURL} alt=""></img>
                </div>
                <div className='AdminListEvent_Container_Box_ProductBox_TextBox'>
                  <p className='AdminListEvent_Container_Box_ProductBox_TextBox_P'>{item.EventName}_({item.ID})</p>
                  <p className='AdminListEvent_Container_Box_ProductBox_TextBox_P'>{item.EventTitle}</p>
                  <p className='AdminListEvent_Container_Box_ProductBox_TextBox_P'>{item.EventClose} / {item.RegiDate}</p>
                  <p className='AdminListEvent_Container_Box_ProductBox_TextBox_P'></p>
                  <p className='AdminListEvent_Container_Box_ProductBox_TextBox_P'></p>
                </div>
                <div className='AdminListEvent_Container_Box_ProductBox_TextBox_ButtonBox'>
                  <button className='AdminListEvent_Container_Box_ProductBox_TextBox_ButtonBox_Button_Delete' onClick={() => handleDelete(item.ID)}><MdDeleteOutline /></button>
                  <Link to={`/admin/events/update/${item.ID}`}><div className='AdminListEvent_Container_Box_ProductBox_TextBox_ButtonBox_Button_Update'><CiEdit /></div></Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
    :
    <NotFound />
    }
    <Footer />  
      
    </>
  )
}
