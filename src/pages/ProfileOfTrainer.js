import React, {useState, useEffect} from 'react';
import '../css/ProfileOfUser.css';
import SearchVideoList from '../components/SearchVideoList';
import {Link} from 'react-router-dom';
import {getUserNickName} from '../utils/authHttpWrapper';

const ProfileOfUser = (props) => {
    const [nickName, setNickName] = useState('');
    const [nickNameChange, setNickNameChange] = useState(false);
    const [newNickName, setNewNickName] = useState('');

    useEffect(() => {
        getUserNickName().then( r => setNickName(r) )
    },[])

    const onChangeNickName = e => setNewNickName(e.target.value);

    const changeNickName = async () => {
        // let nick = await getUserNickName();      // 수정
        if (nickNameChange === false) {
            setNickNameChange(true);
        } else {
            setNickName(newNickName);
            setNickNameChange(false);
        }
    }

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            changeNickName();
        }
    }


    return (
        <div>
            <div style={{marginBottom: '200px', marginLeft: '200px'}}>
                <img className='UserProfile '
                     src="https://avatars1.githubusercontent.com/u/50524321?s=460&u=7621eb647ffc21484a8ddb3914275574063c08cb&v=4" alt={""}/>
                <text style={{marginLeft: '400px'}}>
                    <div className='UserInfo' style={{display: 'table-cell'}}>
                        <div className='NickName'>{nickNameChange ?
                            <input onChange={onChangeNickName} onKeyPress={onKeyPress}
                                   placeholder={nickName}/> : nickName}</div>
                        <button className='NickNameEditButton' onClick={changeNickName}>닉네임 편집</button>
                    </div>
                </text>
            </div>
            <div style={{marginLeft: '130px'}}>
                <text>
                    <div style={{display: 'table-cell', marginRight: '10px'}}>
                        <text style={{fontSize: 'xx-large'}}>
                            내가 올린 운동
                        </text>
                        <Link to='/upload'>
                            <button style={{
                                float: 'right',
                                width: '42px',
                                height: '42px',
                                background: 'lightgray',
                                paddingTop: '0px',
                                border: 'none',
                                borderRadius: '0.7rem',
                                color: 'white',
                                fontSize: 'xx-large',
                                verticalAlign: 'center'
                            }}
                                    onClick={{}}>
                                +
                            </button>
                        </Link>
                        <div style={{
                            backgroundColor: 'lightgray',
                            width: '1500px',
                            height: '800px',
                            padding: '20px',
                            marginTop: '10px'
                        }}>
                            <SearchVideoList/>
                        </div>
                    </div>
                </text>

                {/* <text style={{marginLeft:'20px'}}>
                    <div style={{ display: 'table-cell' }}>
                        <div style={{ fontSize: 'xx-large', marginBottom: '10px' }}>
                            구독 리스트
                        </div>
                        <div style={{ backgroundColor: 'lightgray', width: '420px', height:'800px', padding: '20px' }}>
                            <Trainings />
                        </div>
                    </div>
                </text> */}
            </div>
        </div>
    );
}

export default ProfileOfUser;