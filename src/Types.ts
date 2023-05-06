export interface signFormData {
  errors: {
    email: { message: string };
    password: { message: string };
    confirmPassword: { message: string };
    name: { message: string };
    gender: { message: string };
    birth: { mesaage: string };
  };
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  gender: string;
  birth: string;
}

export interface loginFormData {
  errors: {
    email: { message: string };
    password: { message: string };
  };
  email: string;
  password: string;
}

export interface userInfo {
  U_EMAIL: string | undefined;
  U_NAME: string | undefined;
  U_GENDER: string | undefined;
  U_BIRTH: string | undefined;
  U_IMAGE: string | undefined;
}
