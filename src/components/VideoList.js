import React, { useState, useEffect } from 'react';
import Video from '../components/Video';
import { getHttp } from '../utils/authHttpWrapper';


const VideoList = () => {

    const [videoListInfo, setvideoListInfo] = useState({
        size: 0,            // 한 페이지에 영상 갯수
        totalElements: 0,   // 총 영상 갯수
        totalPages: 0,      // 총 페이지 수
        number: 0           // 영상 number
    })
    const [numbers, setNumbers] = useState([]);

    const listVideos = numbers.map((number) =>
        <Video number={number} />
    );

    const getVideoListInfo = async () => {
        const videoInfos = await getHttp('/trainings')
            .catch(error => {
                alert(error.response.data.message)
            })

        onChangeVideoListInfo(videoInfos.data)
    };

    const onChangeVideoListInfo = async response => {
        setvideoListInfo({
            size: response.page.size,
            totalElements: response.page.totalElements,
            totalPages: response.page.totalPages,
            number: response.page.number
        });
        // numbers를 [1, ..., n] 으로 만들기
        setNumbers([1, 2, 3]);
    };

    return (
        <div>
            <button onClick={getVideoListInfo} />
            {listVideos}
        </div>
    );
}

export default VideoList;