import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
// Import Style css
import "./AdminList.css";
// Import Components
import NotFound from '../../Common/NotFound';
import AdminCreate from '../AdminCreate/AdminCreate';
// ICONS
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
// useContext
import { AuthContext } from '../../../Context/AuthContext';
import { ImageAddressContext } from '../../../Context/ImageAddressContext';
import { WebInformation } from '../../../Context/WebInformation';
import { ProductsDataBaseContext } from '../../../Context/ProductsDataBaseContext';
import { AxiosContext } from '../../../Context/AxiosContext';

export default function AdminList() {

  // ! 자 이 페이지는 Admin 인 user만 접근할 수 있어야 하겠지? User 중에서 Admin 레벨인 user에게만 접근 가능!!
  // ! 데이터베이스 Users 정보에서 Level이 Admin인 사람을 찾고 이 사람에게만 권한 부여
  // ! 아래 userInformation의 UserId 정보와 데이터베이스에서 가져와야하며 정보는 App.js로부터 가져온다.

  const productsDataBase = useContext(ProductsDataBaseContext).dtBaseData;
  const userInformation = useContext(AuthContext).userDatabaseInfo;
  const api = useContext(AxiosContext).api;

  const [dtBaseData, setDtBaseData] = useState(productsDataBase || []);
  useEffect(() => {
    if(productsDataBase) {
      setDtBaseData(productsDataBase)
    }
  },[productsDataBase])


  // 삭제를 위한 함수
  const handleDelete = (id) => {
    api.delete('/api/admin/products/delete/'+id)
    .then(res => {
      alert("삭제되었습니다.")
      // console.log(res);
      window.location.reload();
    })
    .catch(err => console.log(err))
  }


  // ! 제품등록을 위한 작업
  const [text, setText] = useState('제품등록하기')
  const [isOn, setIsOn] = useState(false);
  const [nameOfClass, setNameOfClass] = useState('AdminList_Container');
  function toggleHandler() {
    
    setIsOn(!isOn);
    isOn ? setText('제품등록하기') : setText('취소하기');
    isOn ? setNameOfClass('AdminList_Container') : setNameOfClass('silverhyo');
    // document.querySelector('.AdminList_Container').classList.toggle('silverhyo', isOn===false);
  };


  return (
    <>
      {userInformation.databaseLevel == 'Admin' ?
      <>

        <div className={nameOfClass}>
          <div className='AdminList_Container_Box'>
            <div className='AdminList_Container_Box_Count'>{dtBaseData.length}개의 제품이 있습니다</div>
  
            {dtBaseData?.map((item, index) => {
              return (
                <div key={item.ID} className='AdminList_Container_Box_ProductBox'>
                  <div className='AdminList_Container_Box_ProductBox_ImageBox'>
                    <img className='AdminList_Container_Box_ProductBox_ImageBox_Image' src={item.ProductMainImage} alt=""></img>
                  </div>
                  <div className='AdminList_Container_Box_ProductBox_TextBox'>
                    <p className='AdminList_Container_Box_ProductBox_TextBox_P'>{item.ProductName}_({item.ID})</p>
                    <p className='AdminList_Container_Box_ProductBox_TextBox_P'>{item.ProductMainTitle}</p>
                    <p className='AdminList_Container_Box_ProductBox_TextBox_P'>{item.SpecialistName} / {item.RegiDate}</p>
                    <p className='AdminList_Container_Box_ProductBox_TextBox_P'></p>
                    <p className='AdminList_Container_Box_ProductBox_TextBox_P'></p>
                  </div>
                  <div className='AdminList_Container_Box_ProductBox_TextBox_ButtonBox'>
                    <button className='AdminList_Container_Box_ProductBox_TextBox_ButtonBox_Button_Delete' onClick={() => handleDelete(item.ID)}><MdDeleteOutline /></button>
                    <Link to={`/admin/products/update/${item.ID}`}><div className='AdminList_Container_Box_ProductBox_TextBox_ButtonBox_Button_Update'><CiEdit /></div></Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <>
          {isOn ? <AdminCreate /> : ''}
        </>
        
        <div className='AdminList_Registration_ButtonBox' onClick={toggleHandler}>
          <div className='AdminList_Registration_ButtonBox_Button'>
            {text}
          </div>
        </div>


      </>
      :
      <NotFound />
      }
    </>
  )
}
