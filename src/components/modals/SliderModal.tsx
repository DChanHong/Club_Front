import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import axiosInstance from "@/utils/axiosInstance";
import { cateClubInfo } from "@/Types";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hooks";
import { CLOSE_SLIDER_MODAL } from "@/store/slice/isSliderModalSlice";

const SliderModal = (C_IDX: any) => {
  const [clubInfo, setClubInfo] = useState<cateClubInfo[]>([]);
  // console.log(C_IDX); { data : 2}
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const getSliderModalInfo = async () => {
    const axiosData = C_IDX;
    console.log(axiosData);
    const result = await axiosInstance.get("/homeAdd/getSliderModalInfo", {
      params: axiosData,
    });
    setClubInfo(result.data);
  };

  useEffect(() => {
    getSliderModalInfo();
  }, []);

  const closeModal = () => {
    dispatch(CLOSE_SLIDER_MODAL(false));
  };

  const clubRouterButton = (data: any) => {
    router.push({
      pathname: `/clubDetailPage/${data}`,
    });
  };

  return (
    <>
      <div
        className="
        justify-center
        items-center
        flex
        overflow-x-hidden
        overflow-y-auto
        fixed
        inset-0
        outline-none
        focus:outline-none
        bg-neutral-800/70
        "
      >
        <div
          className="
            relative
            w-[33rem]
            md:;w-4/6
            lg:;w-3/6
            xl:;w-2/5
            my-6
            mx-auto
            h-full
            lh:h-auto
            md:h-auto
            
            "
        >
          {/* 배경깔기 끝 여기부터 중앙 모달 창 꾸미기 */}
          <div
            className="
            translate
            translate-y-45
            duration-300
            h-full            
            opacity-100
            
            "
          >
            <div
              className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-4
              
              
              
              rounded-lg
              shadow-lg
              relative
              flex
              flex-col
              w-full
              bg-white
              outline-none
              focus:outline-none
              
              
              
              "
            >
              {/*  */}
              <div
                className="
                flex
                flex-col
                border-
                m-4
                relative
                             
                "
              >
                {/* 바디 부분 */}
                <div className="relative">
                  <div className="pb-2 ">
                    <div className=" flex flex-row-reverse mb-2">
                      <button type="button" onClick={closeModal}>
                        <IoMdClose size={18} />
                      </button>
                    </div>
                    {clubInfo?.map((item) => (
                      <div key={item.U_IDX} className=" flex flex-start ">
                        <div className="w-[12rem] rounded-xl mx-2">
                          <Image
                            className="w-[12rem h-[10rem] rounded-xl"
                            src={`http://localhost:4000/api/image/background/${item?.C_IMAGE}`}
                            alt={`${item.C_IDX}`}
                            width="250"
                            height="10"
                            unoptimized={true}
                          />
                        </div>
                        <div className=" ">
                          <div className="flex flex-col  w-[18rem] h-[10rem]">
                            {/* <div className="flex flex-row-reverse">
                              <button type="button" onClick={closeModal}>
                                <IoMdClose size={18} />
                              </button>
                            </div> */}
                            <p className="text-[17px] text-center border-2 rounded-xl mb-1 h-[30px] ">
                              {" "}
                              {item.C_NAME}
                            </p>
                            <p className="text-blue-700 underline mb-1 text-center border-2 text-[16px] rounded-xl my-1 h-[30px]">
                              #{item.C_CATEGORY} #{item.C_CATE_DETAIL}
                            </p>
                            <p className="text-center  border-2 text-[14px] text-gray-400 rounded-xl p-1 mb-1 h-[48x] ">
                              {item.C_INTRO}
                            </p>
                            <button
                              className="mt-1"
                              type="button"
                              onClick={() => clubRouterButton(item?.C_IDX)}
                            >
                              <p className="bg-blue-600 border-2 border-blue-600  rounded-xl text-white text-[14px] h-[25px] ">
                                입장하기
                              </p>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderModal;
