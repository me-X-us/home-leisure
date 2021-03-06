import React, { useState, useEffect } from 'react';
import '../css/MyComment.css';
import { postHttp, API_BASE_URL } from '../utils/authHttpWrapper'

const MyComment = (props) => {
    const [commentBody, setCommentBody] = useState('');
    const defaultImg = process.env.PUBLIC_URL + '/Gray.png'
    const [myImg, setMyImg] = useState(API_BASE_URL+'/profile/'+props.userId+'/image')

    const onChangeCommentBody = e => setCommentBody(e.target.value);

    useEffect(() => {
        setMyImg(API_BASE_URL+'/profile/'+props.userId+'/image')
    }, [props.userId])

    const inputComment = async () => {
        if (commentBody !== '') {
            await postHttp('/comments/' + props.trainingId, {
                message: commentBody
            }).catch(error => {
                console.log('error on component : ', error.response.data)
            });
            setCommentBody('')
        }
        else {
            alert('댓글 내용을 입력하세요.')
        }

        // props.history.push('/training/' + props.trainerId);

        props.refresh()
    };

    const onImageError = () => {
        setMyImg(defaultImg)
    }

    return (
        <div className='MyCommentWrapper'>
            <div className='Comment'>
                <text>
                    댓글
                </text>
            </div>
            <div className='MyComment'>
                <img className='MyProfile' src={myImg} onError={onImageError} alt="" />
                <textarea className='Input' placeholder="댓글입력" value={commentBody} onChange={onChangeCommentBody} />
                <button className='CommentButton' onClick={inputComment}>
                    입력
                </button>
            </div>
        </div>
    );
}

export default MyComment;