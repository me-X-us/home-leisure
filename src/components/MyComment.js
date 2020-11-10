import React from 'react';
import '../css/MyComment.css';
import CommentList from './CommentList.js';

const MyComment = () => {
    return (
        <div>
            <div className='Comment'>
                <text>
                    댓글
                </text>
            </div>
            <div className='MyComment'>
                <img className='MyProfile' src="https://avatars1.githubusercontent.com/u/19163372?s=60&v=4" alt="profile"/>
                <textarea className='Input' placeholder="댓글 입력"/>
                <button className='CommentButton'>
                    입력
                </button>
            </div>
            <CommentList/>
        </div>
    );
}

export default MyComment;