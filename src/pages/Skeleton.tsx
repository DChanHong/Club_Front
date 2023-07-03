import React, { useState, useEffect } from "react";
import SkTetst from "@/components/Skeltest/SkTetst";
import { Loading } from "@/components/Skeltest/Loading";
const Skeleton: React.FC = () => {
  return (
    <>
      {/* <SkTetst /> */}
      <Loading />
    </>
  );
};

export default Skeleton;
