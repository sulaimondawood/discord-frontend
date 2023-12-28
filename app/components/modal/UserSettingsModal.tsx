"use client";
import { useModalState } from "@/app/context/StateContext";
import { axiosInstancePrivate } from "@/utils/axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

const UserSettingsModal = ({ params }: { params: number }) => {
  const { isUserModalOpen, setUserModalOpen } = useModalState();
  const [username, setUsername] = useState("");
  const [display_name, setDisplayName] = useState("");
  const [file, setFile] = useState<any>(null);

  const router = useRouter();
  async function handleUpdateUser(e: FormEvent) {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("display_name", display_name);
    formdata.append("avatar", file);
    const res = await axiosInstancePrivate.put(
      "user/" + params + "/",
      formdata
    );
    if (res.status == 200) {
      console.log(res);
      setUserModalOpen(false);
      router.refresh();
      // window.location.reload();
    }
  }

  return (
    <div>
      <div
        onClick={() => setUserModalOpen(false)}
        className={`bg-black/90 z-50 fixed inset-0 ${
          isUserModalOpen
            ? " scale-100"
            : "scale-0 delay-300 duration-500 opacity-0 "
        } transition-all duration-300`}
      ></div>
      <form
        className={`${
          isUserModalOpen ? "scale-100 delay-300" : "delay-0 scale-0"
        } z-[999] bg-gray-ish w-[450px] mx-auto ease-in-out p-5 transition-all duration-300 fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}
      >
        <div className="pb-6 text-white-2  text-center">
          <h1 className="text-2xl text-white ">Update your account</h1>
          <p className=" w-full max-w-md text-sm">
            Enter new username, display name for an update to your account
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="username"
              className="text-xs font-semibold uppercase text-white-3"
            >
              Username
            </label>
            <input
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="w-full focus:outline-none bg-room-deep-black px-4 py-2 rounded text-white-1"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="displayname"
              className="text-xs uppercase text-white-3"
            >
              Display name
            </label>
            <input
              onChange={(e) => setDisplayName(e.target.value)}
              value={display_name}
              id="displayname"
              className="w-full focus:outline-none bg-room-deep-black px-4 py-2 rounded text-white-1"
              type="text"
            />
          </div>

          <div className="flex flex-col text-white-2 gap-2 border-dashed border border-white-4/40 py-4 text-center">
            <label htmlFor="img">Upload Sever Image</label>
            <input
              onChange={(e) => setFile(e.target.files![0])}
              id="img"
              name="avatar"
              className="hidden"
              type="file"
            />
          </div>

          <div className="text-white-1 text-xs flex gap-6 items-center justify-end">
            <button type="button" onClick={() => setUserModalOpen(false)}>
              Cancel
            </button>
            <button
              onClick={handleUpdateUser}
              className="bg-blue-600 hover:bg-blue-800 px-5 py-2 rounded-sm"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserSettingsModal;
