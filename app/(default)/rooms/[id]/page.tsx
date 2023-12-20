import Input from "@/components/input/Input";
import RoomMsgHeader from "@/components/room-header/RoomMsgHeader";
import React from "react";

const page = ({ params }: { params: { id: number } }) => {
  // return <div>page {params.id}</div>;
  return (
    <main className="bg-gray-ish h-screen ml-[330px] w-[calc(100vw-330px)] ">
      <RoomMsgHeader />
      <div className="overflow-y-auto h-full py-14 px-4">
        <div className="py-4">
          <p>Dawood</p>
          <p>Sulaimon</p>
        </div>
        <div className="py-4">
          <p>Dawood</p>
          <p>Sulaimon</p>
        </div>
        <div className="py-4">
          <p>Dawood</p>
          <p>Sulaimon</p>
        </div>
        <div className="py-4">
          <p>Dawood</p>
          <p>Sulaimon</p>
        </div>
        <div className="py-4">
          <p>Dawood</p>
          <p>Sulaimon</p>
        </div>
        <div className="py-4">
          <p>Dawood</p>
          <p>Sulaimon</p>
        </div>
        <div className="py-4">
          <p>Dawood</p>
          <p>Sulaimon</p>
        </div>
        <div className="py-4">
          <p>Dawood</p>
          <p>Sulaimon</p>
        </div>
        <div className="py-4">
          <p>Dawood</p>
          <p>Sulaimon</p>
        </div>
        <div className="py-4">
          <p>Dawood</p>
          <p>Sulaimon</p>
        </div>
        <div className="py-4">
          <p>Dawood</p>
          <p>Sulaimon</p>
        </div>
        <div className="py-4">
          <p>Dawood</p>
          <p>Sulaimon</p>
        </div>
        <div className="py-4">
          <p>Dawood</p>
          <p>Sulaimon</p>
        </div>
      </div>

      <Input />
    </main>
  );
};

export default page;
