export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  dob?: any;
  gender: any;
}

export interface ApiResponse<T> {
  type: string;
  status_code: number;
  message: string;
  result: T;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}
