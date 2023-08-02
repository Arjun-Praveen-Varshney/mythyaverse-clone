// import { useState } from "react";

const Profile = () => {
  return (
    <div className="flex flex-col w-full pr-10 space-y-8">
      <div>
        <button className="bg-[#29b2ff] p-2 px-4 text-white rounded-full font-medium">
          Profile
        </button>
      </div>
      <div className="rounded-3xl border-[1px] border-white text-white p-6 space-y-8">
        <div className="flex items-center">
          <div className="w-1/5 font-semibold">Name:</div>
          <div className="w-4/5 font-semibold">Name</div>
        </div>
        <div className="flex items-center">
          <div className="w-1/5 font-semibold">Address:</div>
          <div className="w-4/5">Address</div>
        </div>
      </div>
      <div>
        <button className="bg-[#29b2ff] p-2 px-4 text-white rounded-full font-medium">
          Contact
        </button>
      </div>
      <div className="rounded-3xl border-[1px] border-white text-white p-6 space-y-8">
        <div className="flex items-center">
          <div className="w-1/5 font-semibold">Contact No:</div>
          <div className="w-4/5">Name</div>
        </div>
        <div className="flex items-center">
          <div className="w-1/5 font-semibold">Email Address1:</div>
          <div className="w-4/5">Address</div>
        </div>
        <div className="flex items-center">
          <div className="w-1/5 font-semibold">Email Address2:</div>
          <div className="w-4/5">Address</div>
        </div>
        <div className="flex items-center">
          <div className="w-1/5 font-semibold">Social Link1:</div>
          <div className="w-4/5">Address</div>
        </div>
        <div className="flex items-center">
          <div className="w-1/5 font-semibold">Social Link2:</div>
          <div className="w-4/5">Address</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
