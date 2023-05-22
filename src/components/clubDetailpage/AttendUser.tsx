import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { clubDetailInfo } from "@/Types";
import Image from "next/image";

const AttendUser = () => {
  const router = useRouter();
  const [clubDetail, setClubDetail] = useState<clubDetailInfo[]>([]);
  const { C_IDX } = router.query;

  const getClubDetailUserList = async () => {
    const axiosData = { data: C_IDX };
    // console.log(axiosData);
    const result = await axiosInstance.get(
      "/clubDetail/getClubDetailUserList",
      {
        params: axiosData,
      }
    );
    setClubDetail(result.data);
    // console.log(clubDetail);
  };
  useEffect(() => {
    getClubDetailUserList();
  }, []);
  /////// 가입 , 탈퇴
  const [count, setCount] = useState(false); //true : 가입된 상태 , false: 틸퇴 상태
  const clubJoinUserCheck = async () => {
    const axiosData = { data: C_IDX };
    console.log(axiosData);
    try {
      // C_IDX를 보내고 , 토큰으로 node에서 U_IDX를 추출하여 가져옴
      const result = await axiosInstance.get("/clubDetail/clubJoinUserCheck", {
        params: axiosData,
      });
      setCount(result.data.data); //true면 이미 가입된거
    } catch (erorr) {
      console.log(erorr);
    }
  };

  useEffect(() => {
    clubJoinUserCheck();
  }, []);

  useEffect(() => {
    getClubDetailUserList();
  }, [count]);
  const JoinClub = async () => {
    try {
      const axiosData = { data: C_IDX };
      await axiosInstance.post("/clubDetail/JoinClub", axiosData, {
        withCredentials: true,
      });
      setCount(true);
    } catch (error) {
      console.log(error);
    }
    alert("가입이 완료되었습니다.");
  };

  const LeaveClub = async () => {
    try {
      const axiosData = { data: C_IDX };
      await axiosInstance.post("/clubDetail/LeaveClub", axiosData, {
        withCredentials: true,
      });
      setCount(false);
      alert("탈퇴가 완료되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border-2 m-2 h-[31rem] w-[13rem] overflow-auto">
      <div className="border-2 text-center p-1 my-2 mx-2 bg-blue-600 border-2 rounded-xl text-white">
        {" "}
        {count ? (
          <button type="button" onClick={LeaveClub} className="">
            탈퇴하기
          </button>
        ) : (
          <button type="button" onClick={JoinClub} className="">
            가입하기
          </button>
        )}
      </div>
      {clubDetail?.map((item) => (
        <div key={item?.U_IDX} className="flex flex-start border-2 my-1 mx-2 ">
          <span className="my-1 ml-3 w-[45px] h-[45px]">
            <Image
              className="rounded-full"
              src={`http://localhost:4000/api/image/${item?.U_IMAGE}`}
              alt={`${item.U_IDX}`}
              width="50"
              height="50"
              unoptimized={true}
            />
          </span>
          <div className="my-1 mt-4 ml-4 text-[18px] ">
            <span className="mx-auto mt-6 mr-2">{item.U_NAME}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendUser;
