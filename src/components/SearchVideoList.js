import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import '../css/SearchVideoList.css';

function SearchVideoList() {
    return (
        <div className='Video'>
            {/* 나중에 List로 구현 */}
            <Link to='/training' style={{ textDecoration: 'none' }}>

                <img src='https://tistory4.daumcdn.net/tistory/3028340/skin/images/bts_sreenshot.001.jpeg' position="relative" width="20%" height="10%" opacity="0.5" width="300" height="190" alt="" />
                <text>
                    <div>
                        <div className='SeachVideoName'>
                            영상 제목
                        </div>
                    </div>
                    <div>
                        <div className='SearchChannel'>
                            채널 이름
                        </div>
                    </div>
                    <div>
                        <text className='SearchPlay'>
                            조회수 @
                        </text>
                        &nbsp;-&nbsp;
                        <text className='Searchtime'>
                            @분전
                        </text>
                    </div>
                </text>

            </Link>
        </div >
    );
}

export default SearchVideoList;