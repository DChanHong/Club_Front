import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { REMOVE_IS_LOGIN, SET_IS_LOGIN } from "@/store/slice/isLoginSlice";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { MdOutlineFestival } from "react-icons/md";
import { BiSearch } from "react-icons/bi";

const Header = () => {
  let login = useAppSelector((state: RootState) => state.is_Login.is_Login);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = async () => {
    axiosInstance.post("/customer/logout");

    dispatch(REMOVE_IS_LOGIN(false));
    router.push("/");
    localStorage.setItem("login", "false");
  };

  /// 서치 기능

  const clubSearch = useRef<HTMLInputElement>(null);
  const routeSearchPage = () => {
    const data = clubSearch.current?.value;
    if (data?.length === 0) {
      alert("검색어를 입력해주세요");
    } else {
      router.push({
        pathname: `/search/${data}`,
      });
    }
  };
  useEffect(() => {
    const test = localStorage.getItem("login");
    if (test === "true") {
      dispatch(SET_IS_LOGIN(true));
    } else {
      dispatch(REMOVE_IS_LOGIN);
    }
  }, []);

  //input box 디자인
  const [inputBorder, setInputBoder] = useState(false);

  const changeInputBorderBlue = () => {
    setInputBoder(true);
  };
  const changeInputBorderNormal = () => {
    setInputBoder(false);
  };

  return (
    <div
      className=" w-full border-2 mb-6 py-3 
      border-x-white border-b-neutral-100 border-t-white "
    >
      <div className="flex  justify-between rounded-lg  h-[60px]  ">
        <Link href={"/"}>
          <div
            className="
              md:flex flex-start hidden
              my-4 ml-20 cursor-pointer
              text-2xl "
          >
            <p className="mt-1">
              <MdOutlineFestival />
            </p>
            <p className="ml-2 ">Club House</p>
          </div>
        </Link>
        <div className="mt-3 md:w-auto">
          <div
            className={`border-2 bg-white rounded-full flex flex-start
            border-${!inputBorder ? "neutral-200" : "blue-600"}`}
          >
            <div>
              <input
                type="text"
                className="rounded-full px-3 w-[18rem] h-[2rem] outline-0"
                ref={clubSearch}
                onFocus={() => changeInputBorderBlue()}
                onBlur={() => changeInputBorderNormal()}
              />
            </div>
            <div className="mt-1">
              <button
                type="button"
                onClick={routeSearchPage}
                className="px-1 pt-"
              >
                <p className="">
                  <BiSearch size={25} />
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="mr-10 mt-4 hidden md:block">
          {login === false ? (
            <Link href={"/Login"} className=" mr-6">
              로그인
            </Link>
          ) : (
            <Link href={"/MyPage"}>
              <span className=""> mypage </span>{" "}
            </Link>
          )}
          {login === false ? (
            <Link href={"/UserSign"} className="">
              회원가입
            </Link>
          ) : (
            <button type="button" onClick={logout}>
              <span className="">로그아웃</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
