import React, { useEffect, useState } from 'react';
import { postHttp } from '../utils/authHttpWrapper';
import '../css/Upload.css';
import Loader from '../utils/Loader';

const Upload = (props) => {

    const [uploadAvailable, setUploadAvailable] = useState(false);
    const [video, setVideo] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [videoName, setVideoName] = useState("");
    const [videoExplain, setVideoExplain] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (video === '' || thumbnail === "" || videoName === "" || videoExplain === "") {
            setUploadAvailable(false);
        } else {
            setUploadAvailable(true);
        }
    }, [video, thumbnail, videoName, videoExplain]);

    // 영상(1)과 썸네일(2) 업로드 추후에 진행

    const changeVideoName = e => setVideoName(e.target.value);
    const changeVideoExplain = e => setVideoExplain(e.target.value);


    const upload = async () => {
        setLoading(true);
        let tID;
        let uploadVideo = await postHttp('/trainings', {
            title: videoName,
            body: videoExplain
        }).then(async response => {
            let arr = response.data._links.self.href.split('/');
            tID = arr[arr.length - 1];
            const fd = new FormData();
            // console.log(fd)
            fd.append('image', thumbnail)
            await postHttp('/thumbnail/' + tID, fd)
                .then(async response => {
                    const fd = new FormData();
                    fd.append('video', video)
                    await postHttp('/upload/trainings/' + tID, fd)
                        .catch(error => {
                            console.log('error on video : ', error.response)
                        })
                    console.log(uploadVideo);
                }).catch(error => {
                    console.log('error on thumbnail : ', error.response)
                })
        }).catch(error => {
            console.log('error on title, body : ', error.response)
        })
        // if (uploadVideo !== undefined) {         자꾸 undefined 뜨길래 일딴 빼놧다
            setLoading(false)
            alert("<" + videoName + "> 업로드 되었습니다.");
            props.history.push('/mypage')
        // }
    }

    const UploadVideo = (e) => {
        setVideo(e.target.files[0])
    }

    const UploadThumbnail = (e) => {
        setThumbnail(e.target.files[0])
    }

    if (loading) return <Loader type="spin" color="black" message={'업로드 중입니다...'} />;

    return (
        <div className='UploadWrapper'>
            <input className='VideoUpload' type='file' accept='.mp4' onChange={UploadVideo} />  {/** 업로드할 영상을 선택해주세요 */}
            <input className='ThumbNailUpload' type='file' accept='image/jpg,impge/png,image/jpeg,image/gif' onChange={UploadThumbnail} />   {/** 대표사진을 선택해주세요. */}
            <br />
            <input className='UploadTitle' placeholder='영상 제목 입력' onChange={changeVideoName} />
            <br />
            <textarea className='UploadBody' placeholder='내용을 입력해주세요.' onChange={changeVideoExplain} />
            <br />
            <button className='VideoUploadButton' disabled={!uploadAvailable} onClick={upload}>
                영상 올리기
            </button>
        </div>
    );
}

export default Upload;