import React, { useState, useEffect } from 'react';
import '../css/Comment.css';
import { getUserId, putHttp, deleteHttp, API_BASE_URL } from '../utils/authHttpWrapper'
import moment from 'moment';
import 'moment/locale/ko';

const Comment = (props) => {

    const [isModify, setIsModify] = useState(false);
    const [modifiedComment, setModifiedComment] = useState('');
    const imgDefault = "https://avatars0.githubusercontent.com/u/59818703?s=64&v=4"
    const [commenterImg, setCommenterImg] = useState(API_BASE_URL + '/profile/' + props.commenterId + '/image')

    useEffect(() => {
        setCommenterImg(API_BASE_URL + '/profile/' + props.commenterId + '/image')
        console.log(props.commenterId)
    }, [props.commenterId])

    const onChangeModifedComment = e => setModifiedComment(e.target.value);

    const onModifyComment = async () => {
        let userId = await getUserId();
        if (userId === props.comment.commenterId && isModify === false) {
            setIsModify(true)
        }
        else if (userId === props.comment.commenterId && isModify === true && modifiedComment === '') {
            setIsModify(false)
        }
        else if (userId === props.comment.commenterId && isModify === true && modifiedComment !== '') {
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

    const onImageError = () => {
        setCommenterImg(imgDefault)
    }

    const setDate = modifiedDate => {
        let modifiedTime = new Date(modifiedDate);
        let nowTime = moment();
        let timeAmount = (nowTime - modifiedTime) / 1000;
        let time = '';

        if (timeAmount >= 60 * 60 * 24 * 365) time = (timeAmount / (60 * 60 * 24 * 365)).toFixed() + '년 전';
        else if (timeAmount >= 60 * 60 * 24 * 30) time = (timeAmount / (60 * 60 * 24 * 30)).toFixed() + '달 전';
        else if (timeAmount >= 60 * 60 * 24) time = (timeAmount / (60 * 60 * 24)).toFixed() + '일 전';
        else if (timeAmount >= 60 * 60) time = (timeAmount / (60 * 60)).toFixed() + '시간 전';
        else if (timeAmount >= 60) time = (timeAmount / (60)).toFixed() + '분 전';
        else if (timeAmount >= 0) time = (timeAmount).toFixed() + '초 전';
        return time;
    };

    return (
        <div className='CommentList'>
            <img className='MyProfile' src={commenterImg} onError={onImageError} alt="" />
            <div>
                <div className='CommentInfos'>
                    <div className='NameTime'>
                        <div className='CommentName'>{props.comment.commenterId}</div>
                        &nbsp;-&nbsp;
                        <text className='modifiedTime'>{setDate(props.modifiedDate)}</text>
                    </div>
                    <div className='CommentBody'>
                        {isModify ? <input value={modifiedComment} placeholder={props.comment.message} onChange={onChangeModifedComment} onKeyPress={onKeyPress} /> : props.comment.message}
                    </div>
                    <button className='Modify' onClick={onModifyComment} >수정</button>
                    <button className='Delete' onClick={onDeleteComment} >삭제</button>
                </div>
            </div>
        </div>
    );
};

export default Comment;