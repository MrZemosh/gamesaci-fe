import axios from "axios";

const CONFIG = {
    apiURI: 'http://localhost',
    port: 4200
}

const get = (url: string) => {
    return axios.get(`${CONFIG.apiURI}:${CONFIG.port}${url}`);
}

const post = (url: string, data: unknown) => {
    return axios.post(`${CONFIG.apiURI}:${CONFIG.port}${url}`, data);
}

export { get, post }