import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import { myPageAttInfo } from "@/Types";
import { FiUsers } from "react-icons/fi";

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

const AttendClub: React.FC = () => {
  const [data, setData] = useState<myPageAttInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getMyAttClubList = async () => {
    try {
      const result = await axiosInstance.get("/mypage/participation/club/list");
      setData(result.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMyAttClubList();
  }, []);
  useEffect(() => {
    setIsLoading(true);
  }, [data]);

  return (
    <div>
      <div className=" text-center mt-4 font-bold text-[20px] text-[#6A7D7C]">
        활동중인 Club
      </div>
      <div
        className="w-full  bg-white px-4 my-6
        overflow-y-auto h-[30rem] shadow-lg rounded-xl "
      >
        {!isLoading ? (
          <>
            {Array.from({ length: 4 }).map((item, index) => (
              <SkeletonComponent key={index} />
            ))}
          </>
        ) : (
          <>
            {data.length === 0 ? (
              <div className="mx-4 mt-4">가입한 동아리가 없습니다.</div>
            ) : (
              <>
                {data.map((item) => (
                  <div
                    className="flex border-2 border-gray-300 bg-white 
            rounded-lg my-4 py-3 pl-4 px-4"
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
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AttendClub;
