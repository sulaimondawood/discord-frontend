import { axiosInstance } from "@/utils/axios";
import Image from "@/assets/images/avatar.jpg";
import UserSettingsModal from "@/app/components/modal/UserSettingsModal";
import { useModalState } from "@/app/context/StateContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AccountCard from "@/app/components/account/AccountCard";
import AccountMobile from "@/app/components/mobile-version/account/AccountMobile";

async function getUniqueUser(id: number) {
  const res = await axiosInstance.get("user/" + id);
  return res.data;
}

const Page = async ({ params }: { params: { id: number } }) => {
  const user = await getUniqueUser(params.id);

  return (
    <>
      <div className="hidden md:block bg-gray-ish h-screen py-14 px-10 ml-[330px] w-[calc(100vw-330px)]">
        <h1 className="text-white text-xl font-semibold">My Account</h1>
        <div className="bg-room-deep-black w-[650px] rounded-md mt-6 pb-5 h-fit">
          <div className="w-full h-24 bg-orange-100 rounded-tl-md rounded-tr-md"></div>
          <div className="bg-room-deep-black px-5">
            {user.map((user: any) => {
              return <AccountCard key={user.id} user={user} />;
            })}
          </div>
        </div>
        <UserSettingsModal params={params.id} />
      </div>

      {/* mobile */}
      <AccountMobile user={user} params={params} />
    </>
  );
};

export default Page;
