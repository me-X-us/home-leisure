import React, { useEffect, useState } from 'react'
import '../css/VideoInfo.css'
import { deleteHttp, postHttp, API_BASE_URL } from '../utils/authHttpWrapper';
import { Link } from 'react-router-dom'

const VideoInfo = (props) => {
    const [like, setLike] = useState(props.trainingInfo.likes)
    const [subscribe, setSubscribe] = useState(props.trainingInfo.subscribe)
    const imgDefault = process.env.PUBLIC_URL + '/Gray.png'
    const [trainerImg, setTrainerImg] = useState(API_BASE_URL + '/profile/' + props.trainingInfo.trainerId + '/image')

    useEffect(() => {
        setTrainerImg(API_BASE_URL + '/profile/' + props.trainingInfo.trainerId + '/image')
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
        } else {
            deleteHttp('/trainings/' + props.trainingId + '/like')
                .then(() => props.getTrainingInfo())
        }
    }

    const ChangeSubscribe = async () => {
        if (props.trainingInfo.subscribe === false) {
            await postHttp('/trainer/' + props.trainingInfo.trainerId, {})
                .then(async () => await props.getTrainingInfo())
        } else {
            await deleteHttp('/trainer/' + props.trainingInfo.trainerId)
                .then(async () => await props.getTrainingInfo())
        }
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
                <Link className='Page' to={"/page/" + props.trainingInfo.trainer}>
                    <img className='Profile' src={trainerImg} onError={onImageError} alt="" />
                    <text className='ChannelName'>{props.trainingInfo.trainer}</text>
                </Link>
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