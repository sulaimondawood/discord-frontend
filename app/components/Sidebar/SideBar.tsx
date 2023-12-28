"use client";
// import { axiosInstance, axiosInstancePrivate } from "@/utils/axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
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
  const [activeUser, setActiveUser] = useState<any[]>([]);
  const [userActive, setActive] = useState(true);
  const { setModalOpen } = useModalState();

  useEffect(() => {
    const activeUser = JSON.parse(localStorage?.getItem("user")!);
    async function getRoomLists() {
      const res = await axiosInstancePrivate.get("room/all-rooms/", {
        withCredentials: true,
      });

      const data = res.data;
      if (data) {
        setData(data);
        setLoading(false);
      }
      // console.log(data);

      const userResponse = await axiosInstance.get("user/");
      const userData = userResponse.data;

      if (userData) {
        setUserData(userData);
        setUserList(false);
      }
    }

    async function getSingleUser() {
      const res = await axiosInstance.get("user/" + activeUser.id + "/");
      if (res.status == 200) {
        setActiveUser(res.data);
        setActive(false);
      }
      // console.log(res);
    }

    getSingleUser();

    getRoomLists();
  }, []);

  const router = useRouter();
  const handleNavigation = (id: number) => {
    if (path.includes("/account")) {
      // console.log("redirect");

      redirect(`account/${id}`);
      // router.replace(`account/${id}`);
    } else {
      router.push(`account/${id}`);
    }
  };

  return (
    <div className=" h-screen fixed flex ">
      <div className="w-[80px] h-screen overflow-auto bg-room-deep-black py-4 px-2">
        <div className="flex flex-col items-center gap-4">
          {loading
            ? "Loading..."
            : data.map((item: RoomList, index) => {
                return (
                  <Link
                    className="relative group"
                    key={item.id}
                    href={`/rooms/${item.id}`}
                  >
                    <div className="bg-white rounded-full h-2 absolute -left-4 top-1/2 -translate-y-1/2 w-[6px] group-hover:h-6 duration-200 transition-all"></div>
                    <img
                      className="w-[50px] h-[50px] rounded-full group-hover:rounded-2xl transition-all duration-150 ease-linear object-cover"
                      src={item.avatar}
                      alt=""
                    />
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
                  key={item.id}
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
            <p className="text-white-4 font-semibold text-[10px] uppercase">
              Popular Users
            </p>
            <div className="h-[370px] flex flex-col gap-4 mt-5 w-[225px] overflow-auto">
              {userList
                ? "loading.."
                : userData.map((user: any, index: number) => {
                    return (
                      <Link
                        key={index}
                        href={`account/${user.id}`}
                        className="flex justify-between items-center hover:bg-white/5 hover:backdrop-blur-md p-2 rounded"
                      >
                        <div className="flex gap-3 items-center">
                          <img
                            className="w-8 h-8 object-cover rounded-full"
                            src={user.avatar}
                            alt=""
                          />
                          <div className="text-white-4 text-left text-sm lowercase">
                            <p>{user.username}</p>
                            <p className="text-xs  text-white-2 ">
                              {user.display_name}
                            </p>
                          </div>
                        </div>
                        <span className="text-white-2">
                          <FaAngleRight />
                        </span>
                      </Link>
                    );
                  })}
            </div>
          </div>
          {activeUser.map((user) => {
            return <SideBarProfileLink key={user.id} user={user} />;
          })}
          {/* <SideBarProfileLink /> */}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
