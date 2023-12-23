import Input from "@/app/components/input/Input";
import RoomMsgHeader from "@/app/components/room-header/RoomMsgHeader";
import { axiosInstance, axiosInstancePrivate } from "@/utils/axios";

import { useModalState } from "@/app/context/StateContext";
import Message from "@/app/components/message/Message";

async function getMsg(params: number) {
  const res = await axiosInstance.get(`room/room-server/${params}/`);
  return res.data.room_messages;
}
const page = async ({ params }: { params: { id: number } }) => {
  const data = await getMsg(params.id);
  console.log(data);
  // const { openParticipants } = useModalState();
  return (
    <main className="bg-gray-ish h-screen ml-[330px] w-[calc(100vw-330px)] ">
      <RoomMsgHeader />
      <div className="overflow-y-auto flex flex-col gap-3 h-full py-20 px-4">
        {data.length > 0
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
