import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { clubDetailInfo } from "@/Types";
import Image from "next/image";

const AttendUser = () => {
  const router = useRouter();
  const [clubDetail, setClubDetail] = useState<clubDetailInfo[]>([]);
  const { C_IDX } = router.query;

  const getClubDetailUserList = async () => {
    const axiosData = { data: C_IDX };
    // console.log(axiosData);
    const result = await axiosInstance.get(
      "/clubDetail/getClubDetailUserList",
      {
        params: axiosData,
      }
    );
    setClubDetail(result.data);
    // console.log(clubDetail);
  };
  useEffect(() => {
    getClubDetailUserList();
  }, []);

  return (
    <div className="border- w-[13rem]">
      <div className="border-2 my-2 mx-2">
        <p className="text-center my-1">참여자</p>
      </div>
      {clubDetail?.map((item) => (
        <div key={item?.U_IDX} className="flex flex-start border-2 my-1 mx-2 ">
          <span className="my-1 ml-3 w-[45px] h-[45px]">
            <Image
              className="rounded-full"
              src={`http://localhost:4000/api/image/${item?.U_IMAGE}`}
              alt={`${item.U_IDX}`}
              width="50"
              height="50"
              unoptimized={true}
            />
          </span>
          <div className="my-1 mt-4 ml-4 text-[18px] ">
            <span className="mx-auto mt-6 mr-2">{item.U_NAME}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendUser;
