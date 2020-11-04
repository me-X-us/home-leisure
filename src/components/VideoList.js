import React from 'react';
import '../css/VideoList.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function VideoList() {
  return (
    <div className='Video'>
      {/* 나중에 List로 구현 */}
      <Link to='/training' style={{ textDecoration: 'none' }}>

        <img src='https://tistory4.daumcdn.net/tistory/3028340/skin/images/bts_sreenshot.001.jpeg' position="relative" width="20%" height="10%" opacity="0.5" width="300" height="190" alt="" />
        <div>
          <font className='VideoName'>
            영상 제목
          </font>
        </div>
        <div>
          <font className='Channel'>
            채널 이름
          </font>
        </div>
        <div>
          <font className='Play'>
            조회수 @
          </font>
          &nbsp;-&nbsp;
          <font className='time'>
            @분전
          </font>
        </div>
      </Link>
    </div>
  );
}

export default VideoList;