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
        overflosw-y-auto
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
            w-full
            md:w-4/6
            lg:w-3/6
            xl:w-2/5
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
            duration-300
            h-full
            translate-y-45
            opacity-100"
          >
            <div
              className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-2
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
                items-center
                p-6
                rounded-t
                
                relative
                boder-b-[1px]                
                "
              >
                <button
                  type="button"
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                  onClick={closeModal}
                >
                  <IoMdClose size={20} />
                </button>
                {/* 바디 부분 */}
                <div className="relative p-6 flex-auto">
                  <div>
                    {clubInfo?.map((item) => (
                      <div key={item.U_IDX} className=" flex flex-start mt-2">
                        <div className="w-[15rem] border-2">
                          <Image
                            src={`http://localhost:4000/api/image/background/${item?.C_IMAGE}`}
                            alt={`${item.C_IDX}`}
                            width="250"
                            height="10"
                            unoptimized={true}
                          />
                        </div>
                        <div className="ml-6">
                          <p> {item.C_NAME}</p>
                          <p> {item.C_INTRO}</p>
                          <p>
                            {item.C_CATEGORY} {item.C_CATE_DETAIL}
                          </p>
                          <button
                            className="  mb-2 "
                            type="button"
                            onClick={() => clubRouterButton(item?.C_IDX)}
                          >
                            <p className="bg-blue-600 border-2 border-blue-600  rounded-xl text-white p-1 text-[12px]">
                              입장하기
                            </p>
                          </button>
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
