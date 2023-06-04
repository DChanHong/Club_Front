import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { REMOVE_IS_LOGIN, SET_IS_LOGIN } from "@/store/slice/isLoginSlice";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { MdOutlineFestival } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";

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
              <MdOutlineFestival color="#946CEE" />
            </p>
            <p className="ml-2 text-[#946CEE]">Club House</p>
          </div>
        </Link>
        <div className="mt-3 md:w-auto">
          <div
            className={`border-2 bg-white rounded-full flex flex-start
            ${!inputBorder ? "border-neutral-200" : "border-[#946CEE]"}`}
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
              <button type="button" onClick={routeSearchPage} className="px-1 ">
                <p className="">
                  <BiSearch size={25} />
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className=" mr-10 mt-4 hidden md:flex">
          {login === false ? (
            <Link href={"/Login"} className=" mr-6">
              <div className="text-[#946CEE] mt-1">로그인</div>
            </Link>
          ) : (
            <Link href={"/MyPage"}>
              <div className="outline outline-[#946CEE]  p-1 rounded-full mx-3">
                <AiOutlineUser size={25} color="#946CEE" />
              </div>
            </Link>
          )}
          {login === false ? (
            <Link href={"/UserSign"} className="">
              <div className="text-[#946CEE] mt-1">회원가입</div>
            </Link>
          ) : (
            <button type="button" onClick={logout}>
              <div className="text-[14px] text-slate-400 pb-2">로그아웃</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
