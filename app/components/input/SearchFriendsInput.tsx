"use client";
import { axiosInstance, axiosInstancePrivate } from "@/utils/axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { IoIosSettings } from "react-icons/io";

const SearchFriendsInput = () => {
  const [users, setUsers] = useState<any>([]);
  const [topics, setTopics] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  useEffect(() => {
    async function handleGetUsers() {
      try {
        const res = await axiosInstance.get("user/");
        if (res.status === 200) {
          console.log(res.data);

          setUsers(res.data);
          setLoading(false);
          console.log(users);
          console.log(isLoading);
        } else {
          console.error("Failed to fetch users:", res.statusText);
          // Handle error (e.g., display user-friendly message)
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error (e.g., display user-friendly message)
      }
    }

    async function getTopics() {
      const res = await axiosInstancePrivate.get("room/topics/");
      const data = res.data.slice(0, 10);
      console.log(data.slice(0, 6));
      if (res.status === 200) {
        setLoading(false);

        setTopics(data);
        console.log(topics);
      }
    }

    getTopics();
    handleGetUsers();
  }, []);

  useEffect(() => {
    console.log("Users state updated:", users);
    console.log("Data state updated:", isLoading);
    // Perform additional actions based on the updated state
  }, [users]);

  async function handleFilteredUser(e: FormEvent) {
    e.preventDefault();
    const res = await axiosInstance.get("user/?search=" + searchInput);
    console.log("filter search");

    console.log(res);
    setUsers(res.data);
    console.log("filter search ended");
  }

  return (
    <div className="flex mt-12 ">
      <div className="mx-6 pt-4  w-[650px] ">
        <form
          onKeyUp={handleFilteredUser}
          className="fixed h-20 bg-gray-ish w-[650px]"
        >
          <input
            className="text-white-1 h-10 rounded placeholder:text-white-3 px-3 focus:outline-none bg-room-deep-black w-full"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          <p className="text-left text-xs rounded h-7  text-white-4 uppercase font-semibold mt-5">
            <span>All Friends</span> <span>{users.length}</span>
          </p>
        </form>
        <div className="pt-24 flex flex-col overflow-x-auto ">
          {isLoading
            ? "loading"
            : users.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center border-t border-b py-3 border-room-black-2 hover:text-white-1 hover:bg-white/5 hover:border-none hover:rounded-lg px-4"
                  >
                    <div>
                      <p className="text-white-1 capitalize">{item.username}</p>
                      <p className="text-white-4 text-sm">
                        {item.display_name}
                      </p>
                    </div>
                    <button
                      onClick={() => router.push("/account/" + item.id)}
                      className="text-white-3 hover:text-white-1 text-2xl hover:scale-110 transition-all duration-75"
                    >
                      <IoIosSettings />
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
      <div className="border-l h-screen border-room-black-2">
        <h1 className="capitalize py-6 px-4 text-xl font-semibold text-white-2 ">
          Popular Topics
        </h1>
        <div className="px-4">
          {isLoading
            ? "loadding.."
            : topics.map((item: any, index: number) => {
                return <p key={index}>{item.title}</p>;
              })}
        </div>
      </div>
    </div>
  );
};

export default SearchFriendsInput;
