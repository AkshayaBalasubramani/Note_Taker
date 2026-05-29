//interceptor-intercepts and adds the jwt access token to the header of every request we make to the backend
//axios is the interceptor
import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiURL="/choreo-apis/note-taker/backend/v1"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? apiURL,
});

api.interceptors.request.use(
    //see if we hav an access token in local storage and if we do add it to the header of the request
    (config)=>{
        const token=localStorage.getItem(ACCESS_TOKEN);
        //jwt access token
        if(token){
            config.headers.Authorization=`Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

export default api;