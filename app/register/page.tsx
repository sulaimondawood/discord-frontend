"use client";
import Link from "next/link";

import { icon, icon2, icon3 } from "@/utils/svgs";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
export default function Register() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const data = Object.freeze({
    email: "",
    displayName: "",
    username: "",
    password: "",
  });
  const [credentials, setCredentials] = useState(data);
  const router = useRouter();
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });

    if (
      credentials.email.length >= 5 &&
      credentials.username.length >= 5 &&
      credentials.password.length >= 5
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  useEffect(() => {
    console.log("hello");

    const timeOut = setTimeout(() => {
      setError(false);
    }, 3000);

    () => clearTimeout(timeOut);
  }, [isError]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("user/register/", {
        email: credentials.email,
        display_name: credentials.displayName,
        username: credentials.username,
        password: credentials.password,
      });

      if (res.status === 201) {
        router.push("/login");
      }
      console.log(res);

      console.log(credentials);
    } catch (error: any) {
      setError(true);
      setLoading(false);
      console.log(error);
      if (error.response.data?.email) {
        setErrorMsg(error.response?.data?.email[0]);
      } else if (error.response?.data?.username) {
        setErrorMsg(error.response?.data?.username[0]);
      } else if (error.response?.data?.display_name) {
        setErrorMsg(error.response?.data?.display_name[0]);
      } else if (error.response?.data?.password) {
        setErrorMsg(error.response?.data?.password[0]);
      }
      console.log(errorMsg);
    }
  }
  return (
    <>
      <main className="bg-blue-ish px-4 md:px-0 relative w-screen d-screen md:h-screen flex justify-center items-center">
        <div className="">
          <span className="top-0  left-0 absolute w-full hidden md:block">
            {icon}
          </span>
          <span className="left-0 absolute  bottom-0 w-full">{icon2}</span>
          <span className="bottom-0 right-0 absolute  ">{icon3}</span>
        </div>
        <div
          className="bg-black-ish rounded-md
         py-5 z-50 px-4 md:px-8 w-full md:w-[500px]"
        >
          <div className="pb-4 text-center">
            <h2 className="text-white-2 text-2xl pb-2 font-medium font-sans">
              Create an account
            </h2>
            {isError && (
              <p className="text-xs mt-4 bg-red-400 text-red-50 py-1 px-3 rounded-md">
                {errorMsg}
              </p>
            )}
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
                required
                id="email"
                className="bg-faded-black rounded placeholder:text-white-1 h-11 text-white indent-2"
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
                required
                className="bg-faded-black rounded placeholder:text-white-1 h-11 text-white indent-2"
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
                required
                id="username"
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
                onChange={handleChange}
                value={credentials.password}
                name="password"
                type="password"
                required
                id="password"
                className="bg-faded-black rounded placeholder:text-white-1 h-11 text-white indent-2"
              />
            </div>
            {isLoading ? (
              <button
                className="disabled:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40 bg-blue-ish hover:bg-blue-800 duration-200 transition-all text-white py-3 font-Noto-sans text-md rounded "
                type="submit"
                disabled={isDisabled}
              >
                Loading...
              </button>
            ) : (
              <button
                className="disabled:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40 bg-blue-ish hover:bg-blue-800 duration-200 transition-all text-white py-3 font-Noto-sans text-md rounded "
                type="submit"
                disabled={isDisabled}
                onClick={handleSubmit}
              >
                Continue
              </button>
            )}
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
