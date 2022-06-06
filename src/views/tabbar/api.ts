import { IDataWithError, request } from "@/request";

export const uploadAvatar = (data: any): Promise<IDataWithError<string>> => {
  return request.post(`user/upload/avatar`, data, {
    headers: { isToken: false, Authorization: "Basic cGlnOnBpZw==" }
  });
};