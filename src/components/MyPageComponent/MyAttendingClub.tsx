import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import { myPageAttInfo } from "@/Types";
import { FiUsers } from "react-icons/fi";
const MyAttendingClub = () => {
  const [data, setData] = useState<myPageAttInfo[]>([]);

  const getMyAttClubList = async () => {
    const result = await axiosInstance.get("/customer/getMyAttClubList");
    setData(result.data);
    if (data.length > 0) {
    }
  };
  useEffect(() => {
    getMyAttClubList();
  }, []);

  return (
    <div className=" ">
      <div className=" text-center mt-4 font-bold text-[20px] text-[#6A7D7C]">
        활동중인 Club
      </div>
      <div
        className="w-full  bg-white px-4 my-6
        overflow-y-auto h-[30rem] shadow-lg rounded-xl "
      >
        {data.map((item) => (
          <div
            className="flex border-2 border-gray-300 bg-white 
            rounded-lg my-4 py-3 pl-4"
            key={item.C_IDX}
          >
            <div className="mx-2 my-1 ">
              <FiUsers size={25} />
            </div>
            <div>
              <div>
                <p className="text-[18px] font-bold">{item.C_NAME}</p>
              </div>
              <div className="flex text-[12px]">
                <p>#{item.C_CATEGORY}&nbsp;</p>
                <p>#{item.C_CATE_DETAIL}&nbsp;</p>
                <p>#{item.C_AREA}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAttendingClub;
