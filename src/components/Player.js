import React from 'react';
import '../css/Player.css';
import ReactPlayer from 'react-player';
import PoseNet from '../utils/posenet/components/PoseNet'
import video from '../video/video.mp4'
import mockData from '../utils/mockData'
import cosineSimilarity from '../utils/cosineSimilarity'

export var curFrame = -1;
const fLen = mockData.frames.length;
const frameRate = 30;
const minPoseConfidence = 0;

async function estimate(a) {
    var frame = curFrame;

    if (a[0] != null && frame >= 0) {
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
    curFrame = -1;
}

function Player() {
    return (
        <div>
            <div className="Player">
                <ReactPlayer
                    url={video}
                    width="50%"
                    height="50%"
                    controls={true}
                    onProgress={(v) => {
                        curFrame = Math.floor(fLen * v.played);
                    }}
                />
            </div>
            <div className="cam">
                <PoseNet
                    onEstimate={estimate}
                    frameRate={frameRate}
                    flipHorizontal={true}
                    minPoseConfidence={minPoseConfidence}
                />
            </div>
        </div>
    );
}




export default Player;