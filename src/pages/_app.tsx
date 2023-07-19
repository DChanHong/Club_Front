import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { store, persistor } from "@/store/store";
import { Provider } from "react-redux";
import Header from "@/components/EssentialComponent/Header";
import Head from "next/head";
import React from "react";
import { Inter } from "next/font/google";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  // useState lazy init을 사용해  QueryClient 인스턴스를 생성해 QueryClientProvider의 client 값으로 전달해준다.
  const [queryClient] = useState(() => new QueryClient());

  // If loading a variable font, you don't need to specify the font weight

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>Gathering Site</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />

          {/* <script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            defer
          ></script> */}
        </Head>
        <div className=" max-w-[2520px] mx-auto">
          <Header />
        </div>

        <QueryClientProvider client={queryClient}>
          {/* <SessionProvider session={pageProps.session}> */}
          <Component {...pageProps} />
          {/* </SessionProvider> */}
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
