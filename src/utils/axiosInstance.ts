import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:4000/api",
  baseURL: "http://ec2-52-78-175-136.ap-northeast-2.compute.amazonaws.com/api",
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
