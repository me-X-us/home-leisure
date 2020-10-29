import React from 'react';
import Webcam from 'react-webcam';
import ReactPlayer from 'react-player';
import Player from '../components/Player.js'
import MyComment from '../components/MyComment.js'
import VideoInfo from '../components/VideoInfo.js'

function training() {
  return (
    <div>
      {/* <Player /> */}
      <div style={{height: 700, backgroundColor: 'black'}}>
      </div>
      <VideoInfo/>
      <MyComment/>
    </div>
  );
}

export default training;