import React from 'react'
import SubscribeCard from './SubscribeCard';

const Subscribes = (props) => {
    return (
        <div>
            {props.subscribes.map(subscribe => <SubscribeCard key={subscribe.trainerId} subscribe={subscribe}/>)}
        </div>
    );
}

export default Subscribes;