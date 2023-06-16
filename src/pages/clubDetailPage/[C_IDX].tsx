import AttendUser from "@/components/clubDetailpage/AttendUser";
import { GetServerSideProps } from "next";

import ClubDetailSideBar from "@/components/clubDetailpage/ClubDetailSideBar";
const ClubPostPage = () => {
  return (
    // <div className=" mx-auto w-2/3 ">
    <div className=" md:flex justify-center">
      <AttendUser />
    </div>
  );
};

export default ClubPostPage;

//
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = params;
  return {
    props: {
      data,
    },
  };
};
