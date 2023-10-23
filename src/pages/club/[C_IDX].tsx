import AttendUser from "@/components/club/AttendUser";
import { GetServerSideProps } from "next";

const ClubPostPage = () => {
  return (
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
