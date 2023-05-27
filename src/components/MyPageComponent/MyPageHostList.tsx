import axiosInstance from "@/utils/axiosInstance";
import { myPageHostInfo } from "@/Types";
import { useEffect, useState } from "react";
import { BsFilePersonFill } from "react-icons/bs";
import { useRouter } from "next/router";

const MyPageHostList = () => {
  const [hostList, setHostList] = useState<myPageHostInfo[]>([]);

  const getMyHostClubList = async () => {
    const result = await axiosInstance.get("/customer/getMyHostClubList");
    setHostList(result.data);
    if (hostList.length > 0) {
      // console.log(hostList);
    }
  };

  useEffect(() => {
    getMyHostClubList();
  }, []);

  return (
    <>
      <div className="mx-auto w-[18rem] text-center mt-4 font-bold text-[20px]">
        My Club
      </div>
      <div>
        {hostList.map((item) => (
          <div
            className="flex flex-start border-2  border-gray-300 bg-white w-[20rem] rounded-lg my-4 py-3"
            key={item.C_IDX}
          >
            <div>
              <BsFilePersonFill className="mt-2 mx-6" size={30} />
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

export default MyPageHostList;
