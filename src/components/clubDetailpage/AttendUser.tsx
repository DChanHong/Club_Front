import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { clubDetailInfo } from "@/Types";
import Image from "next/image";
import AddScheduleModal from "../modals/AddScheduleModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { OPEN_SCHEDULE_MODAL } from "@/store/slice/isScheduleModalSlice";
import { scheduleInfo } from "@/Types";
import moment from "moment";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";

import TextBox from "./TextBox";

const AttendUser = () => {
  const router = useRouter();
  const [clubDetail, setClubDetail] = useState<clubDetailInfo[]>([]);
  const { C_IDX } = router.query;
  // 가입 , 탈퇴
  const [join, setJoin] = useState(false); //true : 가입된 상태 , false: 틸퇴 상태 0을 주는것이 좋다.
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

  // 가입된 유저 리스트를 가져온다.
  useEffect(() => {
    getClubDetailUserList();
    console.log(join);
  }, []);
  useEffect(() => {
    getClubDetailUserList();
  }, [join]);

  // 유저의 동아리 가입여부를 true false로 가져온다.
  const clubJoinUserCheck = async () => {
    const axiosData = { data: C_IDX };
    // console.log(axiosData);
    try {
      // C_IDX를 보내고 , 토큰으로 node에서 U_IDX를 추출하여 가져옴
      const result = await axiosInstance.get("/clubDetail/clubJoinUserCheck", {
        params: axiosData,
      });
      // console.log(result);
      setJoin(result.data.data); //true면 이미 가입된거
      // console.log(result);
    } catch (erorr) {
      console.log(erorr);
    }
  };

  useEffect(() => {
    clubJoinUserCheck();
  }, []);

  const JoinClub = async () => {
    try {
      const axiosData = { data: C_IDX };
      await axiosInstance.post("/clubDetail/JoinClub", axiosData, {
        withCredentials: true,
      });
      setJoin(true);
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
      setJoin(false);
      alert("탈퇴가 완료되었습니다.");
    } catch (error) {
      // console.log(error);
    }
  };
  // 모달
  const [showComponent, setShowComponent] = useState(false);
  const dispatch = useAppDispatch();
  const showMoalState = useAppSelector(
    (state: RootState) => state.isScheduleModal.isScheduleModal
  );

  useEffect(() => {
    setShowComponent(showMoalState);
  }, [showMoalState]);
  const showModal = () => {
    dispatch(OPEN_SCHEDULE_MODAL(true));
  };

  //일정 불러오기
  const [sdata, setSdata] = useState<scheduleInfo[]>([]);

  const callClubSchedule = async () => {
    const axiosData = { C_IDX: C_IDX };
    const result = await axiosInstance.get("/clubDetail/callClubSchedule", {
      params: axiosData,
    });
    setSdata(result.data);
    // console.log(sdata);
  };

  useEffect(() => {
    callClubSchedule();
  }, [showComponent]);
  // 이러면 다른 페이지에서 쓸 때 소스코드가 많이 필요해진다.

  ////////////
  // 댓글창 띄우기
  const [showComment, setShowComment] = useState(false);
  const [sidx, setSidx] = useState<number>(0);
  const handleContentBox = (S_IDX: any) => {
    setShowComment(!showComment);
    setSidx(S_IDX);
  };

  return (
    <div className="flex flex-start">
      <div className="flex flex-col">
        <div className="border-2 p-1 rounded-xl m-2 h-[32rem] w-[24rem] ">
          {join ? (
            <div>
              <div className=" overflow-y-auto h-[31rem]">
                {sdata.map((item, index) => (
                  <div
                    key={index}
                    className="border-2 m-2 bg-slate-100 shadow-lg rounded-xl overflow-y-auto"
                  >
                    <p className="m- text-center font-bold">{item.S_HEAD}</p>
                    <p className="pl-2  text-[14px]">
                      {" "}
                      모임 날짜 :{`${moment(item.S_DATE).format("YYYY-MM-DD")}`}
                    </p>
                    <p className="m-1 pl-1 text-[14px]">{item.S_SUBH}</p>
                    <p className="flex justify-evenly mb-1">
                      <button className="text-gray-400 text-[13px]">
                        <div className="flex">
                          <AiFillLike className="mx-2" size={16} />
                          <span className="">좋아요</span>
                        </div>
                      </button>
                      <button className="text-gray-400 text-[13px]">
                        <div className="flex">
                          <AiOutlineComment className="mx-2" size={16} />
                          <span
                            className=""
                            onClick={() => handleContentBox(item.S_IDX)}
                          >
                            댓글
                          </span>
                        </div>
                      </button>
                    </p>
                    <div
                      className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                        showComment && item.S_IDX === sidx
                          ? "max-h-40"
                          : "max-h-0"
                      }`}
                    >
                      <TextBox S_IDX={item.S_IDX} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div>
          <div className=" text-center bg-blue-600 border-2 rounded-xl text-white ml-4 p-1  mx-2 ">
            <button className="" onClick={showModal}>
              일정 생성하기{" "}
            </button>{" "}
          </div>
        </div>
      </div>
      <div className=" ">
        <div className="border-2 p-1 rounded-xl ml-4 m-2 h-[32rem] w-[13rem]  overflow-auto">
          {clubDetail?.map((item, index) => (
            <div
              key={index}
              className="flex flex-start border-2 rounded-xl my-1 mx-2 "
            >
              <span className="mb-2 ml-3 w-[45px] h-[45px]">
                <Image
                  className="rounded-full"
                  src={`http://localhost:4000/api/image/${item?.U_IMAGE}`}
                  alt={`${item.U_IDX}`}
                  width="50"
                  height="50"
                  unoptimized={true}
                />
              </span>
              <div className="my-1 mt-3 ml-4 text-[19px] ">
                <span className="mx-auto mt-6 mr-2">{item.U_NAME}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="w-[13rem] border-2 text-center ml-4 p-1 my-2 mx-2 bg-red-600 border-2 rounded-xl text-white">
          {" "}
          {join ? (
            <button type="button" onClick={LeaveClub} className="">
              탈퇴하기
            </button>
          ) : (
            <button type="button" onClick={JoinClub} className="">
              가입하기
            </button>
          )}
        </div>
      </div>
      {showComponent && <AddScheduleModal data={C_IDX} />}
    </div>
  );
};

export default AttendUser;
