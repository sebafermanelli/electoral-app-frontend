import axios from "axios";

export const instance = axios.create({
    baseURL: "http://electoral-app-backend-production.up.railway.app/api/",
});
