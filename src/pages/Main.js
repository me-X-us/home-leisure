import React, { useEffect, useState } from 'react';
import '../css/Main.css';
import { getHttp } from "../utils/authHttpWrapper";
import Trainings from "../components/Trainings";

const Main = (props) => {

    const [trainings, setTrainings] = useState([]);
    const [pageInfo, setPageInfo] = useState();

    useEffect(() => {
        getHttp("/trainings").then(r => {
            setPageInfo(r.data.page);
            if (r.data._embedded !== undefined)
                setTrainings(r.data._embedded.trainingList)
        }).catch(error => {
            alert(error.response.data.message)
        });
    }, []);
    console.log(pageInfo)

    return (
        <div style={{ margin: '30px' }}>
            <Trainings trainings={trainings} />
        </div>
    )
};

export default Main;