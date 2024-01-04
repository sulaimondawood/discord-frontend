import React, { useEffect } from "react";
import { isTokeneExpired } from "./token-expired";
import { redirect } from "next/navigation";

const withAuth = (Component: any) => {
  return function WithAuth(props: any) {
    // useEffect(() => {
    //   const token = localStorage.getItem("token");
    //   if (!isTokeneExpired(token)) {
    //     redirect("/rooms");
    //   }
    // }, []);

    return <Component {...props} />;
  };
};

export default withAuth;
