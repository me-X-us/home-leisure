import React from 'react';
import '../css/TopBarBeforeLogin.css';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import Home from '../pages/Main';
import Mypage from '../pages/Main';
import Training from '../pages/Training';
import Search from '../pages/Search';

<<<<<<< HEAD
const ToolBar = ({ value, onClick, onKeyPress }) => {


  return (
    // <div className="Start">
    <Router>
      <div className='Menu-wrapper'>
        {/* 홈 이동 버튼 */}
        <Link to='/'><button className="Home">Home</button></Link>

        {/* 검색 */}
        <input className='input' value={value} onClick={onClick} onKeyPress={onKeyPress} />
        <Link className='Search' to='/Search'>
          <button className="searchButton" onClick={onClick}>
            검색
                </button>
        </Link>

        {/* 마이페이지 */}
        <Link to='/mypage'><button className="MyPage">MyPage</button></Link>
        <ul>
        </ul>
      </div>


      <div className='Contents-wrapper'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/training' component={Training} />
          <Route path='/mypage' component={Mypage} />
          <Route path='/Search' component={Search} />
        </Switch>
      </div>
    </Router>
    // </div>
  )
=======
const ToolBar = ({value, onClick, onKeyPress}) => {
    return (
        // <div className="Start">
        <Router>
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
                <Link to='/mypage'>
                    <button className="MyPage">MyPage</button>
                </Link>
                <ul>
                </ul>
            </div>


            <div className='Contents-wrapper'>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/training' component={Training}/>
                    <Route path='/mypage' component={Mypage}/>
                    <Route path='/Search' component={Search}/>
                </Switch>
            </div>
        </Router>
        // </div>
    )
>>>>>>> 36bac0e5e5bad3710b22a6e8c827dc4014eba504
}

export default ToolBar;