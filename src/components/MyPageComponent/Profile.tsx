import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { userInfo } from "@/Types";
import Image from "next/image";
import MyAttendingClub from "./MyAttendingClub";
import MyPageHostList from "./MyPageHostList";
import { useRouter } from "next/router";
import { CiImageOn } from "react-icons/ci";
import moment from "moment";
import { REMOVE_IS_LOGIN, SET_IS_LOGIN } from "@/store/slice/isLoginSlice";
import { BiUser } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
const Profile = () => {
  const router = useRouter();
  const [userinfo, setUserInfo] = useState<userInfo | null>(null);
  const [imageUpdateState, setImageUpdateState] = useState(false);
  const getUserInfo = async () => {
    const userInfo = await axiosInstance.get("/mypage/user/information");
    setUserInfo(userInfo.data[0]);
    // console.log(userInfo);
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    getUserInfo();
  }, []);
  // U_EMAIL,U_NAME,U_GENDER,U_BIRTH
  //이미지 추가
  const [files, setFiles] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    if (files) {
      formData.append("file", files);
    }
    try {
      const response = await axiosInstance.post("/customer/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      getUserInfo();
      handleUpdateBox();
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFiles(event.target.files[0]);
    }
  };

  //회원 탈퇴하기
  const withdrawalUser = async () => {
    try {
      const result = await axiosInstance.put("/mypage/user/withdrawal");
      router.push({
        pathname: `/`,
      });
      dispatch(REMOVE_IS_LOGIN(false));
      localStorage.setItem("login", "false");
    } catch (error) {
      console.log(error);
    }
  };

  //업데이트 박스 보여주기
  const handleUpdateBox = () => {
    setImageUpdateState(!imageUpdateState);
  };

  //사이드 부분 프로필
  const [sideState, setSideState] = useState(true);
  const handldeSideState = () => {
    setSideState(!sideState);
  };

  return (
    <div className="w-full flex justify-center ">
      <div className="flex  w-7/12 ">
        {/* 내 프로필 부분 */}
        {/* 960px 이상일 경우 */}
        <div className="hidden md:block rounded-lg bg-[#131827] w-3/12">
          <div className="text-[#fb7185] text-center p-5 text-[24px]">
            My Profile
          </div>
          <div className="mx-6">
            <Image
              className="border-4 border-current border-indigo-200 rounded-full"
              src={`http://localhost:4000/api/image/${userinfo?.U_IMAGE}`}
              alt={`${userinfo?.U_EMAIL}`}
              width={400}
              height={400}
              unoptimized={true}
            />
          </div>
          <div>
            {imageUpdateState ? (
              <div className="absolute border-2 rounded-xl mt-14 ml-4 p-2 flex bg-white">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <input
                      className=""
                      type="file"
                      onChange={handleFileChange}
                    />
                    <button
                      className="border-2 mx-auto w-[5rem]  rounded-xl bg-blue-500 text-white"
                      type="submit"
                    >
                      Upload
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-row-reverse mt-2">
            <button className="flex" onClick={handleUpdateBox}>
              <p className="mt-2 text-[#62656B]">Update</p>
              <CiImageOn className="mr-2" color="#62656B" size={40} />
            </button>
          </div>

          <div className="mt-2 flex flex-col">
            <div className="flex ml-6 my-3 text-[#AFB2B5] ">
              <BiUser size={24} />
              <p className="ml-2">{userinfo?.U_NAME}</p>
            </div>
            <div className="flex ml-6 my-3 text-[#AFB2B5] ">
              <AiOutlineMail size={22} />
              <p className="ml-2">{userinfo?.U_EMAIL}</p>
            </div>
            <div className="flex ml-6 my-3 text-[#AFB2B5] ">
              <FaBirthdayCake size={18} />
              <p className="ml-2">{`${moment(userinfo?.U_BIRTH).format(
                "YYYY-MM-DD"
              )}`}</p>
            </div>
            <div className="flex ml-6 my-3 text-[#AFB2B5] ">
              <BiMaleFemale size={20} />
              <p className="ml-2">{userinfo?.U_GENDER}</p>
            </div>
          </div>
          <div className="text-[#3E4249] flex flex-row-reverse">
            <div className="mr-4 mb-2">
              <button type="button" onClick={withdrawalUser}>
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
        {/* 960px 이하일 경우 */}
        <div className="block md:hidden">
          <button type="button" className="mr-2" onClick={handldeSideState}>
            <RxHamburgerMenu size={20} />
          </button>
          {sideState ? (
            <></>
          ) : (
            <div className="absolute border-2 rounded-lg bg-[#131827] p-2">
              <div className="text-[#fb7185] text-center p-5 text-[24px]">
                My Profile
              </div>
              <div className="mx-1 w-[14rem]">
                <Image
                  className="border-4 border-current border-indigo-200 rounded-full"
                  src={`http://localhost:4000/api/image/${userinfo?.U_IMAGE}`}
                  alt={`${userinfo?.U_EMAIL}`}
                  width={400}
                  height={400}
                  unoptimized={true}
                />
              </div>
              <div className="mt-2 flex flex-col ">
                <div className="flex ml-6 my-3 text-[#AFB2B5] ">
                  <BiUser size={24} />
                  <p className="ml-2">{userinfo?.U_NAME}</p>
                </div>
                <div className="flex ml-6 my-3 text-[#AFB2B5] ">
                  <AiOutlineMail size={22} />
                  <p className="ml-2">{userinfo?.U_EMAIL}</p>
                </div>
                <div className="flex ml-6 my-3 text-[#AFB2B5] ">
                  <FaBirthdayCake size={18} />
                  <p className="ml-2">{`${moment(userinfo?.U_BIRTH).format(
                    "YYYY-MM-DD"
                  )}`}</p>
                </div>
                <div className="flex ml-6 my-3 text-[#AFB2B5] ">
                  <BiMaleFemale size={20} />
                  <p className="ml-2">{userinfo?.U_GENDER}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* 참여중 클럽 리스트 */}
        <div className="flex flex-wrap gap-10 justify-center bg-[#F6F7F9] w-9/12">
          <div className="">
            <MyAttendingClub />
          </div>
          <div className="">
            <MyPageHostList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
