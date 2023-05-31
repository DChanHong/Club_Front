import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import Header from "@/components/EssentialComponent/Header";
import Navbar from "@/components/EssentialComponent/Navbar";
import Head from "next/head";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Gathering Site</title>
      </Head>
      <div
        className="
        max-w-[2520px]
        mx-auto
        
      "
      >
        <Header />
      </div>
      {/* <div>
        <Navbar />
      </div> */}
      <Component {...pageProps} />
    </Provider>
  );
}
