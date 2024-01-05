import Link from "next/link";
import LandingBtn from "../components/buttons/LandingBtn";
import { LuDownload } from "react-icons/lu";
import { icon, icon3 } from "@/utils/svgs";
import Image1 from "@/assets/images/landing-img-1.svg";
import Image2 from "@/assets/images/landing-img-2.svg";
import Image3 from "@/assets/images/landing-img-3.svg";
import Image4 from "@/assets/images/landing-img-footer.svg";
import {
  footerCompany,
  footerPolicies,
  footerProduct,
  footerResoures,
} from "@/utils/data";
const nav = [
  {
    name: "Download",
    link: "/",
  },
  {
    name: "Nitro",
    link: "/",
  },
  {
    name: "Discover",
    link: "/",
  },
  {
    name: "Safety",
    link: "/",
  },
  {
    name: "Blog",
    link: "/",
  },
  {
    name: "Careers",
    link: "/",
  },
  {
    name: "Support",
    link: "/",
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
          <Link className="text-xl font-Archivo-Black" href="/">
            Dawood.
          </Link>
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
          <LandingBtn bg={"bg-white"} />
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
      <section>
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
      <section className="bg-off-white py-24">
        <h1 className="text-5xl text-center font-Archivo-Black text-dark-not-black">
          RELIABLE TECH FOR STAYING CLOSE
        </h1>
        <p className="text-dark-not-black text-lg w-full max-w-5xl pt-5 text-center mx-auto">
          Low-latency voice and video feels like youre in the same room. Wave
          hello over video, watch friends stream their games, or gather up and
          have a drawing session with screen share.
        </p>
        <img className="w-[1150px] block mx-auto" src={Image4.src} alt="" />
        <h2 className="text-dark-not-black text-3xl pt-28 pb-10 text-center font-Noto-sans font-semibold">
          Ready to start your journey?
        </h2>
        <div className="flex items-center justify-center text-lg mx-auto w-fit gap-2 text-white px-8 py-4 rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-black/20 transition-all duration-500 ">
          <span>
            <LuDownload />
          </span>
          Download for Windows
        </div>
      </section>
      <footer className="bg-room-deep-black h-[650px] p-24">
        <div className="flex justify-between items-start text-sm text-white-1">
          <div>
            <Link className="text-xl font-Archivo-Black" href="/">
              Dawood.
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-8">
            <div className="text-left">
              <h2>Product</h2>
              <div className="flex flex-col items-start gap-4 pt-6">
                {footerProduct.map((item) => {
                  return <button>{item}</button>;
                })}
              </div>
            </div>
            <div className="text-left">
              <h2>Company</h2>
              <div className="flex flex-col items-start gap-4 pt-6">
                {footerCompany.map((item, index) => {
                  return (
                    <button key={index} className="hover:underline">
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="text-left">
              <h2>Resources</h2>
              <div className="flex flex-col items-start gap-4 pt-6">
                {footerResoures.map((item) => {
                  return <button>{item}</button>;
                })}
              </div>
            </div>
            <div className="text-left">
              <h2>Policies</h2>
              <div className="flex flex-col items-start gap-4 pt-6">
                {footerPolicies.map((item) => {
                  return <button>{item}</button>;
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex  font-Open-sans text-sm  justify-end mt-10">
          <LandingBtn bg={"bg-white"} />
        </div>
      </footer>
    </main>
  );
}
