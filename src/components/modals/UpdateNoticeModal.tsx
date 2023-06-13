import { GrFormClose, GrUpdate } from "react-icons/gr";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useRef } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { temporaryContextInfo } from "@/Types";

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

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const showModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  //호스트인지 구분을 위한 과정
  const [hostCheck, setHostCheck] = useState("");
  const selectHost = async () => {
    const axiosData = { data };
    // console.log(axiosData);
    try {
      const result = await axiosInstance.get("/clubDetail/selectHost", {
        params: axiosData,
      });
      setHostCheck(result.data.data);
      // console.log(hostCheck);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    selectHost();
  }, []);

  //2번 페이지 (Notice) 데이터
  const [noticeText, setNoticeText] = useState<temporaryContextInfo[]>([]);
  const selectNotice = async () => {
    const axiosData = { C_IDX: data.data };
    try {
      const result = await axiosInstance.get("/clubDetail/selectNotice", {
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

  // 업데이트하기 함수
  const [tempUpdateText, setTempUpdateText] = useState("");
  const updateTextref = useRef<HTMLInputElement>(null);

  const handleUpdateSubmit = async () => {
    if (updateTextref.current?.value === "") {
      alert("내용을 다시 확인해주세요");
    } else {
      // console.log(updateTextref.current?.value);
      const axiosData = {
        C_IDX: data.data,
        C_TEXT: updateTextref.current?.value,
      };
      // console.log(axiosData);
      try {
        const result = await axiosInstance.get("/clubDetail/updateNotice", {
          params: axiosData,
        });
        showModal();
        setNoticeText([]);
        if (updateTextref.current?.value) {
          setTempUpdateText(updateTextref.current?.value);
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
              className="border-2 p-2 py-3 bg-white pl-4 mx-5 text-[14px]"
              key={index}
            >
              <p>{item.C_TEXT}</p>
            </div>
          ))}
          {noticeText.length === 0 ? (
            <div className="border-2 p-2 py-3 bg-white pl-4 mx-5 text-[14px]">
              {tempUpdateText}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/*  모달 */}
      <div>
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
                <input
                  className="p-1 m-1 border-2 w-[400px] h-[200px] rounded-xl w-9/12"
                  type="text"
                  ref={updateTextref}
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
