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

export default function App({ Component, pageProps }: AppProps) {
  // useState lazy init을 사용해  QueryClient 인스턴스를 생성해 QueryClientProvider의 client 값으로 전달해준다.
  const [queryClient] = useState(() => new QueryClient());

  // If loading a variable font, you don't need to specify the font weight
  const inter = Inter({ subsets: ["latin"] });
  return (
    <main className={inter.className}>
      <Provider store={store}>
        {/* persistGate 컴포넌트는 Redux store가 영구적으로 저장되고 애플리케이션이 새로고침될 떄를 대비해 사용한다.
          이 컴포넌트는 영구 저장소에서 데이터를 다시 가져온 후에 다른 컴포넌트를 렌더링하므로, 앱이 상태를 복원할 때까지 대기한다. 
          loading prop에는 렌더링 되기 전에 보여질 로딩 컴포넌트를 설정할 수 있으며, 여기서는 null로 설정되어 로딩 컴포넌트를 사용하지 않는다.
          persistor prop에는 앞서 생성한 persistor 객체를 전달한다.
           */}
        <PersistGate loading={null} persistor={persistor}>
          <Head>
            <title>Gathering Site</title>
          </Head>
          <div className=" max-w-[2520px] mx-auto">
            <Header />
          </div>

          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </main>
  );
}
