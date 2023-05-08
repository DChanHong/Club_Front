import Head from "next/head";

import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";
import Header from "@/components/EssentialComponent/Header";
import Navbar from "@/components/EssentialComponent/Navbar";
import TopMeetingList from "@/components/HomeComponent/TopMeetingList";
import CateClubList from "@/components/HomeComponent/CateClubList";

export default function Home() {
  const data = ["스포츠", "문화생활"];
  //이걸 넣어주고 싶은데, 오류 찾기ing
  // const CateList = data.forEach((item) => {
  //   <CateClubList data={item} />;
  // });

  return (
    <>
      <Head>
        <title>Gathering Site</title>
      </Head>
      <div>
        <Header />
      </div>
      <div>
        <Navbar />
      </div>
      <div>
        <TopMeetingList />
      </div>
      <div>
        <CateClubList data={data[0]} />;
        <CateClubList data={data[1]} />;
      </div>
    </>
  );
}
