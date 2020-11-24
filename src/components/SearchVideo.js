import React from 'react';
import '../css/SearchVideo.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';
import { API_BASE_URL } from '../utils/authHttpWrapper';

const SearchVideo = (props) => {

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
        <div className='Search'>
            <Link className='SearchVideo' to='/training'>
                <div className='SearchVideoWrapper'>
                    {/* 나중에 List로 구현 */}

                    <img className="SearchVideoImage"
                        src={API_BASE_URL + "/thumbnail/" + props.training.trainingId}
                        alt='' />
                    <div className='SearchVideoInfo'>
                        <font className='SearchVideoName'>
                            {props.training.title}<br />
                        </font>
                        <font className='SearchChannelName'>
                            {props.training.trainer}<br />
                        </font>
                        <font className='SearchVideoInfo'>
                            {"조회수 " + props.training.views + "회"}
                        </font>
                        &nbsp;-&nbsp;
                        <font className='SrarchVideoInfo'>
                            {setDate(props.training.modifiedDate)}
                        </font>
                        <font className='SearchVideoBody'>
                            영상설명
                        </font>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default SearchVideo;