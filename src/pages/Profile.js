import React, { useState, useEffect } from 'react';
import '../css/Profile.css';
import Trainings from '../components/Trainings';
import Subscribes from '../components/Subscribes';
import { Link } from 'react-router-dom';
import { getUserId, getUserNickName, postHttp, API_BASE_URL, putHttp, getHttp } from '../utils/authHttpWrapper';


const ProfileOfTrainer = (props) => {
    const [nickName, setNickName] = useState('?');
    const [nickNameChange, setNickNameChange] = useState(false);
    const [newNickName, setNewNickName] = useState('');
    const imgDefault = 'https://avatars1.githubusercontent.com/u/50524321?s=460&u=7621eb647ffc21484a8ddb3914275574063c08cb&v=4';
    const [imgPreview, setImagePreview] = useState('');
    const [imgUpload, setImgUpload] = useState('');
    const [imgChanging, setImageChanging] = useState(false);
    const [myTrainings, setMyTrainings] = useState([]);
    const [myLikeTrainings, setMyLikeTrainings] = useState([]);
    const [mySubscribes, setMySubscribes] = useState([]);

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
                        console.log(r.data)
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
                console.log(newNickName);
                setNickNameChange(false);
                setNickName(newNickName);
            }).catch(error => {
                console.log('error on component : ', error.response.data)
            })
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
        <div className='ProfileWrapper'>
            <div className='ProfileInfo'>
                <div>
                    <img onError={onImageError} className='UserProfile' src={imgChanging ? imgPreview : imgUpload} alt={''}></img>
                    {imgChanging ? <div><input className='ProfileImgInput' type='file' accept='image/jpg,impge/png,image/jpeg,image/gif' onChange={onImageChanged} alt={""} /></div> : <br />}
                    <button className='ProfileImgEditButton' onClick={submitImage}>프로필 편집</button>
                </div>
                <div className='NickNameInfo'>
                    <div>
                        <div className='NickName'>{nickNameChange ?
                            <input onChange={onChangeNickName} onKeyPress={onKeyPress}
                                placeholder={nickName} /> : nickName}</div>
                        <button className='NickNameEditButton' onClick={changeNickName}>닉네임 편집</button>
                    </div>
                </div>
            </div>
            <div className='MyArea'>
                <div className='MyTrainingArea'>
                    <text className="MyUploadTrainingListTitle">
                        내가 올린 운동
                        </text>
                    <Link to='/upload'>
                        <button className='UploadButton'>+</button>
                    </Link>
                    <div className='MyUploadTriningListBackground'>
                        <Trainings trainings={myTrainings} />
                    </div>
                </div>
                <div className='MyLikeTrainingArea'>
                    <text className="MyUploadTrainingListTitle">
                        내가 좋아요한 운동
                        </text>
                    <div className='MyUploadTriningListBackground'>
                        <Trainings trainings={myLikeTrainings} />
                    </div>
                </div>
                <div className='MySubscribeArea'>
                    <text className="MyUploadTrainingListTitle">
                        나의 구독 리스트
                        </text>
                    <div className='MyUploadTriningListBackground'>
                        <Subscribes subscribes={mySubscribes} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileOfTrainer;