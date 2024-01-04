"use client";
import { useAuth } from "@/app/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import { useEffect, useState } from "react";
// export default function useRefresh() {
//   const { auth, setAuth } = useAuth();
//   const refresh = localStorage?.getItem("token");
//   const refreshToken = async () => {
//     const res = await axiosInstance.post(
//       "token/refresh/",
//       {
//         refresh,
//       },
//       {
//         withCredentials: true,
//       }
//     );

//     setAuth(res.data.access);
//     console.log(res);
//     console.log(auth);
//     console.log("auth");
//     return res;
//   };
//   console.log(auth);
//   return refreshToken;
// }

export default function useRefresh() {
  const { auth, setAuth } = useAuth();

  const refresh =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  // console.log(refresh);

  const refreshToken = async () => {
    try {
      if (!refresh) {
        console.log("heloow my people");

        return null;
      }
      const res = await axiosInstance.post(
        "token/refresh/",
        {
          refresh,
        },
        {
          withCredentials: true,
        }
      );
      const data = await res.data;
      // if (data) {
      setAuth(res.data.access);
      // localStorage.setItem("access_token", data.access);
      console.log(data);
      console.log("omo railse to power 50");
      // }
      return res.data.access;
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  useEffect(() => {
    console.log("Updated auth state:", auth);
    // You can perform additional actions here after the state is updated
  }, [auth]); // Dependency array ensures this effect runs whenever auth changes

  return refreshToken;
}
