"use client";

import React, { useRef, useState } from "react";
import Avatar from "@/assets/images/avatar.jpg";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useModalState } from "@/app/context/StateContext";
import { axiosInstancePrivate } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { colors, getRandom } from "@/utils/themes/colors/color";
import moment from "moment";
import { formatRelative } from "date-fns";
import { Locale } from "date-fns";

const Message = ({ msg }: { msg: any }) => {
  console.log(msg);
  const [setting, setSettings] = useState(true);
  const { latestInputRef, inputRef, setFocus, focus } = useModalState();
  const { setParticipants, setRoomInfo } = useModalState();
  const router = useRouter();
  async function handleDeleteMsg(id: number) {
    const res = await axiosInstancePrivate.delete("room/delete-edit-msg/" + id);
    router.refresh();
    console.log(res);
  }
  async function handleEditMsg(id: number) {
    inputRef.current.focus();
    const res = await axiosInstancePrivate.delete("room/delete-edit-msg/" + id);
    router.refresh();
    console.log(res);
  }

  const date = new Date(msg.updated);
  const relativeDate = formatRelative(date, new Date(), {});

  return (
    <div
      onClick={() => setSettings(!setting)}
      className={` hover:bg-room-black/50 backdrop-blur-md p-3 rounded-sm flex justify-between items-center`}
      ref={latestInputRef}
    >
      <div className="flex gap-3 items-start">
        <img
          className="w-10 h-10 rounded-full"
          src={"http://localhost:8000" + msg?.user?.avatar}
          alt=""
        />
        <div className="flex flex-col gap-3">
          <div className=" flex gap-2 items-center">
            <p className="text-white-1 capitalize font-medium">
              {msg.user.display_name}
            </p>
            <p
              className="
            text-xs text-white-4
            "
            >
              {relativeDate}
            </p>
          </div>
          <p
            style={{ borderLeftColor: getRandom() }}
            className="border-left pl-3 border-l-[3px] rounded-[4px] text-sm w-full max-w-lg text-white-3"
          >
            {msg.message}
          </p>
        </div>
      </div>
      <button
        onClick={() => setSettings(!setting)}
        className="hover:text-white-1 text-white-4 text-2xl relative"
      >
        <HiOutlineDotsHorizontal />
        {/* <p className="text-sm">{formattedTime}</p> */}

        <div
          className={`${
            setting ? "opacity-0 hidden " : "opacity-100 flex"
          } p-3 transition-all duration-100 flex-col text-white-1  gap-2 items-start bg-faded-black rounded-md absolute -top-10 z-[9999]  -left-32 text-xs`}
        >
          <button
            className="hover:text-white-3"
            onClick={() => handleDeleteMsg(msg.id)}
          >
            Delete Message
          </button>
          <button
            className="hover:text-white-3"
            onClick={() => handleEditMsg(msg.id)}
          >
            Edit Message
          </button>
        </div>
      </button>
    </div>
  );
};

export default Message;
