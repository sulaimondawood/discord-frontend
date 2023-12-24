import { axiosInstance } from "@/utils/axios";
import Image from "@/assets/images/avatar.jpg";
import UserSettingsModal from "@/app/components/modal/UserSettingsModal";
async function getUniqueUser(id: number) {
  const res = await axiosInstance.get("user/" + id);
  console.log(res);

  return res.data;
}

const page = async ({ params }: { params: { id: number } }) => {
  const data = await getUniqueUser(params.id);
  const user = data[0];
  return (
    <div className="bg-gray-ish h-screen py-14 px-10 ml-[330px] w-[calc(100vw-330px)]">
      <h1 className="text-white text-xl font-semibold">My Account</h1>
      <div className="bg-room-deep-black w-[650px] rounded-md mt-6 pb-5 h-fit">
        <div className="w-full h-24 bg-orange-100 rounded-tl-md rounded-tr-md"></div>
        <div className="bg-room-deep-black px-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                className="w-20 h-20 rounded-full -mt-5 bg-room-deep-black p-2"
                src={Image.src}
                alt=""
              />
              <p className="text-white-1 text-lg">#{user?.username}</p>
            </div>
            <button className="bg-blue-500 py-1 px-4 text-white text-sm rounded">
              Edit User Profile
            </button>
          </div>

          <div className="bg-white/5 rounded-md p-4 mt-4 backdrop-blur-sm flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="uppercase text-white-3 text-xs">Display name</p>
                <p className="text-white-1">{user.display_name}</p>
              </div>
              <button className="bg-white/10 backdrop-blur-md rounded-sm py-1 px-3 text-white">
                Edit
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="uppercase text-white-3 text-xs">username</p>
                <p className="text-white-1">{user.username}</p>
              </div>
              <button className="bg-white/10 backdrop-blur-md rounded-sm py-1 px-3 text-white">
                Edit
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="uppercase text-white-3 text-xs">email</p>
                <p className="text-white-1">{user.email}</p>
              </div>
              <button className="bg-white/10 backdrop-blur-md rounded-sm py-1 px-3 text-white ">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserSettingsModal />
    </div>
  );
};

export default page;
