import { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signFormData, signDto } from "@/Types";
import { useRouter } from "next/router";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation } from "react-query";

const Sign = () => {
  const router = useRouter();
  const sign = async (signData: signDto) => {
    const result = await axiosInstance.post(`/customer/check-id`, signData);
    return result.data;
  };
  const validateEmail = async (email: { email: string }) => {
    const isValid = await axiosInstance.post(`/customer/check-id`, email);
    return isValid;
  };
  const signMutation = useMutation(sign);
  const validateMutation = useMutation(validateEmail);

  const validateID = async (email: string) => {
    if (!email) {
      return "ID is required";
    }
    const data = {
      email: email,
    };
    try {
      if (data.email.length < 1) throw Error("email이 입력되지 않았습니다.");
      const result = await validateMutation.mutateAsync(data);
      if (!result?.data?.data) {
        return "중복된 아이디 입니다.";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<signFormData>({ mode: "onBlur" });
  const passwordRef = useRef<String | null>(null);
  passwordRef.current = watch("password");

  const onSubmit: SubmitHandler<signFormData> = async (data) => {
    const signData: signDto = {
      email: data.email,
      password: data.password,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
    };

    const result = await signMutation
      .mutateAsync(signData)
      .then((res) => {
        router.push("/");
        alert("회원가입이 완료되었습니다.");
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="sm:w-[30rem] w-11/12 h-full m-auto border-2 rounded-2xl ">
      <h1 className="text-center font-bold my-2 text-2xl"> Sign </h1>
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-11/12 mb-3">
          <p className="mb-1 font-bold">아이디(e-mail)</p>
          <input
            className="border-2 w-full py-3 rounded-2xl px-3 text-lg"
            type="text"
            {...register("email", {
              validate: validateID,
              required: "email를 입력해주세요",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "email 형식으로 입력해주세요",
              },
            })}
          />
          {errors?.email && (
            <p className="ml-2 text-rose-500 text-sm">
              {errors?.email?.message}
            </p>
          )}
        </div>
        <div className="w-11/12 mb-3">
          <p className="font-bold">비밀번호</p>
          <input
            {...register("password", {
              required: "비밀번호를 입력해주세요",
            })}
            className="border-2 w-full py-3 rounded-2xl px-3 text-lg"
            type="password"
          />
          {errors?.password && (
            <p className="ml-2 text-rose-500 text-sm">
              {errors?.password?.message}
            </p>
          )}
        </div>
        <div className="w-11/12 mb-3">
          <p className="font-bold">비밀번호 확인</p>
          <input
            {...register("confirmPassword", {
              required: "비밀번호를 입력해주세요",
              validate: (value) => value === passwordRef.current,
            })}
            className="border-2 w-full py-3 rounded-2xl px-3 text-lg"
            type="password"
          />
          {errors?.confirmPassword && (
            <p className="ml-2 text-rose-500 text-sm">
              {errors?.confirmPassword?.message}
            </p>
          )}
        </div>
        <div className="w-11/12 mb-3">
          <p className="font-bold">이름</p>
          <input
            {...register("name", { required: "이름을 작성하세요" })}
            className="border-2 w-full py-3 rounded-2xl px-3 text-lg"
            type="text"
          />
          {errors?.name && (
            <p className="ml-2 text-rose-500 text-sm">
              {errors?.name?.message}{" "}
            </p>
          )}
        </div>
        <div className="w-11/12 mb-3">
          <p className="font-bold">성별</p>
          <select
            {...register("gender", { required: true })}
            className="border-2 w-full py-3 rounded-2xl px-3 text-lg"
          >
            <option value="mail">남자</option>
            <option value="femail">여자</option>
          </select>
        </div>
        <div className="w-11/12 mb-3">
          <p className="font-bold">생년월일</p>
          <input
            {...register("birth", {
              required: "생년월일을 입력해주세요",
              pattern:
                /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
            })}
            className="border-2 w-full py-3 rounded-2xl px-3 text-lg"
            type="text"
            placeholder="ex) 1999-12-12 "
          />
          {errors?.name && (
            <p className="ml-2 text-rose-500 text-sm">
              {errors?.birth?.message}{" "}
            </p>
          )}
        </div>
        <div className="w-11/12 mb-3">
          <button
            type="submit"
            className="mt-6 bg-blue-600 font-bold text-white rounded-3xl w-full py-3 px-3 text-xl"
            name="signButton"
          >
            가입하기
          </button>
        </div>
      </form>
    </section>
  );
};

export default Sign;
