import Head from "next/head";

import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";
import Header from "@/components/EssentialComponent/Header";
import Navbar from "@/components/EssentialComponent/Navbar";
import TopMeetingList from "@/components/HomeComponent/TopMeetingList";
import CateClubList from "@/components/HomeComponent/CateClubList";
import Image from "next/image";
import axiosInstance from "@/utils/axiosInstance";
export default function Home() {
  const data = ["스포츠", "문화생활"];

  return (
    <>
      <Head>
        <title>Gathering Site</title>
      </Head>
      {/* <Image
        src={`https://my-club-bucket.s3.ap-northeast-2.amazonaws.com/mypage/curry.png`}
        width={200}
        height={200}
        alt="asd"
      /> */}
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
        {data.map((item, idx) => {
          return <CateClubList data={item} key={idx} />;
        })}
      </div>
    </>
  );
}
