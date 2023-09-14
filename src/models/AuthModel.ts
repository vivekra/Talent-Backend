export interface ILoginPayload {
  userName: string;
  password: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  mobileNumber: number;
  password: string;
  confirmPassword: string;
}
