"use client";

import React, { useEffect, useRef, useState } from "react";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useModalState } from "@/app/context/StateContext";
// import { axiosInstancePrivate } from "@/utils/axios";
import { useRouter } from "next/navigation";

import { formatRelative } from "date-fns";
import Link from "next/link";
import { useTokens } from "@/hooks/useTokensConfig";
const Message = ({ msg }: { msg: any }) => {
  console.log(msg);
  const axiosInstancePrivate = useTokens();

  const [user, setUser] = useState(() => {
    const storedState = localStorage?.getItem("user");
    return storedState ? JSON.parse(storedState) : "";
  });
  const [setting, setSettings] = useState(true);
  const { latestInputRef, inputRef, setFocus, focus } = useModalState();
  const [isHover, setHover] = useState(false);

  const router = useRouter();
  async function handleDeleteMsg(id: number) {
    await axiosInstancePrivate.delete("room/delete-edit-msg/" + id);
    router.refresh();
  }
  const date = new Date(msg.updated);
  const relativeDate = formatRelative(date, new Date(), {});
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`  ${
        msg.user.id == user.id ? "flex-row-reverse" : "flex-row"
      }  hover:bg-room-black/50 backdrop-blur-md py-3 px-1 md:p-3 rounded-sm flex justify-between items-center`}
      ref={latestInputRef}
    >
      <div
        className={`flex gap-3 items-start ${
          msg.user.id == user.id
            ? "flex-row-reverse duration-200 opacity-100 delay-200"
            : "flex-row"
        }`}
      >
        <Link href={`/account/${msg.user.id}`}>
          <img
            className="w-8 h-8 s-custom:w-10 s-custom:h-10 rounded-full object-cover"
            src={msg?.user?.avatar}
            alt=""
          />
        </Link>
        <div className={`flex flex-col gap-3`}>
          <div
            className={` ${
              msg.user.id == user.id ? "flex-row-reverse" : "flex-row"
            } flex gap-2 items-center`}
          >
            <Link href={`/account/${msg.user.id}`}>
              <p className="text-white-1 capitalize font-medium text-xs md:text-sm">
                {msg.user.display_name}
              </p>
            </Link>
            <p
              className=" text-[9px]
            md:text-xs text-white-4
            "
            >
              {relativeDate}
            </p>
          </div>
          <p
            // ref={latestInputRef}
            className={`${
              msg.user.id == user.id
                ? "border-right border-r-[3px] border-white text-right pr-3"
                : "border-left text-left pl-3 border-l-[3px] border-green-300"
            } rounded-[4px] text-sm w-full max-w-lg text-white-3`}
          >
            {msg.message}
          </p>
        </div>
      </div>

      {msg.user.id == user.id
        ? isHover && (
            <div
              onClick={() => setSettings(!setting)}
              className="hover:text-white-1 cursor-pointer text-white-4 text-lg md:text-2xl relative"
            >
              <HiOutlineDotsHorizontal />

              <div
                className={`${
                  setting ? "opacity-0 hidden " : "opacity-100 flex"
                }
            ${msg.user.id == user.id ? "-right-32" : "-left-32"}
            p-3 transition-all duration-100 flex-col text-white-1  gap-2 items-start bg-faded-black rounded-md absolute -top-10 z-[9999]   text-xs`}
              >
                <button
                  className="hover:text-white-3"
                  onClick={() => handleDeleteMsg(msg.id)}
                >
                  Delete Message
                </button>
              </div>
            </div>
          )
        : ""}
    </div>
  );
};

export default Message;
