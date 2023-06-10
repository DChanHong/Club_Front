import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { GrFormClose } from "react-icons/gr";
import axiosInstance from "@/utils/axiosInstance";
import { tempClub } from "@/Types";
import Image from "next/image";
import { useRouter } from "next/router";
import { IoAddOutline, IoPeopleSharp } from "react-icons/io5";
const MakeClubModal = () => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const loginCheck = localStorage.getItem("login");

  const router = useRouter();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const showModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const [showTempClub, setTempClub] = useState<tempClub[]>([]);
  const [showTempClubState, setShowTempCLubState] = useState(false);
  // 소항목 바꿔주기용 useState
  const [detatilCategory, setDetailCategory] = useState([
    { value: "축구", name: "축구" },
    { value: "농구", name: "농구" },
    { value: "탁구", name: "탁구" },
    { value: "기타", name: "기타" },
  ]);

  //input 추출용 Ref
  const clubNameRef = useRef<HTMLInputElement>(null);

  const clubIntroRef = useRef<HTMLInputElement>(null);

  const RegionRef = useRef<HTMLInputElement>(null);

  //대항목 Ref select 용
  const selectCategoryRef = useRef<HTMLSelectElement>(null);
  //소항목 Ref select 용
  const selectDetailCategoryRef = useRef<HTMLSelectElement>(null);

  const getSelectCategory = () => {
    if (selectCategoryRef.current) {
      const selectValue = selectCategoryRef.current.value;

      const a = `${selectValue}` as keyof typeof array;
      const result = array[a];
      setDetailCategory(result);
    }
  };

  const array = {
    스포츠: [
      { value: "축구", name: "축구" },
      { value: "농구", name: "농구" },
      { value: "탁구", name: "탁구" },
      { value: "기타", name: "기타" },
    ],
    문화생활: [
      { value: "영화", name: "영화" },
      { value: "콘서트", name: "콘서트" },
      { value: "공연", name: "공연" },
      { value: "축제", name: "축제" },
      { value: "기타", name: "기타" },
    ],
    스터디: [
      { value: "부동산", name: "부동산" },
      { value: "주식", name: "주식" },
      { value: "영어", name: "영어" },
      { value: "코딩", name: "코딩" },
      { value: "기타", name: "기타" },
    ],
    게임: [
      { value: "LOL", name: "LOL" },
      { value: "피파", name: "피파" },
      { value: "메이플스토리", name: "메이플스토리" },
      { value: "서든어택", name: "서든어택" },
      { value: "기타", name: "기타" },
    ],
    etc: [{ value: "기타", name: "기타" }],
  };

  /*
  CREATE TABLE CLUB_TABLE(
	C_IDX 			INT 		PRIMARY KEY, XX
    U_IDX			INT 		NOT NULL, 토큰 통해서 
    C_CATEGORY		VARCHAR(27) NOT NULL, SELECT 
    C_CATE_DETAIL	VARCHAR(27) NOT NULL, SELECT 
    C_NAME			VARCHAR(18) NOT NULL,   입력텍스트
    C_INTRO			VARCHAR(60) NOT NULL,  입력
    C_AREA			VARCHAR(40) NOT NULL, 입력
);
*/

  const handleSubmit = async () => {
    if (
      clubNameRef.current?.value === "" ||
      clubIntroRef.current?.value === "" ||
      RegionRef.current?.value === ""
    ) {
      alert("내용을 다시 확인해주세요");
    } else {
      const axiosData = {
        C_CATEGORY: selectCategoryRef.current?.value,
        C_CATE_DETAIL: selectDetailCategoryRef.current?.value,
        C_NAME: clubNameRef.current?.value,
        C_INTRO: clubIntroRef.current?.value,
        C_AREA: RegionRef.current?.value,
      };
      //   console.log(axiosData);

      try {
        const result = await axiosInstance.post(
          "/homeAdd/insertNewClubInfo",
          axiosData
        );
        // console.log(result);
        const newAddClub = {
          C_IDX: Number(result.data.insertId),
          C_CATEGORY: selectCategoryRef.current?.value,
          C_CATE_DETAIL: selectDetailCategoryRef.current?.value,
          C_NAME: clubNameRef.current?.value,
          C_INTRO: clubIntroRef.current?.value,
          C_AREA: RegionRef.current?.value,
          C_IMAGE: "default_background.png",
        };

        // console.log(newAddClub);
        setTempClub((prevClub) => [...prevClub, newAddClub]);
        setShowTempCLubState(true);
        setModalIsOpen(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const clubRouterButton = (data: number) => {
    router.push({
      pathname: `/clubDetailPage/${data}`,
    });
  };

  return (
    <>
      <div className="">
        <Modal
          style={customStyles}
          isOpen={modalIsOpen}
          ariaHideApp={false}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <div className="flex flex-col">
            <div className="flex flex-row-reverse mb-2">
              <button type="button">
                <GrFormClose onClick={showModal} />
              </button>
            </div>
            <form>
              <div className="flex flex-start">
                <div className="w-[7rem] p-1 px-2 m-1 border-2  text-center rounded-xl">
                  동아리 이름
                </div>
                <input
                  className="p-1 m-1 border-2  rounded-xl w-9/12"
                  ref={clubNameRef}
                  type="text"
                  placeholder="동아리 이름을 입력해주세요"
                />
              </div>
              <div className="w-full flex flex-start">
                <div className="w-[7rem] p-1 px-2 m-1 border-2  text-center rounded-xl">
                  동아리 설명
                </div>
                <input
                  className="p-1 m-1 border-2  rounded-xl w-9/12"
                  type="text"
                  ref={clubIntroRef}
                  placeholder="동아리를 소개해주세요"
                />
              </div>
              <div className=" w-full flex flex-start">
                <div className="w-[7rem] p-1 px-2 m-1 border-2  text-center rounded-xl">
                  활동 지역
                </div>
                <input
                  ref={RegionRef}
                  className="p-1 m-1 border-2  rounded-xl w-9/12"
                  type="text"
                  placeholder=" ex) 부산 동구"
                />
              </div>
              <div className="flex ml-1 mt-2">
                <div className="border-2 rounded-xl p-1">
                  <select onChange={getSelectCategory} ref={selectCategoryRef}>
                    <option value="스포츠">스포츠</option>
                    <option value="문화생활">문화생활</option>
                    <option value="스터디">스터디</option>
                    <option value="게임">게임</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <select
                  className="mx-2 border-2 rounded-xl p-1"
                  ref={selectDetailCategoryRef}
                >
                  {detatilCategory.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center my-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white p-2 rounded-xl border-2 w-[22rem] "
                >
                  생성하기
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>

      {loginCheck === "true" ? (
        <div className="ml-6 flex">
          <p>
            <button
              className="bg-[#E00050] p-1 rounded-full text-white mt-1 mx-1 "
              onClick={showModal}
            >
              <IoAddOutline size={26} />
            </button>
          </p>
          <p className="text-[14px] text-[#BDC3CC] m-2 mt-3 ">
            나의 동아리를 만들어주세요
          </p>
        </div>
      ) : (
        <div></div>
      )}

      {showTempClubState ? (
        <div className="ml-6 mb-10 mt-2 pb-6 border-2 border-t-white border-x-white border-b-neutral-100">
          <div className="flex flex-start text-[22px] py-2 ml-4 ">
            <p className="">
              <IoPeopleSharp size={30} />
            </p>
            <p className="ml-4">My Club</p>
          </div>
          {showTempClub.map((item, index) => (
            <div
              key={index}
              className="
                    flex flex-start 
                    border-4  rounded-3xl mr-4
                    border-slate-200 my-2 w-[26rem]"
            >
              <div className="m-3 w-[8rem] ">
                <Image
                  className="w-[7rem] h-[6rem] border-2 rounded-xl"
                  src={`http://localhost:4000/api/image/background/${item?.C_IMAGE}`}
                  alt={`${index}`}
                  width={100}
                  height={100}
                  unoptimized={true}
                />
              </div>
              <div>
                <div className="mt-3 ">
                  <p className="text-[17px]">{item.C_NAME}</p>
                </div>
                <div>
                  <p className="text-[#946CEE] underline mb-1">
                    #{item.C_CATEGORY} #{item.C_CATE_DETAIL} #{item.C_AREA}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 text-[12px] mb-1">
                    {item.C_INTRO}
                  </p>
                </div>
                <div>
                  <button
                    className="mb-2"
                    type="button"
                    onClick={() => clubRouterButton(Number(item?.C_IDX))}
                  >
                    <p className="bg-[#946CEE] border-2 rounded-xl text-white p-1 text-[12px]">
                      입장하기
                    </p>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default MakeClubModal;
