import Link from "next/link";
import LandingBtn from "../components/buttons/LandingBtn";
import { LuDownload } from "react-icons/lu";
import { icon, icon3 } from "@/utils/svgs";
import Image1 from "@/assets/images/landing-img-1.svg";
import Image2 from "@/assets/images/landing-img-2.svg";
import Image3 from "@/assets/images/landing-img-3.svg";
const nav = [
  {
    name: "Download",
    link: "",
  },
  {
    name: "Nitro",
    link: "",
  },
  {
    name: "Discover",
    link: "",
  },
  {
    name: "Safety",
    link: "",
  },
  {
    name: "Blog",
    link: "",
  },
  {
    name: "Careers",
    link: "",
  },
  {
    name: "Support",
    link: "",
  },
];

const data = [
  {
    title: "Create an invite-only place where you belong",
    desc: "Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.",
    img: Image1,
    bg: "#fff",
  },
  {
    title: "Where hanging out is easy",
    desc: "Grab a seat in a voice channel when youre free. Friends in your server can see youre around and instantly pop in to talk without having to call.",
    img: Image2,
    bg: "#f6f6f6",
  },
  {
    title: "From few to a fandom",
    desc: "Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.",
    img: Image3,
    bg: "#fff",
  },
];

export default function Login() {
  return (
    <main className="bg-white w-screen h-screen overflow-x-hidden">
      <section className="bg-blue-700/90 h-[90vh] overflow-hidden w-screen relative">
        <div className="">
          <span className="bottom-0 -left-80 absolute w-full z-50 hidden md:block">
            {icon}
          </span>

          <span className="bottom-0 -right-72 absolute z-50">{icon3}</span>
        </div>
        <nav className="flex py-4 items-center font-Open-sans text-sm container text-white justify-between">
          <a className="text-xl" href="">
            Dawood
          </a>
          <div className="flex items-center gap-10">
            {nav.map((nav: { name: string; link: string }, index: number) => {
              return (
                <Link
                  className="font-semibold hover:underline"
                  key={index}
                  href={nav.link}
                >
                  {nav.name}
                </Link>
              );
            })}
          </div>
          <LandingBtn />
        </nav>
        <div className="mt-32 z-impo ">
          <h1 className="text-6xl z-50 font-semibold text-center font-Archivo-Black text-white">
            IMAGINE A PLACE...
          </h1>
          <p className="w-full max-w-3xl text-center pt-10 text-lg text-white font-Noto-sans mx-auto">
            ...where you can belong to a school club, a gaming group, or a
            worldwide art community. Where just you and a handful of friends can
            spend time together. A place that makes it easy to talk every day
            and hang out more often.
          </p>
          <div className="flex z-50 justify-center pt-8 items-center text-lg gap-5 font-Noto-sans">
            <div className="flex items-center gap-2 bg-white text-black-ish px-8 py-4 rounded-full  hover:shadow-lg hover:shadow-black/20 transition-all duration-100 ">
              <span>
                <LuDownload />
              </span>
              Download for Windows
            </div>
            <div
              className="bg-black-ish px-8 py-4 rounded-full text-white hover:shadow-lg hover:shadow-black/20 transition-all duration-100
            "
            >
              Open Discord in your browser
            </div>
          </div>
        </div>
      </section>
      <section className="overflow-hidden">
        {data.map((div, index) => {
          return (
            <div
              key={index}
              style={{ backgroundColor: div.bg }}
              className={`px-20 flex items-center h-[650px] gap-40 justify-center even:flex-row-reverse`}
            >
              <img className="w-[620px]" src={div.img.src} alt="" />
              <div className="font-Noto-sans text-dark-not-black">
                <h1 className="text-5xl font-bold   w-full max-w-md">
                  {div.title}
                </h1>
                <p className="text-lg w-full max-w-sm pt-8">{div.desc}</p>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
