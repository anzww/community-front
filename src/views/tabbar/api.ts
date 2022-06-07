import { IDataWithError, request } from "@/request";

export const uploadAvatar = (data: any): Promise<IDataWithError<object>> => {
  return request.post(`user/upload/avatar`, data);
};
