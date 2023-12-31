"use client";
import { useModalState } from "@/app/context/StateContext";
import { sliceText } from "@/utils/slicer";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AccountCard = ({ user }: { user: any }) => {
  const [active, setActive] = useState(false);
  const { isUserModalOpen, setUserModalOpen } = useModalState();

  const router = useRouter();
  useEffect(() => {
    const userActive = JSON.parse(localStorage?.getItem("user")!);
    if (user?.id == parseInt(userActive?.id)) {
      setActive(true);
    } else {
      setActive(false);
    }
    router.refresh();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            className="w-16 h-16 rounded-full -mt-5 object-cover bg-room-deep-black p-2"
            src={user.avatar}
            alt=""
          />
          <p className="text-white-1 text-sm">#{sliceText(user?.username)}</p>
        </div>
      </div>
      <div className="bg-white/5 rounded-md p-4 mt-4 backdrop-blur-sm flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="uppercase text-white-3 text-[10px]">Display name</p>
            <p className="text-white-1 text-xs">
              {sliceText(user?.display_name)}
            </p>
          </div>
          <button
            onClick={() => setUserModalOpen(true)}
            className={`${
              active ? "" : "hidden"
            } bg-white/10 backdrop-blur-md text-sm rounded-sm py-1 px-3 text-white`}
          >
            Edit
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="uppercase text-white-3 text-[10px]">username</p>
            <p className="text-white-1 text-xs">{sliceText(user.username)}</p>
          </div>
          <button
            onClick={() => setUserModalOpen(true)}
            className={`${
              active ? "" : "hidden"
            } bg-white/10 backdrop-blur-md text-sm rounded-sm py-1 px-3 text-white`}
          >
            Edit
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="uppercase text-white-3 text-[10px]">email</p>
            <p className="text-white-1">{sliceText(user?.email)}</p>
          </div>
          <button
            onClick={() => setUserModalOpen(true)}
            className={`${
              active ? "" : "hidden"
            } bg-white/10 backdrop-blur-md text-sm rounded-sm py-1 px-3 text-white`}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
