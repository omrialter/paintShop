import axios from "axios";



export const URL = "http://localhost:3007";
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
        if (err.response) {
            console.error("API Error:", err.response.status, err.response.data);
        } else if (err.request) {
            console.error("No response from API:", err.request);
        } else {
            console.error("General Error:", err.message);
        }
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
        console.log(err);
        throw err;
    }
}

export const imgToString = async (_file) => {
    return new Promise((resolve, reject) => {

        const reader = new FileReader();
        reader.readAsDataURL(_file);

        reader.addEventListener("loadend", async () => {
            resolve(reader.result)
        })
    })
}





