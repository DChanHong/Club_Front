import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import Header from "@/components/EssentialComponent/Header";
import Head from "next/head";
import React from "react";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function App({ Component, pageProps }: AppProps) {
  // useState lazy init을 사용해  QueryClient 인스턴스를 생성해 QueryClientProvider의 client 값으로 전달해준다.
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <Head>
        <title>Gathering Site</title>
      </Head>
      <div className=" max-w-[2520px] mx-auto">
        <Header />
      </div>
      {/* QeuryClientProviderㄹ 인해 모든 페이지, 컴포넌트에서 queryClient에 접근이 가능해진다. */}
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        {/* devTool을 설치한다. 화면 좌흑하단의 로고를 누르면 개발툴을 열어볼 수 있다. */}
        {/* 개발환경에서만 활성화되기 때문에 따로 신경 쓸 필요는 없다. */}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </Provider>
  );
}
