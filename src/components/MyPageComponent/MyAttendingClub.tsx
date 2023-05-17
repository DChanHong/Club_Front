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
    <>
      <div className="mx-auto w-[18rem] text-center mt-4 font-bold text-[20px]">
        활동중인 Club
      </div>
      <div>
        {data.map((item) => (
          <div
            className="flex flex-start border-2 border-gray-300 bg-white w-[20rem] rounded-lg my-4 py-3"
            key={item.C_IDX}
          >
            <div>
              <FiUsers className="mt-2 mx-6" size={30} />
            </div>
            <div>
              <div className="text-center">
                <p className="text-[18px] font-bold">{item.C_NAME}</p>
              </div>
              <div className="flex flex-start my-1 ml-2 text-[12px]">
                <p>#{item.C_CATEGORY}&nbsp;</p>
                <p>#{item.C_CATE_DETAIL}&nbsp;</p>
                <p>#{item.C_AREA}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyAttendingClub;
