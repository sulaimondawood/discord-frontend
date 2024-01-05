"use client";
import { useAuth } from "@/app/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
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
  const refresh = Cookies.get("token");
  const refreshToken = async () => {
    try {
      if (!refresh) {
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
      setAuth(res.data.access);
      return res.data.access;
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  useEffect(() => {
    // You can perform additional actions here after the state is updated
  }, [auth]); // Dependency array ensures this effect runs whenever auth changes

  return refreshToken;
}
