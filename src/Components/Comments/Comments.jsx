import React from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

// import Style
import "./Comments.css"

// import Components
import { UserInfoContext } from '../../Context/UserInfoContext';
import { WebInformation } from '../../Context/WebInformation';

export default function Comments() {
  
  const LocalAddress = useContext(WebInformation).localAddress;
  const logInInformation = useContext(UserInfoContext);
  // const {userId} = useParams(logInInformation.userInformation.userId) || '';
  // console.log("userId :", userId);
  



  // useContext로 App.js로부터 user 정보인 UserInformation 을 가지고 온다. 이 정보를 logInInformation 정보에 넣는다.
  // logInInformation에서 userId 정보를 가져오고 이 정보를 database에 요청하여 이 id에 맞는 user 정보를 database 로부터 가져온다.
  // 왜 여기서 가져오나?
  // Login 진행 시 변동된 data는 (nickname, Image, Thumbnail, Email 등등) database에 업데이트 된다.
  // 즉 database의  user 데이터는 user가 로그인 진행할 때마다 최신으로 update가 된다.
  // 그래서 database로부터 이 user의 data를 가져오는 것이며, 이 data가 바로 setUserDatabaseInfo에 전달되어 결국 userDatabaseInfo로 저장이 된다.
  const [userId, setUserId] = useState('' || '')
  const [userDatabaseInfo, setUserDatabaseInfo] = useState('' || '');
  
  useEffect(() => {
    if(logInInformation) {
      if(logInInformation.isLoggedIn) {
        console.log("logInInformation :", logInInformation);
        setUserId(logInInformation.userInformation.userId);

        axios.get(`${LocalAddress.localServer}`+`/userinfo/`+`${logInInformation.userInformation.userId}`)
        .then(res => setUserDatabaseInfo(res.data))
        .catch(err => console.log(err));
      } else {
        console.log("로그인된 user가 없습니다!")
      }
    }
  },[setUserDatabaseInfo]);
  console.log("userId :", userId);
  console.log("userDatabaseInfo :", userDatabaseInfo[0]);


  // 댓글 작성
  const [newComment, setNewComment] = useState('');
  const {productId} = useParams();
  async function handleAddComment(e) {
    e.preventDefault();
    const values = ({
      userId: userId,
      productId: productId,
      comment: newComment,
    })
    axios.post(`${LocalAddress.localServer}`+`/comment`,values)
    .then((res) => console.log(res.data))
  };









  return (
    <>
      {logInInformation.isLoggedIn ?
      <>
        <div className='Comments_Form_Container'>
          <form className='Comments_Form_Container_Form' onSubmit={handleAddComment}>
            <div className='Comments_Form_Container_Form_FormBox'>
              <div className='Comments_Form_Container_Form_FormBox_ImageBox'>
                <img className='Comments_Form_Container_Form_FormBox_ImageBox_Image' src={userDatabaseInfo[0]?.profileImageThumbnail} alt=""></img>
              </div>

              <div className='Comments_Form_Container_Form_TextBox'>
                <textarea className='Comments_Form_Container_Form_TextBox_Textarea' rows="3" name="DescriptionA3" placeholder="댓글을을 입력해 주세요" onChange={e => setNewComment(e.target.value)}></textarea>
              </div>
            </div>

            <div className='Comments_Form_Container_Form_SubmitBox'>
              <input className='Comments_Form_Container_Form_SubmitBox_Submit' type="submit" value="댓글등록"></input>
            </div>
          </form>
        </div>
      </>
      :
      ''
      }
      
      
      <div className='Comments_Container'>
        <div className='Comments_Container_Box'>

          <div className='Comments_Container_Box_Text'>댓글</div>
          <br></br>
          
          <div className='Comments_Container_Box_CommentsBox'>

            <div className='Comments_Container_Box_CommentsBox_ImageBox'>
              <img className='Comments_Container_Box_CommentsBox_ImageBox_Image' src={logInInformation.userInformation.userImage} alt=''></img>
            </div>
            <div className='Comments_Container_Box_CommentsBox_TextBox'>
              <div className='Comments_Container_Box_CommentsBox_TextBox_Info'>언데?</div>
              <div className='Comments_Container_Box_CommentsBox_TextBox_Comment'>정말 좋아요. 먼저 영어가 아닌 한국어로 소통하기에 정말 편합니다. 시작한지 한 달만에 최종 레포트까지 받을 수 있었습니다.</div>
            </div>


          </div>


        </div>
      </div>
    </>
  )
}
