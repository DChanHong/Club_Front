import React, { Suspense, useCallback, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axiosInstance from "@/utils/axiosInstance";
import { cateClubInfo } from "@/Types";

async function test() {
  try {
    const result = await axiosInstance.get(
      "/search-page/get/user/category/page/skeleton"
    );

    return result.data;
  } catch (error) {
    console.log(error);
  }
}

function UserList() {
  const [users, setUsers] = useState<cateClubInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAndSetUsers = useCallback(async () => {
    const usersData = await test();
    setUsers(usersData);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    fetchAndSetUsers();
  }, [fetchAndSetUsers]);

  if (!isLoading) return <Skeleton count={10} />; // Display skeleton UI while loading

  return (
    <ul>
      {users.map((user) => (
        <li key={user.C_IDX}>
          {isLoading ? user.C_NAME : <Skeleton count={1} />}
        </li>
      ))}
    </ul>
  );
}

const SkTetst = () => {
  return <UserList />;
};

export default SkTetst;
