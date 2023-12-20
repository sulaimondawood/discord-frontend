import React from "react";
import { IoPeopleSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";

const RoomMsgHeader = () => {
  return (
    <div className="flex justify-between z-50 bg-gray-ish px-4 py-2 fixed w-[calc(100vw-330px)] shadow-md ">
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
        <button className="text-2xl hover:text-white-1 text-white-3">
          <IoPeopleSharp />
        </button>
        <button className="text-2xl hover:text-white-1 text-white-3">
          <IoMdSettings />
        </button>
      </div>
    </div>
  );
};

export default RoomMsgHeader;
