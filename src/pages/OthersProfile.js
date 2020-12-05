import React, { useState, useEffect } from 'react';
import '../css/Profile.css';
import Trainings from '../components/Trainings';
import { API_BASE_URL, getHttp } from '../utils/authHttpWrapper';
import '../css/OthersProfile.css';


const OthersProfile = (props) => {
    const imgDefault = process.env.PUBLIC_URL + '/Gray.png';
    const [profileImg, setProfileImg] = useState(props.profileImg);
    const [myTrainings, setMyTrainings] = useState([]);

    useEffect(() => {
        let nick = '?'
        nick = props.match.params.nickName;
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
                </div>
                <div className='NickNameInfo'>
                    <div>
                        <div className='NickName'>{props.match.params.nickName}</div>
                    </div>
                </div>
            </div>
            <div className='OthersTrainingArea'>
                <text className="MyUploadTrainingListTitle">
                    올린 운동
                        </text>
                <div className='OthersUploadTriningListBackground'>
                    <Trainings trainings={myTrainings} />
                </div>
            </div>
        </div>
    );
}

export default OthersProfile;