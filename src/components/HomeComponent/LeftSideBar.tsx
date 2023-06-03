import { AiOutlineHome } from "react-icons/ai";
import { MdSportsVolleyball } from "react-icons/md";
import { TbBuildingCircus } from "react-icons/tb";
import { BsBook } from "react-icons/bs";
import { FaGamepad } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";

const LeftSideBar = () => {
  const cateList = [
    { id: 1, name: "홈", icon: <AiOutlineHome /> },
    { id: 2, name: "스포츠", icon: <MdSportsVolleyball /> },
    { id: 3, name: "문화생활", icon: <TbBuildingCircus /> },
    { id: 4, name: "스터디", icon: <BsBook /> },
    { id: 5, name: "게임", icon: <FaGamepad /> },
    { id: 6, name: "기타", icon: <IoMdAddCircleOutline /> },
  ];

  return (
    <>
      <div
        className=" hidden md:block
        border-2 border-t-white
        border-x-white border-b-neutral-100
         "
      >
        {cateList.map((item) => (
          <div key={item.id} className="">
            <button type="button" className=" w-full h-full">
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
