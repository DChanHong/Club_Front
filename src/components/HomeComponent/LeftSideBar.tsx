import { AiOutlineHome } from "react-icons/ai";
import { MdSportsVolleyball } from "react-icons/md";
import { TbBuildingCircus } from "react-icons/tb";
import { BsBook } from "react-icons/bs";
import { BiBookOpen } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";

import { FaGamepad } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useRouter } from "next/router";
import { useState } from "react";

const LeftSideBar = (data: any) => {
  const cateList = [
    { id: 1, name: "스포츠", icon: <MdSportsVolleyball /> },
    { id: 2, name: "문화생활", icon: <TbBuildingCircus /> },
    { id: 3, name: "스터디", icon: <BsBook /> },
    { id: 4, name: "게임", icon: <FaGamepad /> },
    { id: 5, name: "기타", icon: <IoMdAddCircleOutline /> },
  ];

  const router = useRouter();

  const moveCateIndex = (data: string) => {
    setSlideBurger(false);
    router.push({
      pathname: `/CateIndex/${data}`,
    });
  };

  const goHome = () => {
    setSlideBurger(false);
    router.push({
      pathname: "/",
    });
  };

  const goAllClubListPage = () => {
    setSlideBurger(false);
    router.push({
      pathname: "/AllClubList",
    });
  };

  const [slideBurger, setSlideBurger] = useState<boolean>(false);
  const toggleSildeBurger = () => {
    setSlideBurger(!slideBurger);
  };

  return (
    <>
      <div className=" md:hidden ml-2">
        <div onClick={() => toggleSildeBurger()} className="cursor-pointer">
          <GiHamburgerMenu size={30} />
        </div>
        {!slideBurger ? (
          <></>
        ) : (
          <div className="absolute ml-4 bg-white z-10">
            <div>
              <button
                type="button"
                className={`hover:bg-[#EFF6FF] w-full h-full ${
                  data.data === "홈" ? "bg-[#EFF6FF]" : ""
                } `}
                onClick={() => goHome()}
                name="HomeButton"
              >
                <div className="flex py-3.5">
                  <p className="pt-1 pl-12">
                    <AiOutlineHome />
                  </p>
                  <p className="pl-4">홈</p>
                </div>
              </button>
              <button
                type="button"
                className={`hover:bg-[#EFF6FF] w-full h-full ${
                  data.data === "전체" ? "bg-[#EFF6FF]" : ""
                } `}
                onClick={() => goAllClubListPage()}
                name="allClubShowButton"
              >
                <div className="flex py-3.5">
                  <p className="pt-1 pl-12">
                    <BiBookOpen />
                  </p>
                  <p className="pl-4">전체</p>
                </div>
              </button>
            </div>
            {cateList.map((item) => (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => moveCateIndex(String(item.name))}
                  className={`hover:bg-[#EFF6FF] w-full h-full ${
                    item.name === data.data ? "bg-[#EFF6FF]" : ""
                  } `}
                  name={`${item.name}button`}
                >
                  <div className="flex py-3.5">
                    <p className="pt-1 pl-12">{item.icon}</p>
                    <p className="pl-4">{item.name}</p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className=" hidden md:block
        border-2 border-t-white
        border-x-white border-b-neutral-100
         "
      >
        <div>
          <button
            type="button"
            className={`hover:bg-[#EFF6FF] w-full h-full ${
              data.data === "홈" ? "bg-[#EFF6FF]" : ""
            } `}
            onClick={() => goHome()}
            name="homeButton"
          >
            <div className="flex py-3.5">
              <p className="pt-1 pl-12">
                <AiOutlineHome />
              </p>
              <p className="pl-4">홈</p>
            </div>
          </button>
          <button
            type="button"
            className={`hover:bg-[#EFF6FF] w-full h-full ${
              data.data === "전체" ? "bg-[#EFF6FF]" : ""
            } `}
            onClick={() => goAllClubListPage()}
            name="showAllClubButton"
          >
            <div className="flex py-3.5">
              <p className="pt-1 pl-12">
                <BiBookOpen />
              </p>
              <p className="pl-4">전체</p>
            </div>
          </button>
        </div>
        {cateList.map((item) => (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => moveCateIndex(String(item.name))}
              className={`hover:bg-[#EFF6FF] w-full h-full ${
                item.name === data.data ? "bg-[#EFF6FF]" : ""
              } `}
              name={`${item.name}button`}
            >
              <div className="flex py-3.5">
                <p className="pt-1 pl-12">{item.icon}</p>
                <p className="pl-4">{item.name}</p>
              </div>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default LeftSideBar;
