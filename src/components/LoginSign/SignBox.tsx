import { useForm, SubmitHandler } from "react-hook-form";
import { useRef } from "react";
import Header from "../EssentialComponent/Header";
import { signFormData } from "@/Types";
import { useRouter } from "next/router";
import axiosInstance from "@/utils/axiosInstance";

const SignBox = () => {
  const router = useRouter();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit, // 이걸 사용하면 새로고침이 일어나지
  } = useForm<signFormData>({ mode: "onBlur" });

  const passwordRef = useRef<String | null>(null);
  passwordRef.current = watch("password");

  const validateID = async (email: string) => {
    if (!email) {
      return "ID is required";
    }
    const data = {
      email: email,
    };
    const isvalid = await axiosInstance.post(`/customer/checkID`, data);
    if (!isvalid.data.data) {
      return "중복된 아이디 입니다.";
    }
  };

  const onSubmit: SubmitHandler<signFormData> = async (data) => {
    const signData = {
      email: data.email,
      password: data.password,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
    };
    await axiosInstance
      .post(`/customer`, signData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    //페이지 이동
    router.push("/");
    alert("회원가입이 완료되었습니다.");
  };

  return (
    <div>
      <div className="flex flex-wrap ">
        <div className="flex  flex-col w-[26rem] h-[52rem] mx-auto border-2 place-items-center rounded-2xl p-8 mx-40 mt-10 mb-60 ">
          <div className="text-center my-1 text-2xl w-80"> Sign </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-col ">
              <div className="ml-2 mb-1 font-bold ">아이디(e-mail)</div>
              <div>
                <input
                  className="border-2 w-80 py-3 rounded-2xl px-3 text-lg"
                  type="text"
                  {...register("email", {
                    validate: validateID,
                    required: "id를 입력해주세요",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      // value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
                      message: "email 형식으로 입력해주세요",
                    },
                  })}
                />
                {errors?.email && (
                  <div className="ml-2 text-rose-500 text-sm">
                    {errors?.email?.message}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-col ">
              <div className="ml-2 mb-1 mt-2 font-bold ">비밀번호</div>
              <div>
                <input
                  {...register("password", {
                    required: "비밀번호를 입력해주세요",
                    // maxLength:15
                  })}
                  className="border-2 w-80 py-3 rounded-2xl px-3 text-lg"
                  type="password"
                />
                {errors?.password && (
                  <div className="ml-2 text-rose-500 text-sm">
                    {errors?.password?.message}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-col ">
              <div className="ml-2 mb-1 mt-2 font-bold ">비밀번호 확인</div>
              <div>
                <input
                  {...register("confirmPassword", {
                    required: "비밀번호를 입력해주세요",
                    validate: (value) => value === passwordRef.current,
                  })}
                  className="border-2 w-80 py-3 rounded-2xl px-3 text-lg"
                  type="password"
                />
                {errors?.confirmPassword && (
                  <div className="ml-2 text-rose-500 text-sm">
                    {errors?.confirmPassword?.message}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-col ">
              <div className="ml-2 mb-1 mt-2 font-bold ">이름</div>
              <div>
                <input
                  {...register("name", { required: "이름을 작성하세요" })}
                  className="border-2 w-80 py-3 rounded-2xl px-3 text-lg"
                  type="text"
                />
              </div>
              {errors?.name && (
                <div className="ml-2 text-rose-500 text-sm">
                  {errors?.name?.message}{" "}
                </div>
              )}
            </div>
            <div className="flex-col ">
              <div className="ml-2 mb-1 mt-2 font-bold ">성별</div>
              <select
                {...register("gender", { required: true })}
                className="border-2 w-80 py-3 rounded-2xl px-3 text-lg"
              >
                <option value="mail">남자</option>
                <option value="femail">여자</option>
              </select>
            </div>
            <div className="flex-col ">
              <div className="ml-2 mb-1 mt-2 font-bold ">생년월일</div>
              <div>
                <input
                  {...register("birth", {
                    required: "생년월일을 입력해주세요",
                    pattern:
                      /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
                  })}
                  className="border-2 w-80 py-3 rounded-2xl px-3 text-lg"
                  type="text"
                  placeholder="ex) 1999-12-12 "
                />
              </div>
              {errors?.name && (
                <div className="ml-2 text-rose-500 text-sm">
                  {errors?.birth?.message}{" "}
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="my-2 mt-6 bg-blue-600 rounded-2xl w-80 py-3 px-3 text-lg"
              >
                가입하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignBox;
