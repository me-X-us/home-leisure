import React, { useEffect, useState } from 'react';
import { postHttp } from '../utils/authHttpWrapper';
import '../css/Upload.css';

const Upload = (props) => {

    const [uploadAvailable, setUploadAvailable] = useState(false);
    //const [video, setVideo] = useState(null);
    //const [thumbnail, setThumbnail] = useState(null);
    const [videoName, setVideoName] = useState("");
    const [videoExplain, setVideoExplain] = useState("");

    useEffect(() => {
        if (videoName === "" || videoExplain === "") {
            setUploadAvailable(false);
        } else {
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
        <div className='UploadWrapper'>
            <button className='VideoUpload'>업로드할 영상을 선택해주세요.</button>
            <button className='ThumbNailUpload'>
                대표사진을 선택해주세요.
                </button>
            <br />
            <input className='UploadTitle' placeholder='영상 제목 입력' onChange={changeVideoName} />
            <br />
            <textarea className='UploadBody' placeholder='내용을 입력해주세요.' onChange={changeVideoExplain} />
            <br/>
            <button className='VideoUploadButton' disabled={!uploadAvailable} onClick={upload}>
                영상 올리기
            </button>
        </div>
    );
}

export default Upload;