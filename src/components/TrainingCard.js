import React from 'react';
import '../css/VideoList.css' // 충돌날까봐 일단 파일 이름은 안바꿧음!!
import {Link} from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';

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
        <div className='Video' style={{width: '400px'}}>
            <Link to={"/training/"+props.training.trainingId} style={{textDecoration: 'none'}}>
                <img src='https://tistory4.daumcdn.net/tistory/3028340/skin/images/bts_sreenshot.001.jpeg'
                     position="relative" opacity="0.5" width="300" height="190" alt=""
                     style={{borderRadius: '1rem'}}/>
                    <font className='VideoName'>
                        {props.training.title}<br/>
                    </font>
                    <font className='Channel'>
                        {props.training.trainer}<br/>
                    </font>
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