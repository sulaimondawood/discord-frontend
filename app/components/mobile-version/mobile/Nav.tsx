"use client";
import { nav } from "@/app/login/page";
import Link from "next/link";
import React, { useState } from "react";
import { LuDownload } from "react-icons/lu";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

const Nav = () => {
  const [toggle, setToggle] = useState(false);
  function handleToggle() {
    setToggle((prev) => !prev);
  }

  return (
    <nav className="flex md:hidden px-6 py-4 items-center font-Open-sans text-sm container text-white justify-between">
      <div className="flex items-center justify-between w-full">
        <Link className="text-xl font-Archivo-Black" href="/">
          Dawood.
        </Link>
        <div className="text-2xl" onClick={handleToggle}>
          <FaBars />
        </div>
      </div>
      <div
        className={`${
          toggle ? "translate-x-full" : "translate-x-0"
        } transition-all duration-200 ease-linear bg-white w-full px-6 d-screen flex flex-col fixed right-0 top-0 items-left gap-7`}
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
