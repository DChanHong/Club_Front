import { GrFormClose, GrUpdate } from "react-icons/gr";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useRef } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { temporaryContextInfo } from "@/Types";
import { useCallback } from "react";

const UpdateNoticeModal = (data: { data: Number }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  // console.log(data);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const showModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  //호스트인지 구분을 위한 과정
  const [hostCheck, setHostCheck] = useState<string>("");
  // console.log(data.data);
  const selectHost = async () => {
    const axiosData = { data: data.data };
    // console.log(axiosData);

    try {
      const result = await axiosInstance.get("/club/host/check-info", {
        params: axiosData,
      });
      setHostCheck(result.data.data);
      // console.log(hostCheck);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(hostCheck);
  useEffect(() => {
    selectHost();
  }, []);

  //2번 페이지 (Notice) 데이터
  const [noticeText, setNoticeText] = useState<temporaryContextInfo[]>([]);

  const selectNotice = async () => {
    const axiosData = { C_IDX: data.data };
    try {
      const result = await axiosInstance.get("/club/notice/text", {
        params: axiosData,
      });
      setNoticeText(result.data);

      // console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    selectNotice();
  }, []);

  // 업데이트하기 부분 시작
  const [tempUpdateText, setTempUpdateText] = useState("");
  const updateTextref = useRef<HTMLTextAreaElement>(null);

  // Enter 클릭시마다 \n 추가시킴 Eneter 한번만 적용되고 있음 개선 필요
  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (updateTextref.current) {
        updateTextref.current.value += "\n";
      }
    }
  };

  // 제출 버튼
  const handleUpdateSubmit = async () => {
    console.log(updateTextref.current?.value);
    if (updateTextref.current?.value === "") {
      alert("내용을 다시 확인해주세요");
    } else {
      try {
        setTempUpdateText(updateTextref.current?.value || "");

        const C_TEXT = updateTextref.current?.value.replaceAll(/\n/g, "Enter");
        // console.log(C_TEXT);
        if (C_TEXT) {
          const axiosData = {
            C_IDX: data.data,
            C_TEXT: C_TEXT,
          };
          // console.log(axiosData);
          // 공지사항 수정
          const result = await axiosInstance.put("/club/notice/host/text", {
            params: axiosData,
          });

          showModal();
          setNoticeText([]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between border-2  p-2 py-3 mb-2 bg-white pl-4 mx-5 text-[14px]">
          <p className="text-[#C6CACF] text-[11px]">Update Notice</p>
          <p></p>
          {hostCheck === "host" ? (
            <button type="button" onClick={showModal}>
              <GrUpdate />
            </button>
          ) : (
            <p></p>
          )}
        </div>

        <div>
          {noticeText.map((item, index) => (
            <div
              className="border-2 p-2 py-3 bg-white pl-4 mx-5 text-[14px] text-center"
              key={index}
            >
              {item.C_TEXT?.split("Enter").map((item, index) => (
                <div key={index} className="">
                  <div> {item}</div>
                </div>
              ))}
            </div>
          ))}
          {noticeText.length === 0 ? (
            <div className="border-2 p-2 py-3 bg-white pl-4 mx-5 text-[14px] text-center">
              {tempUpdateText
                .replaceAll("\n", "Enter")
                .split("Enter")
                .map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/*  모달 */}
      <div className="my-4">
        <Modal
          style={customStyles}
          isOpen={modalIsOpen}
          ariaHideApp={false}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <form>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div></div>
                <div className="ml-4 my-2 font-bold">Notice Update</div>
                <button type="button">
                  <GrFormClose size={20} onClick={showModal} />
                </button>
              </div>
              <div>
                <textarea
                  className="p-1 m-1 border-2 w-[400px] h-[200px] rounded-xl w-9/12"
                  ref={updateTextref}
                  onKeyDown={handleEnter}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <p></p>
              <p></p>
              <button
                className="mr-4 mt-2 border-2 text-white bg-blue-500 p-1 rounded-xl px-2"
                type="button"
                onClick={handleUpdateSubmit}
              >
                업데이트하기
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default UpdateNoticeModal;
