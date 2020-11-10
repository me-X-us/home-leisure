import React from 'react';
import '../css/Main.css';
import VideoList from '../components/VideoList';

class Main extends React.Component {
  render() {
    return (
      <div style={{margin:'30px'}}>
        <VideoList />
      </div>
    );
  }
}

export default Main;