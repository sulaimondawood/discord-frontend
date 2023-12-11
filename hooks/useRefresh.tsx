import { AuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import axios from "axios";
import { useContext } from "react";

export default function useRefresh() {
  const { setAuth } = useContext(AuthContext);
  const refreshToken = async () => {
    const res = axiosInstance.post("token/refresh/", null, {
      withCredentials: true,
    });
    console.log(res);
    return res;
  };
  return refreshToken;
}
