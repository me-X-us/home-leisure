import React from 'react'
import '../css/VideoInfo.css'

function VideoInfo() {
    return(
        <div className='VideoInfos'>
            <div>
            <text className='VideoName'>
                영상 제목
            </text>
            <button className='LikeButton'>
            </button>
            <button className='InputButton'>
                +
            </button>
            </div>
            <div className='Count'>
                <text>
                    조회수
                </text>
                
                <text className='Date'>
                    날짜
                </text>
            </div>
            <div className='ChannelInfo'>
                <img className='Profile' src="https://avatars2.githubusercontent.com/u/18184139?s=64&v=4"/>
                <text className='ChannelName'>
                    채널 이름
                </text>
                <button className='SubscribeButton'>
                    구독
                </button>
            </div>
            <div className='VideoExplain'>
                <text>
                    영상 설명
                </text>
            </div>
            <hr/>
        </div>
    )
}

export default VideoInfo;