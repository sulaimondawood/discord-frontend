"use client";

import React, { useEffect, useState } from "react";
import { IoPeopleSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { useModalState } from "@/app/context/StateContext";
import { FaAngleRight } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Image from "@/assets/images/avatar.jpg";
import { axiosInstancePrivate } from "@/utils/axios";
interface IRoom {
  host: any;
  name: string;
  description: string;
  avatar: string;
  created: string;
  members: any[];
}

const RoomMsgHeader = ({ data, params }: { data: IRoom; params: number }) => {
  const { setParticipants, isRoomInfo, setRoomInfo, openParticipants } =
    useModalState();
  const [loadParticipants, setLoadParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const date = new Date(data?.created);
  const formattedDate = date.toLocaleString("en-US", {
    timeZone: "UTC", // Adjust time zone if needed
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  function handleOpenedState() {
    setParticipants((prev) => {
      setRoomInfo(false);
      return (prev = !prev);
    });
  }

  function handleRoomState() {
    setRoomInfo((prev) => {
      setParticipants(false);
      return (prev = !prev);
    });
  }

  function handleOverallState() {
    if (openParticipants) {
      setParticipants(false);
    }
    if (isRoomInfo) {
      setRoomInfo(false);
    }
  }

  useEffect(() => {
    const getParticipants = async () => {
      const res = await axiosInstancePrivate.get(
        "room/room-server/" + params + "/"
      );

      console.log(res.data.data);

      setLoadParticipants(res.data.data.members);
      console.log("particiapnst");
      console.log(loadParticipants);

      setLoading(false);
      console.log(loading);
    };

    getParticipants();

    const intervaal: any = setInterval(getParticipants, 2000);

    return () => clearInterval(intervaal);
  }, []);

  return (
    <div
      onClick={handleOverallState}
      className="flex justify-between z-50 bg-gray-ish px-4 py-2 fixed w-[calc(100vw-330px)] shadow-md "
    >
      <div>
        <h1 className="flex gap-4 items-center">
          <button>
            <span className="text-2xl italic text-white-4">#</span>
          </button>
          <div className="">
            <span className="text-white-1">|</span>
            <span className="text-white-1 text-sm"> Welcome</span>
          </div>
        </h1>
      </div>
      <div className="flex gap-4 items-center">
        <button
          onClick={handleRoomState}
          className="text-2xl hover:text-white-1 text-white-3 relative"
        >
          <BsFillInfoCircleFill />
          {isRoomInfo && (
            <div
              className={` p-3 rounded absolute  top-9 right-0 w-[300px] bg-white/5 backdrop-blur-md`}
            >
              <div className="flex justify-center">
                <img
                  className="w-20 h-20 text-center rounded-full bg-room-black p-2"
                  src={"http://localhost:8000" + data.avatar}
                  alt=""
                />
              </div>
              <div className="pt-4">
                <p className="text-center text-white-2 text-base capitalize">
                  {data.name}
                </p>
                <p className="flex gap-2 items-center justify-center py-2 text-sm">
                  <span>Room</span>
                  <span>.</span>{" "}
                  <span className="text-white-2">{data.members.length}</span>
                  <span className="text-white-2">
                    {data.members.length > 1 ? "members" : "member"}
                  </span>
                </p>
                <p className="text-center text-white-2 text-sm pb-3">
                  {data.description}
                </p>
                <div className="text-xs text-left pt-3">
                  <p>
                    Created by{" "}
                    <span className="text-white-2">{data.host.username} </span>
                  </p>
                  <p>
                    Created at{" "}
                    <span className="text-white-2">{formattedDate}</span>{" "}
                  </p>
                </div>
              </div>
            </div>
          )}
        </button>
        <button
          onClick={handleOpenedState}
          // onClick={() => setParticipants(!openParticipants)}
          className="text-2xl hover:text-white-1 text-white-3 relative"
        >
          <IoPeopleSharp />
          {openParticipants && (
            <div className=" p-4 flex flex-col gap-4 rounded text-base absolute top-9 right-0 w-[300px] bg-white/5 backdrop-blur-md">
              {loading
                ? "loading.."
                : loadParticipants.map((participants: any) => {
                    return (
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={Image.src}
                            alt=""
                          />
                          <div className="text-white-4 text-left text-sm lowercase">
                            <p>{participants.username}</p>
                            <p className="text-xs text-white-2 ">
                              {participants.display_name}
                            </p>
                          </div>
                        </div>
                        <span>
                          <FaAngleRight />
                        </span>
                      </div>
                    );
                  })}
            </div>
          )}
        </button>
        <button className="text-2xl hover:text-white-1 text-white-3 relative">
          <IoMdSettings />
          {/* <div className="">
            <button>Delete</button>
          </div> */}
        </button>
      </div>
    </div>
  );
};

export default RoomMsgHeader;
