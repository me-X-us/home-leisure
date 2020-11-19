import React, {useEffect, useState} from 'react';
import MyComment from '../components/MyComment.js'
import VideoInfo from '../components/VideoInfo.js'
import {getHttp} from "../utils/authHttpWrapper";
import Comment from "../components/Comment";
import { now } from 'moment';
import Player from '../components/Player'

const Training = (props) => {
    const [trainingInfo, setTrainingInfo] = useState({
        title: '',
        trainerId: '',
        trainer: '',
        body: '',
        createdDate: new Date(now)
    });
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getHttp("/trainings/" + props.match.params.trainingId)
            .then(response => setTrainingInfo(response.data))
            .then(async () => await getHttp("/comments/"+props.match.params.trainingId))
            .then(response => {
                if(response.data.page.totalElements !==0)
                    setComments(response.data._embedded.commentList)
            })
    }, [props.match.params.trainingId]);

    const refreshComments = () =>{
        getHttp("/comments/"+props.match.params.trainingId)
            .then(response => {
                if(response.data.page.totalElements !==0)
                    setComments(response.data._embedded.commentList)
            })
    }
    return (
        <div>
            <Player/>
            <div style={{height: 1000, backgroundColor: 'black'}}>
            </div>
            <VideoInfo trainingInfo={trainingInfo}/>
            <MyComment trainingId={props.match.params.trainingId} refresh={refreshComments}/>
            {comments.map((comment,index)=><Comment key={index} commentId={props.match.params.commentId} comment={comment} refresh={refreshComments}/>)}
        </div>
    );
};

export default Training;