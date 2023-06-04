import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { clubDetailInfo } from "@/Types";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { OPEN_SCHEDULE_MODAL } from "@/store/slice/isScheduleModalSlice";
const ClubContext = () => {
  const router = useRouter();
  const [clubDetail, setClubDetail] = useState<clubDetailInfo[]>([]);
  const { C_IDX } = router.query;

  const getClubDetailUserList = async () => {
    const axiosData = { data: C_IDX };

    const result = await axiosInstance.get("/clubDetail/getClubDetailInfo", {
      params: axiosData,
    });
    setClubDetail(result.data);
  };
  useEffect(() => {
    getClubDetailUserList();
  }, []);

  return (
    <div className="flex flex-col h-full mb-4">
      {clubDetail.map((item) => (
        <div key={item?.C_IDX} className="flex flex-col">
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
  );
};

export default ClubContext;
