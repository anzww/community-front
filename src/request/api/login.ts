import { IDataWithError, request } from "@/request";
import { registerDto, loginDto } from "./login.d";

export const userLogin = (data: registerDto): Promise<any> => {
  return request.post(`/auth/login`, data, {
    headers: { isToken: false, Authorization: "Basic cGlnOnBpZw==" }
  });
};

export const register = (data: loginDto): Promise<IDataWithError<string | object>> => {
  return request.post(`/user/register`, data);
};
