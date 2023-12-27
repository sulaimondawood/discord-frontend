"use client";
// import { axiosInstance, axiosInstancePrivate } from "@/utils/axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IconType } from "react-icons";
import navList from "@/utils/nav";
import { useModalState } from "@/app/context/StateContext";
import { useTokens } from "@/hooks/useTokensConfig";
import useRefresh from "@/hooks/useRefresh";
import { CreateServerBtn } from "../buttons/CreateServerBtn";
import { FindServerButton } from "../buttons/FindServer";
import SideBarProfileLink from "../profile-setting/SideBarProfileLink";
import { axiosInstance } from "@/utils/axios";
import { FaAngleRight } from "react-icons/fa";

import Image from "@/assets/images/avatar.jpg";

const SideBar = () => {
  const path = usePathname();
  // console.log(path);
  const axiosInstancePrivate = useTokens();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any[]>([]);
  const [userList, setUserList] = useState(true);
  const { setModalOpen } = useModalState();

  useEffect(() => {
    async function getRoomLists() {
      const res = await axiosInstancePrivate.get("room/all-rooms/", {
        withCredentials: true,
      });

      const data = res.data;
      if (data) {
        setData(data);
        setLoading(false);
      }
      console.log(data);

      const userResponse = await axiosInstance.get("user/");
      const userData = res.data;

      if (userData) {
        setUserData(userData);
        setUserList(false);
      }
    }

    getRoomLists();
  }, []);

  const router = useRouter();
  const handleRoomNavigation = (id: number) => {
    router.push(`room/${id}`);
  };

  return (
    <div className=" h-screen fixed flex ">
      <div className="w-[80px] h-screen overflow-auto bg-room-deep-black py-4 px-2">
        <div className="flex flex-col gap-4">
          {loading
            ? "Loading..."
            : data.map((item: RoomList, index) => {
                return (
                  <Link key={item.id} href={`/rooms/${item.id}`}>
                    {/* <p className="text-white text-xs">{item.name}</p> */}
                    <img
                      className="w-14 h-14 rounded-full"
                      src={item.avatar}
                      alt=""
                    />
                    {/* <img src={item.avatar_url} alt="" /> */}
                  </Link>
                );
              })}
        </div>
      </div>
      <div className="bg-room-black overflow-auto h-screen w-[250px] px-3 py-4">
        <FindServerButton>Find or start a room</FindServerButton>
        {/* <CreateServerBtn>Find or start a room</CreateServerBtn> */}
        <div className="mt-4 relative">
          <div className=" flex flex-col gap-2">
            {navList.map((item) => {
              return (
                <Link
                  href={item.url}
                  className={`${
                    path === item.url
                      ? "bg-white/10 text-white-1 backdrop-blur-md"
                      : "text-white-4"
                  }    hover:text-white-1 hover:bg-white/5 rounded flex items-center gap-4 p-2`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <button>{item.name}</button>
                </Link>
              );
            })}
          </div>
          <div className="mt-5">
            <p className="text-white-4 font-semibold text-xs uppercase">
              Popular Users
            </p>
            <div className="h-[370px] flex flex-col gap-4 mt-5 w-[225px] overflow-auto">
              {userList
                ? "loading.."
                : userData.map((user: any, index: number) => {
                    return (
                      <div className="flex justify-between items-center hover:bg-white/5 hover:backdrop-blur-md p-2 rounded">
                        <div className="flex gap-3 items-center">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={Image.src}
                            alt=""
                          />
                          <div className="text-white-4 text-sm lowercase">
                            <p>Dawood</p>
                            <p className="text-xs text-white-2 ">Dawood</p>
                          </div>
                        </div>
                        <span className="text-white-2">
                          <FaAngleRight />
                        </span>
                      </div>
                    );
                  })}
            </div>
          </div>

          <SideBarProfileLink />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
