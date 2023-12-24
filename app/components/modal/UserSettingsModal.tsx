"use client";
import { useModalState } from "@/app/context/StateContext";
import React from "react";

const UserSettingsModal = () => {
  const { isUserModalOpen, setUserModalOpen } = useModalState();
  return (
    <div className="">
      {isUserModalOpen && (
        <div className="bg-black/90 z-50 fixed inset-0"></div>
      )}
      <form className="z-[999] bg-gray-ish w-[450px] mx-auto p-5 fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
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
              id="displayname"
              className="w-full focus:outline-none bg-room-deep-black px-4 py-2 rounded text-white-1"
              type="text"
            />
          </div>

          <div className="text-white-1 text-xs flex gap-6 items-center justify-end">
            <button>Cancel</button>
            <button className="bg-blue-600 hover:bg-blue-800 px-5 py-2 rounded-sm">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserSettingsModal;
