"오른쪽 바에 동아리 정보";

import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { clubDetailInfo } from "@/Types";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import imageURL from "@/utils/imageUrl";

import { userClubHistoryList } from "@/Types";
import { ADD_CLUB_ENTRANCE } from "@/store/slice/EntranceHistorySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { CiImageOn } from "react-icons/ci";

interface Props {
  hostCheck: string;
}

const ClubContext: React.FC<Props> = ({ hostCheck }) => {
  const router = useRouter();
  const [clubDetail, setClubDetail] = useState<clubDetailInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { C_IDX } = router.query;

  //
  const [entranceHistory, setEntranceHistory] = useState<userClubHistoryList[]>(
    []
  );

  // 일단 여기서 써볼려고 들오곰
  const dispatch = useAppDispatch();

  const getClubDetailInfo = async () => {
    const axiosData = { data: C_IDX };

    const result = await axiosInstance.get(
      "/club/information/title/image/etc",
      {
        params: axiosData,
      }
    );
    setClubDetail(result.data);
    setEntranceHistory(result.data);
  };
  useEffect(() => {
    getClubDetailInfo();
  }, []);
  useEffect(() => {
    setLoading(true);
  }, [clubDetail]);
  useEffect(() => {
    dispatch(ADD_CLUB_ENTRANCE(entranceHistory));
  }, [entranceHistory]);

  const [files, setFiles] = useState<File | null>(null);
  const [imgUploadState, setImgUploadState] = useState<boolean>(false); //이미지 업로드 토글용
  const toggleImgState = () => {
    // 호스트 이미지 업로드 토글 함수  setImgUploadState
    setImgUploadState(!imgUploadState);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFiles(event.target.files[0]);
    }
  };
  // console.log(C_IDX);
  const backImgHandleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData();
    if (files && C_IDX) {
      formData.append("file", files);
      formData.append("C_IDX", C_IDX?.toString());
    }

    try {
      const response = await axiosInstance.post(
        "/club/background/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("submit 완료");
      toggleImgState();
      getClubDetailInfo();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* 960px 이상 보일 화면 */}
      <div className="hidden md:flex flex-col h-full mb-4">
        {!loading ? (
          // 스켈레톤 ui
          <>
            <div className="flex justify-center">
              <Skeleton width={140} />
            </div>
            <div className="flex justify-center">
              <Skeleton width={120} />
            </div>
            <div className="flex justify-center mt-4">
              <Skeleton width={130} height={110} />
            </div>
            <div className="flex justify-center">
              <Skeleton width={100} className="mr-8" />
            </div>
            <div className="ml-6">
              <Skeleton width={135} />
              <Skeleton width={70} />
            </div>
          </>
        ) : (
          <>
            {clubDetail.map((item) => (
              <div key={item?.C_IDX} className="flex flex-col ">
                <p className="text-center text-[22px] p-2 text-[#6A7D7C] font-bold my-2  ">
                  {item?.C_NAME}
                </p>
                <div className="mx-5">
                  <Image
                    className="border-2 rounded-xl "
                    // src={`http://localhost:4000/api/image/background/${item?.C_IMAGE}`}
                    src={`${imageURL}/api/image/background/${item?.C_IMAGE}`}
                    alt={`${item?.C_IDX}`}
                    width={270}
                    height={100}
                    unoptimized={true}
                  />
                </div>
                <div className="flex mx-5 mt-1 text-[15px]">
                  <p className="text-[#946CEE] underline">#{item.C_CATEGORY}</p>
                  <p className="text-[#946CEE] underline ml-1">
                    #{item.C_CATE_DETAIL}
                  </p>
                </div>
                <div className="mx-5 text-[13px] text-slate-400 mt-1">
                  {item.C_INTRO}
                </div>
              </div>
            ))}
            {hostCheck === "host" ? (
              <div>
                <div className="flex flex-row-reverse mr-2">
                  <button>
                    <CiImageOn onClick={() => toggleImgState()} size={25} />
                  </button>
                </div>
                {imgUploadState ? (
                  <div className="border-2 absolute bg-white p-2 rounded-xl">
                    <div className="text-center mb-1 font-bold">
                      배경이미지 변경
                    </div>
                    <form onSubmit={backImgHandleSubmit}>
                      <input type="file" onChange={handleFileChange} />

                      <div className="flex flex-row-reverse mr-2">
                        <button
                          className="outline rounded-xl px-2 mt-2"
                          type="submit"
                        >
                          upload
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
      {/* 960px 이하 보일 화면 */}
      <div className="w-[40rem] ml-6 mr-2 mb-2 md:hidden ">
        {clubDetail.map((item) => (
          <div key={item?.C_IDX}>
            <div className="text-center text-[16px] p-2 text-[#6A7D7C] font-bold   ">
              {item?.C_NAME}
            </div>
            <div className="flex">
              <div className="w-[100px]">
                <Image
                  className="border-2 rounded-xl w-full h-full "
                  // src={`http://localhost:4000/api/image/background/${item?.C_IMAGE}`}
                  src={`${imageURL}/api/image/background/${item?.C_IMAGE}`}
                  alt={`${item?.C_IDX}`}
                  width={100}
                  height={100}
                  unoptimized={true}
                />
              </div>
              <div className="ml-2">
                <p className="text-[#946CEE] underline">
                  #{item.C_CATEGORY}&nbsp; #{item.C_CATE_DETAIL}
                </p>

                <p className="text-[13px] text-slate-400">{item.C_INTRO}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ClubContext;
