import TopMeetingList from "@/components/HomeComponent/TopMeetingList";
import CateClubList from "@/components/HomeComponent/CateClubList";
import Image from "next/image";
export default function Home() {
  const data = ["스포츠", "문화생활"];

  return (
    <>
      {/* <Image
        src={`https://my-club-bucket.s3.ap-northeast-2.amazonaws.com/mypage/curry.png`}
        width={200}
        height={200}
        alt="asd"
      /> */}

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
