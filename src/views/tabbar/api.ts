import { IDataWithError, request } from "@/request";

export const uploadAvatar = (data: object): Promise<IDataWithError<{ url: string }>> => {
  return request.post(`user/upload/avatar`, data);
};
