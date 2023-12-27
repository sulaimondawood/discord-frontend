"use client";
import { axiosInstance } from "@/utils/axios";
import Image from "@/assets/images/avatar.jpg";
import UserSettingsModal from "@/app/components/modal/UserSettingsModal";
import { useModalState } from "@/app/context/StateContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { id: number } }) => {
  const [user, setUser] = useState<any>([]);
  const { isUserModalOpen, setUserModalOpen } = useModalState();

  const router = useRouter();
  useEffect(() => {
    async function getUniqueUser(id: number) {
      const res = await axiosInstance.get("user/" + id);
      console.log(res);
      setUser(res.data[0]);

      router.refresh();
    }
    getUniqueUser(params.id);
  }, []);

  return (
    <div className="bg-gray-ish h-screen py-14 px-10 ml-[330px] w-[calc(100vw-330px)]">
      <h1 className="text-white text-xl font-semibold">My Account</h1>
      <div className="bg-room-deep-black w-[650px] rounded-md mt-6 pb-5 h-fit">
        <div className="w-full h-24 bg-orange-100 rounded-tl-md rounded-tr-md"></div>
        <div className="bg-room-deep-black px-5">
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
              className="bg-blue-500 py-1 px-4 text-white text-sm rounded"
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
                className="bg-white/10 backdrop-blur-md rounded-sm py-1 px-3 text-white"
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
                className="bg-white/10 backdrop-blur-md rounded-sm py-1 px-3 text-white"
              >
                Edit
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="uppercase text-white-3 text-xs">email</p>
                <p className="text-white-1">{user.email}</p>
              </div>
              <button
                onClick={() => setUserModalOpen(true)}
                className="bg-white/10 backdrop-blur-md rounded-sm py-1 px-3 text-white "
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserSettingsModal params={params.id} />
    </div>
  );
};

export default Page;
