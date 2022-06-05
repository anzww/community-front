import { IDataWithError, request } from "@/request";
import { registerType, loginType } from "./login.d";

export const userLogin = (data: loginType): Promise<any> => {
  return request.post(`/auth/login`, data, {
    headers: { isToken: false, Authorization: "Basic cGlnOnBpZw==" }
  });
};

export const register = (data: registerType): Promise<IDataWithError<string | object>> => {
  return request.post(`/user/register`, data);
};
