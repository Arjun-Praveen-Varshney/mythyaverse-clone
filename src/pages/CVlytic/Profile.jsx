// import { useState } from "react";

const Profile = () => {
  const jsonString = localStorage.getItem("mythyaverseparseddata");
  const parsedData = JSON.parse(jsonString);
  const name = parsedData.personal_info.Name;
  const contactDetails = parsedData.personal_info["Contact Information"];
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
          <div className="w-4/5 font-semibold">{name}</div>
        </div>
      </div>
      <div>
        <button className="bg-[#29b2ff] p-2 px-4 text-white rounded-full font-medium">
          Contact
        </button>
      </div>
      <div className="rounded-3xl border-[1px] border-white text-white p-6 space-y-8">
        {Object.entries(contactDetails).map(([key, value]) => {
          return (
            <div className="flex items-center" key={key}>
              <div className="w-1/5 font-semibold">{key}:</div>
              <div className="w-4/5">{value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
