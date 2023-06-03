import { GrSchedulePlay } from "react-icons/gr";
import { FaMicrophoneAlt } from "react-icons/fa";

const ClubDetailSideBar = () => {
  return (
    <div className="border-2 h-full drop-shadow-lg">
      <div className="flex flex-col p-4">
        <div>일정만든 사람 사진</div>
        <div>일정만든 이름</div>
        <div>일정만든 성별 나이</div>
      </div>
      <div className="my-4 flex flex-col ">
        <div className="flex my-2 pl-4">
          <p className="pt-1.5 ">
            <GrSchedulePlay />
          </p>
          <p className="pl-4"> meeting</p>
        </div>
        <div className="flex pl-4  my-4">
          <p className="pt-1.5 ">
            <FaMicrophoneAlt />
          </p>
          <p className="pl-4"> Intro</p>
        </div>
      </div>
    </div>
  );
};

export default ClubDetailSideBar;
