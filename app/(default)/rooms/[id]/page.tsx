import Input from "@/app/components/input/Input";
import RoomMsgHeader from "@/app/components/room-header/RoomMsgHeader";
import { axiosInstance, axiosInstancePrivate } from "@/utils/axios";
import Avatar from "@/assets/images/avatar.jpg";

import { HiOutlineDotsHorizontal } from "react-icons/hi";

async function getMsg(params: number) {
  const res = await axiosInstance.get(`room/room-server/${params}/`);
  return res.data.room_messages;
}
const page = async ({ params }: { params: { id: number } }) => {
  const data = await getMsg(params.id);
  console.log(data);

  return (
    <main className="bg-gray-ish h-screen ml-[330px] w-[calc(100vw-330px)] ">
      <div className="">
        <RoomMsgHeader />
        <div className="overflow-y-auto flex flex-col gap-3 h-full py-20 px-4">
          {data.length > 0
            ? data.map((msg: any, index: any) => {
                return (
                  <div
                    className="hover:bg-room-black/50 backdrop-blur-md p-3 rounded-md flex justify-between items-center"
                    key={index}
                  >
                    <div className="flex gap-3 items-start">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={Avatar.src}
                        alt=""
                      />
                      <div className="">
                        <p className="text-white-1 capitalize font-medium">
                          {msg.user.display_name}
                        </p>
                        <p className="text-sm w-full max-w-lg text-white-3">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                    <span className="text-white-4 text-2xl">
                      <HiOutlineDotsHorizontal />
                    </span>
                  </div>
                );
              })
            : "No messages yet!"}
        </div>

        <Input params={params.id} />
      </div>
    </main>
  );
};

export default page;
