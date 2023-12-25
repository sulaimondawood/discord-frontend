"use client";
import Input from "@/app/components/input/Input";
import RoomMsgHeader from "@/app/components/room-header/RoomMsgHeader";
import { axiosInstance, axiosInstancePrivate } from "@/utils/axios";

import { useModalState } from "@/app/context/StateContext";
import Message from "@/app/components/message/Message";
import { useEffect, useState } from "react";

async function getMsg(params: number) {
  const res = await axiosInstance.get(`room/room-server/${params}/`);
  return res.data.room_messages;
}
async function getRoomDetail(params: number) {
  const res = await axiosInstance.get(`room/room-server/${params}/`);
  return res.data.data;
}
const page = ({ params }: { params: { id: number } }) => {
  const [room, setRoom] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  // const data = await getMsg(params.id);
  // const room = await getRoomDetail(params.id);
  // console.log(room);
  // const { openParticipants } = useModalState();

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
  return (
    <main className="bg-gray-ish h-screen ml-[330px] w-[calc(100vw-330px)] ">
      <RoomMsgHeader data={room} />
      <div className="overflow-y-auto flex flex-col gap-3 h-full py-20 px-4">
        {loading
          ? "loading"
          : data.length > 0
          ? data.map((msg: any, index: any) => {
              return <Message key={index} msg={msg} />;
            })
          : "No messages yet!"}
      </div>
      <Input params={params.id} />
    </main>
  );
};

export default page;
