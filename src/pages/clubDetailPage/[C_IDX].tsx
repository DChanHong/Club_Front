import AttendUser from "@/components/clubDetailpage/AttendUser";
import ClubContext from "@/components/clubDetailpage/ClubContext";
import UpdateText from "@/components/clubDetailpage/UpdateText";
import ClubDetailSideBar from "@/components/clubDetailpage/ClubDetailSideBar";
const ClubPostPage = () => {
  return (
    <div className="flex mx-auto w-2/3  ">
      <div className="w-2/12">
        <ClubDetailSideBar />
      </div>
      {/* <div className="flex flex-col h-full">
        <div>
          <ClubContext />
        </div>
        <div>
          <UpdateText />
        </div>
      </div> */}
      <div className="w-10/12">
        <AttendUser />
      </div>
    </div>
  );
};

export default ClubPostPage;
