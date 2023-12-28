"use client";
import { useModalState } from "@/app/context/StateContext";
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
        <div className="flex items-center gap-4">
          <img
            className="w-20 h-20 rounded-full -mt-5 bg-room-deep-black p-2"
            src={user.avatar}
            alt=""
          />
          <p className="text-white-1 text-lg">#{user?.username}</p>
        </div>
        <button
          onClick={() => setUserModalOpen(true)}
          className={`${
            active ? "" : "hidden"
          } bg-blue-500 py-1 px-4 text-white text-sm rounded`}
        >
          Edit User Profile
        </button>
      </div>
      <div className="bg-white/5 rounded-md p-4 mt-4 backdrop-blur-sm flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="uppercase text-white-3 text-xs">Display name</p>
            <p className="text-white-1">{user.display_name}</p>
          </div>
          <button
            onClick={() => setUserModalOpen(true)}
            className={`${
              active ? "" : "hidden"
            } bg-white/10 backdrop-blur-md rounded-sm py-1 px-3 text-white`}
          >
            Edit
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="uppercase text-white-3 text-xs">username</p>
            <p className="text-white-1">{user.username}</p>
          </div>
          <button
            onClick={() => setUserModalOpen(true)}
            className={`${
              active ? "" : "hidden"
            } bg-white/10 backdrop-blur-md rounded-sm py-1 px-3 text-white`}
          >
            Edit
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="uppercase text-white-3 text-xs">email</p>
            <p className="text-white-1">{user?.email}</p>
          </div>
          <button
            onClick={() => setUserModalOpen(true)}
            className={`${
              active ? "" : "hidden"
            } bg-white/10 backdrop-blur-md rounded-sm py-1 px-3 text-white`}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
