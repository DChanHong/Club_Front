import Head from "next/head";

import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import TopMeetingList from "@/components/TopMeetingList";

export default function Home() {
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
        <div className="heigth-[4rem]"></div>
        <div className="border-4 text-[40px] w-[62rem] my-1 mx-auto">
          {" "}
          스포츠 동아리List
        </div>
        <div className="border-4 text-[40px] w-[62rem] my-1 mx-auto">
          {" "}
          문화생활 동아리List
        </div>
        <div className="border-4 text-[40px] w-[62rem] my-1 mx-auto">
          {" "}
          스터디 동아리List
        </div>
        <div className="border-4 text-[40px] w-[62rem] my-1 mx-auto">
          {" "}
          기타List
        </div>
      </div>
    </>
  );
}
