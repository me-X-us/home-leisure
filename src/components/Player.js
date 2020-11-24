import React, {useState} from 'react';
import '../css/Player.css';
import ReactPlayer from 'react-player';
import PoseNet from '../utils/posenet/components/PoseNet'
import mockData from '../utils/mockData'
import cosineSimilarity from '../utils/cosineSimilarity'

const fLen = mockData.frames.length;
const delayFrame = -20;
const frameRate = 30;
const minPoseConfidence = 0;
// var time = Date.now();

// function test(a){
//     console.log(time);
// }

function Player() {
    const [curFrame, setCurFrame] = useState(-1);
    const [player, setPlayer] = useState();
    const [playing, setPlaying] = useState(false);
    const [score,setScore] = useState(0.0);

    async function estimate(curFrame, setState, a) {
        var frame = curFrame + delayFrame;
        if (a[0] != null && curFrame >= 0) {
            try {
                if (mockData.frames[frame].keyPoint.length === 17 && a[0].keypoints.length === 17) {
                    cosineSimilarity(mockData.frames[frame], a[0])
                    .then(score=>setScore(score))
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
        setCurFrame(Math.floor(fLen * e.played))
        player.seekTo(e.playedSeconds)
    }

    const onPause = (e) => {
        setPlaying(false);
        console.log(player.playing)
    }
    const onPlay = (e) => {
        setPlaying(true);
        console.log(playing)
        //console.log(player.config.playing)
    }

    return (
        <div>
            <ReactPlayer
                id="player"
                url='https://mexusapi.codingnome.dev/streaming/training/1/video' playing controls
                width="50%"
                height="100%"
                onPlay={onPlay}
                onPause={onPause}
                progressInterval={1000/10}
                onProgress={onProgress}
                // eslint-disable-next-line
                playing={playing}
            />
            <ReactPlayer
                id="player"
                className="shape"
                ref={p => setPlayer(p)}
                url='https://mexusapi.codingnome.dev/streaming/training/1/shape' playing controls
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
                height={340}
                minPoseConfidence={minPoseConfidence}
                curFrame={curFrame}
            />
            {score}
        </div>
    );
}


export default Player;