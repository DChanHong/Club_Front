import TopMeetingList from "@/components/HomeComponent/TopMeetingList";
import CateClubList from "@/components/HomeComponent/CateClubList";
import LeftSideBar from "@/components/HomeComponent/LeftSideBar";

export default function Home() {
  const data = ["스포츠", "문화생활"];

  return (
    <>
      <div className="flex flex-start ">
        <div className="w-1/6 ">
          <LeftSideBar />
        </div>
        <div className="flex flex-col w-5/6">
          <div className="mb-4 mt-2 border-2 border-t-white border-x-white border-b-neutral-100 ">
            <TopMeetingList />
          </div>
          <div>
            {data.map((item, idx) => {
              return <CateClubList data={item} key={idx} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
