"use client";
import { useAuth } from "@/app/context/AuthContext";
import React from "react";

const LandingBtn = ({ bg }: { bg: string }) => {
  const { auth } = useAuth();

  return (
    <div>
      {auth ? (
        <button className={`text-blue-700 ${bg} py-2 px-4 rounded-lg`}>
          Login
        </button>
      ) : (
        <button className={`text-blue-900 ${bg} py-2 px-3 rounded-2xl `}>
          Open Discord
        </button>
      )}
    </div>
  );
};

export default LandingBtn;
