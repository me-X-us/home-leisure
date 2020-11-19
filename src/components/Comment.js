import React from 'react';
import '../css/CommentList.css';

const Comment = (props) => {
    return (
        <div className='CommentList'>
            <img className='MyProfile' src="https://avatars0.githubusercontent.com/u/59818703?s=64&v=4" alt=""/>
            <text>
                <div className='CommentInfos' style={{display: 'table-cell' /** 위치를 바로 옆에 나오게 함 */}}>
                    <div className='CommentName'>
                        {props.comment.commenterId}
                    </div>
                    <div className='CommentBody'>
                        {props.comment.message}
                    </div>
                    <div className='Modify'>수정</div>
                </div>
            </text>
        </div>
    );
};

export default Comment;