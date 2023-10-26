import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { userInfo, myPageHostInfo, myPageClubInfo } from "@/Types";
import Image from "next/image";
import imageURL from "@/utils/imageUrl";
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
import Club from "@/components/mypage/Club";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQueries } from "react-query";

const Index = () => {
  const router = useRouter();
  const [userinfo, setUserInfo] = useState<userInfo | null>(null);
  const [imageUpdateState, setImageUpdateState] = useState(false);
  const dispatch = useAppDispatch();

  const queryResult = useQueries([
    {
      queryKey: ["getUser"],
      queryFn: () => {
        return axiosInstance
          .get("/mypage/user/information")
          .then((obj) => obj.data[0]);
      },
    },
    {
      queryKey: ["host"],
      queryFn: () => {
        return axiosInstance
          .get("/mypage/host/club/list")
          .then((obj) => obj.data);
      },
    },
    {
      queryKey: ["attend"],
      queryFn: () => {
        return axiosInstance
          .get("/mypage/participation/club/list")
          .then((obj) => obj.data);
      },
    },
  ]);

  const userData = queryResult[0] as { data: userInfo; isLoading: boolean };
  const hostList = queryResult[1] as {
    data: myPageHostInfo[];
    isLoading: boolean;
  };
  const attendList = queryResult[2] as {
    data: myPageClubInfo[];
    isLoading: boolean;
  };

  const [files, setFiles] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
  const getUserData = queryResult[0];

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
    <div className="flex h-10/12 w-9/12 m-auto">
      {/* 내 프로필 부분 */}
      {/* 960px 이상일 경우 */}
      {userData.isLoading ? (
        <div className="hidden md:block rounded-lg bg-[#131827] w-3/12">
          <p className="text-[#fb7185] text-center p-5 text-[24px]">
            My Profile
          </p>
          <p className="flex justify-center">
            <Skeleton width={125} height={120} circle={true} className="" />
          </p>
          <p className="flex flex-row-reverse my-2 mx-2">
            <Skeleton width={60} />
          </p>
          <p className="flex justify-center mt-4">
            <Skeleton width={140} height={25} count={4} className="my-2" />
          </p>
          <p className="flex flex-row-reverse my-2 mx-2">
            <Skeleton width={60} />
          </p>
        </div>
      ) : (
        <div className={` md:block hidden rounded-lg bg-[#131827] w-3/12`}>
          <h1 className="text-[#fb7185] text-center p-5 text-[24px]">
            My Profile
          </h1>
          <p className="mx-8">
            <Image
              className="border-4 border-current border-indigo-200 rounded-full"
              // src={`http://localhost:4000/api/image/${userinfo?.U_IMAGE}`}
              src={`${imageURL}/api/image/${userData?.data?.U_IMAGE}`}
              alt={`${userData?.data?.U_IMAGE}`}
              width={400}
              height={400}
            />
          </p>
          {imageUpdateState ? (
            <div className="absolute border-2 rounded-xl mt-14 ml-4 p-2 flex bg-white">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <input type="file" onChange={handleFileChange} />
                  <button
                    className="border-2 mx-auto w-[5rem]  rounded-xl bg-blue-500 text-white"
                    type="submit"
                    name="changeImgButton"
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          ) : null}
          <div className="flex flex-row-reverse mt-2">
            <button
              className="flex"
              onClick={handleUpdateBox}
              type="button"
              name="updateImgButton"
            >
              <p className="mt-2 text-[#62656B]">Update</p>
              <CiImageOn className="mr-2" color="#62656B" size={40} />
            </button>
          </div>

          <ul className="mt-2 flex flex-col">
            <li className="flex ml-6 my-3 text-[#AFB2B5] ">
              <BiUser size={24} />
              <span className="ml-2">{userData?.data?.U_NAME}</span>
            </li>
            <li className="flex ml-6 my-3 text-[#AFB2B5] ">
              <AiOutlineMail size={22} />
              <span className="ml-2">{userData?.data?.U_EMAIL}</span>
            </li>
            <li className="flex ml-6 my-3 text-[#AFB2B5] ">
              <FaBirthdayCake size={18} />
              <span className="ml-2">{`${moment(userData?.data?.U_BIRTH).format(
                "YYYY-MM-DD"
              )}`}</span>
            </li>
            <li className="flex ml-6 my-3 text-[#AFB2B5] ">
              <BiMaleFemale size={20} />
              <span className="ml-2">{userData?.data?.U_GENDER}</span>
            </li>
          </ul>
          <p className="text-[#fff] p-2 flex flex-row-reverse">
            <button
              type="button"
              onClick={withdrawalUser}
              name="withrwalButton"
            >
              탈퇴하기
            </button>
          </p>
        </div>
      )}

      {/* 960px 이하일 경우 */}
      <div className="block md:hidden">
        <button
          type="button"
          className="mr-2"
          onClick={handldeSideState}
          name="sideToggleButton"
        >
          <RxHamburgerMenu size={20} />
        </button>

        <div
          className={`${
            sideState ? "hidden" : "absolute"
          } border-2 rounded-lg bg-[#131827] p-2`}
        >
          <div className="text-[#fb7185] text-center p-5 text-[24px]">
            My Profile
          </div>
          <div className="mx-1 w-[14rem]">
            <Image
              className="border-4 border-current border-indigo-200 rounded-full"
              src={`http://localhost:4000/api/image/${userData?.data?.U_IMAGE}`}
              alt={`${userData?.data?.U_EMAIL}`}
              width={400}
              height={400}
              // unoptimized={true}
            />
          </div>
          <div className="mt-2 flex flex-col ">
            <div className="flex ml-6 my-3 text-[#AFB2B5] ">
              <BiUser size={24} />
              <p className="ml-2">{userData?.data?.U_NAME}</p>
            </div>
            <div className="flex ml-6 my-3 text-[#AFB2B5] ">
              <AiOutlineMail size={22} />
              <p className="ml-2">{userData?.data?.U_EMAIL}</p>
            </div>
            <div className="flex ml-6 my-3 text-[#AFB2B5] ">
              <FaBirthdayCake size={18} />
              <p className="ml-2">{`${moment(userData?.data?.U_BIRTH).format(
                "YYYY-MM-DD"
              )}`}</p>
            </div>
            <div className="flex ml-6 my-3 text-[#AFB2B5] ">
              <BiMaleFemale size={20} />
              <p className="ml-2">{userData?.data?.U_GENDER}</p>
            </div>
          </div>
        </div>
      </div>
      {/* 참여중 클럽 리스트 */}
      <div className="flex flex-wrap justify-center bg-[#F6F7F9] w-9/12">
        {/* <AttendClub />
          <HostClub /> */}
        <Club list={hostList.data} type={"host"} />
        <Club list={attendList.data} type={"attend"} />
      </div>
    </div>
  );
};

export default Index;
