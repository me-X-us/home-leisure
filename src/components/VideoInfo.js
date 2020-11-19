import React from 'react'
import '../css/VideoInfo.css'

const VideoInfo = (props) => {
    return (
        <div className='VideoInfos'>
            <div>
                <text className='VideoName'>
                    {props.trainingInfo.title}
                </text>
                <button className='LikeButton'/>
                <button className='InputButton'>
                    +
                </button>
            </div>
            <div className='Count'>
                <text>
                    {props.trainingInfo.views}
                </text>
                <text className='Date'>
                    {props.trainingInfo.modifiedDate}
                </text>
            </div>
            <div className='ChannelInfo'>
                <img className='Profile' src="https://avatars2.githubusercontent.com/u/18184139?s=64&v=4" alt=""/>
                <text className='ChannelName'>
                    {props.trainingInfo.trainer}
                </text>
                <button className='SubscribeButton'>
                    구독
                </button>
            </div>
            <div className='VideoExplain'>
                <text>
                    {props.trainingInfo.body}
                </text>
            </div>
            <hr/>
        </div>
    )
}

export default VideoInfo;