import { CreateServerBtn } from "@/app/components/buttons/CreateServerBtn";
import FriendsMobile from "@/app/components/friends-mobile-view/FriendsMobile";
import SearchFriendsInput from "@/app/components/input/SearchFriendsInput";
import { FaUserFriends } from "react-icons/fa";

const Friends = async () => {
  return (
    <main>
      <div className="hidden md:block bg-gray-ish h-screen overflow-hidden ml-[330px] w-[calc(100vw-330px)]">
        <div className="flex justify-between fixed top-0 w-[calc(100vw-330px)] py-2 px-4 border-b-2 border-room-black bg-gray-ish">
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

      {/* mobile */}
      <FriendsMobile />
    </main>
  );
};

export default Friends;
