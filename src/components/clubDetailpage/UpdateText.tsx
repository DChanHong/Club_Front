import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { clubTextInfo } from "@/Types";

const UpdateText = () => {
  const router = useRouter();
  const { C_IDX } = router.query;
  const [clubDetail, setClubDetail] = useState<clubTextInfo[]>([]);
  const getClubDetailUserList = async () => {
    const axiosData = { data: C_IDX };
    // console.log(axiosData);
    const result = await axiosInstance.get("/clubDetail/getClubText", {
      params: axiosData,
    });
    setClubDetail(result.data);
  };
  useEffect(() => {
    getClubDetailUserList();
  }, []);

  return (
    <div className=" my-1 mt-14 w-[20rem] ">
      {clubDetail.map((item) => (
        <div key={item.C_TEXT}>
          <div className="text-center border-2 mx-auto h-[13rem] w-[18rem]">
            {item.C_TEXT}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpdateText;
