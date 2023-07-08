import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { slideInfo } from "@/Types";
import Image from "next/image";
import imageURL from "@/utils/imageUrl";
const GetClub = () => {
  const [data, setData] = useState<slideInfo[]>([]);
  const getTestData = async () => {
    try {
      const result = await axiosInstance.get("/home/club/top/list");
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTestData();
  }, []);
  useEffect(() => {}, [data]);

  return (
    <div>
      {data?.map((item) => (
        <div
          key={item.C_IDX}
          className="
        flex flex-start 
        border-4  rounded-3xl mr-4
        border-slate-200 my-2 w-[26rem]"
        >
          <div className="m-3 w-[8rem]">
            <Image
              className="w-[7rem] h-[6rem] border-2 rounded-xl"
              // src={`http://localhost:4000/api/image/background/${item?.C_IMAGE}`}
              src={`${imageURL}/api/image/background/${item?.C_IMAGE}`}
              alt={`${item?.U_IDX}`}
              width={100}
              height={100}
              unoptimized={true}
            />
          </div>
          <div>
            <div className="mt-3 ">
              <p className="text-[17px]">{item.C_NAME}</p>
            </div>
            <div>
              <p className="text-[#946CEE] underline mb-1">
                #{item.C_CATEGORY} #{item.C_CATE_DETAIL} #{item.C_AREA}
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-[12px] mb-1">{item.C_INTRO}</p>
            </div>
            <div>
              <button className="  mb-2 " type="button">
                <p className="bg-[#946CEE] border-2 rounded-xl text-white p-1 text-[12px]">
                  입장하기
                </p>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetClub;
