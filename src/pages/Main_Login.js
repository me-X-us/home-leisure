import React from 'react';
import '../css/Main.css';
import {Link} from 'react-router-dom';

function Main() {
    return (
        <div>
            <Link to='/training'><img
                src='https://tistory4.daumcdn.net/tistory/3028340/skin/images/bts_sreenshot.001.jpeg'
                position="relative" width="20%" height="10%" opacity="0.5" width="300" height="190" alt=""/>
                <ul>bts</ul>
            </Link>
            <Link to='/training'><img
                src='https://tistory4.daumcdn.net/tistory/3028340/skin/images/bts_sreenshot.001.jpeg'
                position="relative" width="20%" height="10%" opacity="0.5" width="300" height="190" alt=""/>
                <ul>bts</ul>
            </Link>
        </div>
    );
}

export default Main;