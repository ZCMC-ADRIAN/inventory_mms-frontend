import axios from "axios";

const serverUrl = "http://192.168.3.135:8001/api/";
const localApi = axios.create({
  baseURL: serverUrl,
});

localApi.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem('Authorization');
  config.headers.Authorization = 'Bearer ' + token;
  return config;
});

export default localApi;
