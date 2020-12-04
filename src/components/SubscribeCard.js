import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../utils/authHttpWrapper';
import '../css/SubscribeCard.css';
import { Link } from 'react-router-dom';

const SubscribeCard = (props) => {

    const imgDefault = process.env.PUBLIC_URL + '/Gray.png'
    const [subscribeImage, setSubscribeImage] = useState('');

    useEffect(() => {
        setSubscribeImage(API_BASE_URL + '/profile/' + props.subscribe.trainerId + '/image')
        // eslint-disable-next-line
    }, [])

    const onImageError = () => {
        setSubscribeImage(imgDefault);
    }

    return (
        <Link className='Page' to={"/page/" + props.subscribe.trainerName}>
            <div className='Subscribe'>
                <img className='SubscribeImg' src={subscribeImage} onError={onImageError} alt={''} />
                <text className='SubscribeName'>{props.subscribe.trainerName}</text>
            </div>
        </Link>
    );
};

export default SubscribeCard;