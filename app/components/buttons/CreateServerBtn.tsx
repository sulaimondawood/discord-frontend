"use client";

import { useModalState } from "@/app/context/StateContext";

export const CreateServerBtn = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setRoomModalOpen } = useModalState();
  return (
    <button
      onClick={() => setRoomModalOpen(true)}
      className="text-white-2 text-sm hover:text-white-1 hover:bg-white/5 rounded  px-3 py-1 bg-white/10 backdrop-blur-md"
    >
      {children}
    </button>
  );
};
