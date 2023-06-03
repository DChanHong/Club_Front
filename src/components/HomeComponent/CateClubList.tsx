import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { cateClubInfo } from "@/Types";
import Image from "next/image";
import { useRouter } from "next/router";
import { GoArrowRight } from "react-icons/go";
const CateClubList = ({ data }: any) => {
  const propsdata = data;

  const [cateClub, setCateClub] = useState<cateClubInfo[]>([]);
  // const [loading, setLoading] = useState(false);

  const getCateClubList = async () => {
    const axiosData = { data: propsdata };
    const result = await axiosInstance.get("/homeAdd/getCateClubList", {
      params: axiosData,
    });
    setCateClub(result.data);
  };

  useEffect(() => {
    getCateClubList();
  }, []);

  ///////////
  const router = useRouter();

  const clubRouterButton = (data: any) => {
    router.push({
      pathname: `/clubDetailPage/${data}`,
    });
  };

  return (
    <div className="ml-6 mb-10 mt-2 pb-6 border-2 border-t-white border-x-white border-b-neutral-100">
      <div className="flex flex-start text-[22px] py-2 ml-4 ">
        <p className="">
          <GoArrowRight size={30} />
        </p>
        <p className="ml-4">{propsdata} 동아리 리스트</p>
      </div>

      <div className="flex flex-wrap ">
        {cateClub?.map((item) => (
          <div
            key={item.C_IDX}
            className="
                flex flex-start 
                border-4  rounded-3xl mr-4
                border-slate-200 my-2 w-[26rem]"
          >
            <div className="m-3 w-[8rem] ">
              <Image
                className="w-[7rem] h-[6rem] border-2 rounded-xl"
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
                <button
                  className="  mb-2 "
                  type="button"
                  onClick={() => clubRouterButton(item?.C_IDX)}
                >
                  <p className="bg-blue-600 border-2 rounded-xl text-white p-1 text-[12px]">
                    입장하기
                  </p>
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
