import axios from "axios";
import { baseURL, timeout } from "./config";
import { ACCESS_TOKEN } from "@/common/constant";
import cache from "@/utils/cache";

const instance = axios.create({
  baseURL,
  timeout,
});

instance.interceptors.request.use(
  (config) => {
    const token = cache.getCache(ACCESS_TOKEN);
    if (token) config.headers[ACCESS_TOKEN] = token;
    return config;
  },
  (err) => {
    console.log(err);
  }
);

instance.interceptors.response.use(
  (res) => {
    const {
      data: { code },
    } = res.data;
    if (code != 200) {
      return Promise.reject(res.data);
    } else {
      return res.data;
    }
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          console.log("请求错误");
          break;
        case 401:
          console.log("未授权");
          break;
        default:
          console.log("其他错误");
          break;
      }
    }
  }
);

export default instance;
