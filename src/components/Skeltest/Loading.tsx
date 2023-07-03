import React, { Suspense, useCallback, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axiosInstance from "@/utils/axiosInstance";
import { cateClubInfo } from "@/Types";

export const Loading = () => {
  const [users, setUsers] = useState<cateClubInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const test = async () => {
    const result = await axiosInstance.get(
      "/search-page/get/user/category/page/skeleton"
    );
    setUsers(result.data);
  };

  useEffect(() => {
    test();
  }, []);

  useEffect(() => {
    // setIsLoading(true);
  }, [users]);

  return (
    <>
      <div>
        {!isLoading ? (
          <>
            <div className="flex border-4 rounded-xl w-[26rem] ">
              <div className="flex">
                <div className="m-3 w-[8rem] ">
                  <Skeleton count={1} className=" h-[6rem]" />
                </div>
                <div className="mt-2">
                  <Skeleton count={1} width={200} className="mt-3" />

                  <Skeleton count={1} width={200} />

                  <Skeleton count={1} width={200} className="mt-2" />
                  <Skeleton count={1} width={80} className="mt-2" />
                </div>
              </div>
            </div>
            <div>
              <Skeleton height={200} width={250} />
              <Skeleton height={200} width={250} />
            </div>
          </>
        ) : (
          users.map((item, i) => <div key={i}>{item.C_NAME}</div>)
        )}
      </div>
    </>
  );
};
