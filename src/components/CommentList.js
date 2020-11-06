import React from 'react';
import '../css/CommentList.css';

function CommentList() {
    return (
        <div className='CommentList'>
            <img className='MyProfile' src="https://avatars0.githubusercontent.com/u/59818703?s=64&v=4" alt=""/>
            <text>
                <div className='CommentInfos'>
                    <div className='CommentName'>이름</div>
                    <div className='CommentBody'>댓글</div>
                    {/* <div className='Modify'>수정</div> */}
                </div>
            </text>
        </div>
    );
}

export default CommentList;