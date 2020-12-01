import React, { useEffect, useState } from 'react'
import '../css/VideoInfo.css'
import { deleteHttp, postHttp, getUserNickName, API_BASE_URL } from '../utils/authHttpWrapper';

const VideoInfo = (props) => {
    const [like, setLike] = useState(props.trainingInfo.likes)
    const [subscribe, setSubscribe] = useState(props.trainingInfo.subscribe)
    const imgDefault = 'https://avatars2.githubusercontent.com/u/18184139?s=64&v=4';
    const [trainerImg, setTrainerImg] = useState(API_BASE_URL+'/profile/'+props.trainingInfo.trainerId+'/image')

    useEffect(() => {
        setTrainerImg(API_BASE_URL+'/profile/'+props.trainingInfo.trainerId+'/image')
    }, [props.trainingInfo.trainerId])

    useEffect(() => {
        setLike(props.trainingInfo.likes)
    }, [props.trainingInfo.likes])

    useEffect(() => {
        setSubscribe(props.trainingInfo.subscribe)
    }, [props.trainingInfo.subscribe])

    const addLike = () => {

        if (props.trainingInfo.like === false) {
            postHttp('/trainings/' + props.trainingId + '/like', {})
                .then(() => props.getTrainingInfo())
                .then(() => alert('좋아요 되었습니다.'))
        } else {
            deleteHttp('/trainings/' + props.trainingId + '/like')
                .then(() => props.getTrainingInfo())
                .then(() => alert('좋아요 취소되었습니다.'))
        }
    }

    const ChangeSubscribe = async () => {
        let user
        await getUserNickName()
            .then(r => { user = r })
            .then(async() => {
                if (props.trainingInfo.subscribe === false) {
                    await postHttp('/trainer/' + user, {})
                        .then(async () => await props.getTrainingInfo())
                        .then(() => alert('구독 되었습니다.'))
                } else {
                    await deleteHttp('/trainer/' + user)
                        .then(async () => await props.getTrainingInfo())
                        .then(() => alert('구독 취소되었습니다.'))
                }
            }
            )

    }

    const onImageError = () => {
        setTrainerImg(imgDefault)
    }

    return (
        <div className='VideoInfos'>
            <div className='NameLike'>
                <text className='TrainingVideoName'>{props.trainingInfo.title}</text>
                <div className='Like'>
                    <button className='LikeButton' onClick={addLike} />
                    <text>{like}</text>
                </div>
                {/* <button className='InputButton'>+</button> */}
            </div>
            <div className='Count'>
                <text>{'조회수 ' + props.trainingInfo.views + '회'}</text>
                <text className='Date'>{props.trainingInfo.createdDate.toString().slice(0, 10)}</text>
            </div>
            <div className='ChannelInfo'>
                <img className='Profile' src={trainerImg} onError={onImageError} alt="" />
                <text className='ChannelName'>{props.trainingInfo.trainer}</text>
                <button className='SubscribeButton' onClick={ChangeSubscribe}>{subscribe ? '구독중' : '구독'}</button>
            </div>
            <div className='VideoExplain'>
                <text>{props.trainingInfo.body}</text>
            </div>
            <hr />
        </div>
    )
}

export default VideoInfo;