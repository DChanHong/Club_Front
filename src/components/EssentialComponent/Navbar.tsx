import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const [Sstate, setSstate] = useState(false);

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
  const sportsList = sports.map((item) => <li key={item.id}>{item.name}</li>);
  const hOverMouse1 = () => {
    setSstate(true);
  };

  const hOutMouse1 = () => {
    setSstate(false);
  };

  const [Cstate, setCstate] = useState(false);
  const culture = [
    { id: 1, name: "공연" },
    { id: 2, name: "영화" },
    { id: 3, name: "콘서트" },
  ];
  const cultureList = culture.map((item) => <li key={item.id}>{item.name}</li>);
  const hOverMouse2 = () => {
    setCstate(true);
  };

  const hOutMouse2 = () => {
    setCstate(false);
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

  return (
    <div className="flex flex-start">
      <div className="bg-slate-200 border-2 my-2 mx-auto w-[62rem] flex justify-start">
        {/* {list.map((item)=> <div onMouseOver={hOverMouse} onMouseOut={hOutMouse} className=' mx-4 text-[20px]' key={item.id}> {item.name} {Mstate && sportsList }</div>)} */}
        <div
          onMouseOver={hOverMouse1}
          onMouseOut={hOutMouse1}
          className=" mx-4 text-[20px]"
          key={list[0].id}
        >
          {" "}
          {list[0].name}{" "}
          <ul className="absolute z-10 bg-slate-200 ">
            {Sstate && sportsList}
          </ul>
        </div>
        <div
          onMouseOver={hOverMouse2}
          onMouseOut={hOutMouse2}
          className=" mx-4 text-[20px]"
          key={list[1].id}
        >
          {" "}
          {list[1].name}{" "}
          <ul className="absolute z-10 bg-slate-200 ">
            {Cstate && cultureList}
          </ul>
        </div>
        <div className="ml-[34rem]">
          <input type="text" className="m-2 border-2" ref={clubSearch} />
          <button type="button" onClick={routeSearchPage}>
            {" "}
            검색{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
