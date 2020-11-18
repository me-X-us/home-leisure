import React from 'react';
import TrainingCard from './TrainingCard';

const Trainings = (props) => {
    return (
        <div>
            {props.trainings.map((training, index) => <TrainingCard key={training.trainingId} training={training}/>)}
        </div>
    );
};

export default Trainings;