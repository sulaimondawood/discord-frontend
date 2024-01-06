"use client";

import React, { useEffect, useRef } from "react";
import Image1 from "@/assets/images/landing-img-1.svg";
import Image2 from "@/assets/images/landing-img-2.svg";
import Image3 from "@/assets/images/landing-img-3.svg";

const data = [
  {
    ref: "ref1",
    title: "Create an invite-only place where you belong",
    desc: "Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.",
    img: Image1,
    bg: "#fff",
  },
  {
    ref: "ref2",
    title: "Where hanging out is easy",
    desc: "Grab a seat in a voice channel when youre free. Friends in your server can see youre around and instantly pop in to talk without having to call.",
    img: Image2,
    bg: "#f6f6f6",
  },
  {
    ref: "ref3",
    title: "From few to a fandom",
    desc: "Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.",
    img: Image3,
    bg: "#fff",
  },
];

const LandingSectioon = () => {
  return (
    <div>
      {data.map((div, index) => {
        return (
          <div
            key={index}
            style={{ backgroundColor: div.bg }}
            className={`px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center h-[550px] md:h-[600px] lg:h-[650px] gap-10 lg:gap-20 xl:gap-40 justify-center md:even:flex-row-reverse even:flex-col`}
          >
            <img
              className="w-[620px] md:w-[380px] lg:w-[450px] xl:w-[650px]"
              src={div.img.src}
              alt=""
            />
            <div className="font-Noto-sans text-dark-not-black">
              <h1 className="text-xl md:text-4xl lg:text-5xl font-bold w-full max-w-md">
                {div.title}
              </h1>
              <p className="text-sm leading-6 md:text-lg w-full max-w-sm pt-6 md:pt-8">
                {div.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LandingSectioon;
