import React, { useState, useEffect } from 'react';
import { postHttp } from '../utils/authHttpWrapper';

const Upload = (props) => {
  // const [count, setCount] = useState(0);
  // const [clickCount, setClickCount] = useState(0);

  // // componentDidMount, componentDidUpdate와 비슷합니다
  // useEffect(() => {
  //   // 브라우저 API를 이용해 문서의 타이틀을 업데이트합니다
  //   document.title = `You clicked ${count} times ${clickCount}`;
  // }, [count]);

  // return (
  //   <div>
  //     <p>You clicked {count} times and {clickCount}</p>
  //     <p>{document.title}</p>
  //     <button onClick={() => setCount(count + 1)}>
  //       Click me
  //     </button>
  //     <button onClick={() => setClickCount(clickCount+1)}>
  //         Not Effect
  //     </button>
  //   </div>
  // );

  const [uploadAvailable, setUploadAvailable] = useState(false);
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [videoName, setVideoName] = useState("");
  const [videoExplain, setVideoExplain] = useState("");

  useEffect(() => {
    if (videoName === "" || videoExplain == "") {
      setUploadAvailable(false);
    }
    else {
      setUploadAvailable(true);
    }
  }, [videoName, videoExplain]);

  // 영상(1)과 썸네일(2) 업로드 추후에 진행

  const changeVideoName = e => setVideoName(e.target.value);
  const changeVideoExplain = e => setVideoExplain(e.target.value);


  const upload = async () => {
    let uploadVideo = await postHttp('/trainings', {
      title: videoName,
      body: videoExplain
    }).catch(error => {
      console.log('error on component : ', error.response.data)
    })
    if (uploadVideo !== undefined) {
      alert("<" + videoName + "> 업로드 되었습니다.");
      props.history.push('/mypage')
    }
  }

  return (
    <div style={{ marginLeft: 'px', textAlign: 'center' }}>
      <div>
        <button style={{ width: '63%', height: '500px', marginRight: '1%', fontSize: 'xx-large', background: 'lightgray', border: 'none', borderRadius: '1rem' }}>
          업로드할 영상을 선택해주세요.
        </button>
        <button style={{ width: '33%', height: '500px', fontSize: 'xx-large', background: 'lightgray', border: 'none', borderRadius: '1rem' }}>
          대표사진을 선택해주세요.
        </button>
      </div>
      <input placeholder='영상 제목 입력' onChange={changeVideoName} style={{ width: '96%', marginTop: '20px', padding: '5px', fontSize: 'xx-large', border: 'solid 2px black', borderRadius: '0.5rem' }} />
      <div>
        <textarea placeholder='내용을 입력해주세요.' onChange={changeVideoExplain} style={{ width: '96%', height: '500px', marginTop: '20px', padding: '5px', fontSize: 'large', border: 'solid 2px black', borderRadius: '0.5rem', resize: 'none' }} />
      </div>
      <button disabled={!uploadAvailable} onClick={upload} style={{ width: '300px', height: '75px', fontSize: 'xx-large', background: 'lightgray', margin: '30px', border: 'none', borderRadius: '1rem' }} >
        영상 올리기
      </button>
    </div>
  );
}

export default Upload;