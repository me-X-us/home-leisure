import React, { useEffect, useState } from 'react';
import '../css/LogIn.css';
import { Link, withRouter } from 'react-router-dom';
import { checkLoginStatus, getUserId, postHttp, setTokens } from "../utils/authHttpWrapper";


const LogIn = (props) => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const onChangeId = e => setId(e.target.value);
    const onChangePawword = e => setPassword(e.target.value);

    useEffect(() => {
        redirectHome();
        // eslint-disable-next-line
    }, []);
    const redirectHome = async () => {
        let status = await checkLoginStatus();
        if (status) {
            alert("이미 로그인된 상태입니다.");
            props.history.push('/')
        }
    };
    const signIn = async () => {
        let responseData = await postHttp('/auth/signin', {
            id: id,
            password: password,
        }).catch(error => {
            alert(error.response.data.message)
        });
        if (responseData !== undefined) {
            await setTokens(responseData.data.accessToken, responseData.data.refreshToken);
            let userId = await getUserId();
            alert(userId + "님 반갑습니다.");
            props.setIsLogin(true)
            props.history.push('/')
        }
    };

    const onKeyPress = (e) => {
        if (e.key === 'Enter') signIn();
    }

    return (
        <div className='LoginWrapper'>
            <Link to='/'>
                <button className='MainButton'>
                </button>
            </Link>
            <div>
                <input className='TextInput' value={id} placeholder='아이디' onChange={onChangeId} onKeyPress={onKeyPress} />
            </div>
            <input className='TextInput' value={password} placeholder='비밀번호' type='password' onChange={onChangePawword} onKeyPress={onKeyPress} />
            <div>
            <button className='LogInButton' disabled={id === '' || password === ''} onClick={signIn} > 로그인</button>
            </div>
            <br />
            <Link to='/signup'>
                <button className='SignInButton'> 회원가입</button>
            </Link>
        </div>
    );
};

export default withRouter(LogIn);
