"use client";

import { useModalState } from "@/app/context/StateContext";
import { useTokens } from "@/hooks/useTokensConfig";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const RoomModal = () => {
  const { setRoomModalOpen } = useModalState();
  const [data, setData] = useState({
    topic: "",
    name: "",
    description: "",
  });
  const [progress, setProgress] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [file, setFile] = useState<null | any>(null);
  const router = useRouter();
  const axiosInstancePrivate = useTokens();

  const handleData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });

    console.log(data.description);
    console.log(data.name);
    console.log(data.topic);
    // console.log(file);
  };

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];
    setFile(file);
    console.log(file);
  }

  async function handlePostReq(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("topic", data.topic);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("avatar", file);

    try {
      const res = await axiosInstancePrivate.post(
        "room/create-room/",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            console.log(progressEvent.loaded);
            const progressState =
              (progressEvent.loaded * 100) / progressEvent.total!;

            setProgress(progressState);
          },
        }
      );

      console.log(res);
      if (res.status === 201) {
        setRoomModalOpen(false);
        window.location.reload();
      }
    } catch (error: any) {
      setError(true);
      setLoading(false);
      console.log(error);
      setProgress(0);

      if (error.response?.data?.topic) {
        setErrorMsg(error.response?.data?.topic[0] + " - topic");
      } else if (error.response?.data?.name) {
        setErrorMsg(error.response?.data?.name[0] + " - name");
      } else {
        setErrorMsg("No avatar selected for room profile");
      }

      console.log(errorMsg);
    }
  }

  useEffect(() => {
    console.log("hello");

    const timeOut = setTimeout(() => {
      setError(false);
    }, 3000);

    () => clearTimeout(timeOut);
  }, [isError]);

  return (
    <>
      <div
        onClick={() => setRoomModalOpen(false)}
        className="bg-black/30 z-[999] fixed inset-0"
      ></div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5  bg-white/10 text-white-1 backdrop-blur-md z-[999]  w-[calc(100vw-30px)]  md:w-[600px] h-fit rounded-md">
        <h1 className="text-center text-lg md:text-xl font-semibold text-white-1">
          Create a server
        </h1>
        <p className="text-white-3 w-full md:w-[400px] mx-auto text-xs md:text-base text-center">
          Your server is where you and your friends hangout. Make yours and
          start talking
        </p>

        {isError && (
          <p className="text-[10px] md:text-xs mt-4 bg-red-400 text-red-50 py-1 px-3 rounded-md">
            {errorMsg}
          </p>
        )}
        <form
          onSubmit={handlePostReq}
          className=" mt-3 md:mt-0 flex flex-col gap-4 z-[9999]"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="topic">Topic</label>
            <input
              onChange={handleData}
              id="topic"
              name="topic"
              value={data.topic}
              required
              className="bg-transparent border-white-4/40 border py-2 md:py-4 px-3 rounded w-full focus:outline-none"
              type="text"
            />
            {/* <RoomModalDropDown topic={data.topic} handleData={handleData} /> */}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              onChange={handleData}
              id="name"
              name="name"
              value={data.name}
              required
              className="bg-transparent border-white-4/40 border py-2 md:py-4 px-3 rounded w-full focus:outline-none"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="desc">Description</label>
            <input
              onChange={handleData}
              id="desc"
              name="description"
              value={data.description}
              className="bg-transparent border-white-4/40 border py-2 md:py-4 px-3 rounded w-full focus:outline-none"
              type="text"
              required
            />
          </div>
          <div className="flex flex-col gap-2 rounded border-dashed border border-white-4/40 py-4 text-center">
            <label htmlFor="img">Upload Sever Image</label>
            <input
              onChange={handleFile}
              id="img"
              name="avatar"
              className="hidden"
              type="file"
              required
            />
          </div>
          <div className="">
            {progress > 0 && (
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      {progress}%
                    </span>
                  </div>
                </div>
                <div className="flex h-2 mb-4 overflow-hidden text-xs bg-blue-200 rounded">
                  <div
                    style={{ width: `${progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  ></div>
                </div>
              </div>
            )}

            <p className="text-xs md:text-base">
              {file?.name && "File " + file.name + " staged"}
            </p>
          </div>
          {isLoading ? (
            <button className="pl-2 rounded bg-room-deep-black w-full  py-3 text-center text-white-4">
              Please wait...
            </button>
          ) : (
            <button
              className="pl-2 rounded bg-room-deep-black w-full  py-3 text-center text-white-4"
              onClick={handlePostReq}
            >
              Create Server
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default RoomModal;
