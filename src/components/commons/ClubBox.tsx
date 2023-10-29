import React from "react";
import Image from "next/image";
import imageURL from "@/utils/imageUrl";
import { useRouter } from "next/router";
import { cateClubInfo } from "@/Types";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";

interface props {
  clubBox: cateClubInfo;
}

const ClubBox = ({ clubBox }: props) => {
  const router = useRouter();
  const login = useAppSelector((state: RootState) => state.is_Login.is_Login);
  const clubRouterButton = (data: string) => {
    if (login) {
      router.push({
        pathname: `/club/${data}`,
      });
    } else {
      alert("로그인이 필요합니다.");
      router.push({ pathname: "/Login" });
    }
  };

  return (
    <div
      className="
      flex flex-start 
      border-4  rounded-3xl mr-4
      border-slate-200 my-2 w-[26rem]"
    >
      <p className="m-3 w-[8rem] ">
        <Image
          className="w-[7rem] h-[6rem] border-2 rounded-xl"
          // src={`http://localhost:4000/api/image/background/${clubBox?.C_IMAGE}`}
          src={`${imageURL}/api/image/background/${clubBox?.C_IMAGE}`}
          alt={`${clubBox?.C_IMAGE}`}
          width={100}
          height={100}
        />
      </p>
      <ul>
        <li className="text-[17px]">{clubBox?.C_NAME}</li>
        <li className="text-[#946CEE] underline mb-1">
          #{clubBox?.C_CATEGORY} #{clubBox?.C_CATE_DETAIL} #{clubBox?.C_AREA}
        </li>
        <li className="text-slate-500 text-[12px] mb-1">{clubBox?.C_INTRO}</li>
        <li>
          <button
            className="bg-[#946CEE] border-2 rounded-xl text-white p-1 text-[12px]"
            type="button"
            onClick={() => clubRouterButton(String(clubBox?.C_IDX))}
          >
            입장하기
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ClubBox;
