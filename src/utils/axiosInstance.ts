import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://chanhong.site/api",
  // baseURL: "http://52.78.175.136/api",
  baseURL: "http://localhost:4000/api",
  headers: {
    "Access-Control-Allow-Origin": `https://club-front.vercel.app`,
    "Access-Control-Allow-Credentials": "true",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status && error.response.status) {
      switch (error.response.status) {
        case 401:
          window.location.href = "/Login";
          localStorage.setItem("login", "false");
          break;
        case 402:
          window.location.href = "/Login";
          //   // alert("로그인이 필요합니다");
          localStorage.setItem("login", "false");
        case 500:
          window.location.href = "/Login";
          // alert("로그인이 필요합니다");
          localStorage.setItem("login", "false");

        default:
          return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
