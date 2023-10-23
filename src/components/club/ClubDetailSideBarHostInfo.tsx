import { hostInfo } from "@/Types";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import imageURL from "@/utils/imageUrl";

const ClubDetailSideBarHostInfo = () => {
  const router = useRouter();
  const [hostInfodata, setHostInfoData] = useState<hostInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { C_IDX } = router.query;

  const getHostInfo = async () => {
    const axiosData = { C_IDX };
    try {
      if (typeof C_IDX === null || C_IDX === undefined)
        throw Error("C_IDX가 Null , undefined이다.");
      const result = await axiosInstance.get("/club/host/information", {
        params: axiosData,
      });
      // console.log(result);
      setHostInfoData(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getHostInfo();
  }, []);
  useEffect(() => {
    setLoading(true);
  }, [hostInfodata]);

  return (
    <div className="w-full">
      {!loading ? (
        <>
          <div className="w-full">
            <Skeleton
              width={70}
              height={55}
              circle={true}
              className="mt-4 ml-4"
            />
            <Skeleton width={40} className="ml-5 mt-4" />
            <Skeleton width={60} className="ml-5 mt-1" />
          </div>
        </>
      ) : (
        <>
          {hostInfodata.map((item) => (
            <div key={item.U_IDX} className="ml-3 mt-4">
              <div className="rounded-full p-1 w-[80px]  border-2">
                <Image
                  className="rounded-full w-full h-full"
                  // src={`http://localhost:4000/api/image/${item?.U_IMAGE}`}
                  src={`${imageURL}/api/image/${item?.U_IMAGE}`}
                  alt={`${item.U_IDX}`}
                  width="50"
                  height="50"

                  // unoptimized={true}
                />
              </div>
              <div className=" ml-4 mt-2 text-slate-400 text-[13px] ">host</div>
              <div className=" ml-4 font-bold text-[16px] text-[#82888F]">
                {item.U_NAME}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ClubDetailSideBarHostInfo;
