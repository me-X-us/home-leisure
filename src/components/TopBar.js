import React, {useState} from 'react';
import '../css/TopBar.css';
import {Link, withRouter} from 'react-router-dom';


const TopBar = (props) => {
    const [searchString, setSearchString] = useState("");

    const onSearchStringChanges = e => setSearchString(e.target.value);

    const search = () => props.history.push('/search?title=' + searchString);
    const loginOrMyPage = () => {
        let link = props.loginStatus ? "mypage" : "login";
        props.history.push(link)
    };
    const onKeyPress = (e) => {
        if (e.key === 'Enter' && searchString !== "") {
            search();
        }
    };

    return (
        <div className='Menu-wrapper'>
            <Link to='/'>
                <button className="Home">Home</button>
            </Link>

            <input className='input' value={searchString} onChange={onSearchStringChanges} onKeyPress={onKeyPress}/>
            <button className="searchButton" onClick={search}>검색</button>
            <button className="MyPage" onClick={loginOrMyPage}>{props.loginStatus ? "mypage" : "login"}</button>
        </div>
    )
};

export default withRouter(TopBar);