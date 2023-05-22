import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
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
          // window.location.href = "/Login";
          localStorage.setItem("login", "false");
        default:
          return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
