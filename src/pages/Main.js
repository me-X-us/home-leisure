import React, { useEffect, useState } from 'react';
import '../css/Main.css';
import { getHttp } from "../utils/authHttpWrapper";
import Trainings from "../components/Trainings";

const Main = (props) => {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        getHttp("/trainings")
            .then(r => {
                if (r.data._embedded !== undefined)
                    setTrainings(r.data._embedded.trainingList)
            }).catch(error => {
                alert(error.response)
            });
    }, []);

    return (
        <div className='Trainings'>
            <Trainings trainings={trainings} />
        </div>
    )
};

export default Main;