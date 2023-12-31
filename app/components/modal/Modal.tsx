"use client";
import { useModalState } from "@/app/context/StateContext";
import { useEffect, useState } from "react";
import { axiosInstancePrivate } from "@/utils/axios";
import { useRouter } from "next/navigation";

const Modal = () => {
  const { setModalOpen } = useModalState();
  const [isLoading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  async function querySelection() {
    const res = await axiosInstancePrivate.get(
      "room/all-rooms/?search=" + searchInput
    );

    setRooms(res.data);
    console.log(res);

    // const data = res.
  }

  useEffect(() => {
    async function getRooms() {
      const res = await axiosInstancePrivate.get("room/all-rooms/");
      const data = res.data;

      if (res.status === 200) {
        setLoading(false);
        setRooms(data);
        console.log(rooms);
      }
    }

    getRooms();
  }, [searchInput]);

  function handleNavigate(id: number) {
    router.push(`/rooms/${id}`);
    setModalOpen(false);
  }

  return (
    <>
      <div
        onClick={() => setModalOpen(false)}
        className="bg-black/20 z-[999] fixed inset-0"
      ></div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 bg-white/10 text-white-1 backdrop-blur-md z-[999] w-[calc(100vw-30px)]  md:w-[600px] h-[400px] rounded-md">
        <form onKeyUp={querySelection} className="">
          <input
            className="bg-room-black py-4 px-3 rounded w-full focus:outline-none"
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            placeholder="Where would you like to go?"
          />
        </form>
        <div className="overflow-auto h-[300px] mt-5">
          {isLoading
            ? "loading..."
            : rooms.map((room: RoomList) => {
                return (
                  <p
                    key={room.id}
                    onClick={() => handleNavigate(room.id)}
                    className="py-2 md:py-4 cursor-pointer text-sm md:text-base"
                  >
                    {room.name}
                  </p>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default Modal;
