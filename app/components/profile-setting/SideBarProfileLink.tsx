"use client";
import React from "react";
import Image from "@/assets/images/avatar.jpg";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";

const SideBarProfileLink = ({ user }: { user: any }) => {
  return (
    <div className="rounded-sm flex items-center justify-between bg-room-deep-black p-2 w-[calc(100vw-76px)] sm:w-[calc(100vw-196px)] md:w-[250px] fixed left-14 md:left-[80px] bottom-0">
      {/* <div className="rounded-sm flex items-center justify-between bg-room-deep-black p-2 w-[250px] fixed left-14 md:left-[80px] bottom-0"> */}
      <div className="flex items-center gap-4">
        <img
          className="w-9 h-9 rounded-full object-cover"
          src={user.avatar}
          alt=""
        />
        <div className="">
          <p className="text-sm text-white-4">{user.username}</p>
          <p className=" text-white-2 text-xs">{user.display_name}</p>
        </div>
      </div>
      <Link
        href={`/account/${user.id}`}
        className="text-white-2 text-2xl hover:bg-white/10 hover:backdrop-blur-sm p-1 rounded-md"
      >
        <IoMdSettings />
      </Link>
    </div>
  );
};

export default SideBarProfileLink;
