import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
// Import Style css
import "./AdminList.css";
// Import Components
import AdminNavbar from '../../Common/AdminNavbar';
import Footer from '../../Common/Footer';
import NotFound from '../../Common/NotFound';
// ICONS
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
// useContext
import { AuthContext } from '../../../Context/AuthContext';
import { ImageAddressContext } from '../../../Context/ImageAddressContext';
import { WebInformation } from '../../../Context/WebInformation';
import { ProductsDataBaseContext } from '../../../Context/ProductsDataBaseContext';

export default function AdminList() {

  // ! 자 이 페이지는 Admin 인 user만 접근할 수 있어야 하겠지? User 중에서 Admin 레벨인 user에게만 접근 가능!!
  // ! 데이터베이스 Users 정보에서 Level이 Admin인 사람을 찾고 이 사람에게만 권한 부여
  // ! 아래 userInformation의 UserId 정보와 데이터베이스에서 가져와야하며 정보는 App.js로부터 가져온다.

  const productsDataBase = useContext(ProductsDataBaseContext).dtBaseData;
  const userInformation = useContext(AuthContext).userDatabaseInfo;
  const imageURL = useContext(ImageAddressContext).imageURL;
  const URL= useContext(WebInformation).URL;

  const [dtBaseData, setDtBaseData] = useState(productsDataBase || []);
  useEffect(() => {
    if(productsDataBase) {
      setDtBaseData(productsDataBase)
    }
  },[productsDataBase])


  // 삭제를 위한 함수
  const handleDelete = (id) => {
    axios.delete(`/admin/delete/`+id, {
      origin: `${process.env.REACT_APP_CLIENT_URL}`,
      withCredentials: "true",
      credentials: "true",
      headers: { 
        "xcustomheader": "silverhyo",
        "Content-Type": "multipart/form-data",
      },
    })
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
      <div className='AdminList_Container'>
        <div className='AdminList_Container_Box'>
          <div className='AdminList_Container_Box_Count'>{dtBaseData.length}개의 제품이 있습니다</div>

          {dtBaseData?.map((item, index) => {
            return (
              <div key={item.ID} className='AdminList_Container_Box_ProductBox'>
                <div className='AdminList_Container_Box_ProductBox_ImageBox'>
                  <img className='AdminList_Container_Box_ProductBox_ImageBox_Image' src={imageURL+item.ProductMainImage} alt=""></img>
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
                  <Link to={`/admin/update/${item.ID}`}><div className='AdminList_Container_Box_ProductBox_TextBox_ButtonBox_Button_Update'><CiEdit /></div></Link>
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
