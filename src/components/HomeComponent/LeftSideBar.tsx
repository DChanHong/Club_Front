import { AiOutlineHome } from "react-icons/ai";
import { MdSportsVolleyball } from "react-icons/md";
import { TbBuildingCircus } from "react-icons/tb";
import { BsBook } from "react-icons/bs";
import { BiBookOpen } from "react-icons/bi";

import { FaGamepad } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useRouter } from "next/router";

const LeftSideBar = (data: any) => {
  // console.log(data.data);
  const cateList = [
    // { id: 1, name: "홈", icon: <AiOutlineHome /> },

    { id: 1, name: "스포츠", icon: <MdSportsVolleyball /> },
    { id: 2, name: "문화생활", icon: <TbBuildingCircus /> },
    { id: 3, name: "스터디", icon: <BsBook /> },
    { id: 4, name: "게임", icon: <FaGamepad /> },
    { id: 5, name: "기타", icon: <IoMdAddCircleOutline /> },
  ];

  const router = useRouter();

  const moveCateIndex = (data: string) => {
    // console.log(data);
    router.push({
      pathname: `/CateIndex/${data}`,
    });
  };

  const goHome = () => {
    router.push({
      pathname: "/",
    });
  };

  const goAllClubListPage = () => {
    router.push({
      pathname: "/AllClubList",
    });
  };

  return (
    <>
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
