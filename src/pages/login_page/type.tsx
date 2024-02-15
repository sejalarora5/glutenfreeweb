export interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  date: string;
  role: string;
  phone: string;
  glutenintolerant: string;
  city: string;
  status: string;
  token: string;
  country_code?: any;
  device_token?: any;
  device_type?: any;
}

export interface LoginObject {
  success: boolean;
  message: string;
  token: string;
  data: UserData;
}
