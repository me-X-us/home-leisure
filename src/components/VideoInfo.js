import React from 'react'
import '../css/VideoInfo.css'

const VideoInfo = (props) => {


    return (
        <div className='VideoInfos'>
            <div className='NameLike'>
                <text className='TrainingVideoName'>{props.trainingInfo.title}</text>
                <div className='Like'>
                    <button className='LikeButton' />
                    <text>1000</text>
                </div>
                {/* <button className='InputButton'>+</button> */}
            </div>
            <div className='Count'>
                <text>{'조회수 ' + props.trainingInfo.views + '회'}</text>
                <text className='Date'>{props.trainingInfo.createdDate.toString().slice(0, 10)}</text>
            </div>
            <div className='ChannelInfo'>
                <img className='Profile' src="https://avatars2.githubusercontent.com/u/18184139?s=64&v=4" alt="" />
                <text className='ChannelName'>{props.trainingInfo.trainer}</text>
                <button className='SubscribeButton'>구독</button>
            </div>
            <div className='VideoExplain'>
                <text>{props.trainingInfo.body}</text>
            </div>
            <hr />
        </div>
    )
}

export default VideoInfo;