"오른쪽 바에 동아리 정보";

import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { clubDetailInfo } from "@/Types";
import Image from "next/image";
const ClubContext = () => {
  const router = useRouter();
  const [clubDetail, setClubDetail] = useState<clubDetailInfo[]>([]);
  const { C_IDX } = router.query;

  const getClubDetailUserList = async () => {
    const axiosData = { data: C_IDX };

    const result = await axiosInstance.get(
      "/club/information/title/image/etc",
      {
        params: axiosData,
      }
    );
    setClubDetail(result.data);
  };
  useEffect(() => {
    getClubDetailUserList();
  }, []);

  return (
    <>
      {/* 960px 이상 보일 화면 */}
      <div className="hidden md:flex flex-col h-full mb-4">
        {clubDetail.map((item) => (
          <div key={item?.C_IDX} className="flex flex-col ">
            <p className="text-center text-[22px] p-2 text-[#6A7D7C] font-bold my-2  ">
              {item?.C_NAME}
            </p>
            <div className="mx-5">
              <Image
                className="border-2 rounded-xl "
                src={`http://localhost:4000/api/image/background/${item?.C_IMAGE}`}
                alt={`${item?.C_IDX}`}
                width={270}
                height={100}
                unoptimized={true}
              />
            </div>
            <div className="flex mx-5 mt-1 text-[15px]">
              <p className="text-[#946CEE] underline">#{item.C_CATEGORY}</p>
              <p className="text-[#946CEE] underline ml-1">
                #{item.C_CATE_DETAIL}
              </p>
            </div>
            <div className="mx-5 text-[13px] text-slate-400 mt-1">
              {item.C_INTRO}
            </div>
          </div>
        ))}
      </div>
      {/* 960px 이하 보일 화면 */}
      <div className="w-[40rem] ml-6 mr-2 mb-2 md:hidden ">
        {clubDetail.map((item) => (
          <div key={item?.C_IDX}>
            <div className="text-center text-[16px] p-2 text-[#6A7D7C] font-bold   ">
              {item?.C_NAME}
            </div>
            <div className="flex">
              <div className="w-[100px]">
                <Image
                  className="border-2 rounded-xl w-full h-full "
                  src={`http://localhost:4000/api/image/background/${item?.C_IMAGE}`}
                  alt={`${item?.C_IDX}`}
                  width={100}
                  height={100}
                  unoptimized={true}
                />
              </div>
              <div className="ml-2">
                <p className="text-[#946CEE] underline">
                  #{item.C_CATEGORY}&nbsp; #{item.C_CATE_DETAIL}
                </p>

                <p className="text-[13px] text-slate-400">{item.C_INTRO}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ClubContext;
