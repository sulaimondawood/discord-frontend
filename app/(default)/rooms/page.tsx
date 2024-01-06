"use client";
import React from "react";
import Image from "@/assets/images/room-page.webp";
import Toast from "@/app/components/toast/Toast";

const Room = () => {
  return (
    <>
      <div className="bg-gray-ish h-screen ml-[330px] w-[calc(100vw-330px)]">
        <img
          className="hidden md:block mx-auto pt-14 xl:w-[600px] w-[500px]"
          src={Image.src}
          alt=""
        />
      </div>
      <Toast />
    </>
  );
};

export default Room;
