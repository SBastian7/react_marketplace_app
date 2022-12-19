import Axios from 'axios'

import Cookie from 'js-cookie'
import jwtDecode from 'jwt-decode';

const sendRequest = async (url, data, method, params) => {
    const fullUrl = process.env.REACT_APP_API_URL + url;
    try {
        const result = await Axios({ method: method, url: fullUrl, params: params});
        return result;
    } catch (error) {
        return error.response ? error.response : error;
    }
}

const sendAuthenticatedRequest = async (url, bodyData, method, params) => {
    const fullUrl = process.env.REACT_APP_API_URL + url;
    const jwtToken = Cookie.get('accessToken').replace(/"/gi,'') || null;
    console.log("Data enviada -> ", bodyData)
    
    const config = {
        Authorization: `Bearer ${jwtToken}`
    };
    try {
        const result = await Axios({ method: method, url: fullUrl, headers: config, params: params, data: bodyData });
        console.log(result)
        return result;
    } catch (error) {
        return error.response ? error.response : error;
    }
}

// const refreshToken = async ()

export { sendRequest, sendAuthenticatedRequest };