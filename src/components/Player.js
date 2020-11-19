import React from 'react';
import '../css/Player.css';
import ReactPlayer from 'react-player';
import PoseNet from '../utils/posenet/components/PoseNet'
import estimation from '../utils/Estimation'

const framerate = 30;
const minPoseConfidence = 0;

function Player() {
    return (
        <div>
            <div className="Player">
                <ReactPlayer
                    url='https://www.youtube.com/watch?v=gdZLi9oWNZg' playing controls
                    width="100%"
                    height="100%"
                />
            </div>
            <div className="cam">
                <PoseNet
                    onEstimate={estimation}
                    frameRate={framerate}
                    flipHorizontal={true}
                    minPoseConfidence={minPoseConfidence}
                />
            </div>
        </div>
    );
}

export default Player;