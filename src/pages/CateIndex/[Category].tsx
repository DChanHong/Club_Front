import { useRouter } from "next/router";
import LeftSideBar from "@/components/HomeComponent/LeftSideBar";

import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import { cateClubInfo } from "@/Types";

import { BsFillHeartFill } from "react-icons/bs";
import PageClubList from "@/components/CategoryPage/PageClubList";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { RxDoubleArrowRight } from "react-icons/rx";
import { BiLastPage } from "react-icons/bi";
import { BiFirstPage } from "react-icons/bi";

import { GetServerSideProps } from "next";

const CategoryIndex = () => {
  const router = useRouter();
  const { Category } = router.query;
  const [cateClub, setCateClub] = useState<cateClubInfo[]>([]);

  const [totalPage, setTotalPage] = useState<number>(0);
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
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedPage, setSelectedPage] = useState<number>(1);

  const [naviList, setNaviList] = useState<number[]>([]);

  const makePageNavi = (selectedPageNumber: number) => {
    const newStartPage = Number.isInteger(selectedPageNumber / 3)
      ? (selectedPageNumber / 3 - 1) * 3 + 1
      : Math.floor(selectedPageNumber / 3) * 3 + 1;

    const newEndPage =
      totalPage - newStartPage === 0 ||
      totalPage - newStartPage === 1 ||
      totalPage - newStartPage === 2
        ? totalPage
        : newStartPage + 2;

    // console.log(newEndPage);
    makeNaviList(newStartPage, newEndPage);
  };

  const makeNaviList = (newStartPage: number, newEndPage: number) => {
    if (cateClub.length === 0) {
      setNaviList([1]);
      setTotalPage(1);
    } else {
      const newNaviList: number[] = [];
      for (let i = newStartPage; i <= newEndPage; i++) {
        newNaviList.push(i);
      }
      setNaviList(newNaviList);
    }
  };

  const moveRightPage = () => {
    if (selectedPage < totalPage) {
      setSelectedPage(selectedPage + 1);
    }
  };

  const moveLeftpage = () => {
    if (selectedPage != 1) {
      setSelectedPage(selectedPage - 1);
    }
  };

  const moveFirstPage = () => {
    setSelectedPage(1);
  };

  const moveLastPage = () => {
    setSelectedPage(totalPage);
  };

  useEffect(() => {
    setTotalPage(Math.ceil(cateClub.length / 6));
  }, [cateClub]);

  useEffect(() => {
    makePageNavi(selectedPage);
  }, [totalPage, selectedPage]);

  useEffect(() => {
    selectCategoryClub();
    setSelectedPage(1);
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
            <PageClubList
              pageNumber={selectedPage}
              Category={String(Category)}
            />
          </div>
          <div>
            <div className="flex justify-center mr-40 my-10">
              <button onClick={moveFirstPage}>
                <BiFirstPage size={30} color="#8F92B3" />
              </button>
              <button onClick={moveLeftpage}>
                <MdOutlineArrowBackIosNew color="#8F92B3" size={20} />
              </button>
              {naviList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPage(item)}
                  className={`mx-2 px-2 py-1 hover:bg-[#5CE8D7] rounded-full ${
                    item === selectedPage ? "bg-[#5CE8D7]" : ""
                  }`}
                >
                  <button type="button" className=" w-full h-full ">
                    {item}
                  </button>
                </div>
              ))}

              <button onClick={moveRightPage}>
                <MdOutlineArrowForwardIos color="#8F92B3" size={20} />
              </button>
              <button onClick={moveLastPage}>
                <BiLastPage color="#8F92B3" size={30} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryIndex;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = params;
  return {
    props: {
      data,
    },
  };
};
