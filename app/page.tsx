import Link from "next/link";
import { icon, icon2, icon3 } from "@/utils/svgs";
export default function Home() {
  return (
    <main className="relative bg-blue-ish w-screen h-screen flex justify-center items-center">
      <div className="">
        <span className="top-0  left-0 absolute w-full">{icon}</span>
        <span className="left-0 absolute bottom-0 w-full">{icon2}</span>
        <span className="bottom-0 right-0 absolute ">{icon3}</span>
      </div>

      <div className="bg-black-ish py-4 px-8 w-[500px] z-50">
        <div className="pb-4 text-center">
          <h2 className="text-white-1 text-2xl pb-2 font-medium font-sans">
            Welcome back!
          </h2>
          <p className="text-white-3 text-sm ">
            We're so excited to see you again!
          </p>
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
              type="email"
              id="email"
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
              type="password"
              id="password"
              className="bg-black rounded placeholder:text-white-1 h-11 text-white indent-2"
            />
          </div>
          <Link
            className="text-l-blue text-sm -mt-3 font-Noto-sans"
            href={"/forgot-password"}
          >
            Forgot your password?
          </Link>
          <button
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
