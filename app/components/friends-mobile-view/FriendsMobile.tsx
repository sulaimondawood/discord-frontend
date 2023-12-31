"use client";
import { FaUserFriends } from "react-icons/fa";
import { CreateServerBtn } from "../buttons/CreateServerBtn";
import SearchFriendsInput from "../input/SearchFriendsInput";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useModalState } from "@/app/context/StateContext";

const FriendsMobile = () => {
  // const [checker, setChecker] = useState(false);
  const { showFriends, setShowFriends, checker, setChecker } = useModalState();
  const path = usePathname();
  console.log(path);
  const router = useRouter();
  useEffect(() => {
    function handleIsTrue() {
      if (path === "/friends") {
        setShowFriends(true);
      } else {
        setShowFriends(false);
      }
    }

    handleIsTrue();
  }, [checker]);
  // console.log(handleIsTrue());

  return (
    <div
      className={`block md:hidden z-[999] fixed left-24 ${
        showFriends ? "translate-x-0" : " translate-x-full "
      } bg-gray-ish transition-all duration-300 ease-in-out h-screen   w-[calc(100vw-100px)]`}
    >
      <div className="flex justify-between fixed top-0 w-[calc(100vw-95px)] py-2 px-2 border-b-2 border-room-black bg-gray-ish">
        <div className="flex gap-4 items-center">
          <span className="text-white-1 text-2xl">
            <FaUserFriends />
          </span>
        </div>
        <div className="flex items-center">
          <CreateServerBtn>+</CreateServerBtn>
        </div>
      </div>
      <SearchFriendsInput />
    </div>
  );
};

export default FriendsMobile;
