import React, {useEffect, useState} from 'react';
import '../css/SignUp.css';
import {postCall} from '../utils/authWrapper'

import {Link} from 'react-router-dom';

const SignUp = () => {

    const [id, setId] = useState("");
    const [nick, setNick] = useState("");
    const [pw, setPw] = useState("");
    const [repw, setRepw] = useState("");
    const [email, setEmail] = useState("");
    const [chkpw, SetChkpw] = useState("");
    // const [term, setTerm] = useState(false);

    const onChangeId = e => {
        setId(e.target.value);
    };

    const onChangeNick = e => {
        setNick(e.target.value);
    };

    const onChangePw = e => {
        setPw(e.target.value);
    };

    const onChangeRepw = e => {
        setRepw(e.target.value);
    };

    const onChangeEmail = e => {
        setEmail(e.target.value);
    }

    // const onChangeTerm = e => {
    //     setTerm(e.target.value);
    // };

    // 비동기->(value 다 바꾸면 ㄱㄱ)
    // useEffect(() => {

    // }, [signupValue])

    const onSubmit = () => {
        postCall('https://mexus-api.herokuapp.com/auth/signup', {
            id: id,
            password: pw,
            nickName: nick,
            email: email
        }).then((data) => console.log(data))
            .catch(error => {
                console.log('error on component : ', error.response.data)
            })
        /*
                    .then((data)=>console.log(data))
        */
        /*        Axios.post('https://mexus-api.herokuapp.com/auth/signup',
                    {
                        id: id,
                        password: pw,
                        nickName: nick,
                        email: email
                    })
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(error => { console.log('error : ', error.response.data) });*/
    }

    useEffect(() => {
        if (pw.length < 1 || repw.length < 1) {
            SetChkpw('📝패스워드 입력📝')
            // 비밀번호가 같다면 일치
        } else if (pw === repw) {
            SetChkpw('✅일치 ✅')
            // 비밀번호가 같지 않다면 불일치
        } else {
            SetChkpw('❌불일치 ❌')
        }
    }, [pw, repw])

    return (
        <div>
            <div style={{textAlign: "center"}}>
                <Link to='/'>
                    <button className='MainButton'>
                    </button>
                </Link>
            </div>
            <div style={{textAlign: "center"}}>
                <input className='TextInput' placeholder='닉네임' value={nick} onChange={onChangeNick}/>
            </div>
            <div style={{textAlign: "center"}}>
                <input className='IDInput' placeholder='아이디' value={id} onChange={onChangeId}/>
                <button className='DuplicateButton'>
                    ID확인
                </button>
            </div>
            <div style={{textAlign: "center"}}>
                <input className='TextInput' placeholder='비밀번호' value={pw} onChange={onChangePw} type="password"/>
                <i class="fa fa-eye fa-lg"></i>
            </div>
            <div style={{textAlign: "center"}}>
                <input className='TextInput' placeholder='비밀번호 확인' value={repw} onChange={onChangeRepw}
                       type="password"/>
                <div>
                    {chkpw}
                </div>
            </div>
            <div style={{textAlign: "center"}}>
                <input className='TextInput' placeholder='이메일' type='email' value={email} onChange={onChangeEmail}/>
            </div>
            <div style={{textAlign: "center"}}>
                <button className='SignInAndLogInButton' onClick={onSubmit}>
                    회원가입 후 로그인
                </button>
            </div>
        </div>
    );
}

export default SignUp;

// //이메일 인풋창 핸들링
// const handleEmail = e => {
//     e.preventDefault();
//     this.setState({
//         email: e.target.value
//     });
// };

// //이메일 중복검사
// const checkEmail = e => {
//     e.preventDefault();

//     //이메일 유효성 검사 함수
//     const chkEmail = function (str) {
//         var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
//         return regExp.test(str) ? true : false;
//     };

//     const inputEmail = {
//         email: this.state.email
//     };

//     const email_info = {
//         method: "POST",
//         body: JSON.stringify(inputEmail),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     };

//     if (chkEmail(this.state.email) === false) {
//         alert("이메일 형식이 유효하지 않습니다.");
//         this.setState({
//             email: ""
//         });
//     } else {
//         Axios
//             .post("https://mexus-api.herokuapp.com/auth/signup", email_info)
//             .then(res => res.json())
//             .then(json => {
//                 if (json === true) {
//                     alert("사용가능 한 아이디입니다");
//                     this.setState({
//                         emailCheck: this.state.email
//                     });
//                 } else {
//                     alert("이미 존재하는 아이디입니다");
//                 }
//             });
//     }
// };

