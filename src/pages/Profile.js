import React, { useState, useEffect } from 'react';
import '../css/Profile.css';
import Trainings from '../components/Trainings';
import Subscribes from '../components/Subscribes';
import { Link } from 'react-router-dom';
import { getUserId, getUserNickName, postHttp, API_BASE_URL, putHttp, getHttp } from '../utils/authHttpWrapper';


const Profile = (props) => {
    const [nickName, setNickName] = useState('?');
    const [nickNameChange, setNickNameChange] = useState(false);
    const [newNickName, setNewNickName] = useState('');
    const imgDefault = process.env.PUBLIC_URL + '/Gray.png';
    const [imgPreview, setImagePreview] = useState('');
    const [imgUpload, setImgUpload] = useState('');
    const [imgChanging, setImageChanging] = useState(false);
    const [myTrainings, setMyTrainings] = useState([]);
    const [myLikeTrainings, setMyLikeTrainings] = useState([]);
    const [mySubscribes, setMySubscribes] = useState([]);
    const [listState, setlistState] = useState(false);

    // eslint-disable-next-line
    useEffect(() => {
        let nick = '?'
        getUserNickName()
            .then(r => {
                nick = r
                setNickName(r)
            })
            .then(() => getUserId())
            .then(userId => setImgUpload(API_BASE_URL + '/profile/' + userId + '/image'))
            .then(async () => {
                await getHttp("/trainings")
                    .then(r => {
                        if (r.data._embedded !== undefined) {
                            let tList = r.data._embedded.trainingList
                            let newtList = tList.filter(t => t.trainer === nick)
                            setMyTrainings(newtList)
                        }
                    }).catch(error => {
                        console.log(error.response.data.message)
                    })
                await getHttp("/training/likes")
                    .then(r => {
                        setMyLikeTrainings(r.data);
                    }).catch(error => {
                        console.log(error.response.data.message)
                    })
                await getHttp("/subscribes")
                    .then(r => {
                        setMySubscribes(r.data);
                    }).catch(error => {
                        console.log(error.response.data.message)
                    })
            })
        // eslint-disable-next-line
    }, [])

    const onChangeNickName = e => {
        setNewNickName(e.target.value);
    }

    const changeNickName = async () => {
        if (nickNameChange === false) {
            setNickNameChange(true);
        }
        else if (nickNameChange === true && newNickName !== '') {

            await putHttp('/profile', {
                nickName: newNickName
            }).then(() => {
                setNickNameChange(false);
                setNickName(newNickName);
            }).catch(error => {
                console.log('error on component : ', error.response.data)
            })
        }
        else if (nickNameChange === true && newNickName === '') {
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

    const onChangelistState1 = () => {
        setlistState(true);
    }

    const onChangelistState2 = () => {
        setlistState(false);
    }

    return (
        <div className='ProfileWrapper'>
            <div className='ProfileInfo'>
                <div>
                    <img onError={onImageError} className='UserProfile' src={imgChanging ? imgPreview : imgUpload} alt={''}></img>
                    {imgChanging ? <div><input className='ProfileImgInput' type='file' accept='image/jpg,impge/png,image/jpeg,image/gif' onChange={onImageChanged} alt={""} /></div> : <br />}
                    <button className='ProfileImgEditButton' onClick={submitImage}>프로필 편집</button>
                </div>
                <div className='NickNameInfo'>
                    <div className='NickName'>{nickNameChange ?
                        <input className='NickNameInput' onChange={onChangeNickName} onKeyPress={onKeyPress}
                            placeholder={nickName} /> : nickName}</div>
                    <button className='NickNameEditButton' onClick={changeNickName}>닉네임 편집</button>
                </div>
            </div>
            <div className='MyArea'>
                <div className='MyListArea'>
                    <div className='ListTitles'>
                        <div className='MyTrainingArea' onClick={onChangelistState2} style={listState ? { cursor:'pointer' } : { background: 'lightgray' }}>
                            <text className="MyUploadTrainingListTitle">내가 올린 운동</text>
                            <Link to='/upload'><button className='UploadButton'>+</button></Link>
                        </div>
                        <div className='MyLikeTrainingArea' onClick={onChangelistState1} style={listState ? { background:'lightgray' } : { cursor:'pointer' }}>
                            <text className="MyUploadTrainingListTitle">내가 좋아요한 운동</text>
                        </div>
                    </div>
                    <div className='MyTrainingList'>
                        {listState ? <div className='MyTriningListBackground'><Trainings trainings={myLikeTrainings} /></div> : <div className='MyTriningListBackground'><Trainings trainings={myTrainings} /></div>}
                    </div>
                </div>
                <div className='MySubscribeArea'>
                    <div className='MySubscribeTitle'>
                        <text className="MyUploadTrainingListTitle">
                            나의 구독 리스트
                        </text>
                    </div>
                    <div className='MySubscribeListBackground'>
                        <Subscribes subscribes={mySubscribes} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;