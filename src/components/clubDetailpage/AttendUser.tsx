import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { clubDetailInfo, clubTextInfo } from "@/Types";
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
import { IoAddOutline } from "react-icons/io5";
import { GrFormClose, GrSchedulePlay, GrUpdate } from "react-icons/gr";
import ClubContext from "./ClubContext";
import { ImExit } from "react-icons/im";
import { hostInfo } from "@/Types";
import { FaMicrophoneAlt } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

import { temporaryContextInfo } from "@/Types";
import UpdateNoticeModal from "../modals/UpdateNoticeModal";
import { BsMessenger } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import io, { Socket } from "socket.io-client";
import { chatInfo } from "@/Types";
import { getAllChatInfo } from "@/Types";

const AttendUser = () => {
  const router = useRouter();
  const [clubDetail, setClubDetail] = useState<clubDetailInfo[]>([]);
  const { C_IDX } = router.query;

  // 가입 , 탈퇴
  const [join, setJoin] = useState(false); //true : 가입된 상태 , false: 틸퇴 상태 0을 주는것이 좋다.
  const getClubDetailUserList = async () => {
    const axiosData = { data: C_IDX };

    try {
      const result = await axiosInstance.get("/club/user/entrance/list", {
        params: axiosData,
      });
      setClubDetail(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 가입된 유저 리스트를 가져온다.
  useEffect(() => {
    getClubDetailUserList();
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
      const result = await axiosInstance.get("/club/user/join-check", {
        params: axiosData,
      });
      setJoin(result.data.data); //true면 이미 가입된거
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
      await axiosInstance.post("/club/user/join-club", axiosData, {
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
      // const axiosData = { data: C_IDX };
      await axiosInstance.delete("/club/delete/leave-club", {
        data: { data: C_IDX },
        withCredentials: true,
      });
      setJoin(false);
      alert("탈퇴가 완료되었습니다.");
    } catch (error) {
      console.log(error);
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
      const result = await axiosInstance.get("/club/schedule/information", {
        params: axiosData,
      });
      setSdata(result.data);
    } catch (error) {
      console.log(error);
    }

    //로인한 아이디 들고오기
    try {
      const result2 = await axiosInstance.get("/club/u-idx");
      const result = await axiosInstance.get("/club/schedule/information", {
        params: axiosData,
      });
      setSdata(result.data);
      setloginIdx(result2.data.data);
    } catch (error) {
      console.log(error);
    }

    // console.log(sdata);
  };

  // 모임 일정 지우는 버튼 유무

  useEffect(() => {
    callClubSchedule();
  }, [showComponent]);

  // 댓글창 띄우기
  const commetRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleCommentClick = (S_IDX: string) => {
    const ref = commetRef.current[S_IDX];
    if (ref) {
      ref.classList.toggle("max-h-40");
      ref.classList.toggle("max-h-0");
    }
  };

  //스케쥴 삭제하기
  const deleteSchedule = (data: any) => {
    const axiosData = { S_IDX: data };
    try {
      axiosInstance
        .delete("/club/delete/schedule", { data: { S_IDX: data } })
        .then((res) => {
          console.log(res);
          addHidden(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // 각 일정에 줄 useRef
  const scheduleRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const addHidden = (id: number) => {
    const scheduleElement = scheduleRef.current[id];
    if (scheduleElement) {
      scheduleElement.hidden = true;
    }
  };

  // 사이드바 여기에 추가
  const [hostInfodata, setHostInfoData] = useState<hostInfo[]>([]);

  const getHostInfo = async () => {
    const axiosData = { C_IDX };
    try {
      const result = await axiosInstance.get("/club/host/information", {
        params: axiosData,
      });

      setHostInfoData(result.data);
      // console.log(hostInfodata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHostInfo();
  }, []);

  // 왼쪽 바 Notice 버튼 클릭
  const [pageNumber, setPageNumber] = useState(0);
  const moveSideBar = (data: number) => {
    setPageNumber(data);
    setBurgetMenuState(false);
  };

  //2번 페이지 (Notice) 데이터
  const [noticeText, setNoticeText] = useState<temporaryContextInfo[]>([]);
  const selectNotice = async () => {
    const axiosData = { C_IDX };
    try {
      const result = await axiosInstance.get("/club/notice/text", {
        params: axiosData,
      });
      setNoticeText(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    selectNotice();
  }, []);

  // 왼쪽 바 위에 호스트 정보

  //  공지사항 업데이트 기능
  const updateNotice = () => {};

  // 사이드바 버거 메뉴 버튼 핸들
  const [burgerMenuState, setBurgetMenuState] = useState(false);
  const sideBurgetHandle = () => {
    setBurgetMenuState(!burgerMenuState);
  };

  /* 여기부턴 소켓 댓글창 */

  // 1.로그인 유저 이름 가져오기
  const [userName, setUserName] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<chatInfo[]>([]); //소켓 통신용
  const [chatHistory2, setChatHistory2] = useState<chatInfo[]>([]); // 소켓 나갈 떄 용

  const getUserName = async () => {
    try {
      const result = await axiosInstance.get("/club/my-name");
      setUserName(result.data[0].U_NAME);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserName();
  }, []);

  //2. 소켓 연결
  const socketRef = useRef<Socket | null>(null);

  const SOCKET_SERVER_URL = "http://localhost:4000";
  useEffect(() => {
    // 웹소켓 socket.io 연결
    socketRef.current = io(SOCKET_SERVER_URL); // -> 이거 env로 고쳐봐야될듯

    //이벤트 리스너 등록 (채팅 리스너)
    socketRef.current.on("message", (message) => {
      // console.log(message);
      setChatHistory((chatHistory) => [...chatHistory, message]);
    });

    //다른페이지 가면 소켓 해제
    return () => {
      if (socketRef.current) {
        // console.log(chatHistory2);
        // test();
        socketRef.current.disconnect();
      }
    };
  }, []);

  // 3. 채팅 보내기 소켓 통신
  const chatRef = useRef<HTMLInputElement>(null);

  const sendChat = () => {
    const value = chatRef?.current?.value;
    const club_IDX = String(C_IDX);
    if (value && socketRef.current) {
      const message: chatInfo = {
        C_IDX: club_IDX,
        U_IDX: loginIdx,
        userName: userName,
        userChat: value,
        time: new Date().toLocaleString(), //현재 시각
      };

      pushChatting(message);
      setChatHistory2((chatHistory) => [...chatHistory, message]);

      socketRef.current.emit("chatting", message);
    }
    if (chatRef.current) {
      chatRef.current.value = "";
    }
  };

  // 4. 내가 쓴 글은 오른쪽 , 상대방이 쓴 글은 왼쪽으로 되게 만드는 함수
  const renderChat = (item: chatInfo) => {
    // const className =
    //   chat.U_IDX === loginIdx
    //     ? "flex flex-row-reverse border-2"
    //     : "flex flex-row border2";
    return (
      <div
        className={` ${
          item.U_IDX === loginIdx
            ? "flex flex-row-reverse mr-4 mb-2"
            : "flex flex-row ml-4 mb-2"
        }`}
      >
        <div className="flex flex-col">
          <p
            className={`text-[#8292A9] text-[12px] ${
              item.U_IDX === loginIdx ? "flex flex-row-reverse" : ""
            }`}
          >
            {item.userName}
          </p>
          <p
            className={`p-1 px-4 text-center rounded-full ${
              item.U_IDX === loginIdx ? "bg-[#30C3C1]" : "bg-[#DDDDE7]"
            }`}
          >
            {item.userChat}
          </p>
          <p
            className={`text-[10px] text-[#5B6D7E] ${
              item.U_IDX === loginIdx ? "flex flex-row-reverse" : "flex"
            }`}
          >{`${moment(item.time, "YYYY. M. D. A H:mm:ss").format(
            "YY/MM/DD A H:mm"
          )}`}</p>
        </div>
      </div>
    );
  };

  // 5. 댓글 MongoDB insert함수
  const pushChatting = async (message: any) => {
    try {
      console.log(message);
      const result = await axiosInstance.post("/chat/insertchatting", message);
      // console.log("인설트 성공");
    } catch (error) {
      console.log(error);
    }
  };
  // const test = async () => {
  //   try {
  //     if (chatHistory2) {
  //       console.log(chatHistory2);
  //       const result = await axiosInstance.post(
  //         "/chat/post/context/chatting",
  //         chatHistory2
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //6. 모든 채팅내역 불러오기

  const [allChatList, setAllChatList] = useState<getAllChatInfo[]>([]);

  const getAllchattingList = async () => {
    try {
      const axiosData = { C_IDX };
      const result = await axiosInstance.get("/chat/selectAllChatting", {
        params: axiosData,
      });
      setAllChatList(result.data);
      // console.log(allChatList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllchattingList();
  }, []);

  return (
    <div className="flex justify-center md:flex">
      {/* 왼쪽 바 시작 부분 */}
      <div className="hidden md:block border-2 w-2/12 drop-shadow-lg">
        {hostInfodata.map((item) => (
          <div key={item.U_IDX} className="ml-3 mt-4">
            <div className="rounded-full p-1 w-[80px]  border-2">
              <Image
                className="rounded-full w-full h-full"
                src={`http://localhost:4000/api/image/${item?.U_IMAGE}`}
                alt={`${item.U_IDX}`}
                width="50"
                height="50"
                unoptimized={true}
              />
            </div>
            <div className=" ml-4 mt-2 text-slate-400 text-[13px] ">host</div>
            <div className=" ml-4 font-bold text-[16px] text-[#82888F]">
              {item.U_NAME}
            </div>
          </div>
        ))}
        <div className="my-10 flex flex-col ">
          <div>
            <button
              type="button"
              onClick={() => moveSideBar(0)}
              className="flex pl-4 mb-6
              "
            >
              <p className="pt-1.5 ">
                <GrSchedulePlay />
              </p>
              <p className="pl-4"> Meeting</p>
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => moveSideBar(1)}
              className="flex mb-6 pl-4"
            >
              <p className="pt-1.5 ">
                <FaMicrophoneAlt />
              </p>
              <p className="pl-4"> Notice</p>
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => moveSideBar(2)}
              className="flex mb-6 pl-4"
            >
              <p className="pt-1.5 ">
                <BsMessenger />
              </p>
              <p className="pl-4">Messenger</p>
            </button>
          </div>
        </div>
      </div>
      {/* 960px 이하일 경우 사이드바 뛰어 주는 부분 */}
      <div className="mr-2 md:hidden">
        <button type="button" onClick={sideBurgetHandle}>
          <RxHamburgerMenu size={34} />
        </button>
        {burgerMenuState ? (
          <div className="absolute z-100 w-[10rem] border-2 bg-white shadow-xl rounded-xl">
            {hostInfodata.map((item) => (
              <div key={item.U_IDX} className="ml-3 mt-4">
                <div className="rounded-full p-1 w-[80px]  border-2">
                  <Image
                    className="rounded-full w-full h-full"
                    src={`http://localhost:4000/api/image/${item?.U_IMAGE}`}
                    alt={`${item.U_IDX}`}
                    width="50"
                    height="50"
                    unoptimized={true}
                  />
                </div>
                <div className=" ml-4 mt-2 text-slate-400 text-[13px] ">
                  host
                </div>
                <div className=" ml-4 font-bold text-[16px] text-[#82888F]">
                  {item.U_NAME}
                </div>
              </div>
            ))}
            <div className="my-4 flex flex-col ">
              <div>
                <button
                  type="button"
                  onClick={() => moveSideBar(0)}
                  className="flex my-2 pl-4
              "
                >
                  <p className="pt-1.5 ">
                    <GrSchedulePlay />
                  </p>
                  <p className="pl-4"> meeting</p>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => moveSideBar(1)}
                  className="flex my-2 pl-4"
                >
                  <p className="pt-1.5 ">
                    <FaMicrophoneAlt />
                  </p>
                  <p className="pl-4"> Notice</p>
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => moveSideBar(2)}
                  className="flex my-2 pl-4"
                >
                  <p className="pt-1.5 ">
                    <BsMessenger />
                  </p>
                  <p className="pl-4">Messenger</p>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      {/*  중앙 부분 시작  */}

      {/* meeting */}
      {pageNumber === 0 ? (
        <div className=" w-[40rem]  md:flex flex-col bg-[#E9ECF2] w-7/12  ">
          <div className="flex justify-between mx-4 p-1 my-4">
            <p className="text-[22px] pl-1 text-[#6A7D7C] font-bold">Meeting</p>
            {/*  */}
            {join ? (
              <div className="flex">
                <div>
                  <button
                    className="bg-[#E00050] border-2 p-1 shadow-lg rounded-full text-white mt-1 mx-1"
                    onClick={showModal}
                  >
                    <IoAddOutline />
                  </button>
                </div>
                <p className="text-[14px] text-[#BDC3CC] pr-1 pt-2">sort ▼</p>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          {/* 960px이하로 줄어들 때 클럽 가입하기 넣어줄 부분 */}
          <div className="md:hidden">
            <div>
              <ClubContext />
            </div>
            <div className="text-center p-1 ml-6">
              {join ? (
                <button type="button" onClick={LeaveClub} className="flex  ">
                  <ImExit className="pt-1.5" color="#D2D5D9" size={20} />
                  <div className=" mr-1 text-[#D2D5D9] text-[15px]">
                    exit
                  </div>{" "}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={JoinClub}
                  className="w-full h-full my-2 bg-blue-500 text-white outline outline-slate-200 rounded-xl"
                >
                  가입하기
                </button>
              )}
            </div>
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
                    ref={(ref) =>
                      (scheduleRef.current[String(item.S_IDX)] = ref)
                    }
                    className="border-2 m-3 mx-5 p-5 bg-white shadow-lg "
                  >
                    <div className="flex justify-between">
                      <p></p>
                      <p className="text-center font-bold">{item.S_HEAD}</p>
                      <p>
                        {item.U_IDX === loginIdx ? (
                          <button
                            type="button"
                            onClick={() => deleteSchedule(item.S_IDX)}
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
                            onClick={() =>
                              handleCommentClick(String(item.S_IDX))
                            }
                          >
                            댓글
                          </div>
                        </div>
                      </button>
                    </p>
                    <div
                      ref={(ref) =>
                        (commetRef.current[String(item.S_IDX)] = ref)
                      }
                      className={`mt-4 overflow-y-auto transition-max-height 
                    duration-300 ease-in-out max-h-0

                    `}
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
      ) : (
        <></>
      )}

      {/* <div className=" w-[40rem]  md:flex flex-col bg-[#E9ECF2] w-7/12  "> */}
      {/* Notice 페이지 */}
      {pageNumber === 1 ? (
        <div className="w-[40rem] md:flex flex-col bg-[#E9ECF2] w-7/12 ">
          <div className="flex justify-between mx-4 p-1 my-4">
            <div className="text-[22px] pl-1 text-[#6A7D7C] font-bold">
              Notice
            </div>
          </div>
          <div className="md:hidden">
            <div>
              <ClubContext />
            </div>

            <div className="text-center p-1 ml-6">
              {join ? (
                <button type="button" onClick={LeaveClub} className="flex  ">
                  <ImExit className="pt-1.5" color="#D2D5D9" size={20} />
                  <div className=" mr-1 text-[#D2D5D9] text-[15px]">
                    exit
                  </div>{" "}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={JoinClub}
                  className="w-full h-full my-2 bg-blue-500 text-white outline outline-slate-200 rounded-xl"
                >
                  가입하기
                </button>
              )}
            </div>
          </div>
          {join ? (
            <div className="w-[40rem]">
              <UpdateNoticeModal data={Number(C_IDX)} />
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      {pageNumber === 2 ? (
        <div className="w-[40rem] md:flex flex-col bg-[#E9ECF2] w-7/12 ">
          <div className="flex justify-between mx-4 p-1 my-4">
            <div className="text-[22px] pl-1 text-[#6A7D7C] font-bold">
              Messenger
            </div>
          </div>
          <div className="md:hidden">
            <div>
              <ClubContext />
            </div>
            <div className="text-center p-1 ml-6">
              {join ? (
                <button type="button" onClick={LeaveClub} className="flex">
                  <ImExit className="pt-1.5" color="#D2D5D9" size={20} />
                  <div className=" mr-1 text-[#D2D5D9] text-[15px]">
                    exit
                  </div>{" "}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={JoinClub}
                  className="w-full h-full my-2 bg-blue-500 text-white outline outline-slate-200 rounded-xl"
                >
                  가입하기
                </button>
              )}
            </div>
          </div>
          {/* 메신저 단톡방 */}
          {join ? (
            <>
              <div className="border-4 p-4 mx-4 rounded-xl bg-white overflow-auto h-[38rem]">
                {/* 이전 채팅 내역 보여줄 부분  bg-[#30C3C1] */}
                <div>
                  {allChatList.map((item) => (
                    <div key={item._id}>
                      <div
                        className={` ${
                          item.U_IDX === loginIdx
                            ? "flex flex-row-reverse mr-4 mb-2"
                            : "flex flex-row ml-4 mb-2"
                        }`}
                      >
                        <div className="flex flex-col">
                          <p
                            className={`text-[#8292A9] text-[12px] ${
                              item.U_IDX === loginIdx
                                ? "flex flex-row-reverse"
                                : ""
                            }`}
                          >
                            {item.userName}
                          </p>
                          <p
                            className={`p-1 px-4 text-center rounded-full ${
                              item.U_IDX === loginIdx
                                ? "bg-[#30C3C1]"
                                : "bg-[#DDDDE7]"
                            }`}
                          >
                            {item.userChat}
                          </p>
                          <p
                            className={`text-[10px] text-[#5B6D7E] ${
                              item.U_IDX === loginIdx
                                ? "flex flex-row-reverse"
                                : "flex"
                            }`}
                          >
                            {`${moment(
                              item.time,
                              "YYYY. M. D. A H:mm:ss"
                            ).format("YY/MM/DD A H:mm")}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* 방금 입력한 댓글 보여주는 부분 */}
                <div className="bg-white flex flex-col">
                  <div className=" overflow-auto">
                    {chatHistory.map((chat, index) => (
                      <div key={index}>{renderChat(chat)}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-2 flex mx-4 bg-white rounded-xl my-2">
                <input
                  type="text"
                  className="px-3 w-[36rem] rounded-xl h-[2rem] outline-0"
                  placeholder="채팅을 입력해주세요"
                  ref={chatRef}
                />
                <button className=" mx-2 rounded-xl" onClick={() => sendChat()}>
                  <MdSend />
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      {/*   참석자 리스트 시작  */}
      {/* 960px 이상일 경우에 나올 화면 */}
      <div className="hidden md:block w-2/12 border-2 shadow-lg ">
        <div>
          <ClubContext />
        </div>
        <div className="p-1 mx-2">
          <div className="text-center">
            {join ? (
              <button type="button" onClick={LeaveClub} className="flex  ">
                <ImExit className="pt-1.5" color="#D2D5D9" size={20} />
                <div className=" mr-1 text-[#D2D5D9] text-[15px]">
                  exit
                </div>{" "}
              </button>
            ) : (
              <button
                type="button"
                onClick={JoinClub}
                className="w-full h-full my-2 bg-blue-500 text-white outline outline-slate-200 rounded-xl"
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
