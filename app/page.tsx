"use client";

import Link from "next/link";
import { icon, icon2, icon3 } from "@/utils/svgs";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import axios from "axios";

import { redirect, useRouter } from "next/navigation";
import useRefresh from "@/hooks/useRefresh";
import { axiosInstance } from "@/utils/axios";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const router = useRouter();
  const refresh = useRefresh();
  const data = Object.freeze({
    email: "",
    password: "",
  });
  const { auth, setAuth } = useAuth();
  const [men, setMen] = useState("");
  const [logCredentials, setCredentials] = useState(data);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCredentials({
      ...logCredentials,
      [name]: value.trim(),
    });
  };

  // const axiosInstance = useTokens();
  const handleLogin = async (e: any) => {
    e.preventDefault();
    // setMen("myself");
    console.log(logCredentials);
    console.log(men);
    console.log("men");

    try {
      const res = await axios.post(
        // "user/login/",
        "http://127.0.0.1:8000/api/user/login/",
        {
          email: logCredentials.email,
          password: logCredentials.password,
        },
        {
          withCredentials: true,
        }
      );
      // setMen(res.data.access);
      // console.log(men);

      console.log(res);

      if (res.status === 200 && res.statusText === "OK") {
        // localStorage.setItem("access_token", res.data.access);
        // localStorage?.setItem("refresh_token", res.data.refresh);
        setAuth(res.data.data.access);

        console.log("auth");
        console.log(auth);

        axiosInstance.defaults.headers[
          "Authorization"
        ] = `Bearer ${res.data.data.access}`;
        // axiosInstance.defaults.headers[
        //   "Authorization"
        // ] = `Bearer ${localStorage?.getItem("access_token")!}`;
        router.push("/rooms");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="relative bg-blue-ish w-screen h-screen flex justify-center items-center">
      <div className="">
        <span className="top-0  left-0 absolute w-full">{icon}</span>
        <span className="left-0 absolute bottom-0 w-full">{icon2}</span>
        <span className="bottom-0 right-0 absolute ">{icon3}</span>
      </div>

      <div className="bg-black-ish rounded-md py-4 px-8 w-[500px] z-50">
        <div className="pb-4 text-center">
          <h2 className="text-white-1 text-2xl pb-2 font-medium font-sans">
            Welcome back!
          </h2>
          <p className="text-white-3 text-sm ">
            We're so excited to see you again!
          </p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-xs text-white-4 font-Noto-sans font-semibold"
            >
              EMAIL
            </label>
            <input
              type="email"
              onChange={handleChange}
              value={logCredentials.email}
              required
              name="email"
              id="email"
              className="bg-faded-black rounded placeholder:text-white-1 h-11 text-white indent-2"
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
              type="password"
              required
              onChange={handleChange}
              value={logCredentials.password}
              name="password"
              id="password"
              className="bg-faded-black rounded placeholder:text-white-1 h-11 text-white indent-2"
            />
          </div>
          <Link
            className="text-l-blue text-sm -mt-3 font-Noto-sans"
            href={"/forgot-password"}
          >
            Forgot your password?
          </Link>
          <button
            onClick={handleLogin}
            className="bg-blue-ish hover:bg-blue-800 duration-200 transition-all text-white py-3 font-Noto-sans text-sm rounded "
            type="submit"
          >
            Log In
          </button>
        </form>
        <p className="pt-3 text-sm font-Noto-sans">
          <span className="text-white-4">Need an account?</span>{" "}
          <Link className="text-l-blue" href="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
