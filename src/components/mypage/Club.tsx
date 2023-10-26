import React from "react";
import { myPageClubInfo } from "@/Types";

interface props {
  list: myPageClubInfo[];
  type: "attend" | "host";
}

const Club = ({ list, type }: props) => {
  return (
    <section className="w-1/2">
      <h2 className={`text-center mt-4 font-bold text-[20px] text-[#6A7D7C]`}>
        {type === "attend" ? "활동중인 클럽" : "MY Club"}
      </h2>
      {list?.length === 0 ? (
        <div className="mx-4 mt-4">
          {type === "host"
            ? "내가 만든 동아리가 없습니다."
            : "가입한 동아리가 없습니다."}
        </div>
      ) : (
        <>
          {list?.map((item: myPageClubInfo, index) => (
            <div
              key={index}
              className={`flex flex-col border-2 border-gray-300 bg-white rounded-lg m-2 p-2`}
            >
              <p className="text-center font-bold text-[18px]">{item.C_NAME}</p>
              <ul className="flex justify-center">
                <li>#{item.C_CATEGORY}&nbsp;</li>
                <li>#{item.C_CATE_DETAIL}&nbsp;</li>
                <li>#{item.C_AREA}</li>
              </ul>
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default Club;
