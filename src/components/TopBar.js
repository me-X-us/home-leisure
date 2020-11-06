import React from 'react';
import '../css/TopBar.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from '../pages/Main';
import Training from '../pages/Training';
import Mypage from '../pages/Main';
import Search from '../pages/Search';
import SignIn from '../pages/SignIn'
import LogIn from '../pages/LogIn'

const ToolBar = ({value, onClick, onKeyPress}) => {
    return (
    // <div className="Start">
      <Router>
        <div className='Menu-wrapper'>
            {/* 홈 이동 버튼 */}
            <Link to='/'><button className="Home">Home</button></Link>

            {/* 검색 */}
            <input className='input' value={value} onClick={onClick} onKeyPress={onKeyPress}/>
            <Link className='Search' to='/Search'>
                <button className="searchButton" onClick={onClick}>
                    검색
                </button>
            </Link>

            {/* 마이페이지 */}
            {/* <Link to='/mypage'><button className="MyPage">MyPage</button></Link> */}
            <Link to='/login'><button className="MyPage">MyPage</button></Link>
          <ul>
          </ul>
        </div>

        
        <div className='Contents-wrapper'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/training' component={Training} />
            <Route path='/mypage' component={Mypage} />
            <Route path='/Search' component={Search} />
            <Route path='/login' component={LogIn} />
            <Route path='/signin' components={SignIn} />
          </Switch>
        </div>
      </Router>
    // </div>
    )
}

export default ToolBar;