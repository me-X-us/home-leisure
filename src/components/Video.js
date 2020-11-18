import React, {useState} from 'react';
import '../css/VideoList.css'   // 충돌날까봐 일단 파일 이름은 안바꿧음!!
import { Link } from 'react-router-dom';
import { getHttp } from '../utils/authHttpWrapper';
import { render } from '@testing-library/react';
import moment from 'moment';
import 'moment/locale/ko';

const Video = ({number}) => {

    const [videoInfo, setVideoInfo] = useState({
        videoName: "",
        channelName: "",
        play: "",
        time: ""
    });

    const onChangeVideoInfo = response => {
        let modifiedTime = new Date(
            response.modifiedDate
            // Number(modifiedTime.slice(0,4)),
            // Number(modifiedTime.slice(5,7)),
            // Number(modifiedTime.slice(8,10)),
            // Number(modifiedTime.slice(11,13)),
            // Number(modifiedTime.slice(14,16)),
            // Number(modifiedTime.slice(17,19))
        );    //YYYY-MM-DDTHH:mm:ss.ssssss 형식
        let nowTime = moment();
        let timeAmount = (nowTime - modifiedTime) / 1000;
        let time = '';

        if (timeAmount >= 60 * 60 * 24 * 365) time = (timeAmount / (60 * 60 * 24 * 365)).toFixed() + '년 전';
        else if (timeAmount >= 60 * 60 * 24 * 30) time = (timeAmount / (60 * 60 * 24 * 30)).toFixed() + '달 전';
        else if (timeAmount >= 60 * 60 * 24) time = (timeAmount / (60 * 60 * 24)).toFixed() + '일 전';
        else if (timeAmount >= 60 * 60) time = (timeAmount / (60 * 60)).toFixed() + '시간 전';
        else if (timeAmount >= 60) time = (timeAmount / (60)).toFixed() + '분 전';
        else if (timeAmount >= 0) time = (timeAmount).toFixed() + '초 전';

        setVideoInfo({
            videoName: response.title,
            channelName: response.body,
            play: response.views,
            time: time
            // 조회수
            // 시간
        });
    }

    const getVideoInfos = async () => {
        const videoInfos = await getHttp('/trainings/' + {number}.number.toString())
            .catch(error => {
                alert(error.response.data.message)
            })

        onChangeVideoInfo(videoInfos.data)
    }

    return (
        <div className='Video' onLoad={getVideoInfos} style={{width:'400px'}}>
            {/* 나중에 List로 구현 */}
            <Link to='/training' style={{ textDecoration: 'none' }}>

                <img src='https://tistory4.daumcdn.net/tistory/3028340/skin/images/bts_sreenshot.001.jpeg'
                    position="relative" opacity="0.5" width="300" height="190" alt=""
                    style={{ borderRadius: '1rem' }} />
                <div>
                    <font className='VideoName'>
                        {videoInfo.videoName}
                    </font>
                </div>
                <div>
                    <font className='Channel'>
                        {videoInfo.channelName}
                    </font>
                </div>
                <div>
                    <font className='Play'>
                        {"조회수 " + videoInfo.play + "회"}
                    </font>
                    &nbsp;-&nbsp;
                    <font className='time'>
                        {videoInfo.time}
                    </font>
                </div>
            </Link>
        </div>
    );
}

export default Video;