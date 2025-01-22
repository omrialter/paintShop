import axios from "axios";



export const URL = "http://localhost:3005";
export const TOKEN_KEY = "posts_token";


export const doApiGet = async (_url) => {
    try {
        const resp = await axios({
            url: _url,
            headers: {
                "x-api-key": localStorage[TOKEN_KEY]
            }
        })
        return resp.data;
    }
    catch (err) {
        if (err.response && err.response.status === 401) {
            localStorage.removeItem(TOKEN_KEY);
        }
        throw err;
    }
}

export const doApiMethod = async (_url, _method, _body) => {
    try {
        const resp = await axios({
            url: _url,
            method: _method,
            data: _body,
            headers: {
                "x-api-key": localStorage[TOKEN_KEY]
            }
        })
        return resp.data;
    }
    catch (err) {
        if (err.response && err.response.status === 401) {
            localStorage.removeItem(TOKEN_KEY);
        }
        throw err;
    }
}