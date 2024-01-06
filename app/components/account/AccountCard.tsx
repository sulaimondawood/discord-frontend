"use client";
import { useModalState } from "@/app/context/StateContext";
import { sliceText } from "@/utils/slicer";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

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
    // router.refresh();
  }, []);

  function handleLogout() {
    Cookies.remove("token");
    localStorage.removeItem("user");
    router.refresh();
    router.push("/");
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            onClick={active ? () => setUserModalOpen(true) : () => ""}
            className={`${
              active ? "cursor-pointer" : ""
            } w-16 h-16 rounded-full -mt-5 object-cover bg-room-deep-black p-2`}
            src={user.avatar}
            alt=""
          />
          <p className="text-white-1 text-sm md:text-base">
            #{sliceText(user?.username)}
          </p>
        </div>
        <div
          onClick={handleLogout}
          className={`${
            active ? "" : "hidden"
          } cursor-pointer bg-blue-500 text-white text-xs md:text-sm px-4 py-1 rounded-sm hover:bg-blue-600`}
        >
          Logout
        </div>
      </div>
      <div className="bg-white/5 rounded-md p-4 mt-4 backdrop-blur-sm flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="uppercase text-white-3 text-[10px] md:text-base">
              Display name
            </p>
            <p className="text-white-1 text-xs md:text-base">
              {sliceText(user?.display_name)}
            </p>
          </div>
          <button
            onClick={() => setUserModalOpen(true)}
            className={`${
              active ? "" : "hidden"
            } bg-white/10 backdrop-blur-md text-sm md:text-base rounded-sm py-1 px-3 text-white`}
          >
            Edit
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="uppercase text-white-3 text-[10px] md:text-base ">
              username
            </p>
            <p className="text-white-1 text-xs md:text-base">
              {sliceText(user.username)}
            </p>
          </div>
          <button
            onClick={() => setUserModalOpen(true)}
            className={`${
              active ? "" : "hidden"
            } bg-white/10 backdrop-blur-md text-sm md:text-base rounded-sm py-1 px-3 text-white`}
          >
            Edit
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="uppercase text-white-3 text-[10px] md:text-base">
              email
            </p>
            <p className="text-white-1 text-xs md:text-base">
              {sliceText(user?.email)}
            </p>
          </div>
          <button
            onClick={() => setUserModalOpen(true)}
            className={`${
              active ? "" : "hidden"
            } bg-white/10 backdrop-blur-md text-sm md:text-base rounded-sm py-1 px-3 text-white`}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
