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
      "/room/all-rooms/",
      {
        topic: data.topic,
        name: data.name,
        avatar: null,
        description: data.description,
        is_new_topic: true,
      },
      {
        withCredentials: true,
      }
    );
  }

  return (
    <>
      <div
        onClick={() => setRoomModalOpen(false)}
        className="bg-black/30 z-50 fixed inset-0"
      ></div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 bg-white/10 text-white-1 backdrop-blur-md z-[999]   w-[600px] h-[400px] rounded-md">
        <form onSubmit={handlePostReq} className="">
          <div className="">
            <input type="text" hidden />
          </div>
          <div className="">
            <label htmlFor="topic">Topic</label>
            <input
              onChange={handleData}
              id="topic"
              name="topic"
              value={data.topic}
              className="bg-room-black py-4 px-3 rounded w-full focus:outline-none"
              type="text"
            />
          </div>
          <div className="">
            <label htmlFor="name">Name</label>
            <input
              onChange={handleData}
              id="name"
              name="name"
              value={data.name}
              className="bg-room-black py-4 px-3 rounded w-full focus:outline-none"
              type="text"
            />
          </div>
          <div className="">
            <label htmlFor="desc">Description</label>
            <input
              onChange={handleData}
              id="desc"
              name="description"
              value={data.description}
              className="bg-room-black py-4 px-3 rounded w-full focus:outline-none"
              type="text"
            />
          </div>
          <div className="">
            <label htmlFor="img">Room Image</label>
            <input
              onChange={handleFile}
              id="img"
              name="description"
              value={data.avatar}
              className="bg-room-black py-4 px-3 rounded w-full focus:outline-none"
              type="file"
            />
          </div>
          <button onClick={handlePostReq}>Create Server</button>
          {/* <input type="progress" /> */}
        </form>
      </div>
    </>
  );
};

export default RoomModal;
