import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { userInfo, myPageHostInfo, myPageClubInfo } from "@/Types";
import Image from "next/image";
import imageURL from "@/utils/imageUrl";
import { useRouter } from "next/router";
import { CiImageOn } from "react-icons/ci";
import moment from "moment";
import { REMOVE_IS_LOGIN } from "@/store/slice/isLoginSlice";
import { BiUser } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAppDispatch } from "@/store/hooks";
import Club from "@/components/mypage/Club";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQueries } from "react-query";

const Index = () => {
  const router = useRouter();
  const [imageUpdateState, setImageUpdateState] = useState<boolean>(false);
  const [sideState, setSideState] = useState<boolean>(true);
  const [files, setFiles] = useState<File | null>(null);
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
      setImageUpdateState(!imageUpdateState);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFiles(event.target.files[0]);
    }
  };

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

  const handleUpdateBox = () => {
    setImageUpdateState(!imageUpdateState);
  };

  const handldeSideState = () => {
    setSideState(!sideState);
  };

  return (
    <div className="flex w-full h-full justify-center">
      <section className="flex h-[80vh] border-2 max-w-6xl w-full sm:mx-4 mx-6">
        {userData.isLoading ? (
          <div className="hidden sm:block rounded-lg bg-[#131827] w-3/12">
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
          <div
            className={`sm:block sm:flex sm:flex-col sm:justify-between sm:rounded-lg hidden  h-full bg-[#131827] w-3/12`}
          >
            <div>
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
                        aria-label="Upload image"
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
                  onClick={() => setImageUpdateState(!imageUpdateState)}
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
                  <span className="ml-2">{`${moment(
                    userData?.data?.U_BIRTH
                  ).format("YYYY-MM-DD")}`}</span>
                </li>
                <li className="flex ml-6 my-3 text-[#AFB2B5] ">
                  <BiMaleFemale size={20} />
                  <span className="ml-2">{userData?.data?.U_GENDER}</span>
                </li>
              </ul>
            </div>
            <div className="h-1/12">
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
          </div>
        )}
        <div className="block sm:hidden bg-[#F6F7F9]">
          <button
            type="button"
            className="mr-2 p-2"
            onClick={handldeSideState}
            name="sideToggleButton"
          >
            <RxHamburgerMenu size={30} />
          </button>

          <div
            className={`${
              sideState ? "hidden" : "absolute"
            } border-2 rounded-lg bg-[#131827] p-2`}
          >
            <p className="text-[#fb7185] text-center p-5 text-[24px]">
              My Profile
            </p>
            <p className="mx-1 w-[14rem]">
              <Image
                className="border-4 border-current border-indigo-200 rounded-full"
                src={`http://localhost:4000/api/image/${userData?.data?.U_IMAGE}`}
                alt={`${userData?.data?.U_EMAIL}`}
                width={400}
                height={400}
              />
            </p>
            <p className="flex flex-row-reverse mt-2">
              <button
                className="flex"
                onClick={() => setImageUpdateState(!imageUpdateState)}
                type="button"
                name="updateImgButton"
              >
                <p className="mt-2 text-[#62656B]">Update</p>
                <CiImageOn className="mr-2" color="#62656B" size={40} />
              </button>
            </p>
            {imageUpdateState ? (
              <div className="absolute border-2 rounded-xl ml-4 p-2 flex bg-white">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <input type="file" onChange={handleFileChange} />
                    <button
                      className="border-2 mx-auto w-[5rem]  rounded-xl bg-blue-500 text-white"
                      type="submit"
                      name="changeImgButton"
                      aria-label="Upload image"
                    >
                      Upload
                    </button>
                  </div>
                </form>
              </div>
            ) : null}
            <ul className="mt-2 flex flex-col ">
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
                <span className="ml-2">{`${moment(
                  userData?.data?.U_BIRTH
                ).format("YYYY-MM-DD")}`}</span>
              </li>
              <li className="flex ml-6 my-3 text-[#AFB2B5] ">
                <BiMaleFemale size={20} />
                <span className="ml-2">{userData?.data?.U_GENDER}</span>
              </li>
              <li className="text-[#fff] p-2 flex flex-row-reverse">
                <button
                  type="button"
                  onClick={withdrawalUser}
                  name="withrwalButton"
                >
                  탈퇴하기
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="sm:flex sm:w-9/12 sm:flex-row flex flex-col bg-[#F6F7F9] overflow-auto w-full">
          <Club list={hostList.data} type={"host"} />
          <Club list={attendList.data} type={"attend"} />
        </div>
      </section>
    </div>
  );
};

export default Index;
