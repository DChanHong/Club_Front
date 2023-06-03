"댓글 박스";

import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState, useRef } from "react";
import { shceduleContext } from "@/Types";
const TextBox = (S_IDX: any) => {
  const [context, setContext] = useState<shceduleContext[]>([]);
  const getContext = async () => {
    const axiosData = S_IDX;
    // console.log(axiosData);

    const result = await axiosInstance.get("/clubDetail/getContext", {
      params: axiosData,
    });
    setContext(result.data);
  };

  useEffect(() => {
    getContext();
  }, []);

  //댓글 insert
  // const [insertContext, setInsertContext] = useState<string>("");
  const insertText = useRef<HTMLInputElement>(null);

  // const handleContext = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInsertContext(e.target.value);
  // };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    const data = insertText.current?.value;
    event.preventDefault();
    const axiosData = {
      CO_CONTEXT: data,
      S_IDX,
    };
    const result = axiosInstance.post("/clubDetail/insertContext", axiosData);
    if (insertText.current) {
      insertText.current.value = "";
    }
  };
  useEffect(() => {
    getContext();
  }, [handleSubmit]);

  return (
    <div>
      <div className=" my-2 ">
        <form>
          <div className="flex flex-start">
            <input
              type="text"
              placeholder="  댓글을 입력해주세요"
              className="w-4/5  ml-1 border-y-neutral-800"
              ref={insertText}
            />
            <button
              type="button"
              className="mx-1 border-2 px-2 rounded-xl"
              onClick={handleSubmit}
            >
              {" "}
              등록{" "}
            </button>
          </div>
        </form>
      </div>
      {context?.map((item, index) => (
        <div
          key={index}
          className="flex flex-start 
          border-2
          py-2 pl-3 my-1
          text-[14px]  
          border-y-gray-200
          border-x-slate-100
        "
        >
          <p>{item.U_NAME} : </p>
          <p>&nbsp; {item.CO_CONTEXT}</p>
        </div>
      ))}
    </div>
  );
};

export default TextBox;
