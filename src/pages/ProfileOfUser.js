import React from 'react';
import '../css/ProfileOfUser.css';
import SearchVideoList from '../components/SearchVideoList';
import VideoList from '../components/VideoList'

function ProfileOfUser() {
    return (
        <div>
            <div style={{ marginBottom: '200px', marginLeft: '100px' }}>
                <img className='UserProfile ' src="https://avatars1.githubusercontent.com/u/50524321?s=460&u=7621eb647ffc21484a8ddb3914275574063c08cb&v=4" />
                <text style={{ marginLeft: '350px' }}>
                    <div className='UserInfo' style={{ display: 'table-cell' }}>
                        <div className='NickName'>naemoo</div>
                        <button className='NickNameEditButton'>닉네임 편집</button>
                    </div>
                </text>
            </div>
            <div style={{marginLeft:'20px'}}>
                <text>
                    <div style={{display: 'table-cell', marginRight:'10px'}}>
                        <div style={{ fontSize: 'xx-large', marginBottom: '10px' }}>
                            내가 담은 운동
                        </div>
                        <div style={{ backgroundColor: 'lightgray', width: '1220px', height:'800px', padding: '20px' }}>
                            <SearchVideoList />
                        </div>
                    </div>
                </text>
                
                <text style={{marginLeft:'20px'}}>
                    <div style={{ display: 'table-cell' }}>
                        <div style={{ fontSize: 'xx-large', marginBottom: '10px' }}>
                            구독 리스트
                        </div>
                        <div style={{ backgroundColor: 'lightgray', width: '420px', height:'800px', padding: '20px' }}>
                            <VideoList />
                        </div>
                    </div>
                </text>
            </div>
        </div>
    );
}

export default ProfileOfUser;