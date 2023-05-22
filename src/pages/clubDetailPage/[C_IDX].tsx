import AttendUser from "@/components/clubDetailpage/AttendUser";
import ClubContext from "@/components/clubDetailpage/ClubContext";
import UpdateText from "@/components/clubDetailpage/UpdateText";

const ClubPostPage = () => {
  return (
    <div className="flex flex-start w-[62rem] h-full border-2 mx-auto">
      <div>
        <AttendUser />
      </div>
      <div className="flex flex-col">
        <div>
          <ClubContext />
        </div>
        <div>
          <UpdateText />
        </div>
      </div>
    </div>
  );
};

export default ClubPostPage;
