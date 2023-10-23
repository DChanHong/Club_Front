import TopMeetingList from "@/components/homes/TopMeetingList";
import CateClubList from "@/components/homes/CateClubList";
import LeftSideBar from "@/components/homes/LeftSideBar";
import MakeClubModal from "@/components/modals/MakeClubModal";
import EntranceHistory from "@/components/homes/EntranceHistory";
import { useRouter } from "next/router";

export default function Home() {
  const data = ["스포츠", "문화생활", "스터디", "게임", "기타"];
  const router = useRouter();
  return (
    <>
      <div className="flex">
        <div className="w-1/6 ">
          <LeftSideBar data="홈" />
          <EntranceHistory />
        </div>
        <div className="flex flex-col w-5/6">
          <div className="mb-4 mt-2 border-2 border-t-white border-x-white border-b-neutral-100 ">
            <TopMeetingList />
          </div>
          <div>
            <MakeClubModal />
          </div>
          <div>
            {data.map((item, idx) => {
              return <CateClubList data={String(item)} key={idx} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
