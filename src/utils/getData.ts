import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { slideInfo } from "@/Types";

export const GetData = () => {
  const [slideInfos, setSlideInfos] = useState<slideInfo[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axiosInstance.get("/home/club/top/list");
        setSlideInfos(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return { slideInfo: slideInfos };
};

// import React, {useEffect} from 'react';
// import {useSession} from 'next-auth/react';
// import {useRouter} from 'next/router';

// export interface SessionCheckProviderProps {
// 	children?: React.ReactNode;
// }

// export const SessionCheckProvider: React.FC<SessionCheckProviderProps> = ({children}) => {

// 	const { data: session, status } = useSession()
// 	const router = useRouter()

// 	//로그인 처리 필요 페이지 : 상담사례 , 유튜브 , 해결하례, 법률정보

// 	useEffect(() => {
// 		const mappingList= ['/inquire','/law-info','/success' ,'/youtube']
// 		const isPathIncluded = mappingList.some(path => router.pathname.includes(path));
// 		// router.pathname.includes('/integrate')
// 		if(status === "unauthenticated" && isPathIncluded){
// 			router.push("/auth/signin")
// 		}

// 	}, [status ,router.pathname]);

// 	return <>{children}</>;
// };
