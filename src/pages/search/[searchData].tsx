import SearchList from "@/components/SearchPage/SearchList";
import TopMeetingList from "@/components/HomeComponent/TopMeetingList";
import LeftSideBar from "@/components/HomeComponent/LeftSideBar";

import { GetServerSideProps } from "next";

const PostPage = () => {
  return (
    <>
      <div className="flex flex-start ">
        <div className="w-1/6 ">
          <LeftSideBar data="search니까 아무거나" />
        </div>
        <div className="flex flex-col w-5/6">
          <div className="mb-4 mt-2 border-2 border-t-white border-x-white border-b-neutral-100 ">
            <TopMeetingList />
          </div>
          <div>
            <SearchList />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = params;
  return {
    props: {
      data,
    },
  };
};
