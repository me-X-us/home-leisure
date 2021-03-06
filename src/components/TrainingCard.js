import React from 'react';
import '../css/TrainingCard.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';
import { API_BASE_URL } from '../utils/authHttpWrapper';

const TrainingCard = (props) => {

    const setDate = modifiedDate => {
        let modifiedTime = new Date(modifiedDate);
        let nowTime = moment();
        let timeAmount = (nowTime - modifiedTime) / 1000;
        let time = '';

        if (timeAmount >= 60 * 60 * 24 * 365) time = (timeAmount / (60 * 60 * 24 * 365)).toFixed() + '년 전';
        else if (timeAmount >= 60 * 60 * 24 * 30) time = (timeAmount / (60 * 60 * 24 * 30)).toFixed() + '달 전';
        else if (timeAmount >= 60 * 60 * 24) time = (timeAmount / (60 * 60 * 24)).toFixed() + '일 전';
        else if (timeAmount >= 60 * 60) time = (timeAmount / (60 * 60)).toFixed() + '시간 전';
        else if (timeAmount >= 60) time = (timeAmount / (60)).toFixed() + '분 전';
        else if (timeAmount >= 0) time = (timeAmount).toFixed() + '초 전';
        return time;
    };

    return (
        <div className='Video'>
            <Link className='TrainingCardWrapper' to={"/training/" + props.training.trainingId}>
                <img className='ThumbNail' src={API_BASE_URL + "/thumbnail/" + props.training.trainingId}
                    position="relative" opacity="0.5" width="300" height="190" alt="" />
                <font className='VideoName'>
                    {props.training.title}<br />
                </font>
                <Link className='Page' to={"/page/" + props.training.trainer}>
                    <font className='Channel'>{props.training.trainer}<br /></font>
                </Link>
                <font className='Play'>
                    {"조회수 " + props.training.views + "회"}
                </font>
                &nbsp;-&nbsp;
                <font className='time'>
                    {setDate(props.training.modifiedDate)}
                </font>
            </Link>
        </div>
    );
};

export default TrainingCard;