import axios from 'axios';
import cookie from 'react-cookies'
import jwt_decode from "jwt-decode";

const API_BASE_URL = "https://mexus-api.herokuapp.com";

export const getUserId = async () =>cookie.load('userId');
export const getUserRole = async () => cookie.load('userRole');

export const getHttp = async (url) => {
    await checkToken()
        .then(async (config) => {
            return await axios.get(API_BASE_URL + url, config)
                .then((response) => response.data)
            //.catch(error => { console.log('error : ', error.response.data) });
        });

};

export const postHttp = async (url, body) => {
    await checkToken()
        .then(async (config) => {
            return await axios.post(API_BASE_URL + url, body, config)
                .then((response) =>response.data)
            //.catch(error => { console.log('error : ', error.response.data) });
        })
};

export const putHttp = async (url, body) => {
    await checkToken()
        .then(async (config) => {
            return await axios.put(API_BASE_URL + url, body, config)
                .then((response) => response.data);
            //.catch(error => { console.log('error : ', error.response.data) });
        })
};

export const deleteHttp = async (url) => {
    await checkToken()
        .then(async (config) => {
            return await axios.delete(API_BASE_URL + url, config)
                .then((response) => response.data)
            //.catch(error => { console.log('error : ', error.response.data) });
        });
};

export const setTokens = async (accessToken, refreshToken) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
};

const checkToken = async () => {
    let accessToken = await cookie.load('accessToken');
    let refreshToken = await cookie.load('refreshToken');
    if (refreshToken !== undefined) {
        if (accessToken === undefined) {
            await refreshAccessToken(refreshToken);
            accessToken = await cookie.load('accessToken');
        }
        return {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        };
    } else
        return null;
};

const refreshAccessToken = async (refreshToken) => {
    return await axios.post(API_BASE_URL + "/auth/refresh", {refreshToken: refreshToken})
        .then((response) => response.data.accessToken)
        .then((token) => setAccessToken(token))
        .catch(error => {
            console.log('error : ', error.response.data)
        });

};

const setAccessToken = (accessToken) => {
    let decodedToken = jwt_decode(accessToken);
    const accessTokenExpires = new Date(decodedToken.exp * 1000);
    accessTokenExpires.setMinutes(accessTokenExpires.getMinutes() - 1, 0, 0)
    cookie.save('userId', decodedToken.sub,
        {
            path: '/',
            expires: accessTokenExpires
        });
    cookie.save('userRole', decodedToken.roles,
        {
            path: '/',
            expires: accessTokenExpires
        });
    cookie.save('accessToken', accessToken,
        {
            path: '/',
            expires: accessTokenExpires,
            //secure: true
            //httpOnly: true
        });
};
const setRefreshToken = (refreshToken) => {
    const refreshTokenExpires = new Date(jwt_decode(refreshToken).exp * 1000)
    refreshTokenExpires.setMinutes(refreshTokenExpires.getMinutes() - 1, 0, 0)

    cookie.save('refreshToken', refreshToken,
        {
            path: '/',
            expires: refreshTokenExpires,
            //secure: true
            //httpOnly: true
        });
};