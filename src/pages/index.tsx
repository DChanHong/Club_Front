import TopMeetingList from "@/components/HomeComponent/TopMeetingList";
import CateClubList from "@/components/HomeComponent/CateClubList";
import Image from "next/image";
import { Cookies } from "react-cookie";
export default function Home() {
  const data = ["스포츠", "문화생활"];

  return (
    <>
      <div>
        <TopMeetingList />
      </div>
      <div>
        {data.map((item, idx) => {
          return <CateClubList data={item} key={idx} />;
        })}
      </div>
    </>
  );
}
