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

// 홈 화면 슬라이드 인터페이스
export interface slideInfo {
  C_IDX: number | undefined;
  U_IDX: number | undefined;
  C_CATEGORY: string | undefined;
  C_CATE_DETAIL: string | undefined;
  C_NAME: string | undefined;
  C_INTRO: string | undefined;
  C_AREA: string | undefined;
  C_IMAGE: string | undefined;
  TOP_CLUB: number | undefined;
}

// 홈 화면 카테고리별 동아리 인터페이스
export interface cateClubInfo {
  C_IDX: number | undefined;
  U_IDX: number | undefined;
  C_CATEGORY: string | undefined;
  C_CATE_DETAIL: string | undefined;
  C_NAME: string | undefined;
  C_INTRO: string | undefined;
  C_AREA: string | undefined;
  C_IMAGE: string | undefined;
}
