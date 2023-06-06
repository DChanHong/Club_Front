import AttendUser from "@/components/clubDetailpage/AttendUser";

import ClubDetailSideBar from "@/components/clubDetailpage/ClubDetailSideBar";
const ClubPostPage = () => {
  return (
    <div className="flex mx-auto w-2/3  ">
      <div className="w-2/12">
        <ClubDetailSideBar />
      </div>
      <div className="w-10/12">
        <AttendUser />
      </div>
    </div>
  );
};

export default ClubPostPage;
