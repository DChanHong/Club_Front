import React, { useState, useEffect } from "react";

import { Loading } from "@/components/Skeltest/Loading";

const Skeleton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2초 로딩 시간 설정

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div>ddd</div>
    </>
  );
};

export default Skeleton;
