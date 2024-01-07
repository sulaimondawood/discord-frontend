import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Toast = () => {
  useEffect(() => {
    toast.dismiss();
    toast.info(
      "Kindly excercise patience if the server is taking too long to respond",
      {
        autoClose: 5000,
      }
    );
  }, []);
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Toast;
