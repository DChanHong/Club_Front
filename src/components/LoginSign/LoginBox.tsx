import Link from "next/link";
import axiosInstance from "@/utils/axiosInstance";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { loginFormData } from "@/Types";
import { useRouter } from "next/router";
import { SET_IS_LOGIN } from "@/store/slice/isLoginSlice";
import { useAppDispatch } from "@/store/hooks";
import { SiNaver } from "react-icons/si";
import { useEffect } from "react";

const LoginBox = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<loginFormData>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<loginFormData> = async (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };

    const loginValid = await axiosInstance.post(`/customer/login`, loginData, {
      withCredentials: true,
    });
    try {
      // console.log(loginValid);
      if (!loginValid.data.data) {
        dispatch(SET_IS_LOGIN(loginValid.data.login));
        localStorage.setItem("login", `${loginValid.data.login}`);

        router.push("/");
      } else {
        alert(`${loginValid.data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // NAVER Oauth 구현

  const CLIENT_ID = "VDL7dKDgnrOYEJFkIly6";
  const CALLBACK_URL = "https://api.chanhong.site/naver/callback/oauth";

  const goNaverLogin = () => {
    window.location.href =
      "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
      CLIENT_ID +
      "&redirect_uri=" +
      CALLBACK_URL +
      "&state=" +
      "asd2222222";
  };
  useEffect(() => {
    console.log(router.query);
    const login = router.query;
    if (login.login === "true") {
      dispatch(SET_IS_LOGIN(true));
      localStorage.setItem("login", "true");
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex justify-start">
      <div className="flex flex-col border-2 w-[20rem] rounded-2xl p-8 mx-auto mt-10">
        <div className="text-center my-3 text-2xl ">Login </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center p-2">
            <input
              {...register("email", {
                required: "email을 입력해주세요",
              })}
              className="border-2 w-60 py-3 rounded-2xl px-3 text-lg"
              type="text"
              placeholder="아이디를 입력해주세요"
            />
          </div>
          {errors?.email && (
            <div className="ml-14 mb-2 text-rose-500 text-sm">
              {errors?.email?.message}
            </div>
          )}
          <div className="flex justify-center ">
            <input
              {...register("password", {
                required: "비밀먼호를 입력해주세요",
              })}
              className="border-2 w-60 py-3 rounded-2xl px-3 text-lg"
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
          </div>
          {errors?.password && (
            <div className="ml-14 mb-0 text-rose-500 text-sm">
              {errors?.password?.message}
            </div>
          )}
          <div className="flex justify-center">
            <button className="my-2 bg-blue-600 rounded-2xl w-60 py-3 px-3 text-lg text-white">
              로그인
            </button>
          </div>
        </form>
        <div className="flex flex-row-reverse m-4 w-60">
          <Link href="/UserSign">
            <button>회원가입</button>
          </Link>
        </div>
        <div className=" flex justify-center ">
          <button
            name="googleSignBtn"
            className="flex justify-center  p-2 mt-2 bg-blue-600 rounded-2xl w-80 py-3 px-3 text-lg bg-[#23B814]"
            onClick={() => goNaverLogin()}
          >
            <p className="mt-1 mr-4">
              <SiNaver color="white" />
            </p>
            <p className="text-white">Sign in with Naver</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
