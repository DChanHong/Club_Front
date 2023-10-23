import LeftSideBar from "@/components/homes/LeftSideBar";
import TopMeetingList from "@/components/homes/TopMeetingList";
import React from "react";
import InfiniteScroll from "@/components/search/InfiniteScroll";

const Index = () => {
  return (
    <>
      <div className="flex flex-start ">
        <div className="w-1/6 ">
          <div>
            <LeftSideBar data="전체" />
          </div>
        </div>

        <div className="flex flex-col w-5/6">
          <div className="mb-4 mt-2 border-2 border-t-white border-x-white border-b-neutral-100 ">
            <TopMeetingList />
          </div>
          <InfiniteScroll />
        </div>
      </div>
    </>
  );
};

export default Index;
