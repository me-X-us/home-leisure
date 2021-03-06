import React, { useEffect, useState } from 'react';
import '../css/SignUp.css';
import { checkLoginStatus, getHttp, getUserId, postHttp, setTokens } from '../utils/authHttpWrapper'

import { Link, withRouter } from 'react-router-dom';

const SignUp = (props) => {
    const [id, setId] = useState("");
    const [chkId, setChkId] = useState("");
    const [nick, setNick] = useState("");
    const [chkNick, setChkNick] = useState("");
    const [pw, setPw] = useState("");
    const [rePw, setRePw] = useState("");
    const [chkPw, setChkPw] = useState("");
    const [email, setEmail] = useState("");
    const [chkEmail, setChkEmail] = useState("");
    const logo = process.env.PUBLIC_URL + '/logo.png';

    const onChangeId = e => setId(e.target.value);
    const onChangeNick = e => setNick(e.target.value);
    const onChangePw = e => setPw(e.target.value);
    const onChangeRepw = e => setRePw(e.target.value);
    const onChangeEmail = e => setEmail(e.target.value);

    useEffect(() => {
        redirectHome();
        setChkId('❌');
        setChkNick('❌');
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (pw.length < 1 || rePw.length < 1) {
            setChkPw('❌')
            // 비밀번호가 같다면 일치
        } else if (pw === rePw) {
            setChkPw('✅')
            // 비밀번호가 같지 않다면 불일치
        } else {
            setChkPw('❌')
        }
    }, [pw, rePw]);

    useEffect(() => {
        const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
        if (email.match(emailRegExp)) {
            setChkEmail("✅")
        } else {
            setChkEmail("❌")
        }
    }, [email]);

    const signUp = async () => {
        let responseData = await postHttp('/auth/signup', {
            id: id,
            password: pw,
            nickName: nick,
            email: email
        }).catch(error => {
            console.log('error on component : ', error.response.data)
        });
        if (responseData !== undefined) {
            await setTokens(responseData.data.accessToken, responseData.data.refreshToken);
            let userId = await getUserId();
            alert(userId + "님 반갑습니다.");
            props.setIsLogin(true)
            props.history.push('/')
        }
    };

    const checkNick = async () => {
        let res = await getHttp('/auth/checkNickName/' + nick)
            .catch(e => setChkNick("❌"));
        if (res !== undefined)
            if (res.status === 200)
                setChkNick("✅");
            else if (res.status === 202)
                setChkNick("❌");
    };

    const checkId = async () => {
        let res = await getHttp('/auth/checkid/' + id)
            .catch(e => setChkId("❌"));
        if (res.status === 200)
            setChkId("✅");
        else if (res.status === 202)
            setChkId("❌");
    };
    const redirectHome = async () => {
        let status = await checkLoginStatus();
        if (status) {
            alert("이미 로그인된 상태입니다.");
            props.history.push('/')
        }
    };

    return (
        <div className='SignUpWrapper'>
            <Link to='/'>
                <img className='MainButton' src={logo} alt={''} />
            </Link>
            <div>
                <input className='NickIdInput' placeholder='닉네임' value={nick} onChange={onChangeNick} />{chkNick}
                <button className='DuplicateButton' onClick={checkNick}> 닉네임<br />중복확인</button>
                <div>
                    <input className='NickIdInput' placeholder='아이디' value={id} onChange={onChangeId} />{chkId}
                    <button className='DuplicateButton' onClick={checkId}> ID<br />중복확인</button>
                </div>
                <input className='TextInput' placeholder='비밀번호' value={pw} type="password" onChange={onChangePw} />
                <div>
                    <input className='PwEmailInput' placeholder='비밀번호 확인' value={rePw} type="password" onChange={onChangeRepw} />{chkPw}
                </div>
                <input className='PwEmailInput' placeholder='이메일' type='email' value={email} onChange={onChangeEmail} />{chkEmail}
                <div>
                    <button className='SignInAndLogInButton' onClick={signUp}
                        disabled={chkPw !== '✅' || chkEmail !== '✅' || chkId !== '✅' || chkNick !== '✅'}>
                        회원가입 후 로그인
                </button>
                </div>
            </div>
        </div>
    );
};

export default withRouter(SignUp);