import axios from "axios";
import { logout } from "../Feature/auth/authSlice";
import store from "../app/store";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5500/api/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const refreshAuthToken = async () => {
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  try {
    const response = await axios.post(
      "http://localhost:5500/api/v1/auth/admin/refresh-token",
      { token: refreshToken },
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
    const newAccessToken = response.data.accessToken;
    localStorage.setItem("accessToken", JSON.stringify(newAccessToken));
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${newAccessToken}`;
    return newAccessToken;
  } catch (error) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    store.dispatch(logout());
    window.location.href = "/";
    throw error;
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAuthToken();

        if (newAccessToken) {
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        alert("You have to login again");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
