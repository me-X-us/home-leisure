import React, { useState, useEffect } from 'react';
import '../css/ProfileOfUser.css';
import SearchVideoList from '../components/SearchVideoList';
import { Link } from 'react-router-dom';
import { getUserId, getUserNickName, postHttp, API_BASE_URL } from '../utils/authHttpWrapper';

const ProfileOfTrainer = (props) => {
    const [nickName, setNickName] = useState('');
    const [nickNameChange, setNickNameChange] = useState(false);
    const [newNickName, setNewNickName] = useState('');
    const imgDefault = 'https://avatars1.githubusercontent.com/u/50524321?s=400&u=7621eb647ffc21484a8ddb3914275574063c08cb&v=4';
    const [imgPreview, setImagePreview] = useState('');
    const [imgUpload, setImgUpload] = useState('');
    const [imgChanging, setImageChanging] = useState(false);

    useEffect(() => {
        getUserNickName()
            .then(r => setNickName(r))
            .then(() => getUserId())
            .then(userId => setImgUpload(API_BASE_URL + '/profile/' + userId + '/image'))
    }, [])

    const onChangeNickName = e => setNewNickName(e.target.value);

    const changeNickName = async () => {
        // let nick = await getUserNickName();      // 수정
        if (nickNameChange === false) {
            setNickNameChange(true);
        }
        else if(nickNameChange === true && newNickName !== '') {

            setNickName(newNickName);
            setNickNameChange(false);
        }
    }

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            changeNickName();
        }
    }

    const onImageChanged = (e) => {
        setImagePreview(URL.createObjectURL(e.target.files[0]))
        setImgUpload(e.target.files[0])
    }

    const submitImage = async (e) => {
        if (imgChanging === false) {
            setImageChanging(true);
        }
        else {
            setImageChanging(false);

            const fd = new FormData();
            let userId = await getUserId();

            fd.append('image', imgUpload);
            postHttp('/profile/' + userId + '/image', fd)
                .then(res => {
                    setImgUpload(API_BASE_URL + '/profile/' + userId + '/image');
                })
                .catch(error => {
                    console.log(error.response);
                });
        }
    }

    const onImageError = () => {
        setImgUpload(imgDefault);
    }

    return (
        <div>
            <div style={{ height:'507px', marginBottom: '200px', marginLeft: '200px', float: 'left', display: 'flex', alignItems: 'flex-end', textAlign: 'center' }}>
                <div>
                    <img onError={onImageError} className='UserProfile' src={imgChanging?imgPreview:imgUpload}></img>
                    {imgChanging ? <div><input type='file' accept='image/jpg,impge/png,image/jpeg,image/gif' onChange={onImageChanged} style={{width:'150px'}} alt={""} /></div>:<br/>}
                    <button onClick={submitImage} style={{ marginTop: '10px', background: 'none', border: 'none' }}>프로필 편집</button>
                </div>
                <div style={{ marginLeft: '400px' }}>
                    <div className='UserInfo' style={{ display: 'table-cell' }}>
                        <div className='NickName'>{nickNameChange ?
                            <input onChange={onChangeNickName} onKeyPress={onKeyPress}
                                placeholder={nickName} /> : nickName}</div>
                        <button className='NickNameEditButton' onClick={changeNickName}>닉네임 편집</button>
                    </div>
                </div>
            </div>
            <div style={{ marginLeft: '130px' }}>
                <div style={{ display: 'table-cell', marginRight: '10px' }}>
                    <text style={{ fontSize: 'xx-large' }}>
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
                        }}>
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
                        <SearchVideoList />
                    </div>
                </div>

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

export default ProfileOfTrainer;