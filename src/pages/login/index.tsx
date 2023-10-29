import Link from "next/link";
import axiosInstance from "@/utils/axiosInstance";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { loginFormData, loginDto } from "@/Types";
import { useRouter } from "next/router";
import { SET_IS_LOGIN } from "@/store/slice/isLoginSlice";
import { useAppDispatch } from "@/store/hooks";
import { SiNaver } from "react-icons/si";
import { useEffect } from "react";
import { useMutation } from "react-query";

const Index = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const login = (loginData: loginDto) =>
    axiosInstance.post(`/customer/login`, loginData, {
      withCredentials: true,
    });
  const loginMutation = useMutation(login);

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

    try {
      if (
        loginData.email === null ||
        undefined ||
        loginData.password === null ||
        undefined
      ) {
        throw Error("email 및 password가 제대로 입력되지 않았습니다.");
      }

      const loginValid = await loginMutation.mutateAsync(loginData);
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
    const login = router.query;
    if (login.login === "true") {
      dispatch(SET_IS_LOGIN(true));
      localStorage.setItem("login", "true");
      router.push("/");
    }
  }, [router.pathname]);

  return (
    <>
      <section className="sm:w-[30rem] w-11/12 border-2 rounded-2xl p-8 m-auto mt-10">
        <h1 className="text-center my-3 font-bold text-2xl ">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ul>
            <li className="mb-2">
              <input
                {...register("email", {
                  required: "email을 입력해주세요",
                })}
                className="border-2 w-full p-3 rounded-2xl  text-lg"
                type="text"
                placeholder="아이디를 입력해주세요"
              />
            </li>
            {errors?.email && (
              <li className="w-full ml-4 mb-2 text-rose-500 text-sm">
                {errors?.email?.message}
              </li>
            )}
            <li className="mb-2">
              <input
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                })}
                className="border-2 w-full p-3 rounded-2xl  text-lg"
                type="password"
                placeholder="비밀번호를 입력해주세요"
              />
            </li>
            {errors?.password && (
              <li className="ml-4 text-rose-500 text-sm">
                {errors?.password?.message}
              </li>
            )}
            <li className="mb-2">
              <button
                className="my-2 bg-blue-600 rounded-2xl w-full p-3 text-lg text-white"
                type="submit"
              >
                로그인
              </button>
            </li>
          </ul>
        </form>
        <div className="flex flex-row-reverse m-4 font-semibold">
          <Link href="/UserSign">회원가입</Link>
        </div>
        <div className="rounded-2xl flex justify-center bg-[#23B814]">
          <button
            name="googleSignBtn"
            className="flex p-3"
            onClick={() => goNaverLogin()}
          >
            <SiNaver color="white" className="mt-1 mr-1" />
            <span className="text-white">Sign in with Naver</span>
          </button>
        </div>
      </section>
    </>
  );
};

export default Index;
