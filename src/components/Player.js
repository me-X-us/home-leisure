import React, {useState} from 'react';
import '../css/Player.css';
import ReactPlayer from 'react-player';
import PoseNet from '../utils/posenet/components/PoseNet'
import video from '../video/video.mp4'
import mockData from '../utils/mockData'
import cosineSimilarity from '../utils/cosineSimilarity'

const fLen = mockData.frames.length;
const delayFrame = -20;
const frameRate = 30;
const minPoseConfidence = 0;
async function estimate(curFrame, setState, a) {
    var frame = curFrame + delayFrame;
    if (a[0] != null && curFrame >= 0) {
        try {
            if (mockData.frames[frame].keyPoint.length === 17 && a[0].keypoints.length === 17) {
                cosineSimilarity(mockData.frames[frame], a[0]);
            } else {
                console.log("전신이 나와야합니다.");
            }
        } catch (e) {
            console.log("전신이 나와야합니다.");
        }
    }
    setState(-1);
}

function Player() {
    const [curFrame, setCurFrame] = useState(-1);
    return (
        <div>
            <div className="Player">
                <ReactPlayer
                    url={video}
                    width="100%"
                    height="100%"
                    controls={true}
                    progressInterval={1000 / 10}
                    onProgress={(v) => {
                        setCurFrame(Math.floor(fLen * v.played));
                    }}
                />
            </div>
            <div className="cam">
                <PoseNet
                    onEstimate={(a)=>estimate(curFrame, setCurFrame, a)}
                    frameRate={frameRate}
                    flipHorizontal={true}
                    minPoseConfidence={minPoseConfidence}
                    curFrame = {curFrame}
                />
            </div>
        </div>
    );
}




export default Player;