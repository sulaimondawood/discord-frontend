import Input from "@/app/components/input/Input";
import RoomMsgHeader from "@/app/components/room-header/RoomMsgHeader";
import { axiosInstance, axiosInstancePrivate } from "@/utils/axios";

async function getMsg(params: number) {
  const res = await axiosInstance.get(`room/room-server/${params}/`);
  return res.data.room_messages;
}
const page = async ({ params }: { params: { id: number } }) => {
  const data = await getMsg(params.id);

  return (
    <main className="bg-gray-ish h-screen ml-[330px] w-[calc(100vw-330px)] ">
      <RoomMsgHeader />
      <div className="overflow-y-auto h-full py-14 px-4">
        {data.length > 0
          ? data.map((msg: any, index: any) => {
              return (
                <div key={index}>
                  <p>Message</p>
                </div>
              );
            })
          : "No messages yet!"}
      </div>

      <Input params={params.id} />
    </main>
  );
};

export default page;
