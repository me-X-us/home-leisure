import React from 'react';
import MyComment from '../components/MyComment.js'
import VideoInfo from '../components/VideoInfo.js'

function training() {
    
    return (
        <div>
            {/* <Player /> */}
            <div style={{height: 1000, backgroundColor: 'black'}}>
            </div>
            <VideoInfo/>
            <MyComment/>
        </div>
    );
}

export default training;