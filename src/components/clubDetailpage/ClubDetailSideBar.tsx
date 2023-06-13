import { GrSchedulePlay } from "react-icons/gr";
import { FaMicrophoneAlt } from "react-icons/fa";
import { hostInfo } from "@/Types";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import Image from "next/image";

const ClubDetailSideBar = () => {
  const router = useRouter();
  const [hostInfodata, setHostInfoData] = useState<hostInfo[]>([]);
  const { C_IDX } = router.query;

  const getHostInfo = async () => {
    const axiosData = { C_IDX };
    try {
      const result = await axiosInstance.get("/clubDetail/getHostInfo", {
        params: axiosData,
      });

      setHostInfoData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHostInfo();
  }, []);

  return (
    <div className="border-2 h-full drop-shadow-lg">
      {hostInfodata.map((item) => (
        <div key={item.U_IDX} className="ml-3 mt-4">
          <div className="rounded-full p-1 w-[80px]  border-2">
            <Image
              className="rounded-full w-full h-full"
              src={`http://localhost:4000/api/image/${item?.U_IMAGE}`}
              alt={`${item.U_IDX}`}
              width="50"
              height="50"
              unoptimized={true}
            />
          </div>
          <div className=" ml-4 mt-2 text-slate-400 text-[13px] ">host</div>
          <div className=" ml-4 font-bold text-[16px] text-[#82888F]">
            {item.U_NAME}
          </div>
        </div>
      ))}
      <div className="my-4 flex flex-col ">
        <div>
          <button className="flex my-2 pl-4">
            <p className="pt-1.5 ">
              <GrSchedulePlay />
            </p>
            <p className="pl-4"> meeting</p>
          </button>
        </div>
        <div>
          <button type="button" className="flex my-2 pl-4">
            <p className="pt-1.5 ">
              <FaMicrophoneAlt />
            </p>
            <p className="pl-4"> Notice</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubDetailSideBar;
