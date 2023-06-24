"댓글 박스";
import classNames from "classnames";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState, useRef } from "react";
import { shceduleContext } from "@/Types";
import { GrFormClose } from "react-icons/gr";
import { MdSend } from "react-icons/md";
import { temporaryContextInfo } from "@/Types";
import { temporaryContextInfo2 } from "@/Types";

const TextBox = (S_IDX: any) => {
  const [context, setContext] = useState<shceduleContext[]>([]);
  const [temporaryContext, setTemporaryContext] = useState<
    temporaryContextInfo2[]
  >([]);

  // 창 처음 들어올 때 댓글 불러오기
  const getContext = async () => {
    const axiosData = S_IDX;

    const result = await axiosInstance.get(
      "/club/schedule/information/context",
      {
        params: axiosData,
      }
    );
    setContext(result.data);
  };
  useEffect(() => {
    getContext();
  }, []);

  // 댓글 등록
  const insertText = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const data = insertText.current?.value;
    event.preventDefault();
    const axiosData = {
      CO_CONTEXT: data,
      S_IDX,
    };
    try {
      const result = await axiosInstance.post(
        "/club/i-shchedule/context",
        axiosData
      );
      const newAddComment = { S_IDX: S_IDX.S_IDX, data, id: result.data.id };
      setTemporaryContext((prevComment: temporaryContextInfo2[]) => [
        ...prevComment,
        newAddComment,
      ]);
    } catch (error) {
      console.log(error);
    }
    if (insertText.current) {
      insertText.current.value = "";
    }
  };
  useEffect(() => {}, [temporaryContext]);

  // 댓글 박스 useRef
  /* 
  이거는 document 사용한거

  const inputAddRef = useRef<HTMLDivElement>(null);

  const AddContextBox = () => {
    const inputText = insertText.current?.value;

    if (inputAddRef.current && inputText && userName !== "") {
      // console.log(inputAddRef.current);
      const newDiv = document.createElement("div");
      newDiv.textContent = `${userName} : ${inputText}`;
      newDiv.className = classNames(
        "border-2",
        "py-2",
        "pl-3",
        "my-1",
        "text-[14px]",
        "border-y-gray-100",
        "border-x-white",
        "border-t-white"
      );
      inputAddRef.current.appendChild(newDiv);
    }
  };
  */

  //댓글 박스 버전 2

  //로그인 유저 이름 가져오기

  const [userName, setUserName] = useState<string>("");

  const getUserName = async () => {
    try {
      const result = await axiosInstance.get("/club/my-name");
      // setUserName(result.data);

      setUserName(result.data[0].U_NAME);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserName();
  }, []);

  //댓글 삭제기능

  const deleteContext = (data: any) => {
    // const axiosData = { CO_IDX: data };
    try {
      const result = axiosInstance.delete("/club/delete/schedule/context", {
        data: { CO_IDX: data },
      });
      addHidden(data);
    } catch (error) {
      console.log(error);
    }
  };

  // 각 일정에 줄 useRef
  const contextRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const addHidden = (id: string) => {
    console.log(id);
    const contextElement = contextRef.current[id];
    if (contextElement) {
      contextElement.hidden = true;
    }
  };

  //임시 댓글창 삭제 버튼
  const deleteTemporaryContext = (data: any) => {
    const axiosData = { CO_IDX: data };
    try {
      const result = axiosInstance.delete("/delete/schedule/context", {
        data: { CO_IDX: data },
      });
      temAddHidden(data);
    } catch (error) {
      console.log(error);
    }
  };

  //임시 댓글 useRef
  const temContextref = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const temAddHidden = (id: string) => {
    const contextElement = contextRef.current[id];
    if (contextElement) {
      contextElement.hidden = true;
    }
  };

  return (
    <>
      <div className="my-2">
        <form>
          <div className="flex border-2 border-x-white border-t-white flex-start">
            <input
              type="text"
              placeholder="댓글을 입력해주세요"
              className="w-full outline-none ml-1 border-y-neutral-800 pl-2 py-1"
              ref={insertText}
            />
            <button
              type="button"
              className="mx-1 px-2 rounded-xl"
              onClick={handleSubmit}
            >
              <MdSend />
            </button>
          </div>
        </form>
      </div>

      <div>
        <div>
          {temporaryContext.map((item, index) => (
            <div
              key={index}
              ref={(ref) => (contextRef.current[String(item.id)] = ref)}
            >
              <div
                className="flex justify-between border-2 py-2 pl-3 my-1
                  text-[14px] border-y-gray-100 border-x-white border-t-white"
              >
                <p>
                  {userName} :&nbsp; {item.data}
                </p>
                <p>
                  <button
                    onClick={() => deleteTemporaryContext(Number(item.id))}
                  >
                    <GrFormClose />
                  </button>
                </p>
              </div>
            </div>
          ))}
        </div>
        {context?.map((item, index) => (
          <div
            key={index}
            ref={(ref) => (contextRef.current[String(item.CO_IDX)] = ref)}
          >
            <div
              className="flex justify-between 
                        border-2
                        py-2 pl-3 my-1
                        text-[14px]  
                        border-y-gray-100
                        border-x-white
                        border-t-white
            "
            >
              <p>
                {item.U_NAME} :&nbsp; {item.CO_CONTEXT}
              </p>
              {item.U_NAME === userName ? (
                <button onClick={() => deleteContext(Number(item.CO_IDX))}>
                  <GrFormClose />
                </button>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TextBox;
