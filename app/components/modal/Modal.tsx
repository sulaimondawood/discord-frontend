"use client";
import { useModalState } from "@/app/context/StateContext";
import { useEffect, useState } from "react";

import { axiosInstance, axiosInstancePrivate } from "@/utils/axios";
const Modal = () => {
  const { setModalOpen } = useModalState();
  const [isLoading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  async function querySelection() {
    const res = await axiosInstance.get("room/search-rooms/");
    // const data = res.
  }

  useEffect(() => {
    async function getRooms() {
      const res = await axiosInstancePrivate.get("room/all-rooms/");
      const data = res.data;

      if (res.status === 200) {
        setLoading(false);
        setRooms(data);
      }
    }

    getRooms();
  }, []);

  return (
    <>
      <div
        onClick={() => setModalOpen(false)}
        className="bg-black/20 z-50 fixed inset-0"
      ></div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 bg-white/10 text-white-1 backdrop-blur-md z-[999]   w-[600px] h-[400px] rounded-md">
        <form className="">
          <input
            className="bg-room-black py-4 px-3 rounded w-full focus:outline-none"
            type="text"
            placeholder="Where would you like to go?"
          />
        </form>
        <div className="overflow-auto h-[300px] mt-5">
          {isLoading
            ? "loading..."
            : rooms.map((room: RoomList) => {
                return <p className="py-4">{room.name}</p>;
              })}
        </div>
      </div>
    </>
  );
};

export default Modal;
