import LeftSideBar from "@/components/HomeComponent/LeftSideBar";
import TopMeetingList from "@/components/HomeComponent/TopMeetingList";
import React from "react";
import InfiniteScrollClubList from "@/components/SearchPage/InfiniteScrollClubList";

const AllClubList = () => {
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
          <InfiniteScrollClubList />
        </div>
      </div>
    </>
  );
};

export default AllClubList;
