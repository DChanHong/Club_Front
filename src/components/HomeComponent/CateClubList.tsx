import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { cateClubInfo } from "@/Types";
import Image from "next/image";
import { useRouter } from "next/router";
import { IoEllipseSharp, IoPeopleSharp } from "react-icons/io5";
import { BiRightArrow } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import imageURL from "@/utils/imageUrl";
import { useCallback, useMemo } from "react";

import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

const CateClubList = ({ data }: { data: string }) => {
  const login = useAppSelector((state: RootState) => state.is_Login.is_Login);

  const propsdata = data;

  const [cateClub, setCateClub] = useState<cateClubInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getCateClubList = async () => {
    const axiosData = { data: propsdata };

    try {
      if (propsdata === null || undefined)
        throw Error("propsdata아 null이거나 undefined이다.");
      const result = await axiosInstance.get("/home/club/category/limit/list", {
        params: axiosData,
      });
      setCateClub(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCateClubList();
  }, []);

  useEffect(() => {
    setIsLoading(true);
  }, [cateClub]);

  //
  const router = useRouter();

  const clubRouterButton = useCallback(
    (data: string) => {
      if (login === true) {
        router.push({
          pathname: `/clubDetailPage/${data}`,
        });
      } else {
        alert("로그인이 필요합니다.");
        router.push({ pathname: "/Login" });
      }
    },
    [router]
  );

  const moveCateIndex = useCallback((data: string) => {
    router.push({
      pathname: `/CateIndex/${data}`,
    });
  }, []);

  // 동아리 입장 박스 스켈레톤
  const ClubMoveSkeletonBox = () =>
    useMemo(
      () => (
        <div className="flex border-4 rounded-xl w-[26rem] mr-4 my-2">
          <div className="flex">
            <div className="m-3 w-[8rem] ">
              <Skeleton count={1} className=" h-[6rem]" />
            </div>
            <div className="mt-2">
              <Skeleton count={1} width={200} className="mt-3" />
              <Skeleton count={1} width={200} />
              <Skeleton count={1} width={200} className="mt-2" />
              <Skeleton count={1} width={80} className="mt-2" />
            </div>
          </div>
        </div>
      ),
      []
    );

  return (
    <div
      className="
          ml-6 mb-10 mt-2 pb-6 border-2 
          border-t-white border-x-white 
          border-b-neutral-100
    "
    >
      <div className="flex flex-start text-[22px] py-2 ml-4 ">
        <p className="">
          <IoPeopleSharp size={30} />
        </p>
        <p className="ml-4 ">{propsdata} Club List</p>
        <button
          type="button"
          className="flex"
          onClick={() => moveCateIndex(String(propsdata))}
          name="clubTotalShwoButton"
        >
          <p className=" ml-4 mt-2 ">
            <BiRightArrow size={20} color="#BDC3CC" />
          </p>
          <p className="text-[14px] text-[#BDC3CC]  mt-2 ">전체보기</p>
        </button>
      </div>

      <div className="flex flex-wrap overflow-y-auto ">
        {!isLoading ? (
          <>
            <ClubMoveSkeletonBox />
            <ClubMoveSkeletonBox />
            <ClubMoveSkeletonBox />
            <ClubMoveSkeletonBox />
            <ClubMoveSkeletonBox />
            <ClubMoveSkeletonBox />
          </>
        ) : (
          <>
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
                    // src={`http://localhost:4000/api/image/background/${item?.C_IMAGE}`}
                    src={`${imageURL}/api/image/background/${item?.C_IMAGE}`}
                    alt={`${item?.U_IDX}`}
                    width={100}
                    height={100}

                    // unoptimized={true}
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
                      onClick={() => clubRouterButton(String(item?.C_IDX))}
                    >
                      <p className="bg-[#946CEE] border-2 rounded-xl text-white p-1 text-[12px]">
                        입장하기
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CateClubList;
