import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { store, persistor } from "@/store/store";
import { Provider } from "react-redux";
import Header from "@/components/EssentialComponent/Header";
import Head from "next/head";
import React from "react";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { PersistGate } from "redux-persist/integration/react";
import TestProvider from "./provider/TestProvider";

export default function App({ Component, pageProps }: AppProps) {
  // useState lazy init을 사용해  QueryClient 인스턴스를 생성해 QueryClientProvider의 client 값으로 전달해준다.
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>Gathering Site</title>
        </Head>
        <div className=" max-w-[2520px] mx-auto">
          <Header />
        </div>
        <QueryClientProvider client={queryClient}>
          <TestProvider>
            <Component {...pageProps} />
          </TestProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
