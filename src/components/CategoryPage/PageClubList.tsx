import { useRouter } from "next/router";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { cateClubInfo } from "@/Types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import imageURL from "@/utils/imageUrl";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

interface Props {
  pageNumber: number;
  Category: string;
}

const PageClubList: React.FC<Props> = ({ pageNumber, Category }) => {
  const [cateClub, setCateClub] = useState<cateClubInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const selectCategoryPage = async () => {
    const axiosData = { pageNumber, Category };
    try {
      const result = await axiosInstance.get(
        "/search-page/get/user/category/page/club",
        { params: axiosData }
      );
      setCateClub(result.data);
      // console.log(cateClub);
    } catch (error) {
      console.log(error);
    }
  };

  const login = useAppSelector((state: RootState) => state.is_Login.is_Login);
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

  useEffect(() => {
    selectCategoryPage();
  }, []);

  useEffect(() => {
    setIsLoading(true);
  }, [cateClub]);
  useEffect(() => {
    selectCategoryPage();
  }, [pageNumber]);

  useEffect(() => {
    selectCategoryPage();
  }, [Category]);
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
    <>
      <div className="flex flex-wrap ml-6">
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
                <div className="m-3 w-[8rem]">
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
    </>
  );
};

export default PageClubList;
