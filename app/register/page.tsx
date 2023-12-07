"use client";
import Link from "next/link";

import { icon, icon2, icon3 } from "@/utils/svgs";

import { userAgent } from "next/server";
import { ChangeEvent, FormEvent, useState } from "react";
export default function Register() {
  const [isDisabled, setIsDisabled] = useState(true);
  const data = Object.freeze({
    email: "",
    displayName: "",
    username: "",
    password: "",
  });
  const [credentials, setCredentials] = useState(data);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });

    if (
      credentials.email.length > 5 &&
      credentials.username.length > 5 &&
      credentials.password.length > 6
    ) {
      setIsDisabled(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(credentials);
  }
  return (
    <>
      <main className="bg-blue-ish relative w-screen h-screen flex justify-center items-center">
        <div className="">
          <span className="top-0  left-0 absolute w-full">{icon}</span>
          <span className="left-0 absolute  bottom-0 w-full">{icon2}</span>
          <span className="bottom-0 right-0 absolute ">{icon3}</span>
        </div>
        <div className="bg-black-ish py-5 z-50 px-8 w-[500px]">
          <div className="pb-4 text-center">
            <h2 className="text-white-2 text-2xl pb-2 font-medium font-sans">
              Create an account
            </h2>
          </div>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-xs text-white-4 font-Noto-sans font-semibold"
              >
                EMAIL
              </label>
              <input
                onChange={handleChange}
                value={credentials.email}
                type="email"
                name="email"
                id="email"
                className="bg-black rounded placeholder:text-white-1 h-11 text-white indent-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="display-name"
                className="text-xs text-white-4 font-Noto-sans font-semibold"
              >
                DISPLAY NAME
              </label>
              <input
                onChange={handleChange}
                value={credentials.displayName}
                name="displayName"
                type="text"
                id="display-name"
                className="bg-black rounded placeholder:text-white-1 h-11 text-white indent-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-xs text-white-4 font-Noto-sans font-semibold"
              >
                USERNAME
              </label>
              <input
                onChange={handleChange}
                value={credentials.username}
                type="text"
                name="username"
                id="username"
                className="bg-black rounded placeholder:text-white-1 h-11 text-white indent-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-xs text-white-4 font-Noto-sans font-semibold"
                htmlFor="password"
              >
                PASSWORD
              </label>
              <input
                onChange={handleChange}
                value={credentials.password}
                name="password"
                type="password"
                id="password"
                className="bg-black rounded placeholder:text-white-1 h-11 text-white indent-2"
              />
            </div>

            <button
              className="disabled:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40 bg-blue-ish hover:bg-blue-800 duration-200 transition-all text-white py-3 font-Noto-sans text-md rounded "
              type="submit"
              disabled={isDisabled}
              onClick={handleSubmit}
            >
              Continue
            </button>
          </form>
          <p className="pt-3 text-sm font-Noto-sans">
            <span className="text-white-4">Already have an account?</span>{" "}
            <Link className="text-l-blue" href="/">
              Login
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
