"use client";

import Link from "next/link";
import React, { useState } from "react";
import { LuDownload } from "react-icons/lu";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { nav } from "@/utils/data";
import LandingBtn from "../../buttons/LandingBtn";

const Nav = () => {
  const [toggle, setToggle] = useState(false);
  function handleToggle() {
    setToggle(!toggle);
  }

  return (
    <nav className="flex lg:hidden px-6 py-4 items-center font-Open-sans text-sm text-white justify-between">
      {toggle && (
        <div onClick={handleToggle} className="bg-black/25 fixed inset-0"></div>
      )}
      <div className="flex items-center justify-between w-full">
        <Link className="text-xl font-Archivo-Black" href="/">
          Dawood.
        </Link>
        <div className="flex gap-5 items-center">
          <LandingBtn bg={"bg-white"} />

          <div className="text-2xl" onClick={handleToggle}>
            <FaBars />
          </div>
        </div>
      </div>
      <div
        className={`${
          !toggle ? "translate-x-full" : "translate-x-0"
        } transition-all duration-200 ease-linear bg-white z-[9999] w-full rounded-tl-lg rounded-bl-lg md:w-[50%]  px-6 d-screen flex flex-col fixed right-0 top-0 items-left gap-7`}
      >
        <div className="flex py-6 text-black justify-between items-center">
          <Link className="text-xl font-Archivo-Black" href="/">
            Dawood.
          </Link>

          <div className="text-2xl" onClick={handleToggle}>
            <IoClose />
          </div>
        </div>
        {nav.map((nav: { name: string; link: string }, index: number) => {
          return (
            <p
              className="cursor-pointer font-semibold hover:underline text-black"
              key={index}
            >
              {nav.name}
            </p>
          );
        })}
        <div className="flex items-center justify-center self-start gap-2 bg-blue-700 text-white fixed bottom-9 px-8 py-3 rounded-full  hover:shadow-lg hover:shadow-black/20 transition-all duration-100 ">
          <span>
            <LuDownload />
          </span>
          Download for Windows
        </div>
      </div>
    </nav>
  );
};

export default Nav;
