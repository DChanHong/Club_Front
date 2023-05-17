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
    // console.log(axiosData);
    const result = await axiosInstance.get("/clubDetail/getClubDetailInfo", {
      params: axiosData,
    });
    setClubDetail(result.data);
  };
  useEffect(() => {
    getClubDetailUserList();
  }, []);

  return (
    <div>
      {clubDetail.map((item) => (
        <div
          key={item?.C_IDX}
          className="border-2 ml-4 my-2 w-[18rem] h-[14rem]"
        >
          <Image
            className="m-2"
            src={`http://localhost:4000/api/image/background/${item?.C_IMAGE}`}
            alt={`${item?.C_IDX}`}
            width={270}
            height={100}
            unoptimized={true}
          />
          <div className="mt-6">
            <p className="border-2 rounded-xl text-center text-[20px] my-2 ">
              {item?.C_NAME}
            </p>
            <p className="border-2 rounded-xl text-center text-[20px] my-2 ">
              #{item?.C_CATEGORY} #{item.C_CATE_DETAIL}
            </p>
            <p className="border-2 rounded-xl text-center text-[20px] my-2 px-8 ">
              {item?.C_INTRO}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClubContext;
