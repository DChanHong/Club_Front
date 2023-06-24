import axiosInstance from "@/utils/axiosInstance";
import { myPageHostInfo } from "@/Types";
import { useEffect, useState } from "react";
import { BsFilePersonFill } from "react-icons/bs";
import { useRouter } from "next/router";

const MyPageHostList = () => {
  const [hostList, setHostList] = useState<myPageHostInfo[]>([]);

  const getMyHostClubList = async () => {
    const result = await axiosInstance.get("/mypage/host/club/list");
    setHostList(result.data);
    if (hostList.length > 0) {
      // console.log(hostList);
    }
  };

  useEffect(() => {
    getMyHostClubList();
  }, []);

  return (
    <div className="">
      <div className="text-center mt-4 font-bold text-[20px] text-[#6A7D7C]">
        My Club
      </div>
      <div
        className="overflow-y-auto bg-white px-4 my-6
        h-[30rem]   shadow-lg rounded-xl"
      >
        {hostList.map((item) => (
          <div
            className="flex border-2 border-gray-300 bg-white  rounded-lg my-4 py-3 pl-4 pr-4"
            key={item.C_IDX}
          >
            <div className="my-1">
              <BsFilePersonFill size={30} />
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

export default MyPageHostList;