// //닉네임 인풋창 핸들링
// const handleNickname = e => {
//     e.preventDefault();
//     this.setState({
//         nickname: e.target.value
//     });
// };

// //닉네임 중복검사
// const checkNickname = e => {
//     e.preventDefault();

//     const chkNickname = function (str) {
//         var regNm = /^[가-힣]{2,15}|[a-zA-Z]{2,15}\s[a-zA-Z]{2,15}$/;
//         return regNm.test(str) ? true : false;
//     };

//     const inputNickname = {
//         nickname: this.state.nickname
//     };

//     const nickname_info = {
//         method: "POST",
//         body: JSON.stringify(inputNickname),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     };
//     if (chkNickname(this.state.nickname) === false) {
//         alert("한글,영문 대소문자 2~15자리만 사용 가능합니다");
//     } else {
//         fetch("http://localhost:9089/user/nick", nickname_info)
//             .then(res => res.json())
//             .then(json => {
//                 if (json === true) {
//                     alert("사용 가능한 닉네임입니다.");
//                     this.setState({
//                         nicknameCheck: this.state.nickname
//                     });
//                 } else {
//                     alert("이미 존재하는 닉네임입니다.");
//                 }
//             });
//     }
// };

// // 아이디 중복검사
// const checkID = e => {
//     e.preventDefault();

//     const chkID = function (str) {
//         var regNm = /^[가-힣]{2,15}|[a-zA-Z]{2,15}\s[a-zA-Z]{2,15}$/;
//         return regNm.test(str) ? true : false;
//     };

//     const inputID = {
//         id: this.state.id
//     };

//     const ID_info = {
//         method: "POST",
//         body: JSON.stringify(inputID),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     };
//     if (chkID(this.state.id) === false) {
//         alert("한글,영문 대소문자 2~15자리만 사용 가능합니다");
//     } else {
//         Axios
//             .post("https://mexus-api.herokuapp.com/auth/signup", ID_info)
//             .then(res => res.json())
//             .then(json => {
//                 if (json === true) {
//                     alert("사용 가능한 아이디입니다.");
//                     this.setState({
//                         idCheck: this.state.id
//                     });
//                 } else {
//                     alert("이미 존재하는 아이디입니다.");
//                 }
//             });
//     }
// };

// //첫번째 패스워드 입력창 set변환
// const handlePW = e => {
//     e.preventDefault();
//     this.setState({
//         pw: e.target.value
//     });
// };
// //두번째 패스워드 입력창 set변환
// const handleRE_PW = e => {
//     e.preventDefault();
//     this.setState({
//         re_pw: e.target.value
//     });
// };
// //첫번 째 두번 째 패스워드 일치 확인
// const checkPW = e => {
//     e.preventDefault();

//     //비밀번호 유효성검사(영문,숫자 혼합 6~20)
//     const chkPwd = function (str) {
//         var reg_pwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
//         return !reg_pwd.test(str) ? false : true;
//     };

//     if (chkPwd(this.state.re_pw) === false) {
//         alert("영문,숫자를 혼합하여 6~12자 이내");
//         this.setState({
//             pw: "",
//             re_pw: ""
//         });
//     } else {
//         if (this.state.pw === this.state.re_pw) {
//             alert("일치합니다.");
//             this.setState({
//                 pwCheck: this.state.re_pw
//             });
//         } else {
//             alert("불일치합니다.");
//         }
//     }
// };

// //서버로 가입 양식 제출
// const handleSubmit = e => {
//     e.preventDefault();
//     const {
//         id,
//         password,
//         Repassword,
//         nickName,
//         email
//     } = this.state;

//     const signupInfo = {
//         email: this.state.emailCheck,
//         pw: this.state.pwCheck,
//         nickname: this.state.nicknameCheck
//     };

//     const signup_info = {
//         method: "POST",
//         body: JSON.stringify(signupInfo),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     };

//     if (
//         this.email &&
//         this.nickname &&
//         this.pw &&
//         this.re_pw &&
//         this.email === this.emailCheck &&
//         this.nickname === this.nicknameCheck &&
//         this.pw === this.re_pw &&
//         this.re_pw === this.pwCheck
//     ) {

//     } else {
//         alert("입력값을 확인해주세요");
//     }
// };