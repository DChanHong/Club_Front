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

// 마이페이지 내가 참여중인 동아리 인터페이스
export interface myPageAttInfo {
  U_IDX: number | undefined;
  C_IDX: number | undefined;
  C_NAME: string | undefined;
  C_CATEGORY: string | undefined;
  C_CATE_DETAIL: string | undefined;
  C_AREA: string | undefined;
}

// 마이페이지 내 호트인 동아리 불러오기 인터페이스
export interface myPageHostInfo {
  C_IDX: number | undefined;
  U_IDX: number | undefined;
  C_CATEGORY: string | undefined;
  C_CATE_DETAIL: string | undefined;
  C_NAME: string | undefined;
  C_AREA: string | undefined;
}

// 동아리  입장하기 화면  불러올 데이터 인터페이스
export interface clubDetailInfo {
  HOSTNAME: number | undefined;
  C_CATEGORY: string | undefined;
  C_CATE_DETAIL: string | undefined;
  C_NAME: string | undefined;
  C_INTRO: string | undefined;
  C_AREA: string | undefined;
  C_IMAGE: string | undefined;
  C_TEXT: string | undefined;
  C_IDX: number | undefined;
  U_IDX: number | undefined;
  U_NAME: string | undefined;
  U_IMAGE: string | undefined;
}

// 동아리 상세페이지 동아리 정보
export interface clubContextInfo {
  map(arg0: (item: any) => JSX.Element): import("react").ReactNode;
  C_IDX: number | undefined;
  U_IDX: number | undefined;
  C_CATEGORY: string | undefined;
  C_CATE_DETAIL: string | undefined;
  C_NAME: string | undefined;
  C_INTRO: string | undefined;
  C_AREA: string | undefined;
  C_IMAGE: string | undefined;
  C_TEXT: string | undefined;
}

export interface clubTextInfo {
  C_TEXT: string | undefined;
}

export interface joinCheck {
  U_IDX: number | undefined;
}

//일정

export interface scheduleInfo {
  S_IDX: number | undefined;
  S_DATE: string | undefined;
  S_HEAD: string | undefined;
  S_SUBH: string | undefined;
  S_LIKE: number | undefined;
  S_NOW: string | undefined;
  U_IDX: number | undefined;
  U_IMAGE: string | undefined;
  U_NAME: string | undefined;
}

// 일정 밑에 댓글 넣기
export interface shceduleContext {
  CO_IDX: number | undefined;
  S_IDX: number | undefined;
  U_IDX: number | undefined;
  U_NAME: string | undefined;
  CO_CONTEXT: string | undefined;
}

// 디테일 페이지 호스트 정보
export interface hostInfo {
  U_IDX: number | undefined;
  U_NAME: string | undefined;
  U_IMAGE: string | undefined;
}

//임시 댓글창 용
export interface temporaryContextInfo {
  S_IDX: number | undefined;
  data: string | undefined;
  id: number | undefined;
}

//방금 생성한 동아리 보여주기용
export interface tempClub {
  C_IDX: number | undefined;
  C_CATEGORY: string | undefined;
  C_CATE_DETAIL: string | undefined;
  C_NAME: string | undefined;
  C_INTRO: string | undefined;
  C_AREA: string | undefined;
  C_IMAGE: string | undefined;
}

// 공지사항 가져오기용
export interface temporaryContextInfo {
  C_TEXT: string | undefined;
}

// 임시 댓글용 인터페이스
export interface temporaryContextInfo2 {
  S_IDX: number | undefined;
  data: string | undefined;
  id: number | undefined;
}

//채팅 인터페이스
export interface chatInfo {
  C_IDX: string | number | undefined;
  U_IDX: number | undefined;
  userName: string | undefined;
  userChat: string | undefined;
  time: string | undefined;
}

// 채팅리스트 불러오기
export interface getAllChatInfo {
  C_IDX: string | undefined;
  U_IDX: number | undefined;
  time: string | undefined;
  userChat: string | undefined;
  userName: string | undefined;
  _id: string | undefined;
}

// 홈 화면 카테고리별 동아리 인터페이스
export interface userClubHistoryList {
  C_IDX: number | undefined;
  C_CATEGORY: string | undefined;
  C_CATE_DETAIL: string | undefined;
  C_NAME: string | undefined;
  C_AREA: string | undefined;
  C_IMAGE: string | undefined;
}
