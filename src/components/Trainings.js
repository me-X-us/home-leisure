import React from 'react';
import TrainingCard from './TrainingCard';
import '../css/Trainings.css'

const Trainings = (props) => {
    return (
        <div className='TrainingCardList'>
            {props.trainings.map(training => <TrainingCard key={training.trainingId} training={training}/>)}
        </div>
    );
};

export default Trainings;