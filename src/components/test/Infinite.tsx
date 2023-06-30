import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useRef, useState, useCallback } from "react";
import { cateClubInfo } from "@/Types";
import { useInfiniteQuery } from "react-query";

interface ClubApiResponse {
  items: cateClubInfo[];
  nextPage: number | null;
}

const Infinite = () => {
  const getInfiniteClubData = async ({
    pageParam = 0,
  }): Promise<ClubApiResponse> => {
    // console.log(pageParam);
    const result = await axiosInstance.get("/club/test/club", {
      params: {
        page: pageParam,
      },
    });
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
    getInfiniteClubData,
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

  return (
    <div>
      <div className="flex flex-col border-2 h-[20rem] py-6 overflow-scroll">
        {data?.pages.map((group, index) => (
          <div key={index} className="mx-auto">
            {group.items.map((item) => (
              <div className="border-2 p-2 my-1" key={item.C_IDX}>
                {item.C_NAME}
              </div>
            ))}
          </div>
        ))}
        <div />

        <div ref={bottomMarkerRef} />
      </div>
      <div className="text-center border-2 p-1 my-2 ">
        (<button onClick={() => fetchNextPage()}>더 불러오기</button>)
      </div>
    </div>
  );
};

export default Infinite;
