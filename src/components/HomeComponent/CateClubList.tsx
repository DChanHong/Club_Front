import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { cateClubInfo } from "@/Types";
import Image from "next/image";

const CateClubList = ({ data }: any) => {
  const propsdata = data;

  const [cateClub, setCateClub] = useState<cateClubInfo[]>([]);
  const [loading, setLoading] = useState(false);

  const getCateClubList = async () => {
    const axiosData = { data: propsdata };
    const result = await axiosInstance.get("/customer/getCateClubList", {
      params: axiosData,
    });
    setCateClub(result.data);
  };

  useEffect(() => {
    getCateClubList();
    if (cateClub.length > 0) {
      setLoading(true);
    }
  }, []);

  return (
    <div>
      <div className="mx-auto text-[22px] border-4 w-[20rem] text-center">
        <p>{propsdata} 동아리 리스트</p>
      </div>
      <div className=" grid grid-cols-2  mx-auto  w-[62rem] ">
        {cateClub?.map((item) => (
          <div
            key={item.C_IDX}
            className="flex flex-start border-4 rounded-3xl border-slate-200 m-2 w-[28rem]"
          >
            <div className="m-4">
              <Image
                src={`http://localhost:4000/api/image/background/${item?.C_IMAGE}`}
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
                <p className="text-blue-700 underline mb-1">
                  #{item.C_CATEGORY} #{item.C_CATE_DETAIL} #{item.C_AREA}
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-[12px] mb-1">
                  {item.C_INTRO}
                </p>
              </div>
              <div>
                <button className="border-2 rounded-xl mb-2 " type="button">
                  <p className="p-0.5">입장하기</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CateClubList;
