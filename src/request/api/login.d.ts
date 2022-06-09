export interface registerDto {
  username: string;
  mobile: string;
  email: string;
  password: string;
  rePassword: string;
  nickname: string;
}

export interface loginDto {
  username: string;
  password: string;
}
