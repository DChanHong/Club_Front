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
