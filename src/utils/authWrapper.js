import axios from 'axios';
import cookie from 'react-cookies'

const checkToken = async () => {
    let accessToken = await cookie.load('accessToken');
    if (accessToken !== null)
        return {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        };
};

const refreshToken = async () =>{

};

export const getCall = async (url) => {
    let config = await checkToken();
    return await axios.get(url, config)
        .then((response) => response.data)
    //.catch(error => { console.log('error : ', error.response.data) });
};

export const postCall = async (url, body) => {
    let config = await checkToken();
    return await axios.post(url, body, config)
        .then((response) => response.data);
    //.catch(error => { console.log('error : ', error.response.data) });
};

export const putCall = async (url, body) => {
    let config = await checkToken();
    return await axios.put(url, body, config)
        .then((response) => response.data);
    //.catch(error => { console.log('error : ', error.response.data) });
};

export const deleteCall = async (url) => {
    let config = await checkToken();
    return await axios.delete(url, config)
        .then((response) => response.data)
    //.catch(error => { console.log('error : ', error.response.data) });
};