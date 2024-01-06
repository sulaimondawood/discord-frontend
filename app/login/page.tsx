"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { icon, icon2, icon3, iconAuth } from "@/utils/svgs";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import { redirect, useRouter } from "next/navigation";
import { axiosInstance } from "@/utils/axios";
import { useAuth } from "@/app/context/AuthContext";
import { getToken, isTokeneExpired } from "@/utils/token-expired";
import withAuth from "@/utils/withAuth";

function Login() {
  const router = useRouter();

  const data = Object.freeze({
    email: "",
    password: "",
  });
  const { auth, setAuth } = useAuth();
  const [logCredentials, setCredentials] = useState(data);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCredentials({
      ...logCredentials,
      [name]: value.trim(),
    });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post(
        "user/login/",
        {
          email: logCredentials.email,
          password: logCredentials.password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        localStorage?.setItem("user", JSON.stringify(res.data.user));
        // localStorage?.setItem("token", res.data.data.refresh);

        // edited
        // localStorage?.setItem("access_token", res.data.data.access);
        // axiosInstancePrivate.defaults.headers["Authorization"] =
        //   "Bearer " + localStorage.getItem("access_token");
        // edited
        const data = await res.data;
        setAuth(res.data.data.access);
        Cookies.set("token", res.data.data.refresh, {
          expires: 1,
          secure: true,
        });
        console.log("auth");
        console.log(auth);
        console.log(res.data.data.access);
        router.push("/rooms");
      }
    } catch (error: any) {
      setError(true);
      setLoading(false);
      console.log(error);
      if (error?.response?.data?.Invalid) {
        setErrorMsg(error?.response?.data?.Invalid);
      } else {
        setErrorMsg(error.message);
      }
      console.log(errorMsg);
    }
  };

  useLayoutEffect(() => {
    const token = getToken();
    if (token) {
      redirect("/rooms");
    }
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setError(false);
    }, 3000);

    () => clearTimeout(timeOut);
  }, [isError]);

  return (
    <main className="bg-blue-700/90 overflow-hidden px-4 md:px-0 relative w-screen d-screen md:h-screen flex justify-center items-center">
      <div className="">
        <span className="top-0 -left-20 absolute w-full hidden md:block">
          {iconAuth}
        </span>

        <span className="-left-28 absolute  -bottom-36 ">{icon2}</span>
        <span className="bottom-0 right-0 absolute ">{icon3}</span>
      </div>

      <div className="bg-black-ish rounded-md py-4 px-4 md:px-8 w-[500px] z-50">
        <div className="pb-4 text-center">
          <h2 className="text-white-1 text-2xl pb-2 font-medium font-sans">
            Welcome back!
          </h2>
          <p className="text-white-3 text-sm ">
            We&apos;re so excited to see you again!
          </p>

          {isError && (
            <p className="text-xs mt-4 bg-red-400 text-red-50 py-1 px-3 rounded-md">
              {errorMsg}
            </p>
          )}
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
          <p className="text-l-blue text-sm -mt-3 font-Noto-sans">
            Forgot your password?
          </p>
          {isLoading ? (
            <button
              className="bg-blue-ish hover:bg-blue-800 duration-200 transition-all text-white py-3 font-Noto-sans text-sm rounded "
              type="button"
            >
              Please wait...
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-ish hover:bg-blue-800 duration-200 transition-all text-white py-3 font-Noto-sans text-sm rounded "
              type="submit"
            >
              Log In
            </button>
          )}
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

export default withAuth(Login);
