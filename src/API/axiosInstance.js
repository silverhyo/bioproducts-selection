import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`, // * server측 base URL
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": `${process.env.REACT_APP_CLIENT_URL}`,
    "Access-Control-Allow-Credentials": "true",
  },
});

// request 인터셉터를 설정하여 요청을 보내기 전에 토큰을 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken"); // 로컬 스토리지에서 accessToken을 가져옴
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Authorization 헤더에 토큰을 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;