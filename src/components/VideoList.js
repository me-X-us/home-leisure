import React, { useState } from 'react';
import '../css/VideoList.css';
import { Link } from 'react-router-dom';
import { getHttp } from '../utils/authHttpWrapper';
import moment from 'moment';
import 'moment/locale/ko';

const VideoList = () => {

    const [videoInfo, setVideoInfo] = useState({
        videoName: "영상 제목 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20",
        channelName: "채널 이름 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20",
        play: "0",
        time: "@분전"
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
        let time='';

        if(timeAmount>=60*60*24*365) time = (timeAmount/(60*60*24*365)).toFixed()+'년 전';
        else if(timeAmount>=60*60*24*30) time = (timeAmount/(60*60*24*30)).toFixed()+'달 전';
        else if(timeAmount>=60*60*24) time = (timeAmount/(60*60*24)).toFixed()+'일 전';
        else if(timeAmount>=60*60) time = (timeAmount/(60*60)).toFixed()+'시간 전';
        else if(timeAmount>=60) time = (timeAmount/(60)).toFixed()+'분 전';
        else if(timeAmount>=0) time = (timeAmount).toFixed()+'초 전';

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
        const videoInfos = await getHttp('/trainings/1')
            .catch(error => {
                alert(error.response.data.message)
            })

        onChangeVideoInfo(videoInfos.data)
    }

    return (
        <div className='Video'>
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
            <button onClick={getVideoInfos} />
        </div>
    );
}

export default VideoList;