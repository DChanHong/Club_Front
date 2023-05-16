import AttendUser from "@/components/clubDetailpage/AttendUser";
import ClubContext from "@/components/clubDetailpage/ClubContext";
import UpdateText from "@/components/clubDetailpage/UpdateText";
// import AttendUser from "@/components/clubDetailpage/AttendUser";
// 필요한 데이터 동아리 정보
// 동아리별 참여한 유저 정보
// 동아리 방장인지 아닌지 구별
// 동아리 업데이트(만남 장소 잡기 ) 기능

const ClubPostPage = () => {
  return (
    <div className="flex flex-start w-[62rem]  border-2 mx-auto">
      <div>
        <AttendUser />
      </div>
      <div className="flex flex-start">
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
