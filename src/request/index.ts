import router from "@/router";
import { Toast } from "vant";
import axiosRetry from "axios-retry";
import { getStore } from "@/utils/store";
import qs from "qs";
import { useUserStore } from "@/store/user";
import axios, { AxiosError, AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { RequestConfig } from "@/request/type";

const user = useUserStore();
export interface IDataWithError<T> {
  data: T;
  code: string;
  msg: string;
}

class HttpService {
  private readonly http!: AxiosInstance;

  constructor() {
    this.http = axios.create({
      timeout: 60000,
      withCredentials: true,
      baseURL: "/api"
    });

    axiosRetry(this.http, {
      retries: 3,
      shouldResetTimeout: true,
      // 重复请求延迟
      retryDelay: (retryCount: number) => {
        return retryCount * 1000;
      },
      retryCondition: (error: AxiosError) => {
        return error.message.includes("timeout");
      }
    });

    this.addInterceptors(this.http);
  }

  get<T>(url: string, param: unknown, config?: RequestConfig) {
    return HttpService.handleErrorWrapper<T>(this.http.get(url, { params: param, ...config }));
  }

  post<T>(url: string, param: unknown, config?: RequestConfig) {
    return HttpService.handleErrorWrapper<T>(this.http.post(url, param, config));
  }

  postDownload<T>(url: string, param: unknown) {
    return HttpService.handleErrorWrapper<T>(
      this.http.post(url, param, { responseType: "arraybuffer" })
    );
  }

  put<T>(url: string, param: unknown, config?: RequestConfig) {
    return HttpService.handleErrorWrapper<T>(this.http.put(url, param, config));
  }

  delete<T>(url: string, param: unknown, config?: RequestConfig) {
    return HttpService.handleErrorWrapper<T>(this.http.delete(url, { data: param, ...config }));
  }

  private addInterceptors(http: AxiosInstance) {
    // 一、请求拦截器
    http.interceptors.request.use((config: RequestConfig) => {
      // 1、添加token
      const isToken = (config.headers || {}).isToken === false;
      if (typeof config.headers === "object") {
        const token = user.access_token;
        if (token && !isToken) {
          config.headers["Authorization"] = "Bearer " + token; // token
        }
      }

      // 2、验证请求状态码
      config.validateStatus = status => {
        switch (status) {
          case 401:
            const instance = Toast.fail("用户信息过期，请重新登录");
            setTimeout(() => {
              instance.close();
              // noinspection JSIgnoredPromiseFromCall
              router.push("/login");
            }, 1000);
            break;
          default:
            console.warn(`status= ${status}`);
            break;
        }
        return status >= 200 && status < 400;
      };
      if (config.method === "get") {
        config.paramsSerializer = params => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        };
      }

      return config;
    });

    // 二、响应拦截器
    http.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosResponse) => {
        return error;
      }
    );
  }

  private static async handleErrorWrapper<T>(p: AxiosPromise): Promise<IDataWithError<T>> {
    return p
      .then(response => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        return {
          ...error
        };
      });
  }
}

export const request = new HttpService();
