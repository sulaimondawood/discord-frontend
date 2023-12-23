"use client";

import React, { useRef, useState } from "react";
import Avatar from "@/assets/images/avatar.jpg";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useModalState } from "@/app/context/StateContext";
import { axiosInstancePrivate } from "@/utils/axios";
import { useRouter } from "next/navigation";

const Message = ({ msg }: { msg: any }) => {
  const [setting, setSettings] = useState(true);
  const { latestInputRef, inputRef, setFocus, focus } = useModalState();
  const router = useRouter();
  async function handleDeleteMsg(id: number) {
    const res = await axiosInstancePrivate.delete("room/delete-edit-msg/" + id);
    router.refresh();
    console.log(res);
  }
  async function handleEditMsg(id: number) {
    // setFocus(true);
    inputRef.current.focus();
    const res = await axiosInstancePrivate.delete("room/delete-edit-msg/" + id);
    router.refresh();
    console.log(res);
  }

  return (
    <div
      className="hover:bg-room-black/50 backdrop-blur-md p-3 rounded-md flex justify-between items-center"
      ref={latestInputRef}
    >
      <div className="flex gap-3 items-start">
        <img className="w-10 h-10 rounded-full" src={Avatar.src} alt="" />
        <div className="">
          <p className="text-white-1 capitalize font-medium">
            {msg.user.display_name}
          </p>
          <p className="text-sm w-full max-w-lg text-white-3">{msg.message}</p>
        </div>
      </div>
      <button
        onClick={() => setSettings(!setting)}
        className="hover:text-white-1 text-white-4 text-2xl relative"
      >
        <HiOutlineDotsHorizontal />

        <div
          className={`${
            setting ? "opacity-0 hidden " : "opacity-100 flex"
          } p-3 transition-all duration-100 flex-col gap-2 items-start bg-faded-black rounded-md absolute -top-10  -left-32 text-xs`}
        >
          <button onClick={() => handleDeleteMsg(msg.id)}>
            Delete Message
          </button>
          <button onClick={() => handleEditMsg(msg.id)}>Edit Message</button>
        </div>
      </button>
    </div>
  );
};

export default Message;
