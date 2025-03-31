import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// import Style
import './AdminSelection_Event_Regi_Edit.scss';

// import Component
import AdminEventsCreate from './AdminEvents/AdminEventsCreate';
import AdminEventsList from './AdminEvents/AdminEventsList';

export default function AdminSelection_Event_Regi_Edit() {

  const [status, setStatus] = useState(true);

  function changeStatusTrue() {
    setStatus(true);
  };
  function changeStatusFalse() {
    setStatus(false);
  };

  return (
    <>
      <div className='AdminNavbar_Container'>
        <div className='AdminNavbar_Container_Box'>

          <div className='AdminNavbar_Container_Box_Contents'>
            <div className='AdminNavbar_Container_Box_Contents_EventBox'>
              <div className='AdminNavbar_Container_Box_Contents_EventBox_Text'>Event</div>
              {/* <hr className='AdminNavbar_Container_Box_Contents_EventBox_Hr'></hr> */}
              <div className='AdminNavbar_Container_Box_Contents_EventBox_Menu'>
                <div className='AdminNavbar_Container_Box_Contents_EventBox_Event_Register' onClick={changeStatusTrue}>등록하기</div>
                <div className='AdminNavbar_Container_Box_Contents_EventBox_Event_Edit' onClick={changeStatusFalse}>수정 / 삭제하기</div>                
              </div>
            </div>
          </div>

        </div>
      </div>

      <>
        {status ? <AdminEventsCreate /> : <AdminEventsList />}

      </>
    </>
  )
}
