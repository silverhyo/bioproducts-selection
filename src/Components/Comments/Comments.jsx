import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// import Style
import "./Comments.css"

// import Components
import { WebInformation } from '../../Context/WebInformation';
import { AuthContext } from '../../Context/AuthContext';

export default function Comments() {
  
  const LocalAddress = useContext(WebInformation).URL.serverURL;
  const logInInformation = useContext(AuthContext).userStatus;
  const [userId, setUserId] = useState('');
  const [userDatabaseInfo, setUserDatabaseInfo] = useState('');
  const [comments, setComments] = useState([]);  // * 특정 게시글에 대한 댓글 상태태
  const [newComment, setNewComment] = useState(''); // 댓글 입력 값 저장 input 연결
  const [replyComment, setReplyComment] = useState(''); // 대댓글 입력 값 저장 input 연결결
  const [replyingTo, setReplyingTo] = useState(null); // 대댓글 작성 시 댓글의 ID 저장, silverhyo : 댓글 ID에 대한 대댓글 창 위치를 결정하기위한 댓글 ID
  const {id: productId} = useParams();
  // 댓글 수정을 위한 상태 추가
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정할 댓글의 ID 저장
  const [editCommentText, setEditCommentText] = useState(''); // 수정할 댓글의 내용 저장 Input 연결결
  
  // 로그인 정보 가져오기
  useEffect(() => {
    if(logInInformation && logInInformation.isLoggedIn) {
      setUserId(logInInformation.currentUserId);

        axios.get(`${LocalAddress}`+`/userinfo/`+`${logInInformation.currentUserId}`)
        .then(res => setUserDatabaseInfo(res.data))
        .catch(err => console.log(err));
    }
  }, [logInInformation, LocalAddress]);

  // 댓글 목록 가져오기
  useEffect(() => {
    if (productId) {
      fetchComments();
    }
  }, [productId]);

  // 댓글 조회 함수
  const fetchComments = () => {
    axios.get(`${LocalAddress}/comments/${productId}`)
      .then(res => {
        setComments(res.data);
      })
      .catch(err => console.log(err));
  };

  // 댓글 작성
  async function handleAddComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const values = {
      userId: userId,
      productId: productId,
      comment: newComment,
      parentId: null // 최상위 댓글은 parentId가 null
    };
    
    axios.post(`${LocalAddress}/comment`, values)
      .then(() => {
        setNewComment('');
        fetchComments(); // 댓글 목록 새로고침
      })
      .catch(err => console.log(err));
  };

  // 대댓글 작성
  async function handleAddReply(e, parentId) {
    e.preventDefault();
    if (!replyComment.trim()) return;
    
    const values = {
      userId: userId,
      productId: productId,
      comment: replyComment,
      parentId: parentId
    };
    
    axios.post(`${LocalAddress}/comment`, values)
      .then(() => {
        setReplyComment('');
        setReplyingTo(null);
        fetchComments(); // 댓글 목록 새로고침
      })
      .catch(err => console.log(err));
  };

  // 댓글 수정 시작
  const handleEditStart = (comment) => {
    setEditingCommentId(comment.id);
    setEditCommentText(comment.Comment);
  };

  // 댓글 수정 제출
  const handleEditSubmit = (commentId) => {
    if (!editCommentText.trim()) return;
    
    axios.put(`${LocalAddress}/comment/${commentId}`, {
      userId: userId,
      comment: editCommentText
    })
      .then(() => {
        setEditingCommentId(null);
        setEditCommentText('');
        fetchComments(); // 댓글 목록 새로고침
      })
      .catch(err => {
        console.log(err);
        if (err.response && err.response.status === 403) {
          alert('자신의 댓글만 수정할 수 있습니다.');
        }
      });
  };

  // 댓글 삭제
  const handleDeleteComment = (commentId) => {
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      axios.delete(`${LocalAddress}/comment/${commentId}`, {
        data: { userId: userId } // DELETE 요청에서는 body를 data 옵션으로 전달해야 함
      })
        .then(() => {
          fetchComments(); // 댓글 목록 새로고침
        })
        .catch(err => {
          console.log(err);
          if (err.response && err.response.status === 403) {
            alert('자신의 댓글만 삭제할 수 있습니다.');
          }
        });
    }
  };

  // 댓글 형식화 함수
  const formatComments = (commentsData) => {
    // parentId가 null인 최상위 댓글만 필터링
    const parentComments = commentsData.filter(comment => comment.ParentID === null);
    
    return parentComments.map(comment => {
      // 현재 댓글에 대한 대댓글 찾기
      const replies = commentsData.filter(reply => reply.ParentID === comment.id);
      return { ...comment, replies };
    });
  };

  // 현재 로그인한 사용자가 댓글 작성자인지 확인하는 함수
  const isCommentOwner = (comment) => {
    return logInInformation.isLoggedIn && 
          userDatabaseInfo[0] && 
          userDatabaseInfo[0].ID === comment.UserID;
  };

  const formattedComments = comments.length > 0 ? formatComments(comments) : [];

  return (
    <>
      {logInInformation.isLoggedIn ? (
        <div className='Comments_Form_Container'>
          <form className='Comments_Form_Container_Form' onSubmit={handleAddComment}>
            <div className='Comments_Form_Container_Form_FormBox'>
              <div className='Comments_Form_Container_Form_FormBox_ImageBox'>
                <img className='Comments_Form_Container_Form_FormBox_ImageBox_Image' src={userDatabaseInfo[0]?.profileImageThumbnail} alt=""></img>
              </div>

              <div className='Comments_Form_Container_Form_TextBox'>
                <textarea 
                  className='Comments_Form_Container_Form_TextBox_Textarea' 
                  rows="3" 
                  name="commentText" 
                  placeholder="댓글을 입력해 주세요" 
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className='Comments_Form_Container_Form_SubmitBox'>
              <input className='Comments_Form_Container_Form_SubmitBox_Submit' type="submit" value="댓글등록"></input>
            </div>
          </form>
        </div>
      ) : null}
      
      <div className='Comments_Container'>
        <div className='Comments_Container_Box'>
          <div className='Comments_Container_Box_Text'>댓글</div>
          <br />
          
          {formattedComments.length > 0 ? (
            formattedComments.map((comment) => (
              <div key={comment.id} className="Comment_Thread">
                <div className='Comments_Container_Box_CommentsBox'>
                  <div className='Comments_Container_Box_CommentsBox_ImageBox'>
                    <img className='Comments_Container_Box_CommentsBox_ImageBox_Image' src={comment.profileImageThumbnail} alt=''></img>
                  </div>
                  <div className='Comments_Container_Box_CommentsBox_TextBox'>
                    <div className='Comments_Container_Box_CommentsBox_TextBox_Info'>{comment.name}</div>
                    
                    {editingCommentId === comment.id ? (
                      // 수정 폼
                      <div className='Comments_Edit_Form'>
                        <textarea 
                          className='Comments_Container_Form_TextBox_Textarea' 
                          rows="2" 
                          value={editCommentText}
                          onChange={e => setEditCommentText(e.target.value)}
                        ></textarea>
                        <div className='Comments_Reply_Form_Buttons'>
                          <button type="button" className='Comments_Reply_Cancel_Button' onClick={() => setEditingCommentId(null)}>취소</button>
                          <button type="button" className='Comments_Reply_Submit_Button' onClick={() => handleEditSubmit(comment.id)}>수정완료</button>
                        </div>
                      </div>
                    ) : (
                      // 일반 댓글 표시
                      <div className='Comments_Container_Box_CommentsBox_TextBox_Comment'>{comment.Comment}</div>
                    )}
                    
                    <div className='Comments_Container_Box_CommentsBox_TextBox_Date'>
                      {new Date(comment.Date).toLocaleString()}
                      {logInInformation.isLoggedIn && (
                        <>
                          <button 
                            className='Comments_Reply_Button'
                            onClick={() => setReplyingTo(comment.id)}
                          >
                            답글달기
                          </button>
                          {isCommentOwner(comment) && (
                            <>
                              <button 
                                className='Comments_Edit_Button'
                                onClick={() => handleEditStart(comment)}
                              >
                                수정
                              </button>
                              <button 
                                className='Comments_Delete_Button'
                                onClick={() => handleDeleteComment(comment.id)}
                              >
                                삭제
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* 대댓글 영역 */}
                <div className="Comment_Replies">
                  {comment.replies && comment.replies.map((reply) => (
                    <div key={reply.id} className='Comments_Container_Box_CommentsBox Reply'>
                      <div className='Comments_Container_Box_CommentsBox_ImageBox'>
                        <img className='Comments_Container_Box_CommentsBox_ImageBox_Image' src={reply.profileImageThumbnail} alt=''></img>
                      </div>
                      <div className='Comments_Container_Box_CommentsBox_TextBox'>
                        <div className='Comments_Container_Box_CommentsBox_TextBox_Info'>{reply.name}</div>
                        
                        {editingCommentId === reply.id ? (
                          // 수정 폼
                          <div className='Comments_Edit_Form'>
                            <textarea 
                              className='Comments_Container_Form_TextBox_Textarea' 
                              rows="2" 
                              value={editCommentText}
                              onChange={e => setEditCommentText(e.target.value)}
                            ></textarea>
                            <div className='Comments_Reply_Form_Buttons'>
                              <button type="button" className='Comments_Reply_Cancel_Button' onClick={() => setEditingCommentId(null)}>취소</button>
                              <button type="button" className='Comments_Reply_Submit_Button' onClick={() => handleEditSubmit(reply.id)}>수정완료</button>
                            </div>
                          </div>
                        ) : (
                          // 일반 댓글 표시
                          <div className='Comments_Container_Box_CommentsBox_TextBox_Comment'>{reply.Comment}</div>
                        )}
                        
                        <div className='Comments_Container_Box_CommentsBox_TextBox_Date'>
                          {new Date(reply.Date).toLocaleString()}
                          {isCommentOwner(reply) && (
                            <>
                              <button 
                                className='Comments_Edit_Button'
                                onClick={() => handleEditStart(reply)}
                              >
                                수정
                              </button>
                              <button 
                                className='Comments_Delete_Button'
                                onClick={() => handleDeleteComment(reply.id)}
                              >
                                삭제
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 대댓글 작성 폼 */}
                {logInInformation.isLoggedIn && replyingTo === comment.id && (
                  <div className='Comments_Reply_Form'>
                    <form onSubmit={(e) => handleAddReply(e, comment.id)}>
                      <div className='Comments_Container_Form_FormBox'>
                        <div className='Comments_Container_Form_FormBox_ImageBox'>
                          <img className='Comments_Container_Form_FormBox_ImageBox_Image' src={userDatabaseInfo[0]?.profileImageThumbnail} alt=""></img>
                        </div>
                        <div className='Comments_Container_Form_TextBox'>
                          <textarea 
                            className='Comments_Container_Form_TextBox_Textarea' 
                            rows="2" 
                            placeholder="답글을 입력해 주세요" 
                            value={replyComment}
                            onChange={e => setReplyComment(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                      <div className='Comments_Reply_Form_Buttons'>
                        <button type="button" className='Comments_Reply_Cancel_Button' onClick={() => setReplyingTo(null)}>취소</button>
                        <button type="submit" className='Comments_Reply_Submit_Button'>답글등록</button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="No_Comments">아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</div>
          )}
        </div>
      </div>
    </>
  );
}
