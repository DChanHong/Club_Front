import { cateClubInfo } from "@/Types";
import { useRouter } from "next/router";
import { IoPeopleSharp } from "react-icons/io5";
import { BiRightArrow } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useCallback, useMemo } from "react";
import ClubBox from "../commons/ClubBox";

interface cateProps {
  cateList: cateClubInfo[];
  data: string;
}

const CateClubList = ({ cateList, data }: cateProps) => {
  const router = useRouter();
  const moveCateIndex = useCallback((data: string) => {
    router.push({
      pathname: `/category/${data}`,
    });
  }, []);

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
        <p className="ml-4 ">{data} Club List</p>
        <button
          type="button"
          className="flex"
          onClick={() => moveCateIndex(String(data))}
          name="clubTotalShwoButton"
        >
          <p className=" ml-4 mt-2 ">
            <BiRightArrow size={20} color="#BDC3CC" />
          </p>
          <p className="text-[14px] text-[#BDC3CC]  mt-2 ">전체보기</p>
        </button>
      </div>

      <div className="flex flex-wrap overflow-y-auto ">
        {!cateList ? (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <ClubMoveSkeletonBox key={index} />
            ))}
          </>
        ) : (
          <>
            {cateList?.map((item: cateClubInfo, index) => (
              <ClubBox clubBox={item} key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CateClubList;
