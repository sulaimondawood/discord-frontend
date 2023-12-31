"use client";
import { useModalState } from "@/app/context/StateContext";
import { ChangeEvent, useEffect, useState } from "react";
import { axiosInstancePrivate } from "@/utils/axios";
import { useRouter } from "next/navigation";
import Spinner from "../loader/Spinner";

const RoomModalDropDown = ({
  topic,
  handleData,
}: {
  topic: string;
  handleData: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [isLoading, setLoading] = useState(true);
  const [isActive, setActive] = useState(false);
  const [topics, setTopics] = useState([]);
  const router = useRouter();
  async function querySelection() {
    const res = await axiosInstancePrivate.get("room/topics/?search=" + topic);
    setTopics(res.data);
    console.log(res);
  }

  useEffect(() => {
    async function getTopics() {
      const res = await axiosInstancePrivate.get("room/topics/");
      const data = res.data;
      console.log(data);

      if (res.status === 200) {
        setLoading(false);
        setTopics(data);
        console.log(topics);
      }
    }

    getTopics();
  }, []);

  useEffect(() => {
    console.log(topics);
  }, [topic]);

  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5  text-white-1  z-[999]  md:w-[600px] h-[400px] rounded-md">
        <label htmlFor="topic">Topic</label>
        <input
          id="topic"
          name="topic"
          onKeyUp={querySelection}
          onBlur={() => setActive(false)}
          onFocus={() => setActive(true)}
          className="bg-room-black py-4 px-3 rounded w-full focus:outline-none"
          type="text"
          onChange={handleData}
          value={topic}
        />

        <div
          className={`overflow-auto bg-room-deep-black shadow-md px-4 max-h-[200px] h-auto mt-2 transition-all duration-75 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        >
          {isLoading ? (
            <Spinner showText={true} />
          ) : (
            topics.map((room: RoomList) => {
              return (
                <p key={room.id} className="py-2 cursor-pointer">
                  {room.name}
                </p>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default RoomModalDropDown;
