import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/SearchVideoList.css';

function SearchVideoList() {
    const [videoInfo, setVideoInfo] = useState({
        videoName: "영상 제목",
        channelName: "채널이름",
        view: "날짜",
        content: "영상 설명"
    });

    useEffect(() => {
        setVideoInfo({
            videoName: "영상 제목",
            channelName: "채널이름",
            view: "날짜",
            content: "영상 설명"
        });
    }, [])


    return (
        <div>
            <Link className='SearchVideo' to='/training'>
                <div>
                    {/* 나중에 List로 구현 */}

                    <img className="VideoImage"
                        src='https://tistory4.daumcdn.net/tistory/3028340/skin/images/bts_sreenshot.001.jpeg'
                        alt='' />
                    <text>
                        <div className='VideoInfo'>
                            <div className='SearchVideoName'>
                                {videoInfo.videoName}
                            </div>
                            <div className='SearchChannelName'>
                                {videoInfo.channelName}
                            </div>
                            <div className='SearchVideoInfo'>
                                <font>
                                    {videoInfo.view}
                                </font>
                                &nbsp;-&nbsp;
                                <font>
                                    {videoInfo.date}
                                </font>
                            </div>
                            <div className='SearchVideoContent'>
                                {videoInfo.content}
                            </div>
                        </div>
                    </text>
                </div>
            </Link>
        </div>
    );
}

export default SearchVideoList;