import TopMeetingList from "@/components/HomeComponent/TopMeetingList";
import CateClubList from "@/components/HomeComponent/CateClubList";
import LeftSideBar from "@/components/HomeComponent/LeftSideBar";
import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";
import MakeClubModal from "@/components/modals/MakeClubModal";

export default function Home() {
  const data = ["스포츠", "문화생활"];

  const [testData, setTest] = useState("");
  const test = async () => {
    const result = await axiosInstance.get("/test");
    setTest(result.data);
  };
  // console.log(testData);

  return (
    <>
      <div className="flex flex-start ">
        <div className="w-1/6 ">
          <LeftSideBar />
        </div>
        <div className="flex flex-col w-5/6">
          <div>
            <button type="button" onClick={test}>
              테스트 버튼
            </button>
            <div>{testData}</div>
          </div>
          <div className="mb-4 mt-2 border-2 border-t-white border-x-white border-b-neutral-100 ">
            <TopMeetingList />
          </div>
          <div>
            <MakeClubModal />
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
