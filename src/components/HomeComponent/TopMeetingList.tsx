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

import { RootState } from "@/store/store";
import { useAppDispatch } from "@/store/hooks";
import { useAppSelector } from "@/store/hooks";
import { OPEN_SLIDER_MODAL } from "@/store/slice/isSliderModalSlice";

const TopMeetingList = () => {
  const [imgList, setImages] = useState<slideInfo[]>([]);
  const [loading, setLoading] = useState(false);

  const getTopClubList = async () => {
    const result = await axiosInstance.get("homeAdd/getTopClubList");
    // console.log(result);
    if (result) {
      setImages(result.data);
    }
  };
  useEffect(() => {
    getTopClubList();
    if (imgList.length > 0) {
      setLoading(true);
    }
  }, []);

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
    slidesToScroll: 3,
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
    <div className="mb-10">
      <div className="mx-auto text-[22px] border-4 w-[20rem] text-center">
        인기 동아리 리스트
      </div>
      <div className="flex justify-start w-[62rem] mx-auto ">
        <button onClick={handlePrevClick}>
          <AiFillCaretLeft />
        </button>

        <Slider className=" w-[62rem] mt-4" ref={sliderRef} {...settings}>
          {imgList?.map((item) => (
            <button key={item.U_IDX} onClick={() => showModal(item.C_IDX)}>
              <div className="w-[13rem] h-[14rem]">
                <Image
                  className="w-[14rem] h-[12rem] border-4 rounded-2xl"
                  src={`http://localhost:4000/api/image/background/${item?.C_IMAGE}`}
                  alt={`${item?.U_IDX}`}
                  width={50}
                  height={100}
                  unoptimized={true}
                />
              </div>
            </button>
          ))}
        </Slider>
        <button onClick={handleNextClick}>
          <AiFillCaretRight />
        </button>
      </div>
      {showComponent && modalIndex > 0 && <SliderModal data={modalIndex} />}
    </div>
  );
};

export default TopMeetingList;
