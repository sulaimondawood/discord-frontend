"use client";

import { useModalState } from "@/app/context/StateContext";
import Modal from "../components/modal/Modal";
import SideBar from "../components/Sidebar/SideBar";
import RoomModal from "../components/modal/RoomModal";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isModalOpen, roomModalOpen } = useModalState();

  return (
    <>
      <div className="flex items-start">
        <SideBar></SideBar>
        {children}
        {isModalOpen && <Modal />}
        {roomModalOpen && <RoomModal />}
      </div>
    </>
  );
}
