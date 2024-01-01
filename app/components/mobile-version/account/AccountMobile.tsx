"use client";
import { useEffect, useState } from "react";
import AccountCard from "../../account/AccountCard";
import UserSettingsModal from "../../modal/UserSettingsModal";
import { usePathname } from "next/navigation";
import { useModalState } from "@/app/context/StateContext";

const AccountMobile = ({ user, params }: { user: any; params: any }) => {
  const { showAccount, setShowAccount } = useModalState();
  const path = usePathname();

  useEffect(() => {
    function handleIsTrue() {
      if (path === "/account/" + params.id) {
        setShowAccount(true);
      } else {
        setShowAccount(false);
      }
    }

    handleIsTrue();
  }, []);

  return (
    <div
      className={`block md:hidden z-[999] fixed left-14 ${
        showAccount ? "translate-x-0" : " translate-x-full "
      } bg-gray-ish transition-all duration-300 ease-in-out h-screen  py-8 px-2 w-[calc(100vw-55px)]`}
    >
      <h1 className="text-white text-lg font-semibold">My Account</h1>
      <div className="bg-room-deep-black w-full rounded-md mt-6 pb-5 h-fit">
        <div className="w-full h-24 bg-orange-100 rounded-tl-md rounded-tr-md"></div>
        <div className="bg-room-deep-black px-2">
          {user.map((user: any) => {
            return <AccountCard key={user.id} user={user} />;
          })}
        </div>
      </div>
      <UserSettingsModal params={params.id} />
    </div>
  );
};

export default AccountMobile;
