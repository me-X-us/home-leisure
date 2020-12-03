import React, { useState, useEffect } from 'react';
import '../css/Profile.css';
import Trainings from '../components/Trainings';
import Subscribes from '../components/Subscribes';
import { Link } from 'react-router-dom';
import { getUserId, getUserNickName, API_BASE_URL, getHttp } from '../utils/authHttpWrapper';


const OthersProfile = (props) => {
    const [nickName, setNickName] = useState(props.nickName);
    const imgDefault = process.env.PUBLIC_URL + '/Gray.png';
    const [profileImg, setProfileImg] = useState(props.profileImg);
    const [myTrainings, setMyTrainings] = useState([]);
    const [myLikeTrainings, setMyLikeTrainings] = useState([]);
    const [mySubscribes, setMySubscribes] = useState([]);

    // eslint-disable-next-line
    useEffect(() => {
        let nick = '?'
        nick = props.match.params.nickName;
        // getUserNickName()
        //     .then(r => {
        //         nick = r
        //         setNickName(r)
        //     })
        //     .then(() => getUserId())
        //     .then(userId => setImgUpload(API_BASE_URL + '/profile/' + userId + '/image'))
        //     .then(async () => {
        setProfileImg(API_BASE_URL + '/profile/' + nick + '/image')
        getHttp("/trainings")
            .then(r => {
                if (r.data._embedded !== undefined) {
                    let tList = r.data._embedded.trainingList
                    let newtList = tList.filter(t => t.trainer === nick)
                    setMyTrainings(newtList)
                }
            }).catch(error => {
                console.log(error.response.data.message)
            })
        // await getHttp("/training/likes")
        //     .then(r => {
        //         setMyLikeTrainings(r.data);
        //     }).catch(error => {
        //         console.log(error.response.data.message)
        //     })
        // await getHttp("/subscribes")
        //     .then(r => {
        //         console.log(r.data)
        //         setMySubscribes(r.data);
        //     }).catch(error => {
        //         console.log(error.response.data.message)
        //     })
    // })
    // eslint-disable-next-line
}, [])

const onImageError = () => {
    setProfileImg(imgDefault);
}

return (
    <div className='ProfileWrapper'>
        <div className='ProfileInfo'>
            <div>
                <img onError={onImageError} className='UserProfile' src={profileImg} alt={''}></img>
                <br />
            </div>
            <div className='NickNameInfo'>
                <div>
                    <div className='NickName'>{props.match.params.nickName}</div>
                </div>
            </div>
        </div>
        <div className='MyArea'>
                <div className='MyTrainingArea'>
                    <text className="MyUploadTrainingListTitle">올린 운동</text>
                    <div className='MyUploadTriningListBackground'>
                        <Trainings trainings={myTrainings} />
                    </div>
                </div>
                {/* <div className='MyLikeTrainingArea'>
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
                </div> */}
            </div>
    </div>
);
}

export default OthersProfile;