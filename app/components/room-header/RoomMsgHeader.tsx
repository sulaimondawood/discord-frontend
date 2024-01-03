"use client";

import React, { useEffect, useState } from "react";
import { IoPeopleSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { useModalState } from "@/app/context/StateContext";
import { FaAngleRight } from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";

import { useRouter } from "next/navigation";
import { useTokens } from "@/hooks/useTokensConfig";
interface IRoom {
  host: any;
  name: string;
  description: string;
  avatar: string;
  avatar_url: string;
  created: string;
  members: any[];
}

export const dynamic = "force-dynamic";

const RoomMsgHeader = ({
  data,
  params,
  msg,
}: {
  data: IRoom;
  params: number;
  msg: string;
}) => {
  const { setParticipants, isRoomInfo, setRoomInfo, openParticipants } =
    useModalState();
  const [loadParticipants, setLoadParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const date = new Date(data?.created);

  const axiosInstancePrivate = useTokens();

  const formattedDate = date.toLocaleString("en-US", {
    timeZone: "UTC", // Adjust time zone if needed
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const router = useRouter();
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
      const data = await res?.data?.data;
      if (data) {
        setLoadParticipants(data.members);
        console.log(loadParticipants);
        setLoading(false);
      }
    };

    getParticipants();
  }, [msg]);

  return (
    <div
      onClick={handleOverallState}
      className="flex justify-between z-50 bg-gray-ish px-2 md:px-4 py-2 fixed w-[calc(100vw-58px)] md:w-[calc(100vw-330px)] shadow-md"
    >
      <div>
        <h1 className="flex gap-2 md:gap-4 items-center">
          <button>
            <span className="text-sm md:text-2xl italic text-white-4">#</span>
          </button>
          <div className="">
            <span className="text-white-1">|</span>
            <span className="text-white-1 text-xs md:text-sm"> Welcome</span>
          </div>
        </h1>
      </div>
      <div className="flex gap-4 items-center">
        <button
          onClick={handleRoomState}
          className="text-lg md:text-2xl hover:text-white-1 text-white-3 relative"
        >
          <BsFillInfoCircleFill />
          {isRoomInfo && (
            <div
              className={` p-3 rounded absolute top-8 md:top-9 -right-10 md:right-0 w-[220px] md:w-[300px] bg-white/5 backdrop-blur-xl md:backdrop-blur-md`}
            >
              <div className="flex justify-center">
                <img
                  className="w-20 h-20 text-center rounded-full bg-room-black p-2"
                  src={data.avatar_url}
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
          className="text-lg md:text-2xl hover:text-white-1 text-white-3 relative"
        >
          <IoPeopleSharp />
          {openParticipants && (
            <div className=" p-3 md:p-4 flex hover:text-white-3 flex-col gap-3 md:gap-4 rounded text-base absolute top-8 md:top-9 -right-10 md:right-0 w-[250px] md:w-[300px] bg-white/5 backdrop-blur-md">
              {loading ? (
                "loading.."
              ) : loadParticipants.length >= 1 ? (
                loadParticipants.map((participant: any, index: number) => {
                  return (
                    <div
                      onClick={() => router.push(`/account/` + participant.id)}
                      key={index}
                      className="flex justify-between items-center cursor-pointer"
                    >
                      <div className="flex gap-3 items-center">
                        <img
                          className="w-10 h-10 rounded-full"
                          src={participant.avatar}
                          alt=""
                        />
                        <div className="text-white-4 text-left text-sm lowercase">
                          <p>{participant.username}</p>
                          <p className="text-xs text-white-2 ">
                            {participant.display_name}
                          </p>
                        </div>
                      </div>
                      <span>
                        <FaAngleRight />
                      </span>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-white-3">
                  No participants yet! Engage to join as participant
                </p>
              )}
            </div>
          )}
        </button>
        <button className="text-lg md:text-2xl hover:text-white-1 text-white-3 relative">
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
