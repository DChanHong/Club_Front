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
    try {
      if (typeof C_IDX === null || undefined)
        throw Error("C_IDX가 Null이거나 undefined이다.");
      const result = await axiosInstance.get("/club/information/notice", {
        params: axiosData,
      });
      setClubDetail(result.data);
    } catch (error) {}
  };
  useEffect(() => {
    getClubDetailUserList();
  }, []);

  return (
    <div className="">
      {clubDetail.map((item) => (
        <div key={item.C_TEXT}>
          <div className="text-center rounded-xl mx-auto h-[13rem]">
            {item.C_TEXT}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpdateText;
