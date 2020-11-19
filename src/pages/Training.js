import React, {useEffect, useState} from 'react';
import MyComment from '../components/MyComment.js'
import VideoInfo from '../components/VideoInfo.js'
import {getHttp} from "../utils/authHttpWrapper";
import Comment from "../components/Comment";
import Player from '../components/Player'

const Training = (props) => {
    const [trainingInfo, setTrainingInfo] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getHttp("/trainings/" + props.match.params.trainingId)
            .then(response => setTrainingInfo(response.data))
            .then(async () => await getHttp("/comments/"+props.match.params.trainingId))
            .then(response => {
                if(response.data.page.totalElements !==0)
                    setComments(response.data._embedded.commentList)
                console.log(response)
            })
    }, [props.match.params.trainingId]);

    return (
        <div>
            <Player/>
            <div style={{height: 1000, backgroundColor: 'black'}}>
            </div>
            <VideoInfo trainingInfo={trainingInfo}/>
            <MyComment/>
            {comments.map((comment,index)=><Comment key={index} comment={comment}/>)}
        </div>
    );
};

export default Training;