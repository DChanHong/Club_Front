import React from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { REMOVE_IS_LOGIN } from "@/store/slice/isLoginSlice";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";

const Header = () => {
  const login = useAppSelector((state: RootState) => state.is_Login.is_Login);
  console.log(login);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = () => {
    dispatch(REMOVE_IS_LOGIN(false));
    router.push("/");
  };

  return (
    <div className="w-[62rem] mx-auto">
      <div className="flex justify-between rounded-lg  h-[60px] bg-blue-600 drop-shadow-2xl shadow-blue-400">
        <Link href={"/"}>
          <div className="my-4 ml-10 text-white text-2xl">Club House</div>
        </Link>
        <div className="mr-10 mt-4 ">
          {login === false ? (
            <Link href={"/Login"} className="text-white mr-6">
              로그인
            </Link>
          ) : (
            <Link href={"/MyPage"}>
              <span className="text-white"> mypage </span>{" "}
            </Link>
          )}
          {login === false ? (
            <Link href={"/UserSign"} className="text-white">
              회원가입
            </Link>
          ) : (
            <button type="button" onClick={logout}>
              <span className="text-white">로그아웃</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
