import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TopBar from './components/TopBar'
import Home from './pages/Main'
import Mypage from './pages/Main'
import Training from './pages/Training';
import Search from './pages/Search';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import ProfileOfUser from './pages/ProfileOfUser';

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <TopBar/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/training' component={Training}/>
                <Route path='/mypage' component={Mypage}/>
                <Route path='/Search' component={Search}/>
                <Route path='/login' component={LogIn}/>
                <Route path='/signup' component={SignUp}/>
            </Switch>
        </Router>
    );
}

export default App;