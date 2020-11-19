import React from 'react'
import '../css/VideoInfo.css'

const VideoInfo = (props) => {
  //   const [date ]


    return (
        <div className='VideoInfos'>
            <div>
                <text className='VideoName'>{props.trainingInfo.title}</text>
                <button className='LikeButton'/>
                <button className='InputButton'>+</button>
            </div>
            <div className='Count'>
                <text>{'조회수 ' + props.trainingInfo.views + '회'}</text>
                <text className='Date'>{props.trainingInfo.createdDate.toString().slice(0,10)}</text>
            </div>
            <div className='ChannelInfo'>
                <img className='Profile' src="https://avatars2.githubusercontent.com/u/18184139?s=64&v=4" alt=""/>
                <text className='ChannelName'>{props.trainingInfo.trainer}</text>
                <button className='SubscribeButton'>구독</button>
            </div>
            <div className='VideoExplain'>
                <text>{props.trainingInfo.body}</text>
            </div>
            <hr/>
        </div>
    )
}

export default VideoInfo;