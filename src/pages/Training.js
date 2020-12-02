import React, { useEffect, useState } from 'react';
import MyComment from '../components/MyComment.js'
import VideoInfo from '../components/VideoInfo.js'
import { getHttp, getUserId } from "../utils/authHttpWrapper";
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
    const [userId, setUserId] = useState('');

    useEffect(() => {
        getTrainingInfo();
        getUserId()
            .then(r => setUserId(r));
        // eslint-disable-next-line
    }, [props.match.params.trainingId]);

    const refreshComments = () => {
        getHttp("/trainings/" + props.match.params.trainingId + '/comments')
            .then(response => {
                if (response.data.page.totalElements !== 0)
                    setComments(response.data._embedded.commentList)
            })
    }

    const getTrainingInfo = async () => {
        getHttp("/trainings/" + props.match.params.trainingId)
            .then(response => setTrainingInfo(response.data))
            .then(async () => await getHttp("/trainings/" + props.match.params.trainingId + "/comments"))
            .then(response => {
                if (response.data.page.totalElements !== 0)
                    setComments(response.data._embedded.commentList)
            })
    }

    return (
        <div>
            <Player/>
            <VideoInfo trainingInfo={trainingInfo} trainingId={props.match.params.trainingId} getTrainingInfo={getTrainingInfo} />
            <MyComment trainingId={props.match.params.trainingId} userId={userId} refresh={refreshComments} />
            {comments.map((comment, index) => <Comment key={index} commentId={props.match.params.commentId} comment={comment} commenterId={comment.commenterId} modifiedDate={comment.modifiedDate} refresh={refreshComments} />)}
        </div>
    );
};

export default Training;