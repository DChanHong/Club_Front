import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { userInfo } from "@/Types";
import Image from "next/image";
import MyAttendingClub from "./MyAttendingClub";
const Profile = () => {
  const [userinfo, setUserInfo] = useState<userInfo | null>(null);
  const [pageLoading, setPageLoading] = useState(false);

  const getUserInfo = async () => {
    const userInfo = await axiosInstance.get("/customer/getuserInfo");
    console.log(userInfo);
    setUserInfo(userInfo.data[0]);
    setPageLoading(true);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFiles(event.target.files[0]);
    }
  };

  return (
    <>
      {!pageLoading ? (
        <div>...loading</div>
      ) : (
        <div>
          <div className="flex justify-start shadow-lg shadow-blue-700 mt-4 mb-4  w-8/12 h-48 m-auto rounded-lg relative bg-blue-300">
            <div className="w-[18rem]"></div>
            <div className=" shadow-lg shadow-blue-700 w-[15rem] h-[30rem]  m-auto rounded-lg absolute top-10 left-4  bg-blue-100">
              <div className="h-3/6">
                <div>
                  <Image
                    className="border-4 border-current border-indigo-200 rounded-full mx-7 mt-6 w-[12rem] "
                    src={`http://localhost:4000/api/image/${userinfo?.U_IMAGE}`}
                    alt={`${userinfo?.U_EMAIL}`}
                    width={400}
                    height={400}
                    unoptimized={true}
                  />

                  <form onSubmit={handleSubmit}>
                    <input
                      className="mx-4"
                      type="file"
                      onChange={handleFileChange}
                    />
                    <button className="ml-4" type="submit">
                      Upload
                    </button>
                  </form>
                </div>
              </div>
              <div className="mt-10">
                <div> 이메일 : {userinfo?.U_EMAIL}</div>
                <div> 이름 : {userinfo?.U_NAME}</div>
                <div> 성별 : {userinfo?.U_GENDER}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-start   shadow-lg shadow-blue-700  w-8/12 h-[27rem] m-auto rounded-lg bg-sky-300">
            <div className=" w-[18rem]"></div>
            <div className="w-[15rem]">
              <MyAttendingClub />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
