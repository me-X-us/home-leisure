import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import TopBar from './components/TopBar'
import Home from './pages/Main'
import MyPage from './pages/Main'
import Training from './pages/Training';
import Search from './pages/Search';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import {checkLoginStatus} from "./utils/authHttpWrapper";

function App() {
    const [loginStatus, setLoginStatus] = useState(false);

    useEffect(() => {
        checkLogin()
        // eslint-disable-next-line
    }, []);

    const checkLogin = async () => {
        let status = await checkLoginStatus();
        setLoginStatus(status)
    };

    return (
        <Router basename={process.env.PUBLIC_URL}>
            <TopBar loginStatus={loginStatus}/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/training' component={Training}/>
                <Route path='/mypage' component={MyPage}/>
                <Route path='/search' component={Search}/>
                <Route path='/login' render={() => <LogIn setIsLogin={setLoginStatus}/>}/>
                <Route path='/signup' render={() => <SignUp setIsLogin={setLoginStatus}/>}/>
            </Switch>
        </Router>
    );
}

export default App;