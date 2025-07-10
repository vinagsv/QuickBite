import axios from "axios";
import qs from "qs"
console.log(import.meta.env.VITE_API_BASE_URL)

// serialization conve
export const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_API_BASE_URL,
    withCredentials :true,
    paramsSerializer:(params) => qs.stringify(params,{arrayFormat:"repeat"}),
});