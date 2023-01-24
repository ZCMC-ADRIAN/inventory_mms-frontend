import axios from "axios";

const serverUrl = "http://127.0.0.1:8000/api/";
const localApi = axios.create({
  baseURL: serverUrl,
});

// localApi.interceptors.request.use(function (config) {
//   const token = sessionStorage.getItem('Authorization');
//   config.headers.Authorization = 'Bearer ' + token;
//   return config;
// });

export default localApi;
