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
import UpdateText from "./UpdateText";
import TextBox from "./TextBox";
import { IoAddOutline } from "react-icons/io5";
import { GrFormClose } from "react-icons/gr";
import ClubContext from "./ClubContext";
const AttendUser = () => {
  const router = useRouter();
  const [clubDetail, setClubDetail] = useState<clubDetailInfo[]>([]);
  const { C_IDX } = router.query;
  // 가입 , 탈퇴
  const [join, setJoin] = useState(false); //true : 가입된 상태 , false: 틸퇴 상태 0을 주는것이 좋다.
  const getClubDetailUserList = async () => {
    const axiosData = { data: C_IDX };
    // console.log(axiosData);

    try {
      const result = await axiosInstance.get(
        "/clubDetail/getClubDetailUserList",
        {
          params: axiosData,
        }
      );
      // console.log(result);
      setClubDetail(result.data);
    } catch (error) {
      console.log(error);
    }
    // console.log(clubDetail);
  };

  // 가입된 유저 리스트를 가져온다.
  useEffect(() => {
    getClubDetailUserList();
    // console.log(join);
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
  const [loginIdx, setloginIdx] = useState<number>(0);

  const callClubSchedule = async () => {
    const axiosData = { C_IDX: C_IDX };
    try {
      const result = await axiosInstance.get("/clubDetail/callClubSchedule", {
        params: axiosData,
      });
      setSdata(result.data);
    } catch (error) {
      console.log(error);
    }

    //로인한 아이디 들고오기
    try {
      const result2 = await axiosInstance.get("/clubDetail/getMyIdx");
      const result = await axiosInstance.get("/clubDetail/callClubSchedule", {
        params: axiosData,
      });
      setSdata(result.data);
      setloginIdx(result2.data.data);
    } catch (error) {
      console.log(error);
    }

    // console.log(sdata);
  };

  // 모일 일정 지우는 버튼 유무

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

  //스케쥴 삭제하기
  const deleteSchedule = (data: any) => {
    const axiosData = { S_IDX: data };
    try {
      axiosInstance.post("/clubDetail/deletSchedule", axiosData).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //
  const [deleteState, setDeleteState] = useState(false);

  return (
    <div className="flex">
      {/*  일정 보여주는 부분 시작  */}
      <div className="flex flex-col bg-[#E9ECF2] w-9/12 ">
        <div className="flex justify-between mx-4 p-1 my-4">
          <p className="text-[22px] pl-1 text-[#6A7D7C] font-bold">Meeting</p>
          {join ? (
            <div className="flex">
              <div>
                <button
                  className="bg-[#E00050] border-2 p-1 shadow-lg rounded-full text-white mt-1 mx-1"
                  onClick={showModal}
                >
                  <IoAddOutline />
                </button>{" "}
              </div>
              <p className="text-[14px] text-[#BDC3CC] pr-1 pt-2">sort ▼</p>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="border-2 p-2 py-3 bg-white pl-4 mx-5 text-[14px]">
          <p className="text-[#C6CACF] text-[11px]">
            Comment on the club schedule you want to participate in
          </p>
        </div>

        <div className=" h-full ">
          {join ? (
            <div className="h-full ">
              {sdata.map((item, index) => (
                <div
                  key={index}
                  className="border-2 m-3 mx-5 p-5 bg-white shadow-lg "
                >
                  <div className="flex justify-between">
                    <p></p>
                    <p className="text-center font-bold">{item.S_HEAD}</p>
                    <p>
                      {item.U_IDX === loginIdx ? (
                        <button
                          type="button"
                          onClick={() => deleteSchedule(item.U_IDX)}
                        >
                          <GrFormClose />
                        </button>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                  <div className="flex">
                    <div className="rounded-full p-1 w-[50px]  border-2">
                      <Image
                        className="rounded-full w-full h-full"
                        src={`http://localhost:4000/api/image/${item?.U_IMAGE}`}
                        alt={`${item.U_IDX}`}
                        width="50"
                        height="50"
                        unoptimized={true}
                      />
                    </div>
                    <div className="mx-4 mt-2 text-[16px] flex flex-col ">
                      <p>{item.U_NAME}</p>
                      <p className="text-[13px] text-[#D2D5D9]">
                        Date : {`${moment(item.S_DATE).format("YYYY-MM-DD")}`}
                      </p>
                    </div>
                  </div>
                  <p className=" my-4">{item.S_SUBH}</p>
                  <p className="flex">
                    <button className="text-gray-400 text-[13px]">
                      <div className="flex">
                        <AiFillLike
                          className="mr-1"
                          color="#946CEE"
                          size={16}
                        />
                        <div className="text-[#946CEE] font-bold mr-12">
                          좋아요
                        </div>
                      </div>
                    </button>
                    <button className="text-[13px]">
                      <div className="flex">
                        <AiOutlineComment
                          className="ml-2 mt-0.4 mr-1"
                          color="#946CEE"
                          size={16}
                        />
                        <div
                          className="text-[#946CEE] font-bold "
                          onClick={() => handleContentBox(item.S_IDX)}
                        >
                          댓글
                        </div>
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
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {/*   참석자 리스트 시작  */}
      <div className="w-3/12 border-2 shadow-lg ">
        <div>
          <ClubContext />
        </div>
        <div className="p-1 mx-2">
          <div
            className=" 
                 text-center"
          >
            {join ? (
              <button
                type="button"
                onClick={LeaveClub}
                className="w-full h-full my-2 bg-red-500 outline outline-slate-200 rounded-xl"
              >
                탈퇴하기
              </button>
            ) : (
              <button
                type="button"
                onClick={JoinClub}
                className="w-full h-full my-2 bg-blue-500 outline outline-slate-200 rounded-xl"
              >
                가입하기
              </button>
            )}
          </div>
        </div>
        <div
          className=" p-1  border-2 pt- shadow-lg
            border-x-white border-b-white overflow-auto
          "
        >
          {clubDetail?.map((item, index) => (
            <div key={index} className="flex pl-4 my-2">
              <div className="rounded-full p-1 w-[40px] h-[40px] border-2">
                <Image
                  className="rounded-full"
                  src={`http://localhost:4000/api/image/${item?.U_IMAGE}`}
                  alt={`${item.U_IDX}`}
                  width="50"
                  height="50"
                  unoptimized={true}
                />
              </div>
              <div className=" ml-4 mt-2 text-[16px] text-center">
                {item.U_NAME}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showComponent && <AddScheduleModal data={C_IDX} />}
    </div>
  );
};

export default AttendUser;
