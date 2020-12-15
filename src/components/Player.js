import React, {useEffect, useState} from 'react';
import '../css/Player.css';
import ReactPlayer from 'react-player';
import PoseNet from '../utils/posenet/components/PoseNet'
//import mockData from '../utils/mockData'
import cosineSimilarity from '../utils/cosineSimilarity'
import {getHttp} from '../utils/authHttpWrapper';

//const fLen = mockData.frames.length;
const delayFrame = -2;
const frameRate = 30;
const minPoseConfidence = 0;

function Player(props) {
    const [curFrame, setCurFrame] = useState(-1);
    const [player, setPlayer] = useState();
    const [playing, setPlaying] = useState(false);
    const [score, setScore] = useState(0.0);
    const [feedbackColor, setFeedbackColor] = useState('red');
    const [mockData, setMockData] = useState([]);
    const [fLen, setFLen] = useState(0);
    const [playedSeconds, setPlayedSeconds] = useState();

    useEffect(() => {
        getHttp("/trainings/" + props.trainingId + "/poses")
            .then(res => {
                setMockData(res.data);
                return res.data.frames.length
            })
            .then(r => setFLen(r))
    }, [props.trainingId]);

    useEffect(() => {
        if (0 <= score && score < 60) {
            setFeedbackColor('red');
        } else if (60 <= score && score < 88) {
            setFeedbackColor('yellow');
        } else {
            setFeedbackColor('green');
        }
    }, [score]);

    async function estimate(curFrame, setState, a) {
        var frame = curFrame + delayFrame;
        if (a[0] != null && curFrame >= 0) {
            try {
                if (mockData.frames[frame].keyPoint.length === 17 && a[0].keypoints.length === 17) {
                    cosineSimilarity(mockData.frames[frame], a[0])
                        .then(score => setScore(score));
                    console.log(score);
                } else {
                    console.log("전신이 나와야합니다.");
                }
            } catch (e) {
                console.log("전신이 나와야합니다.");
            }
        }
        setState(-1);
    }

    const onProgress = (e) => {
        setCurFrame(Math.floor(fLen * e.played));
        setPlayedSeconds(e.playedSeconds)
    };

    const onPause = (e) => {
        setPlaying(false);
    };
    const onPlay = (e) => {
        setPlaying(true);
        player.seekTo(playedSeconds);
    };

    const onSeek = (e) => {
        setPlayedSeconds(e);
        player.seekTo(e)
    };

    function onBuffer() {
        setPlaying(false);
    }
    function onBufferEnd() {
        setPlaying(true);
    }
    return (
        <div style={{border: "10px solid "+ feedbackColor, boxShadow: "0 -5px 0 1px "+ feedbackColor +" inset"}}>
            <ReactPlayer
                //id="player"
                style={{float: "left", zIndex:9999, padding:-10}}
                url={"https://mexusapi.codingnome.dev/streaming/training/"+ props.trainingId + "/video"} playing controls
                width="50%"
                height="50%"
                onPlay={onPlay}
                onPause={onPause}
                onSeek={onSeek}
                onBuffer={onBuffer}
                onBufferEnd={onBufferEnd}
                progressInterval={1000 / 10}
                onProgress={onProgress}
                // eslint-disable-next-line
                playing={playing}
            />
            <ReactPlayer
                style={{float: "left", zIndex:9999, padding:0}}
                className="shape"
                ref={p => setPlayer(p)}
                url={'https://mexusapi.codingnome.dev/streaming/training/' + props.trainingId + '/shape'} playing
                width="50%"
                height="50%"
                // eslint-disable-next-line
                playing={playing}
            />
            <PoseNet
                className="cam"
                style={{zIndex: "-1"}}
                onEstimate={(a) => estimate(curFrame, setCurFrame, a)}
                frameRate={frameRate}
                flipHorizontal={true}
                //width={}
                height={340}
                minPoseConfidence={minPoseConfidence}
                curFrame={curFrame}
            />
            <div style={{fontSize: "30px",width:"100%",display:"flex",justifyContent: "center"}}></div>
            <div style={{background: feedbackColor,fontSize: "3vw",width:"16%", left:"42%",top:"11%", position:"absolute", textAlign:"center"}}>
                {Math.floor(score).toString().padStart(3,' ')+"/100"}
            </div>
        </div>


    );
}

export default Player;