import SideBar from "@/components/Sidebar/SideBar";
import Modal from "@/components/modal/Modal";
import { useModalState } from "@/context/StateContext";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex items-start">
        <SideBar></SideBar>
        {children}
      </div>
    </>
  );
}
