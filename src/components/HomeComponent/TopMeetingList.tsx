import { useRef } from "react";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import Image from "next/image";
import axiosInstance from "@/utils/axiosInstance";
import { slideInfo } from "@/Types";
import SliderModal from "@/components/modals/SliderModal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import useSliderModal from "../../../hooks/useSliderModal";
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

  //모달창 세팅
  const sliderModal = useSliderModal();

  return (
    <div className="mb-10">
      <div className="mx-auto text-[22px] border-4 w-[20rem] text-center">
        <button type="button" onClick={() => sliderModal.onOpen(1)}>
          인기 동아리 리스트
        </button>
      </div>
      <div className="flex justify-start w-[62rem] mx-auto ">
        <button onClick={handlePrevClick}>
          <AiFillCaretLeft />
        </button>

        <Slider className=" w-[62rem] mt-4" ref={sliderRef} {...settings}>
          {imgList?.map((item) => (
            <div key={item.U_IDX} className="w-[13rem] h-[14rem]">
              <Image
                className="w-[14rem] h-[12rem] border-4 rounded-2xl"
                src={`http://localhost:4000/api/image/background/${item?.C_IMAGE}`}
                alt={`${item?.U_IDX}`}
                width={50}
                height={100}
                unoptimized={true}
              />
            </div>
          ))}
        </Slider>
        <button onClick={handleNextClick}>
          <AiFillCaretRight />
        </button>
      </div>
    </div>
  );
};

export default TopMeetingList;
