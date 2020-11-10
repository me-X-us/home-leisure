import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import '../css/SearchVideoList.css';

function SearchVideoList() {
    const [videoInfo, setVideoInfo] = useState({
        videoName:"영상 제목",
        chanelName: "채널이름",
        view: "날짜",
        content: "영상 설명"
    });

    const onChangeVideoInfo = e => {
        setVideoInfo(e.target.value);
    };

    return (
        <div>
            <Link to='/training' style={{ textDecoration: 'none' }}>
                <div className='SearchVideo'>
                    {/* 나중에 List로 구현 */}

                    <img className="VideoImage" src='https://tistory4.daumcdn.net/tistory/3028340/skin/images/bts_sreenshot.001.jpeg' style={{ verticalAlign: 'top' }} />
                    <text>
                        <div className='VideoInfo'>
                            <div className='SearchVideoName' style={{ width: "800px", maxHeight: "80px" }}>
                                {videoInfo.videoName}
                            </div>
                            <div className='SearchChannelName' style={{ width: "800px", height: "21px" }}>
                                {videoInfo.channelName}
                            </div>
                            <div className='SearchVideoInfo' style={{ width: "800px" }}>
                                <font>
                                    {videoInfo.view}
                                </font>
                                &nbsp;-&nbsp;
                                <font>
                                    {videoInfo.date}
                                </font>
                            </div>
                            <div className='SearchVideoContent' style={{ width: "800px", height: "100px" }}>
                                {videoInfo.content}
                            </div>
                        </div>
                    </text>
                </div >

            </Link>
        </div>
    );
}

export default SearchVideoList;