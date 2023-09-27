export interface ILoginPayload {
  userName: string;
  password: string;
}

export interface IActivationPayload {
  [key: string]: string;
}

export interface IUpdatePasswordPayload {
  userName: string;
  password: string;
  confirmPassword: string;
}

export interface IforgotPasswordPayload {
  userName: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  mobileNumber: number;
  password: string;
  confirmPassword: string;
}
