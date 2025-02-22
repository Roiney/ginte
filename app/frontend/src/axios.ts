import axios, { AxiosError } from "axios";
import { clearAuthToken } from "./utils/getAuthToken";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (
      !error?.request?.responseURL?.includes("/product") &&
      error?.response?.status === 401
    ) {
      clearAuthToken();
      window.location.reload();
    }
    return Promise.reject(error?.response?.data || error);
  }
);

export default axios;
