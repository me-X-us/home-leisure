import React, {useState} from 'react'
import '../css/VideoInfo.css'

const VideoInfo = () => {

    const [videoInfo, setVideoInfo] = useState({
        videoName: "영상 제목",
        count: "조회수",
        channelName: "채널 이름",
        videoExplain: "영상 설명"
    });

    return (
        <div className='VideoInfos'>
            <div>
                <text className='VideoName'>
                    {videoInfo.videoName}
                </text>
                <button className='LikeButton'/>
                <button className='InputButton'>
                    +
                </button>
            </div>
            <div className='Count'>
                <text>
                    {videoInfo.count}
                </text>
                <text className='Date'>
                    {videoInfo.date}
                </text>
            </div>
            <div className='ChannelInfo'>
                <img className='Profile' src="https://avatars2.githubusercontent.com/u/18184139?s=64&v=4" alt=""/>
                <text className='ChannelName'>
                    {videoInfo.channelName}
                </text>
                <button className='SubscribeButton'>
                    구독
                </button>
            </div>
            <div className='VideoExplain'>
                <text>
                    {videoInfo.videoExplain}
                </text>
            </div>
            <hr/>
        </div>
    )
}

export default VideoInfo;