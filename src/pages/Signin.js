import React from 'react';
import '../css/SignIn.css';

function SignIn() {
    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <button className='MainButton'>

                </button>
            </div>
            <div style={{ textAlign: "center" }}>
                <input className='TextInput' placeholder='닉네임'>

                </input>
            </div>
            <div style={{ textAlign: "center" }}>
                <input className='IDInput' placeholder='아이디'>

                </input>
                <button className='DuplicateButton'>
                    ID확인
                </button>
            </div>
            <div style={{ textAlign: "center" }}>
                <input className='TextInput' placeholder='비밀번호'>

                </input>
            </div>
            <div style={{ textAlign: "center" }}>
                <input className='TextInput' placeholder='비밀번호 확인'>

                </input>
            </div>
            <div style={{ textAlign: "center" }}>
                <input className='TextInput' placeholder='이메일'>

                </input>
            </div>
            <div style={{ textAlign: "center" }}>
                <button className='SignInAndLogInButton'>
                    회원가입 후 로그인
                    </button>
            </div>
        </div>
    );
}

export default SignIn;