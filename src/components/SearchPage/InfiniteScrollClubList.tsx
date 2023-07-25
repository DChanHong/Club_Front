import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useRef, useState, useCallback } from "react";
import { cateClubInfo } from "@/Types";
import { useInfiniteQuery } from "react-query";
import Image from "next/image";
import imageURL from "@/utils/imageUrl";
import { useRouter } from "next/router";
import { BiRightArrow } from "react-icons/bi";
import { IoPeopleSharp } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface ClubApiResponse {
  items: cateClubInfo[];
  nextPage: number | null;
}

const InfiniteScrollClubList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const clubRouterButton = (data: string) => {
    router.push({
      pathname: `/clubDetailPage/${data}`,
    });
  };

  const selectInfiniteClubList = async ({
    pageParam = 0,
  }): Promise<ClubApiResponse> => {
    // console.log(pageParam);
    const result = await axiosInstance.get(
      "/search-page/get/user/category/page/total-club",
      {
        params: {
          page: pageParam,
        },
      }
    );
    const items = result.data;
    const hasNextPage = items.length > 0;
    // console.log(hasNextPage);
    const nextPage = hasNextPage ? pageParam + 1 : null;

    return { items, nextPage };
  };

  const {
    data, //
    fetchNextPage, //다음페이지를 불러오는 함수
    hasNextPage, // 다음 페이지가 있는지 여부 , Boolean
    isFetching,
    isFetchingNextPage, //추가 페이지 fetching 여부 ,Boolean
  } = useInfiniteQuery<ClubApiResponse, Error>(
    "club", //data의 이름
    selectInfiniteClubList,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    }
  );
  // 옵저버 생성 및 정리
  // useRef를 사용하여 bottomMarker를 생성합니다.
  const bottomMarkerRef = useRef<HTMLDivElement | null>(null);

  // 옵저버 생성 및 정리
  useEffect(() => {
    const currentMarker = bottomMarkerRef.current;

    if (!currentMarker) return;

    // 옵저버를 생성합니다.
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          // 바닥에 도달할 때 fetchNextPage() 호출
          fetchNextPage();
        }
      },
      { threshold: 0.1 } // 10%가 교차됐을 때
    );

    // 현재 요소를 관찰합니다.
    observer.observe(currentMarker);

    // 컴포넌트가 unmount되거나, props/data 변경되면 정리합니다.
    return () => {
      observer.unobserve(currentMarker);
    };
  }, [bottomMarkerRef, fetchNextPage, hasNextPage]);

  useEffect(() => {
    setIsLoading(true);
  }, [data]);

  // 동아리 입장 박스 스켈레톤
  const ClubMoveSkeletonBox = () => {
    return (
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
    );
  };

  return (
    <div
      className="ml-6 mb-10 mt-2 pb-6
  "
    >
      <div className="flex flex-start text-[22px] py-2 ml-4 ">
        <p className="">
          <IoPeopleSharp size={30} />
        </p>
        <p className="ml-4 ">Toal Club List</p>
      </div>
      {!isLoading ? (
        <div className="flex flex-wrap overflow-y-auto ">
          <ClubMoveSkeletonBox />
          <ClubMoveSkeletonBox />
          <ClubMoveSkeletonBox />
          <ClubMoveSkeletonBox />
          <ClubMoveSkeletonBox />
          <ClubMoveSkeletonBox />
        </div>
      ) : (
        <>
          {data?.pages.map((group, index) => (
            <div key={index} className="flex flex-wrap overflow-y-auto ">
              {group.items.map((item) => (
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
                        name="clubEntranceButton"
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
          ))}
        </>
      )}

      <div ref={bottomMarkerRef} />
    </div>
  );
};

export default InfiniteScrollClubList;
