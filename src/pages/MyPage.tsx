import React from "react";
import Header from "@/components/EssentialComponent/Header";
import Profile from "@/components/MyPageComponent/Profile";

const MyPage = () => {
  return (
    <div className="w-screen h-screen bg-cover bg-gradient-to-r from-cyan-500 to-blue-500 ...">
      <div>
        <Header />
      </div>
      <div>
        <Profile />
      </div>
    </div>
  );
};

export default MyPage;
