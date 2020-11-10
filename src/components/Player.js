import React from 'react';
import '../css/Player.css';
import Webcam from 'react-webcam';
import ReactPlayer from 'react-player';

function player() {
    return (
        <div>
            <div className="player">
                <ReactPlayer
                    url='https://www.youtube.com/watch?v=gdZLi9oWNZg' playing controls
                    width="100%"
                    height="100%"
                />
            </div>
            <div className="cam">
                <Webcam
                    audio={false}
                    screenshotFormat="image/jpeg"
                    forceScreenshotSourceSize="true"
                    width="100%"
                />
            </div>
        </div>
    );
}

export default player;