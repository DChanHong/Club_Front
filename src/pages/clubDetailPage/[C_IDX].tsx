import AttendUser from "@/components/clubDetailpage/AttendUser";
import { GetServerSideProps } from "next";

import ClubDetailSideBar from "@/components/clubDetailpage/ClubDetailSideBar";
const ClubPostPage = () => {
  return (
    <div className="flex mx-auto w-2/3  ">
      {/* <div className="w-2/12">
        <ClubDetailSideBar />
      </div> */}
      <div className="w-full">
        <AttendUser />
      </div>
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
