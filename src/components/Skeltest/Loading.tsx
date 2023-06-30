import React from "react";
import Skeleton from "react-loading-skeleton";

export const Loading: React.FC = () => {
  return (
    <div>
      {/* 제목 로딩 표시 */}
      <Skeleton height={30} width={300} />

      {/* 이미지 로딩 표시 */}
      <Skeleton height={200} width={200} />

      {/* 설명 로딩 표시 */}
      <Skeleton height={20} width={150} count={3} />
    </div>
  );
};
