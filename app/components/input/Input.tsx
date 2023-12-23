"use client";
import { useModalState } from "@/app/context/StateContext";
import { axiosInstancePrivate } from "@/utils/axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

interface IInputProps {
  params: any;
}
const Input = ({ params }: IInputProps) => {
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const { latestInputRef, inputRef, focus } = useModalState();

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

    if (res.status == 201) setMsg("");
    router.refresh();
    console.log(res);
    if (latestInputRef.current) {
      latestInputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    if (latestInputRef.current) {
      latestInputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msg]);
  return (
    <form
      onSubmit={sendMsgs}
      className="bg-gray-ish fixed bottom-0 p-4 w-[calc(100vw-330px)] "
    >
      <input
        ref={inputRef}
        className="focus:outline-none focus:border-white-1 focus:border rounded-md p-4 backdrop-blur-md bg-white/5 text-white-4 text-sm w-full"
        onChange={(e) => handleMsg(e.target.value)}
        value={msg}
        type="text"
        placeholder="Message # | welcome"
      />
    </form>
  );
};

export default Input;

// This is the code casuinf hydration
// This is the code casuinf hydration
// This is the code casuinf hydration
// This is the code casuinf hydration
// This is the code casuinf hydration
// This is the code casuinf hydration
// This is the code casuinf hydration
// After addding scrollinto view
