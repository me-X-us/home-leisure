import React, { useState } from 'react';
import '../css/MyComment.css';
import { postHttp } from '../utils/authHttpWrapper'

const MyComment = (props) => {
    const [commentBody, setCommentBody] = useState('');

    const onChangeCommentBody = e => setCommentBody(e.target.value);

    const inputComment = async () => {
        if (commentBody !== '') {
            await postHttp('/comments/' + props.trainingId, {
                message: commentBody
            }).catch(error => {
                console.log('error on component : ', error.response.data)
            });
            alert('입력되었습니다.')
            setCommentBody('')
        }
        else {
            alert('댓글 내용을 입력하세요.')
        }

        // props.history.push('/training/' + props.trainerId);

        props.refresh()
    };

    return (
        <div>
            <div className='Comment'>
                <text>
                    댓글
                </text>
            </div>
            <div className='MyComment'>
                <img className='MyProfile' src="https://avatars1.githubusercontent.com/u/19163372?s=60&v=4" alt="" />
                <textarea className='Input' placeholder="댓글 입력" value={commentBody} onChange={onChangeCommentBody} />
                <button className='CommentButton' onClick={inputComment}>
                    입력
                </button>
            </div>
        </div>
    );
}

export default MyComment;