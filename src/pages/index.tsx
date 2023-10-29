import TopMeetingList from "@/components/homes/TopMeetingList";
import CateClubList from "@/components/homes/CateClubList";
import LeftSideBar from "@/components/homes/LeftSideBar";
import MakeClubModal from "@/components/modals/MakeClubModal";
import EntranceHistory from "@/components/homes/EntranceHistory";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import { slideInfo, cateClubInfo } from "@/Types";
import axiosInstance from "@/utils/axiosInstance";

export const getStaticProps: GetStaticProps = async () => {
  const topList: slideInfo[] = await axiosInstance
    .get("/home/club/top/list")
    .then((obj) => obj.data);

  const data = ["스포츠", "문화생활", "스터디", "게임", "기타"];
  const cateList: cateClubInfo[] = [];

  for (let i = 0; i < data.length; i++) {
    const result = await axiosInstance.get("/home/club/category/limit/list", {
      params: { data: data[i] },
    });
    cateList.push(result.data);
  }

  return {
    props: {
      topList,
      cateList,
      data,
    },
  };
};

interface homeProps {
  topList: slideInfo[];
  cateList: cateClubInfo[][];
  data: string[];
}

export default function Home({ topList, cateList, data }: homeProps) {
  return (
    <main className="flex">
      <div className="w-1/6 ">
        <LeftSideBar data="홈" />
        <EntranceHistory />
      </div>

      <div className="flex flex-col w-5/6">
        <TopMeetingList topList={topList} />
        <MakeClubModal />
        {cateList.length === data.length &&
          cateList.map((item, index) => {
            return (
              <CateClubList cateList={item} data={data[index]} key={index} />
            );
          })}
      </div>
    </main>
  );
}
