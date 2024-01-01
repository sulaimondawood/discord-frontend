"use client";
import { FaUserFriends } from "react-icons/fa";
import { CreateServerBtn } from "../buttons/CreateServerBtn";
import SearchFriendsInput from "../input/SearchFriendsInput";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useModalState } from "@/app/context/StateContext";
import { IoAdd } from "react-icons/io5";

const FriendsMobile = () => {
  const { showFriends, setShowFriends } = useModalState();
  const path = usePathname();
  useEffect(() => {
    function handleIsTrue() {
      if (path === "/friends") {
        setShowFriends(true);
      } else {
        setShowFriends(false);
      }
    }
    handleIsTrue();
  }, []);

  return (
    <div
      className={`block md:hidden z-[999] fixed left-14 ${
        showFriends ? "translate-x-0 " : " translate-x-full"
      } bg-gray-ish transition-all duration-300 ease-in-out h-screen w-[calc(100vw-55px)]`}
      // } bg-gray-ish transition-all duration-300 ease-in-out h-screen w-[calc(100vw-70px)]`}
    >
      <div className="flex justify-between fixed top-0 w-[calc(100vw-55px)] py-2 px-2 border-b-2 border-room-black bg-gray-ish">
        <div className="flex gap-4 items-center">
          <span className="text-white-1 text-2xl">
            <FaUserFriends />
          </span>
        </div>
        <div className="flex items-center">
          <CreateServerBtn>
            <span className="text-md">
              <IoAdd />
            </span>
          </CreateServerBtn>
        </div>
      </div>
      <SearchFriendsInput />
    </div>
  );
};

export default FriendsMobile;
