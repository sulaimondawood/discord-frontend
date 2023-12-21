"use client";
import { axiosInstancePrivate } from "@/utils/axios";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface IInputProps {
  params: any;
}
const Input = ({ params }: IInputProps) => {
  const [msg, setMsg] = useState("");

  function handleMsg(value: string) {
    setMsg(value);
    console.log(msg);
  }

  async function sendMsgs(e: FormEvent) {
    e.preventDefault();
    console.log(params);
    const res = await axiosInstancePrivate.post(`room/room-server/${params}/`, {
      message: msg,
    });

    console.log(res);
  }
  return (
    <form
      onSubmit={sendMsgs}
      className="bg-gray-ish fixed bottom-0 p-4 w-[calc(100vw-330px)] "
    >
      <input
        className="focus:outline-none rounded-md p-4 backdrop-blur-md bg-white/5 text-white-4 text-sm w-full"
        onChange={(e) => handleMsg(e.target.value)}
        value={msg}
        type="text"
        placeholder="Message # | welcome"
      />
    </form>
  );
};

export default Input;
