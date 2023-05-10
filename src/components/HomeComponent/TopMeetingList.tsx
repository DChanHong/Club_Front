import { useRef } from "react";
import Slider from "react-slick";
import { useEffect, useState } from "react";
import Image from "next/image";
import axiosInstance from "@/utils/axiosInstance";
import { slideInfo } from "@/Types";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";

const TopMeetingList = () => {
  const [imgList, setImages] = useState<slideInfo[]>([]);
  const [loading, setLoading] = useState(false);

  const getTopClubList = async () => {
    const result = await axiosInstance.get("customer/getTopClubList");
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

  return (
    <div className="mb-10">
      <div className="mx-auto text-[22px] border-4 w-[20rem] text-center">
        인기 동아리 리스트
      </div>

      <div className="flex justify-start w-[62rem] mx-auto ">
        <button onClick={handlePrevClick}>
          <AiFillCaretLeft />
        </button>
        <Slider className=" w-[62rem]" ref={sliderRef} {...settings}>
          {imgList?.map((item) => (
            <div key={item.U_IDX}>
              <Image
                className="border-4 border-current border-indigo-200 mx-7 mt-6 w-[12rem] "
                src={`http://localhost:4000/api/image/background/${item?.C_IMAGE}`}
                alt={`${item?.U_IDX}`}
                width={100}
                height={500}
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
