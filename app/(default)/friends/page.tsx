import Modal from "@/app/components/modal/Modal";
import RoomModal from "@/app/components/modal/RoomModal";
import { useModalState } from "@/app/context/StateContext";
import { FaUserFriends } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

const page = () => {
  // const { isModalOpen, roomModalOpen } = useModalState();

  return (
    // <div className="bg-gray-ish h-screen overflow-auto ml-[330px] w-[calc(100vw-330px)]">
    <main>
      <div className="bg-gray-ish h-screen overflow-hidden ml-[330px] w-[calc(100vw-330px)]">
        <div className="flex justify-between fixed top-0 w-[calc(100vw-360px)] py-2 px-4 border-b-2 border-room-black bg-gray-ish">
          <div className="flex gap-4 items-center">
            <span className="text-white-1 text-2xl">
              <FaUserFriends />
            </span>
            <p className="text-white-1 font-semibold">Friends</p>
          </div>
          <div className="flex gap-5 items-center">
            <button
              // onClick={() => setRoomModalOpen(true)}
              className="text-white-2  hover:text-white-1 hover:bg-white/5 rounded  px-3 py-1 bg-white/10 backdrop-blur-md"
            >
              Create Server
            </button>
            <p className="text-white-2  hover:text-white-1 hover:bg-white/5 rounded  px-3 py-1 bg-white/10 backdrop-blur-md">
              All
            </p>
          </div>
        </div>
        <div className="flex mt-12 ">
          <div className="mx-6 pt-4  w-[600px] ">
            <form className="fixed h-20 bg-gray-ish w-[600px]">
              <input
                className="text-white-1 h-10 rounded placeholder:text-white-3 px-3 focus:outline-none bg-room-deep-black w-full"
                type="text"
                placeholder="Search"
              />
              <p className="text-left text-xs rounded h-7  text-white-4 uppercase font-semibold mt-5">
                <span>All Friends</span> <span>10</span>
              </p>
            </form>
            <div className="pt-24 flex flex-col overflow-x-auto ">
              <div className="flex justify-between items-center border-t border-b py-3 border-room-black-2 hover:text-white-1 hover:bg-white/5 hover:border-none hover:rounded-lg px-4">
                <div>
                  <p className="text-white-1">Abraham</p>
                  <p className="text-white-4 text-sm">abraham</p>
                </div>
                <button className="text-white-3 hover:text-white-1 text-2xl hover:scale-110 transition-all duration-75">
                  <IoIosSettings />
                </button>
              </div>
            </div>
          </div>
          <div className="border-l h-screen border-room-black-2">
            <h1 className="capitalize py-6 px-4 text-xl font-semibold text-white-2 ">
              Popular Topics
            </h1>
          </div>
        </div>
      </div>
      {/* <Modal />
      <RoomModal /> */}
      {/* {isModalOpen && <Modal />}
      {roomModalOpen && <RoomModal />} */}
    </main>
  );
};

export default page;
