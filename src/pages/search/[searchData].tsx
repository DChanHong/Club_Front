import SearchList from "@/components/SearchPage/SearchList";
import TopMeetingList from "@/components/HomeComponent/TopMeetingList";

const PostPage = () => {
  return (
    <>
      <div>
        <TopMeetingList />
      </div>
      <div>
        <SearchList />
      </div>
    </>
  );
};

export default PostPage;
