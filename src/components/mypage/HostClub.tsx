import axiosInstance from "@/utils/axiosInstance";
import { myPageHostInfo } from "@/Types";
import { useEffect, useState } from "react";
import { BsFilePersonFill } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonComponent = () => (
  <div className="flex border-2 rounded-lg my-4 py-3 pl-4 px-4">
    <Skeleton width={35} height={50} />
    <div className="mx-2 mt-1">
      <Skeleton width={200} />
      <Skeleton width={200} />
    </div>
  </div>
);

const HostClub = () => {
  const [hostList, setHostList] = useState<myPageHostInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getMyHostClubList = async () => {
    try {
      const result = await axiosInstance.get("/mypage/host/club/list");
      setHostList(result.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setIsLoading(true);
  }, [hostList]);
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
        {!isLoading ? (
          <>
            {Array.from({ length: 4 }).map((item, index) => (
              <SkeletonComponent key={index} />
            ))}
          </>
        ) : (
          <>
            {hostList.length === 0 ? (
              <div className="mx-4 mt-4">내가 만든 동아리가 없습니다.</div>
            ) : (
              <>
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
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HostClub;
