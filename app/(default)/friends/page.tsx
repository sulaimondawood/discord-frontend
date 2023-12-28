import { CreateServerBtn } from "@/app/components/buttons/CreateServerBtn";
import SearchFriendsInput from "@/app/components/input/SearchFriendsInput";
import { FaUserFriends } from "react-icons/fa";

const page = async () => {
  return (
    <main>
      <div className="bg-gray-ish h-screen overflow-hidden ml-[330px] w-[calc(100vw-330px)]">
        <div className="flex justify-between fixed top-0 w-[calc(100vw-360px)] py-2 px-4 border-b-2 border-room-black bg-gray-ish">
          <div className="flex gap-4 items-center">
            <span className="text-white-1 text-2xl">
              <FaUserFriends />
            </span>
            <p className="text-white-1 text-sm tracking-wider ">Friends</p>
          </div>
          <div className="flex gap-5 items-center">
            <CreateServerBtn>Create Server</CreateServerBtn>
            <p className="text-white-2 text-sm hover:text-white-1 hover:bg-white/5 rounded  px-3 py-1 bg-white/10 backdrop-blur-md">
              All
            </p>
          </div>
        </div>
        <SearchFriendsInput />
      </div>
    </main>
  );
};

export default page;
