import React from 'react';
import '../css/LogIn.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SignIn from './SignIn.js';

const LogIn = ({value, onClick, onKeyPress}) => {
    return (
        <Router>
            <div>
                <div style={{ textAlign: "center" }}>
                    <button className='MainButton'>
                    </button>
                </div>
                <div style={{ textAlign: "center" }}>
                    <input className='TextInput' placeholder='아이디'>

                    </input>
                </div>
                <div style={{ textAlign: "center" }}>
                    <input className='TextInput' placeholder='비밀번호'>

                    </input>
                </div>
                <div style={{ textAlign: "center" }}>
                    <button className='LogInButton'>
                        로그인
                    </button>
                </div>
                <Link to='/signin'>
                    <div style={{ textAlign: "center" }}>
                        <button className='SignInButton'>
                            회원가입
                        </button>
                    </div>
                </Link>
            </div>


            <div className='Contents-wrapper'>
                <Switch>
                    <Route path='/signin' component={SignIn} />
                </Switch>
            </div>
        </Router >
    );
}

export default LogIn;