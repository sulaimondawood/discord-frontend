"use client";
import { useAuth } from "@/app/context/AuthContext";
import { getToken } from "@/utils/token-expired";
import { useRouter } from "next/navigation";
import React from "react";

const LandingBtn = ({ bg }: { bg: string }) => {
  const token = getToken();
  const router = useRouter();
  return (
    <div>
      {token ? (
        <div
          onClick={() => router.push("/rooms")}
          className={`text-blue-900 cursor-pointer ${bg} py-2 px-3 rounded-2xl hover:shadow-lg `}
        >
          Open
        </div>
      ) : (
        <div
          onClick={() => router.push("/login")}
          className={`text-black-ish ${bg} cursor-pointer py-2 px-4 rounded-2xl hover:text-blue-700`}
        >
          Login
        </div>
      )}
    </div>
  );
};

export default LandingBtn;
