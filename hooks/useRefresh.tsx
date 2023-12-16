"use client";

import { useAuth } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import axios from "axios";
import { useContext } from "react";

export default function useRefresh() {
  const { auth, setAuth } = useAuth();
  const refresh = localStorage?.getItem("token");
  const refreshToken = async () => {
    const res = await axiosInstance.post(
      "token/refresh/",
      {
        refresh,
      },
      {
        withCredentials: true,
      }
    );

    setAuth(res.data.access);
    console.log(res);
    console.log(auth);
    console.log("auth");
    return res;
  };
  console.log(auth);
  return refreshToken;
}
