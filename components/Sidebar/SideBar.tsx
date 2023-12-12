"use client";
import { axiosInstance } from "@/utils/axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SideBar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getRoomLists() {
      const res = await axiosInstance.get("room/all-rooms");
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
    <div className=" h-screen fixed flex">
      <div className="w-[80px] h-screen bg-room-deep-black">
        {loading
          ? "Loading..."
          : data.map((item: any) => {
              return (
                // <Link key={item.} href={"/"}>
                <img src={""} alt="" />
                // </Link>
              );
            })}
      </div>
      <div className="bg-room-black h-screen w-[250px]"></div>
    </div>
  );
};

export default SideBar;
