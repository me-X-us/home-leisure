import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../utils/authHttpWrapper';
import '../css/SubscribeCard.css';
import { Link } from 'react-router-dom';

const SubscribeCard = (props) => {

    const imgDefault = 'https://avatars1.githubusercontent.com/u/50524321?s=460&u=7621eb647ffc21484a8ddb3914275574063c08cb&v=4';
    const [subscribeImage, setSubscribeImage] = useState('');

    useEffect(() => {
        setSubscribeImage(API_BASE_URL + '/profile/' + props.subscribe.trainerId + '/image')
        // eslint-disable-next-line
    }, [])

    const onImageError = () => {
        setSubscribeImage(imgDefault);
    }

    return (
        <Link className='Subscribe' to={"/page/" + props.subscribe.trainerName}>
            <img className='SubscribeImg' src={subscribeImage} onError={onImageError} alt={''}/>
            <text className='SubscribeName'>{props.subscribe.trainerName}</text>
        </Link>
    );
};

export default SubscribeCard;