import React, { useState } from 'react';
import '../css/CommentList.css';
import { getUserId, putHttp, deleteHttp } from '../utils/authHttpWrapper'

const Comment = (props) => {

    const [isModify, setIsModify] = useState(false);
    const [modifiedComment, setModifiedComment] = useState('');

    const onChangeModifedComment = e => setModifiedComment(e.target.value);

    const onModifyComment = async () => {
        let userId = await getUserId();
        if (userId === props.comment.commenterId && isModify === false) {
            setIsModify(true)
        }
        else if (userId === props.comment.commenterId && isModify === true) {
            await putHttp('/comments/' + props.comment.commentId, {
                message: modifiedComment
            }).catch(error => {
                console.log('error on component : ', error.response.data)
            });
            setIsModify(false)
            setModifiedComment('')
            props.refresh()
        }
        else {
            alert('자신의 댓글만 수정 가능합니다.')
        }
    }

    const onDeleteComment = async () => {
        let userId = await getUserId();
        if (userId === props.comment.commenterId) {
            await deleteHttp('/comments/' + props.comment.commentId, {
                message: modifiedComment
            }).catch(error => {
                console.log('error on component : ', error.response.data)
            });
            alert('삭제되었습니다.')
            props.refresh()
        }
        else {
            alert('자신의 댓글만 삭제 가능합니다.')
        }
    }

    const onKeyPress = (e) => {
        if (e.key === 'Enter') onModifyComment();
    }

    return (
        <div className='CommentList'>
            <img className='MyProfile' src="https://avatars0.githubusercontent.com/u/59818703?s=64&v=4" alt="" />
            <text>
                <div className='CommentInfos' style={{ display: 'table-cell' /** 위치를 바로 옆에 나오게 함 */ }}>
                    <div className='CommentName'>
                        {props.comment.commenterId}
                    </div>
                    <div className='CommentBody'>
                        {isModify ? <input value={modifiedComment} onChange={onChangeModifedComment} onKeyPress={onKeyPress} /> : props.comment.message}
                    </div>
                    <button className='Modify' onClick={onModifyComment} style={{ background: 'none', border: 'none' }} >수정</button>
                    <button className='Delete' onClick={onDeleteComment} style={{ background: 'none', border: 'none' }} >삭제</button>
                </div>
            </text>
        </div>
    );
};

export default Comment;