"use client";

import { useModalState } from "@/app/context/StateContext";

const Modal = () => {
  const { setModalOpen } = useModalState();

  return (
    <>
      <div
        onClick={() => setModalOpen(false)}
        className="bg-black/20 z-50 fixed inset-0"
      ></div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 bg-white/10 text-white-1 backdrop-blur-md z-[999]   w-[600px] h-[400px] rounded-md">
        <form className="">
          <input
            className="bg-room-black py-4 px-3 rounded w-full focus:outline-none"
            type="text"
            placeholder="Where would you like to go?"
          />
        </form>
        <div className="overflow-auto h-[300px] mt-5">
          <p className="py-4 ">dawood Sulaimon</p>
        </div>
      </div>
    </>
  );
};

export default Modal;
