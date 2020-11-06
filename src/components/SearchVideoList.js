import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import '../css/SearchVideoList.css';
import Filter from '../components/Filter.js';

function SearchVideoList() {
    return (
        <div>
        <Filter/>
        <Link to='/training' style={{ textDecoration: 'none' }}>
            <div className='SearchVideo'>
                {/* 나중에 List로 구현 */}

                <img className="VideoImage" src='https://tistory4.daumcdn.net/tistory/3028340/skin/images/bts_sreenshot.001.jpeg' style={{verticalAlign: 'top'}}/>
                <text>
                    <div className='VideoInfo'>
                        <div className='SearchVideoName' style={{width:"800px", maxHeight:"80px"}}>영상 제목</div>
                        <div className='SearchChannelName' style={{width:"800px", height:"21px"}}>채널이름</div>
                        <div className='SearchVideoInfo'style={{width:"800px"}}>
                            <font>조회수</font>
                            &nbsp;-&nbsp;
                            <font>날짜</font>
                        </div>
                        <div className='SearchVideoContent' style={{width:"800px", height:"100px"}}>
                            영상 설명
                        </div>
                    </div>
                </text>
            </div >

        </Link>
        </div>
    );
}

export default SearchVideoList;