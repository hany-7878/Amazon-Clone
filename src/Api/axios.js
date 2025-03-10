import axios from "axios";

const axiosInstance = axios.create({
    // local baseURL instances of firebase function
    // baseURL:"http://127.0.0.1:5001/clone-244b7/us-central1/api",

    // deployed version of amazon server on render.com
    baseURL:"https://amazon-api-deploy-124f.onrender.com"

});

export {axiosInstance}