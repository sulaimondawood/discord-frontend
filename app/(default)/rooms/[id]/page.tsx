"use client";
import Input from "@/app/components/input/Input";
import RoomMsgHeader from "@/app/components/room-header/RoomMsgHeader";
import { axiosInstance, axiosInstancePrivate } from "@/utils/axios";

import { useModalState } from "@/app/context/StateContext";
import Message from "@/app/components/message/Message";
import { useEffect, useState } from "react";
import Spinner from "@/app/components/loader/Spinner";

import Image from "@/assets/images/no msg.webp";
import { usePathname } from "next/navigation";

// export const revalidate = 1;

async function getMsg(params: number) {
  const res = await axiosInstance.get(`room/room-server/${params}/`);
  return res.data.room_messages;
}
async function getRoomDetail(params: number) {
  const res = await axiosInstance.get(`room/room-server/${params}/`);
  return res.data.data;
}
const SingleRoom = ({ params }: { params: { id: number } }) => {
  const [room, setRoom] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showRoom, setShowRoom } = useModalState();
  const [msg, setMsg] = useState("");
  const path = usePathname();
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getMsg(params.id);
      const fetchedRoom = await getRoomDetail(params.id);
      setLoading(false);
      setData(fetchedData);
      setRoom(fetchedRoom);
    };
    fetchData();
    // Set up interval for repeated requests

    const intervalId: any = setInterval(fetchData, 2000);

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [params.id]);

  useEffect(() => {
    function handleIsTrue() {
      if (path === "/rooms/" + params.id) {
        setShowRoom(true);
      } else {
        setShowRoom(false);
      }
    }

    handleIsTrue();
  }, []);
  return (
    <>
      <main className="hidden md:block bg-gray-ish h-screen ml-[330px] w-[calc(100vw-330px)] ">
        {/* <RoomMsgHeader params={params.id} data={room} /> */}
        <RoomMsgHeader params={params.id} data={room} msg={msg} />
        <div className="overflow-y-auto flex flex-col gap-3 h-full py-20 px-4">
          {loading ? (
            <Spinner showText={true} />
          ) : data.length > 0 ? (
            data.map((msg: any, index: any) => {
              return <Message key={index} msg={msg} />;
            })
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img className="text-center w-96 " src={Image.src} alt="" />
              <p className="text-white-2">No messages yet!</p>
            </div>
          )}
        </div>

        <Input msg={msg} setMsg={setMsg} params={params.id} />
        {/* <Input params={params.id} /> */}
      </main>

      {/* mobile */}
      <main
        className={`${
          showRoom ? "translate-x-0" : " translate-x-full "
        }  bg-gray-ish h-screen left-14 bottom-0 absolute duration-300 ease-in-out  transition-all  w-[calc(100vw-60px)] z-[999] block overflow-hidden md:hidden`}
      >
        <RoomMsgHeader params={params.id} data={room} msg={msg} />
        <div className="overflow-y-auto  flex flex-col gap-3 h-[calc(100vh-110px)] py-3 px-2 mt-12">
          {loading ? (
            <Spinner showText={true} />
          ) : data.length > 0 ? (
            data.map((msg: any, index: any) => {
              return <Message key={index} msg={msg} />;
            })
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img className="text-center w-96 " src={Image.src} alt="" />
              <p className="text-white-2">No messages yet!</p>
            </div>
          )}
        </div>

        <Input msg={msg} setMsg={setMsg} params={params.id} />
      </main>
    </>
  );
};

export default SingleRoom;
