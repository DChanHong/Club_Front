import { cateClubInfo } from "@/Types";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

const SearchList = () => {
  const router = useRouter();
  const [searchData, setSearchData] = useState<cateClubInfo[]>([]);
  const selectSearchClub = async () => {
    const { searchData } = router.query;
    const axiosData = { data: searchData };

    const result = await axiosInstance.get(
      "/search-page/user/club/search-word",
      {
        params: axiosData,
      }
    );
    setSearchData(result.data);
  };

  const clubRouterButton = (data: string) => {
    router.push({ pathname: `/clubDetailPage/${data}` });
  };

  useEffect(() => {
    selectSearchClub();
  }, []);
  return (
    <div>
      <div className="flex flex-wrap ml-6 ">
        {searchData?.map((item) => (
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
                <p className="text-[#946CEE] underline mb-1">
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
                  onClick={() => clubRouterButton(String(item.C_IDX))}
                >
                  <p className="bg-[#946CEE] border-2 rounded-xl text-white p-1 text-[12px]">
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

export default SearchList;
