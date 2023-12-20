import { useModalState } from "@/context/StateContext";
import { useTokens } from "@/hooks/useTokensConfig";
// import { axiosInstance, axiosInstancePrivate } from "@/utils/axios";
import { ChangeEvent, FormEvent, useState } from "react";

const RoomModal = () => {
  const { setRoomModalOpen } = useModalState();
  const [data, setData] = useState({
    avatar: "",
    topic: "",
    name: "",
    description: "",
  });

  const axiosInstancePrivate = useTokens();

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: "file",
    });
    console.log(e.target.files![0]);

    console.log(data.avatar);
  };

  const handleData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });

    console.log(data.description);
    console.log(data.name);
    console.log(data.topic);
    console.log(data.avatar);
  };

  async function handlePostReq(e: FormEvent) {
    e.preventDefault();
    const res = await axiosInstancePrivate.post(
      "room/create-room/",
      {
        topic: data.topic,
        name: data.name,
        description: data.description,
      },
      {
        withCredentials: true,
      }
    );
    console.log(res);
  }

  return (
    <>
      <div
        onClick={() => setRoomModalOpen(false)}
        className="bg-black/30 z-50 fixed inset-0"
      ></div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5  bg-white/10 text-white-1 backdrop-blur-md z-[999]   w-[600px] h-fit rounded-md">
        <h1 className="text-center text-xl font-semibold text-white-1">
          Create a server
        </h1>
        <p className="text-white-3 w-[400px] mx-auto text-center">
          Your server is where you and your friends hangout. Make yours and
          start talking
        </p>
        <form onSubmit={handlePostReq} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="topic">Topic</label>
            <input
              onChange={handleData}
              id="topic"
              name="topic"
              value={data.topic}
              className="bg-transparent border-white-4/40 border py-4 px-3 rounded w-full focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              onChange={handleData}
              id="name"
              name="name"
              value={data.name}
              className="bg-transparent border-white-4/40 border py-4 px-3 rounded w-full focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="desc">Description</label>
            <input
              onChange={handleData}
              id="desc"
              name="description"
              value={data.description}
              className="bg-transparent border-white-4/40 border py-4 px-3 rounded w-full focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2 border-dashed border border-white-4/40 py-4 text-center">
            <label htmlFor="img">Upload Sever Image</label>
            <input
              onChange={handleFile}
              id="img"
              name="description"
              value={data.avatar}
              className="hidden"
              // className="bg-transparent border-white-4/40 border py-4 px-3 rounded w-full focus:outline-none"
              type="file"
            />
          </div>
          <button
            className="pl-2 rounded bg-room-deep-black w-full  py-3 text-center text-white-4"
            onClick={handlePostReq}
          >
            Create Server
          </button>
        </form>
      </div>
    </>
  );
};

export default RoomModal;
