import { RootState } from "@/store/store";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import { REMOVE_CLUB_ENTRANCE } from "@/store/slice/EntranceHistorySlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import imageURL from "@/utils/imageUrl";

const EntranceHistory = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const clubEntranceHistory = useAppSelector(
    (state: RootState) => state.EntranceHistorySlice.HistoryList
  );

  const removeHistoryClub = (C_IDX: number) => {
    dispatch(REMOVE_CLUB_ENTRANCE(C_IDX));
  };
  useEffect(() => {}, [removeHistoryClub]);

  const moveClub = (data: number) => {
    router.push({
      pathname: `/clubDetailPage/${data}`,
    });
  };

  return (
    <>
      {clubEntranceHistory.length > 0 ? (
        <>
          <div className="ml-5 mt-5">방문 Club</div>
          <div
            className="hidden md:block
            border-2 border-t-white
            border-x-white border-b-neutral-100
            overflow-auto h-[20rem]"
          >
            {clubEntranceHistory.map((item, index) => (
              <div key={index} className="flex my-5 w-full">
                <button
                  className="flex"
                  onClick={() => moveClub(Number(item.C_IDX))}
                >
                  <div className="border-2 rounded-full w-[45px] h-[45px] ml-2">
                    <Image
                      // src={`http://localhost:4000/api/image/background/${item?.C_IMAGE}`}
                      src={`${imageURL}/api/image/background/${item?.C_IMAGE}`}
                      alt={`${item?.C_IDX}`}
                      width={40}
                      height={50}
                      unoptimized={true}
                      className="rounded-full w-full h-full"
                    />
                  </div>
                  <div className="flex-col ml-1 mt-2 w-[8rem]">
                    <p className="text-[11px]">{item?.C_NAME}</p>
                    <div className="text-slate-500 text-[8px]">
                      #{item?.C_CATEGORY}&nbsp;#{item.C_CATE_DETAIL}
                    </div>
                  </div>
                </button>
                <button onClick={() => removeHistoryClub(Number(item.C_IDX))}>
                  <IoIosClose className="mb-7 ml-2" />
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default EntranceHistory;
