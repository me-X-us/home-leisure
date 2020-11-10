import React from 'react';
import '../css/LogIn.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SignIn from './SignUp.js';
import Axios from 'axios';


const LogIn = ({ value, onClick, onKeyPress }) => {

    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <Link to='/'>
                    <button className='MainButton'>
                    </button>
                </Link>
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
            <Link to='/signup'>
                <div style={{ textAlign: "center" }}>
                    <button className='SignInButton'>
                        회원가입
                    </button>
                </div>
            </Link>
        </div>

    );
}

export default LogIn;
