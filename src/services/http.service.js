import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

const http = axios.create({
    baseURL: configFile.API_BASE_URL
});

http.interceptors.request.use(
    function(config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url = (containSlash ? config.url.slice(0, -1) + ".json" : config.url + ".json");
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data ? Object.keys(data).map(key => ({ ...data[key] })) : [];
}

http.interceptors.response.use(
    response => {
        if (configFile.isFireBase) {
            response.data = { content: transformData(response.data) };
        }
        return response;
    },
    function(error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedErrors) {
            console.log(error);
            toast.error("Somthing was wrong. Try it later...");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};

export default httpService;
