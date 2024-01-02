"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import navList from "@/utils/nav";
import { useModalState } from "@/app/context/StateContext";
import { useTokens } from "@/hooks/useTokensConfig";
import { FindServerButton } from "../buttons/FindServer";
import SideBarProfileLink from "../profile-setting/SideBarProfileLink";
import { axiosInstance } from "@/utils/axios";
import { FaAngleRight } from "react-icons/fa";
import Spinner from "../loader/Spinner";

import { IoMdArrowBack } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { sliceText } from "@/utils/slicer";

const SideBar = () => {
  const path = usePathname();
  const axiosInstancePrivate = useTokens();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any[]>([]);
  const [userList, setUserList] = useState(true);
  const [activeUser, setActiveUser] = useState<any[]>([]);
  const [userActive, setActive] = useState(true);
  const {
    showAccount,
    setShowAccount,
    showFriends,
    setShowFriends,
    showRoom,
    setShowRoom,
    setRoomModalOpen,
  } = useModalState();

  setRoomModalOpen;

  const router = useRouter();
  useEffect(() => {
    const activeUser = JSON.parse(localStorage?.getItem("user")!);
    async function getRoomLists() {
      const res = await axiosInstancePrivate.get("room/all-rooms/", {
        withCredentials: true,
      });

      const data = res.data;
      if (data) {
        setData(data);
        setLoading(false);
      }

      const userResponse = await axiosInstance.get("user/");
      const userData = userResponse.data;

      if (userData) {
        setUserData(userData);
        setUserList(false);
      }
    }

    async function getSingleUser() {
      const res = await axiosInstance.get("user/" + activeUser.id + "/");
      if (res.status == 200) {
        setActiveUser(res.data);
        setActive(false);
      }
    }

    getSingleUser();

    getRoomLists();
  }, []);

  function handlePageState() {
    if (showAccount) {
      setShowAccount(false);
      router.push("/rooms");
    }
    if (showFriends) {
      setShowFriends(false);
      router.push("/rooms");
    }
    if (showRoom) {
      setShowRoom(false);
      router.push("/rooms");
    }
  }

  return (
    <>
      <div className="h-screen fixed flex items-start">
        <div className="w-14 md:w-[80px] flex flex-col items-center h-screen overflow-hidden bg-room-deep-black py-4 ">
          <div className="h-[calc(100vh-160px)] md:h-[calc(100vh-180px)] w-full px-1 md:px-2 overflow-auto side-bar">
            <div className="flex flex-col items-center gap-4">
              {loading ? (
                <Spinner showText={false} />
              ) : (
                data.map((item: RoomList, index) => {
                  return (
                    <Link
                      className="relative group"
                      key={item.id}
                      href={`/rooms/${item.id}`}
                    >
                      <div className="bg-white rounded-full h-2 absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 w-[6px] group-hover:h-6 duration-200 transition-all"></div>
                      <img
                        className="w-11 h-11 md:w-[50px] md:h-[50px] rounded-full group-hover:rounded-2xl transition-all duration-150 ease-linear object-cover"
                        src={item.avatar_url}
                        alt=""
                      />
                    </Link>
                  );
                })
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 absolute bottom-4">
            <button
              onClick={() => setRoomModalOpen(true)}
              className="text-green-500 hover:bg-green-500 hover:rounded-2xl hover:scale-100 hover:text-green-50 text-2xl bg-white/10 backdrop-blur-md p-3 md:p-4 rounded-full transition-all duration-50000 ease-linear"
            >
              <IoAdd />
            </button>
            <button
              onClick={handlePageState}
              className="text-green-500 hover:bg-green-500 hover:rounded-2xl hover:scale-100 hover:text-green-50 text-2xl bg-white/10 backdrop-blur-md p-3 md:p-4 rounded-full transition-all duration-50000 ease-linear"
            >
              <IoMdArrowBack />
            </button>
          </div>
        </div>
        <div className="bg-room-black overflow-auto h-screen w-[calc(100vw-70px)] sm:w-[calc(100vw-180px)] md:w-[250px] px-2 md:px-3 py-4">
          <FindServerButton>Find or start a room</FindServerButton>
          <div className="mt-4 relative">
            <div className=" flex flex-col gap-2">
              {navList.map((item) => {
                return (
                  <Link
                    key={item.id}
                    href={item.url}
                    className={`${
                      path === item.url
                        ? "bg-white/10 text-white-1 backdrop-blur-md"
                        : "text-white-4"
                    }    hover:text-white-1 hover:bg-white/5 rounded flex items-center gap-4 p-2`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <button>{item.name}</button>
                  </Link>
                );
              })}
            </div>
            <div className="mt-5">
              <p className="text-white-4 font-semibold text-xs md:text-sm uppercase">
                Popular Users
              </p>
              <div className="h-[calc(100vh-300px)] flex flex-col gap-4 mt-5 w-[calc(100vw-80px)] sm:w-[calc(100vw-196px)] md:w-[225px] pr-4 overflow-auto">
                {userList ? (
                  <Spinner showText={true} />
                ) : (
                  userData.map((user: any, index: number) => {
                    return (
                      <Link
                        key={index}
                        href={`/account/${user.id}`}
                        className="flex justify-between items-center hover:bg-white/5 hover:backdrop-blur-md p-2 rounded"
                      >
                        <div className="flex gap-3 items-center">
                          <img
                            className="w-8 h-8 object-cover rounded-full"
                            src={user.avatar}
                            alt=""
                          />
                          <div className="text-white-4 text-left text-sm lowercase">
                            <p>{sliceText(user.username)}</p>
                            <p className="text-xs  text-white-2 ">
                              {sliceText(user.display_name)}
                            </p>
                          </div>
                        </div>
                        <span className="text-white-2">
                          <FaAngleRight />
                        </span>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
            {/* {activeUser.map((user) => {
              return <SideBarProfileLink key={user.id} user={user} />;
            })} */}
          </div>
          {activeUser.map((user) => {
            return <SideBarProfileLink key={user.id} user={user} />;
          })}
        </div>
      </div>
    </>
  );
};

export default SideBar;

// "use client";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";

// import navList from "@/utils/nav";
// import { useModalState } from "@/app/context/StateContext";
// import { useTokens } from "@/hooks/useTokensConfig";
// import { FindServerButton } from "../buttons/FindServer";
// import SideBarProfileLink from "../profile-setting/SideBarProfileLink";
// import { axiosInstance } from "@/utils/axios";
// import { FaAngleRight } from "react-icons/fa";
// import Spinner from "../loader/Spinner";

// import { IoMdArrowBack } from "react-icons/io";
// import { IoAdd } from "react-icons/io5";

// const SideBar = () => {
//   const path = usePathname();
//   const axiosInstancePrivate = useTokens();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userData, setUserData] = useState<any[]>([]);
//   const [userList, setUserList] = useState(true);
//   const [activeUser, setActiveUser] = useState<any[]>([]);
//   const [userActive, setActive] = useState(true);
//   const {
//     showAccount,
//     setShowAccount,
//     showFriends,
//     setShowFriends,
//     showRoom,
//     setShowRoom,
//     setRoomModalOpen,
//   } = useModalState();

//   setRoomModalOpen;

//   const router = useRouter();
//   useEffect(() => {
//     const activeUser = JSON.parse(localStorage?.getItem("user")!);
//     async function getRoomLists() {
//       const res = await axiosInstancePrivate.get("room/all-rooms/", {
//         withCredentials: true,
//       });

//       const data = res.data;
//       if (data) {
//         setData(data);
//         setLoading(false);
//       }

//       const userResponse = await axiosInstance.get("user/");
//       const userData = userResponse.data;

//       if (userData) {
//         setUserData(userData);
//         setUserList(false);
//       }
//     }

//     async function getSingleUser() {
//       const res = await axiosInstance.get("user/" + activeUser.id + "/");
//       if (res.status == 200) {
//         setActiveUser(res.data);
//         setActive(false);
//       }
//     }

//     getSingleUser();

//     getRoomLists();
//   }, []);

//   function handlePageState() {
//     if (showAccount) {
//       setShowAccount(false);
//       router.push("/rooms");
//     }
//     if (showFriends) {
//       // setChecker(!checker);
//       setShowFriends(false);
//       router.push("/rooms");
//     }
//     if (showRoom) {
//       router.push("/rooms");
//       setShowRoom(false);
//     }
//   }

//   return (
//     <>
//       <div
//         className=" hidden
//        h-screen fixed md:flex "
//       >
//         <div className="w-14 md:w-[80px] flex flex-col items-center h-screen overflow-hidden bg-room-deep-black py-4 ">
//           <div className="h-[calc(100vh-180px)] w-full px-2 overflow-auto side-bar">
//             <div className="flex flex-col items-center gap-4">
//               {loading ? (
//                 <Spinner showText={false} />
//               ) : (
//                 data.map((item: RoomList, index) => {
//                   return (
//                     <Link
//                       className="relative group"
//                       key={item.id}
//                       href={`/rooms/${item.id}`}
//                     >
//                       <div className="bg-white rounded-full h-2 absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 w-[6px] group-hover:h-6 duration-200 transition-all"></div>
//                       <img
//                         className="w-11 h-11 md:w-[50px] md:h-[50px] rounded-full group-hover:rounded-2xl transition-all duration-150 ease-linear object-cover"
//                         src={item.avatar}
//                         alt=""
//                       />
//                     </Link>
//                   );
//                 })
//               )}
//               {loading ? (
//                 <Spinner showText={false} />
//               ) : (
//                 data.map((item: RoomList, index) => {
//                   return (
//                     <Link
//                       className="relative group"
//                       key={item.id}
//                       href={`/rooms/${item.id}`}
//                     >
//                       <div className="bg-white rounded-full h-2 absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 w-[6px] group-hover:h-6 duration-200 transition-all"></div>
//                       <img
//                         className="w-11 h-11 md:w-[50px] md:h-[50px] rounded-full group-hover:rounded-2xl transition-all duration-150 ease-linear object-cover"
//                         src={item.avatar}
//                         alt=""
//                       />
//                     </Link>
//                   );
//                 })
//               )}
//               {loading ? (
//                 <Spinner showText={false} />
//               ) : (
//                 data.map((item: RoomList, index) => {
//                   return (
//                     <Link
//                       className="relative group"
//                       key={item.id}
//                       href={`/rooms/${item.id}`}
//                     >
//                       <div className="bg-white rounded-full h-2 absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 w-[6px] group-hover:h-6 duration-200 transition-all"></div>
//                       <img
//                         className="w-11 h-11 md:w-[50px] md:h-[50px] rounded-full group-hover:rounded-2xl transition-all duration-150 ease-linear object-cover"
//                         src={item.avatar}
//                         alt=""
//                       />
//                     </Link>
//                   );
//                 })
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col items-center justify-center gap-4 fixed bottom-4">
//             <button
//               onClick={() => setRoomModalOpen(true)}
//               className="text-green-500 hover:bg-green-500 hover:rounded-2xl hover:scale-100 hover:text-green-50 text-2xl bg-white/10 backdrop-blur-md p-4 rounded-full transition-all duration-50000 ease-linear"
//             >
//               <IoAdd />
//             </button>
//             <button
//               onClick={() => router.push("/rooms")}
//               className="text-green-500 hover:bg-green-500 hover:rounded-2xl hover:scale-100 hover:text-green-50 text-2xl bg-white/10 backdrop-blur-md p-4 rounded-full transition-all duration-50000 ease-linear"
//             >
//               <IoMdArrowBack />
//             </button>
//           </div>
//         </div>
//         <div className="bg-room-black overflow-auto h-screen w-[calc(100vw-76px)] sm:w-[calc(100vw-196px)] md:w-[250px] px-1 md:px-3 py-4">
//           <FindServerButton>Find or start a room</FindServerButton>
//           <div className="mt-4 relative">
//             <div className=" flex flex-col gap-2">
//               {navList.map((item) => {
//                 return (
//                   <Link
//                     key={item.id}
//                     href={item.url}
//                     className={`${
//                       path === item.url
//                         ? "bg-white/10 text-white-1 backdrop-blur-md"
//                         : "text-white-4"
//                     }    hover:text-white-1 hover:bg-white/5 rounded flex items-center gap-4 p-2`}
//                   >
//                     <span className="text-2xl">{item.icon}</span>
//                     <button>{item.name}</button>
//                   </Link>
//                 );
//               })}
//             </div>
//             <div className="mt-5">
//               <p className="text-white-4 font-semibold text-sm uppercase">
//                 Popular Users
//               </p>
//               <div className="h-[calc(100vh-300px)] flex flex-col gap-4 mt-5 w-[calc(100vw-80px)] sm:w-[calc(100vw-196px)] pr-4 overflow-auto">
//                 {/* <div className="h-[370px] flex flex-col gap-4 mt-5 w-[225px] overflow-auto"> */}
//                 {userList ? (
//                   <Spinner showText={true} />
//                 ) : (
//                   userData.map((user: any, index: number) => {
//                     return (
//                       <Link
//                         key={index}
//                         href={`/account/${user.id}`}
//                         className="flex justify-between items-center hover:bg-white/5 hover:backdrop-blur-md p-2 rounded"
//                       >
//                         <div className="flex gap-3 items-center">
//                           <img
//                             className="w-8 h-8 object-cover rounded-full"
//                             src={user.avatar}
//                             alt=""
//                           />
//                           <div className="text-white-4 text-left text-sm lowercase">
//                             <p>{user.username}</p>
//                             <p className="text-xs  text-white-2 ">
//                               {user.display_name}
//                             </p>
//                           </div>
//                         </div>
//                         <span className="text-white-2">
//                           <FaAngleRight />
//                         </span>
//                       </Link>
//                     );
//                   })
//                 )}
//               </div>
//             </div>
//             {activeUser.map((user) => {
//               return <SideBarProfileLink key={user.id} user={user} />;
//             })}
//           </div>
//         </div>
//       </div>

//       {/* mobile */}
//       <div className=" h-screen fixed flex md:hidden ">
//         <div className="w-14 md:w-[80px] h-screen overflow-hidden bg-room-deep-black py-4 ">
//           <div className="h-[calc(100vh-150px)] side-bar px-1 md:px-2  overflow-auto ">
//             <div className="flex flex-col items-center gap-4">
//               {loading ? (
//                 <Spinner showText={false} />
//               ) : (
//                 data.map((item: RoomList, index) => {
//                   return (
//                     <Link
//                       className="relative group"
//                       key={item.id}
//                       href={`/rooms/${item.id}`}
//                     >
//                       <div className="bg-white rounded-full h-2 absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 w-[6px] group-hover:h-6 duration-200 transition-all"></div>
//                       <img
//                         className="w-11 h-11 md:w-[50px] md:h-[50px] rounded-full group-hover:rounded-2xl transition-all duration-150 ease-linear object-cover"
//                         src={item.avatar}
//                         alt=""
//                       />
//                     </Link>
//                   );
//                 })
//               )}
//               {loading ? (
//                 <Spinner showText={false} />
//               ) : (
//                 data.map((item: RoomList, index) => {
//                   return (
//                     <Link
//                       className="relative group"
//                       key={item.id}
//                       href={`/rooms/${item.id}`}
//                     >
//                       <div className="bg-white rounded-full h-2 absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 w-[6px] group-hover:h-6 duration-200 transition-all"></div>
//                       <img
//                         className="w-11 h-11 md:w-[50px] md:h-[50px] rounded-full group-hover:rounded-2xl transition-all duration-150 ease-linear object-cover"
//                         src={item.avatar}
//                         alt=""
//                       />
//                     </Link>
//                   );
//                 })
//               )}
//               {loading ? (
//                 <Spinner showText={false} />
//               ) : (
//                 data.map((item: RoomList, index) => {
//                   return (
//                     <Link
//                       className="relative group"
//                       key={item.id}
//                       href={`/rooms/${item.id}`}
//                     >
//                       <div className="bg-white rounded-full h-2 absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 w-[6px] group-hover:h-6 duration-200 transition-all"></div>
//                       <img
//                         className="w-11 h-11 md:w-[50px] md:h-[50px] rounded-full group-hover:rounded-2xl transition-all duration-150 ease-linear object-cover"
//                         src={item.avatar}
//                         alt=""
//                       />
//                     </Link>
//                   );
//                 })
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col fixed bottom-4 gap-4 px-1">
//             <button
//               onClick={() => setRoomModalOpen(true)}
//               className="text-green-500 hover:bg-green-500 hover:rounded-2xl hover:scale-100 hover:text-green-50 text-2xl bg-white/10 backdrop-blur-md p-3 rounded-full transition-all duration-50000 ease-linear"
//             >
//               <IoAdd />
//             </button>
//             <button
//               onClick={handlePageState}
//               // onClick={() => router.push("/rooms")}
//               className="text-green-500 hover:bg-green-500 hover:rounded-2xl hover:scale-100 hover:text-green-50 text-2xl bg-white/10 backdrop-blur-md p-3 rounded-full transition-all duration-50000 ease-linear"
//             >
//               <IoMdArrowBack />
//             </button>
//           </div>
//         </div>
//         <div className="bg-room-black overflow-auto h-screen w-[calc(100vw-70px)] sm:w-[calc(100vw-180px)] px-2  py-4">
//           <FindServerButton>Find or start a room</FindServerButton>
//           <div className="mt-4 relative">
//             <div className=" flex flex-col gap-2">
//               {navList.map((item) => {
//                 return (
//                   <Link
//                     key={item.id}
//                     href={item.url}
//                     className={`${
//                       path === item.url
//                         ? "bg-white/10 text-white-1 backdrop-blur-md"
//                         : "text-white-4"
//                     }    hover:text-white-1 hover:bg-white/5 rounded flex items-center gap-4 p-2`}
//                   >
//                     <span className="text-2xl">{item.icon}</span>
//                     <button>{item.name}</button>
//                   </Link>
//                 );
//               })}
//             </div>
//             <div className="mt-5">
//               <p className="text-white-4 font-semibold text-[10px] uppercase">
//                 Popular Users
//               </p>
//               <div className="h-[calc(100vh-300px)]  flex flex-col gap-4 mt-5 w-[calc(100vw-80px)] sm:w-[calc(100vw-196px)] md:w-[225px] pr-4 overflow-auto">
//                 {/* <div className="h-[370px] flex flex-col gap-4 mt-5 w-[225px] overflow-auto"> */}
//                 {userList ? (
//                   <Spinner showText={true} />
//                 ) : (
//                   userData.map((user: any, index: number) => {
//                     return (
//                       <Link
//                         key={index}
//                         href={`/account/${user.id}`}
//                         className="flex justify-between items-center hover:bg-white/5 hover:backdrop-blur-md p-2 rounded"
//                       >
//                         <div className="flex gap-3 items-center">
//                           <img
//                             className="w-8 h-8 object-cover rounded-full"
//                             src={user.avatar}
//                             alt=""
//                           />
//                           <div className="text-white-4 text-left text-sm lowercase">
//                             <p>{user.username}</p>
//                             <p className="text-xs  text-white-2 ">
//                               {user.display_name}
//                             </p>
//                           </div>
//                         </div>
//                         <span className="text-white-2">
//                           <FaAngleRight />
//                         </span>
//                       </Link>
//                     );
//                   })
//                 )}
//               </div>
//             </div>
//             {activeUser.map((user) => {
//               return <SideBarProfileLink key={user.id} user={user} />;
//             })}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SideBar;
