import React from 'react';
import '../css/TopBar.css';
import {Link} from 'react-router-dom';


const ToolBar = ({value, onClick, onKeyPress}) => {


    return (
        <div className="Start">
            <div className='Menu-wrapper'>
                {/* 홈 이동 버튼 */}
                <Link to='/'>
                    <button className="Home">Home</button>
                </Link>

                {/* 검색 */}
                <input className='input' value={value} onClick={onClick} onKeyPress={onKeyPress}/>
                <Link className='Search' to='/Search'>
                    <button className="searchButton" onClick={onClick}>
                        검색
                    </button>
                </Link>

                {/* 마이페이지 */}
                {/* <Link to='/mypage'><button className="MyPage">MyPage</button></Link> */}
                <Link to='/login'>
                    <button className="MyPage">MyPage</button>
                </Link>
                {/* <ul>
        </ul> */}
            </div>

            <hr/>
        </div>
    )
}

export default ToolBar;