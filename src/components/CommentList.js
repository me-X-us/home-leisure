import React, { useState } from 'react';
import '../css/CommentList.css';

const CommentList = () => {

    const [name, setName] = useState("이름");
    const [comment, setComment] = useState("댓글");

    const onChangeName = e => {
        setName(e.target.value);
    };

    const onChangeComment = e => {
        setComment(e.target.value);
    };

    return (
        <div className='CommentList'>
            <img className='MyProfile' src="https://avatars0.githubusercontent.com/u/59818703?s=64&v=4" alt=""/>
            <text>
                <div className='CommentInfos' style={{ display: 'table-cell' /** 위치를 바로 옆에 나오게 함 */ }}>
                    <div className='CommentName'>
                        {name}
                    </div>
                    <div className='CommentBody'>
                        {comment}
                    </div>
                    {/* <div className='Modify'>수정</div> */}
                </div>
            </text>
        </div>
    );
}

export default CommentList;