"use client";
import { useModalState } from "@/app/context/StateContext";

export const FindServerButton = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setModalOpen } = useModalState();

  return (
    <button
      onClick={() => setModalOpen(true)}
      className=" px-3 py-1 text-left text-xs pl-2 rounded bg-room-deep-black w-full h-7 text-white-4"
    >
      {children}
    </button>
  );
};
