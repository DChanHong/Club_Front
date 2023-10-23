import SearchList from "@/components/search/SearchList";
import TopMeetingList from "@/components/homes/TopMeetingList";
import LeftSideBar from "@/components/homes/LeftSideBar";

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
