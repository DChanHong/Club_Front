import { useRef } from "react";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import Image from "next/image";
import axiosInstance from "@/utils/axiosInstance";
import { slideInfo } from "@/Types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import SliderModal from "@/components/modals/SliderModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { BsFillHeartFill } from "react-icons/bs";
import { RootState } from "@/store/store";
import { useAppDispatch } from "@/store/hooks";
import { useAppSelector } from "@/store/hooks";
import { OPEN_SLIDER_MODAL } from "@/store/slice/isSliderModalSlice";
import imageURL from "@/utils/imageUrl";

const TopMeetingList = () => {
  const [imgList, setImages] = useState<slideInfo[]>([]);
  const [loading, setLoading] = useState(false);

  const getTopClubList = async () => {
    const result = await axiosInstance.get("/home/club/top/list");

    if (result) {
      setImages(result.data);
    }
  };
  useEffect(() => {
    getTopClubList();
  }, []);
  useEffect(() => {
    setLoading(true);
  }, [imgList]);

  // 슬라이더
  const sliderRef = useRef<Slider>(null);
  const handlePrevClick = () => {
    sliderRef.current?.slickPrev();
  };
  const handleNextClick = () => {
    sliderRef.current?.slickNext();
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slideToScroll: 1,
        },
      },
    ],
  };

  // 모달창 전용

  const [modalIndex, setMoadlIndex] = useState(0);
  const [showComponent, setShowComponent] = useState(false);

  const dispatch = useAppDispatch();

  const showMoalState = useAppSelector(
    (state: RootState) => state.isSliderModal.isSliderModal
  );
  useEffect(() => {
    setShowComponent(showMoalState);
  }, [showMoalState]);
  const showModal = (C_IDX: any) => {
    setMoadlIndex(C_IDX);
    dispatch(OPEN_SLIDER_MODAL(true));
  };

  return (
    <div className="mb-10 mt-2 flex flex-row mx-auto ">
      <div className="ml-4">
        <div className="flex flex-start text-[22px] py-2 ml-4 ">
          <p className="mt-2 ">
            <BsFillHeartFill />
          </p>
          <p className="ml-4">인기 동아리 리스트</p>
        </div>
        {!loading ? (
          <>
            <div className="flex">
              <Skeleton height={200} width={250} className="mx-4" />
              <Skeleton height={200} width={250} className="mx-4" />
              <Skeleton height={200} width={250} className="mx-4" />
              <Skeleton height={200} width={250} className="mx-4" />
              <Skeleton height={200} width={250} className="mx-4" />
              <Skeleton height={200} width={250} className="mx-4" />
            </div>
          </>
        ) : (
          <div className="flex w-auto mx-auto ">
            <button onClick={handlePrevClick} className="hidden md:block mr-6">
              <AiFillCaretLeft />
            </button>

            <Slider
              className="w-[480px]   sm:w-[650px] md:w-[1028px] mt-4"
              ref={sliderRef}
              {...settings}
            >
              {imgList?.map((item) => (
                <div key={item.U_IDX}>
                  <div className="w-full h-full z-0">
                    <Image
                      onClick={() => showModal(item.C_IDX)}
                      className="w-[14rem] h-[12rem] border-4 rounded-2xl cursor-pointer"
                      // src={`http://localhost:4000/api/image/background/${item?.C_IMAGE}`}
                      src={`${imageURL}/api/image/background/${item?.C_IMAGE}`}
                      alt={`${item?.U_IDX}`}
                      width={50}
                      height={100}
                      priority
                    />
                  </div>
                </div>
              ))}
            </Slider>
            <button onClick={handleNextClick}>
              <AiFillCaretRight />
            </button>
          </div>
        )}
        <div className="flex block mt-2 md:hidden">
          <div>
            <button onClick={handlePrevClick} className="p-2">
              <AiFillCaretLeft />
            </button>
          </div>
          <div>
            <button className="p-2" onClick={handleNextClick}>
              <AiFillCaretRight />
            </button>
          </div>
        </div>
      </div>

      {showComponent && modalIndex > 0 && <SliderModal data={modalIndex} />}
    </div>
  );
};

export default TopMeetingList;
