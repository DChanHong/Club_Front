import { useRouter } from "next/router";
import LeftSideBar from "@/components/HomeComponent/LeftSideBar";

import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import { cateClubInfo } from "@/Types";
import Image from "next/image";
import { BsFillHeartFill } from "react-icons/bs";

const CategoryIndex = () => {
  const router = useRouter();
  const { Category } = router.query;
  const [cateClub, setCateClub] = useState<cateClubInfo[]>([]);
  const selectCategoryClub = async () => {
    try {
      const axiosData = { data: Category };
      const result = await axiosInstance.get(
        "/search-page/user/Category/club",
        {
          params: axiosData,
        }
      );

      setCateClub(result.data);
      // console.log(cateClub);
    } catch (error) {
      console.log(error);
    }
  };

  const clubRouterButton = (data: any) => {
    router.push({
      pathname: `/clubDetailPage/${data}`,
    });
  };

  useEffect(() => {
    selectCategoryClub();
  }, [Category]);

  return (
    <>
      <div className="flex flex-start ">
        <div className="w-1/6 ">
          <LeftSideBar data={String(Category)} />
        </div>
        <div className="flex flex-col w-5/6">
          <div className="ml-8 mb-2">
            <div className="flex text-[22px]">
              <p className="mt-1.5 mr-2">
                <BsFillHeartFill />
              </p>
              <p className="">{Category} Club</p>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap ml-6">
              {cateClub?.map((item) => (
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
                        onClick={() => clubRouterButton(item?.C_IDX)}
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
        </div>
      </div>
    </>
  );
};

export default CategoryIndex;
