import SearchList from "@/components/SearchPage/SearchList";
import Header from "@/components/EssentialComponent/Header";
import Navbar from "@/components/EssentialComponent/Navbar";

const PostPage = () => {
  return (
    <>
      <div>
        <Header />
      </div>

      <div>
        <Navbar />
      </div>
      <div>
        <SearchList />
      </div>
    </>
  );
};

export default PostPage;
