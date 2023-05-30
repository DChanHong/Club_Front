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
    // console.log(axiosData);
    const result = await axiosInstance.get("/clubDetail/getClubDetailInfo", {
      params: axiosData,
    });
    setClubDetail(result.data);
  };
  useEffect(() => {
    getClubDetailUserList();
  }, []);
  const dispatch = useAppDispatch();
  const showModal = () => {
    dispatch(OPEN_SCHEDULE_MODAL(true));
  };

  return (
    <div className="flex flex-col h-full">
      {clubDetail.map((item) => (
        <div
          key={item?.C_IDX}
          className=" ml-4 my-2 w-[18rem] h-auto flex flex-col"
        >
          <p className="border-2 rounded-xl text-center text-[20px] my-2 ">
            {item?.C_NAME}
          </p>
          <Image
            className="border-4 rounded-xl w-[18rem] h-[14rem]"
            src={`http://localhost:4000/api/image/background/${item?.C_IMAGE}`}
            alt={`${item?.C_IDX}`}
            width={270}
            height={100}
            unoptimized={true}
          />
        </div>
      ))}
    </div>
  );
};

export default ClubContext;
