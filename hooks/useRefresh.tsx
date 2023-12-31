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

  const refreshToken = async () => {
    try {
      if (!refresh) {
        // Handle the case where refresh token is not available
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

      setAuth(res.data.access);
      // console.log(res);
      // console.log(auth);
      // console.log("auth");
      return res;
    } catch (error) {
      console.error("Error refreshing token:", error);
      // Handle error, possibly logout or redirect to login page
      return null;
    }
  };

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return refreshToken;
}
