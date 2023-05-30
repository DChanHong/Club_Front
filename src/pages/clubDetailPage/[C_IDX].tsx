import AttendUser from "@/components/clubDetailpage/AttendUser";
import ClubContext from "@/components/clubDetailpage/ClubContext";
import UpdateText from "@/components/clubDetailpage/UpdateText";

const ClubPostPage = () => {
  return (
    <div className="flex flex-start mt-4 border-2 p-4 pb-3 pt-1 rounded-xl w-[62rem] h-full border-2 mx-auto">
      <div className="flex flex-col h-full">
        <div>
          <ClubContext />
        </div>
        <div>
          <UpdateText />
        </div>
      </div>
      <div>
        <AttendUser />
      </div>
    </div>
  );
};

export default ClubPostPage;
