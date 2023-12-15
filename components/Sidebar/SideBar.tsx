"use client";
import { axiosInstance, axiosInstancePrivate } from "@/utils/axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import navList from "@/utils/nav";
import { useModalState } from "@/context/StateContext";

const SideBar = () => {
  const path = usePathname();
  console.log(path);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setModalOpen } = useModalState();
  useEffect(() => {
    async function getRoomLists() {
      const res = await axiosInstancePrivate.get("room/all-rooms", {
        withCredentials: true,
      });
      const data = res.data;
      if (data) {
        setData(data);
        setLoading(false);
      }
      console.log(data);
    }

    getRoomLists();
  }, []);

  return (
    <div className=" h-screen fixed flex ">
      <div className="w-[80px] h-screen bg-room-deep-black py-4 px-2">
        <div className="flex flex-col gap-4">
          {loading
            ? "Loading..."
            : data.map((item: RoomList, index) => {
                return (
                  <Link key={item.id} href={"/"}>
                    <p className="text-white text-xs">{item.name}</p>
                    {/* <img src={item.avatar} alt="" /> */}
                  </Link>
                );
              })}
        </div>
      </div>
      <div className="bg-room-black h-screen w-[250px] px-3 py-4">
        <button
          onClick={() => setModalOpen(true)}
          className="text-left text-xs pl-2 rounded bg-room-deep-black w-full h-7  text-white-4"
        >
          Find or start a room
        </button>
        <div className="mt-4">
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
              Recent Activities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
