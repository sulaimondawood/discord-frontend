"use client";
import React, { useState } from "react";

const Input = () => {
  const [msg, setMsg] = useState("");

  function handleMsg(value: string) {
    setMsg(value);
  }
  return (
    <form
      onSubmit={() => ""}
      className="bg-gray-ish fixed bottom-0 p-4 w-[calc(100vw-330px)] "
    >
      <input
        className=" rounded-md p-4 backdrop-blur-md bg-white/5 text-white-4 text-sm w-full"
        onChange={(e) => handleMsg(e.target.value)}
        type="text"
        placeholder="Message # | welcome"
      />
    </form>
  );
};

export default Input;
