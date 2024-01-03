"use client";
import { axiosInstance } from "@/utils/axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { IoIosSettings } from "react-icons/io";
import Spinner from "../loader/Spinner";
import Link from "next/link";
import { sliceText } from "@/utils/slicer";
import { useTokens } from "@/hooks/useTokensConfig";

const SearchFriendsInput = () => {
  const [users, setUsers] = useState<any>([]);
  const [topics, setTopics] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingTopics, setLoadingTopics] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const axiosInstancePrivate = useTokens();
  useEffect(() => {
    async function handleGetUsers() {
      try {
        const res = await axiosInstance.get("user/");

        if (res?.data) {
          setUsers(res?.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching users:", error);
      }
    }

    async function getTopics() {
      const res = await axiosInstancePrivate.get("room/topics/");
      console.log(res);
      const data = res?.data.slice(0, 8);
      if (data) {
        setLoadingTopics(false);
        setTopics(data);
      }
    }
    getTopics();
    handleGetUsers();
  }, []);

  useEffect(() => {}, [users]);

  async function handleFilteredUser(e: FormEvent) {
    e.preventDefault();
    const res = await axiosInstancePrivate.get("user/?search=" + searchInput);
    setUsers(res.data);
  }

  return (
    <div className="flex mt-12 ">
      <div className="md:mx-4 pt-4 w-full md:w-[650px] ">
        <form
          onKeyUp={handleFilteredUser}
          className="fixed pl-2 pr-2 md:pr-0 md:pl-3 h-20 bg-gray-ish w-full s-custom:w-[320px]  m-screen:w-[350px] l-screen:w-[620px]"
        >
          <input
            className="text-white-1 h-8 rounded placeholder:text-sm placeholder:text-white-3 px-3 focus:outline-none bg-room-deep-black w-full"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          <p className="text-left text-[10px] rounded h-7 text-white-2 uppercase  mt-5">
            <span>All Friends</span> <span>({users.length})</span>
          </p>
        </form>
        <div className="pt-24 flex flex-col  overflow-auto h-[calc(100vh-80px)]">
          {isLoading ? (
            <Spinner showText={true} />
          ) : (
            users.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center border-t py-3 border-room-black-2/40 hover:text-white-1 hover:bg-white/5 hover:border-none hover:rounded-lg px-2 md:px-3"
                >
                  <Link
                    href={`/account/${item.id}`}
                    className="flex items-start gap-4"
                  >
                    <img
                      className="h-8 w-8 md:h-9 md:w-9 object-cover rounded-full"
                      src={item.avatar}
                      alt=""
                    />
                    <div>
                      <p className="text-white-1 capitalize text-sm md:text-base">
                        {sliceText(item.username)}
                      </p>
                      <p className="text-white-4 text-xs md:text-sm ">
                        {sliceText(item.display_name)}
                      </p>
                    </div>
                  </Link>
                  <button
                    onClick={() => router.push("/account/" + item.id)}
                    className="text-white-3 hover:text-white-1 text-2xl hover:scale-110 transition-all duration-75"
                  >
                    <IoIosSettings />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="hidden s-custom:block  border-l h-screen overflow-auto border-room-black-2">
        <h1
          className="text-xl md:text-lg lg:text-xl
         capitalize py-6 px-2 m-screen:px-4  font-semibold text-white-2 "
        >
          Popular Topics
        </h1>
        <div className="px-2 lg:px-4  flex flex-col gap-4">
          {isLoadingTopics ? (
            <Spinner showText={true} />
          ) : (
            topics.map((item: any, index: number) => {
              return (
                <p
                  className="text-xs lg:text-base rounded text-white-2  px-4 py-2 md:text-[10px] md:px-2 m-screen:text-xs lg:px-4 bg-white/5 backdrop-blur-md"
                  key={index}
                >
                  {item.title}
                </p>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFriendsInput;
