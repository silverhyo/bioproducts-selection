import { CommentSection } from 'react-comments-section';
// import style 
import "./CommentsReact.css";
// import useContext
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

export default function CommentsReact() {

  // const userInformation = useContext(AuthContext).userStatus;
  const { userStatus: userInformation } = useContext(AuthContext);

  const data = [
    // {
    //   userId: "02b",
    //   comId: "017",
    //   fullName: "Lily",
    //   userProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
    //   text: "I think you have a point🤔",
    //   avatarUrl: "https://ui-avatars.com/api/name=Lily&background=random",
    //   replies: [],
    // },
  ];


  const onSubmitAction = (data) => {
    console.log("check submit, ", data);
  };

  const currentData = (data) => {
    console.log("current data", data);
  };


  const CustomNoComment = () => {
    <div className="no-com">댓글을 입력해 주세요!^^.😊</div> 
  }

  return (
    <div>
      <CommentSection
        currentUser={userInformation.isLoggedIn ? userInformation : null}
        // {{
        //   currentUserId: "01a",
        //   currentUserImg: "https://ui-avatars.com/api/name=Riya&background=random",
        //   currentUserProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
        //   currentUserFullName: "Riya Negi",
        // }}
        logIn={{
          loginLink: "http://localhost:3000/login/kakao",
          signupLink: "http://localhost:3000/login/kakao",
        }}
        commentData={data}
        onSubmitAction={onSubmitAction}
        currentData={currentData}
        // ! 아래는 true일 경우 emoji 를 없앨 수 있다.
        removeEmoji={false}
        // ! 아래는 에디터 기능 추가에 대한 부분 true=> 기능 추가
        advancedInput={false}
        customNoComment={() => CustomNoComment()}
      />
    </div>
  )
}
