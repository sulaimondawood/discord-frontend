"use client";
import React from "react";
import Image from "@/assets/images/avatar.jpg";
import { IoMdSettings } from "react-icons/io";

const SideBarProfileLink = () => {
  return (
    <div className="rounded-sm flex items-center justify-between bg-room-deep-black p-2 w-[250px] fixed left-[80px] bottom-0">
      <div className="flex items-center gap-4">
        <img className="w-10 h-10 rounded-full" src={Image.src} alt="" />
        <div className="">
          <p className="text-sm text-white-4">Dawood</p>
          <p className=" text-white-2 text-xs">cloud boy</p>
        </div>
      </div>
      <span className="text-white-2 text-2xl hover:bg-white/10 hover:backdrop-blur-sm p-1 rounded-md">
        <IoMdSettings />
      </span>
    </div>
  );
};

export default SideBarProfileLink;
