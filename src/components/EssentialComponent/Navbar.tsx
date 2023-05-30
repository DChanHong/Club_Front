import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const list = [
    { id: 1, name: "스포츠" },
    { id: 2, name: "문화생활" },
    { id: 3, name: "스터디" },
  ];

  const sports = [
    { id: 1, name: "축구" },
    { id: 2, name: "야구" },
    { id: 3, name: "농구" },
  ];

  const culture = [
    { id: 1, name: "공연" },
    { id: 2, name: "영화" },
    { id: 3, name: "콘서트" },
  ];
  const sportsList = sports.map((item) => (
    <li className="list-none cursor-pointer" key={item.id}>
      {item.name}
    </li>
  ));
  const cultureList = culture.map((item) => (
    <li className="list-none cursor-pointer" key={item.id}>
      {item.name}
    </li>
  ));
  const [Sstate, setSstate] = useState(false);
  const handleNavbar = () => {
    setSstate(!Sstate);
  };

  /// 서치 기능
  const router = useRouter();
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

  // 네브바 올릴시 스크롤처럼 내려줄 화면

  return (
    <div>
      <div
        className="
          flex flex-start border-2 border-b-gray-200 
          border-x-white border-t-white mt-2 mx-auto 
          w-full flex justify-start 
          
      "
      >
        <div
          className=" mx-10 text-[20px] cursor-pointer px-2
          hover:border-2 border-b-blue-500 border-x-white border-y-white 
          "
          key={list[0].id}
        >
          <div
            className="w-auto text-center"
            onMouseOver={handleNavbar}
            onMouseOut={handleNavbar}
          >
            {list[0].name}
          </div>
        </div>
        <div
          className=" mx-4 text-[20px] cursor-pointer
              hover:border-2 border-b-blue-500 border-x-white border-y-white     "
          key={list[1].id}
        >
          <div
            className="w-auto text-center"
            onMouseOver={handleNavbar}
            onMouseOut={handleNavbar}
          >
            {list[1].name}
          </div>
        </div>
        <div className="ml-[58rem]">
          <input type="text" className="m-2 border-2" ref={clubSearch} />
          <button type="button" onClick={routeSearchPage}>
            검색
          </button>
        </div>
      </div>
      <div
        className={`overflow-hidden transition-max-height duration-500  ${
          Sstate ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="flex flex-start">
          <div className="mx-7 pl-4 pr-12 text-[20px] border-2 border-x-gray-200 border-y-white border-l-white">
            {sportsList}
          </div>
          <div className="mx-5 pr-8 text-[20px] border-2 border-x-gray-200 border-y-white border-l-white">
            {cultureList}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
