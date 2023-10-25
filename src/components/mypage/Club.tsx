import React from "react";
import { myPageHostInfo, myPageAttInfo } from "@/Types";

interface props {
  list: myPageHostInfo[] | myPageHostInfo[];
  type: string;
}

const Club = ({ list, type }: props) => {
  return (
    <section>
      <div className={`text-center mt-4 font-bold text-[20px] text-[#6A7D7C]`}>
        {type === "attend" ? "활동중인 클럽" : "MY Club"}
      </div>
      <div></div>
    </section>
  );
};

export default Club;
