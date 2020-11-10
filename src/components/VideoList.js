import React, { useState, useEffect } from 'react';
import '../css/VideoList.css';
import {Link} from 'react-router-dom';

const VideoList = () => {

  const [videoInfo, setVideoInfo] = useState({
    videoName: "영상 제목 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20",
    channelName: "채널 이름 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20",
    play: "조회수 @",
    time: "@분전"
  });

  const onChangeVideoInfo = e => {
    setVideoInfo(e.target.value);
  }

  return (
    <div className='Video'>
      {/* 나중에 List로 구현 */}
      <Link to='/training' style={{ textDecoration: 'none' }}>

        <img src='https://tistory4.daumcdn.net/tistory/3028340/skin/images/bts_sreenshot.001.jpeg' position="relative" opacity="0.5" width="300" height="190" alt=""
          style={{ borderRadius: '1rem' }} />
        <div>
          <font className='VideoName'>
            {videoInfo.videoName}
          </font>
        </div>
        <div>
          <font className='Channel'>
            {videoInfo.channelName}
          </font>
        </div>
        <div>
          <font className='Play'>
            {videoInfo.play}
          </font>
          &nbsp;-&nbsp;
          <font className='time'>
            {videoInfo.time}
          </font>
        </div>
      </Link>
    </div>
  );
}

export default VideoList;