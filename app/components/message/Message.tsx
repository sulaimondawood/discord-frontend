"use client";

import React, { useEffect, useRef, useState } from "react";
import Avatar from "@/assets/images/avatar.jpg";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useModalState } from "@/app/context/StateContext";
import { axiosInstancePrivate } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { colors, getRandom } from "@/utils/themes/colors/color";
import moment from "moment";
import { formatRelative } from "date-fns";
import { Locale } from "date-fns";
import Link from "next/link";

const Message = ({ msg }: { msg: any }) => {
  console.log(msg);
  const [setting, setSettings] = useState(true);
  const [active, setActive] = useState(false);
  const { latestInputRef, inputRef, setFocus, focus } = useModalState();
  const [isHover, setHover] = useState(false);
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

  useEffect(() => {
    const user = JSON.parse(localStorage?.getItem("user")!);

    if (msg.user.id == user.id) {
      setActive(true);
      // console.log();
    } else {
      setActive(false);
    }
  }, []);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      // onClick={() => setSettings(!setting)}
      className={`  ${
        active ? "flex-row-reverse" : "flex-row"
      }  hover:bg-room-black/50 backdrop-blur-md p-3 rounded-sm flex justify-between items-center`}
      ref={latestInputRef}
    >
      <div
        className={`flex gap-3 items-start ${
          active ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <Link href={`account/${msg.user.id}`}>
          <img
            className="w-10 h-10 rounded-full"
            src={"http://localhost:8000" + msg?.user?.avatar}
            alt=""
          />
        </Link>
        <div className={`  flex flex-col gap-3`}>
          <div
            className={` ${
              active ? "flex-row-reverse" : "flex-row"
            } flex gap-2 items-center`}
          >
            <Link href={`account/${msg.user.id}`}>
              <p className="text-white-1 capitalize font-medium text-sm">
                {msg.user.display_name}
              </p>
            </Link>
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
            className={`${
              active
                ? "border-right border-r-[3px] text-right pr-3"
                : "border-left text-left pl-3 border-l-[3px]"
            } rounded-[4px] text-sm w-full max-w-lg text-white-3`}
          >
            {msg.message}
          </p>
        </div>
      </div>
      {isHover && (
        <button
          onClick={() => setSettings(!setting)}
          className="hover:text-white-1 text-white-4 text-2xl relative"
        >
          <HiOutlineDotsHorizontal />

          <div
            className={`${setting ? "opacity-0 hidden " : "opacity-100 flex"}
            ${active ? "-right-32" : "-left-32"}
            p-3 transition-all duration-100 flex-col text-white-1  gap-2 items-start bg-faded-black rounded-md absolute -top-10 z-[9999]   text-xs`}
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
      )}
    </div>
  );
};

export default Message;
