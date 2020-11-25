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
    const [style, setStyle] = useState('red');
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
            setStyle('red');
        } else if (60 <= score && score < 88) {
            setStyle('yellow');
        } else {
            setStyle('green');
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
        console.log(player.playing)
    };
    const onPlay = (e) => {
        setPlaying(true);
        player.seekTo(playedSeconds);
        console.log(playing)
    };

    const onSeek = (e) => {
        setPlayedSeconds(e);
        player.seekTo(e)
    };
    return (
        <div>
            <ReactPlayer
                id="player"
                url={"https://mexusapi.codingnome.dev/streaming/training/"+ props.trainingId + "/video"} playing controls
                width="50%"
                height="100%"
                onPlay={onPlay}
                onPause={onPause}
                onSeek={onSeek}
                progressInterval={1000 / 10}
                onProgress={onProgress}
                // eslint-disable-next-line
                playing={playing}
            />
            <ReactPlayer
                id="player"
                className="shape"
                ref={p => setPlayer(p)}
                url={'https://mexusapi.codingnome.dev/streaming/training/' + props.trainingId + '/shape'} playing
                width="50%"
                // eslint-disable-next-line
                playing={playing}
                height="100%"
            />
            <PoseNet
                className="cam"
                style={{zIndex: "-1"}}
                onEstimate={(a) => estimate(curFrame, setCurFrame, a)}
                frameRate={frameRate}
                flipHorizontal={true}
                //width={}
                height={336}
                minPoseConfidence={minPoseConfidence}
                curFrame={curFrame}
            />
            <div style={{background: style,fontSize: "30px",width:"100%",display:"flex",justifyContent: "center"}}>
                {score}
            </div>
        </div>


    );
}

export default Player;