import React from "react";
import { GoSearch } from "react-icons/go";
import api from "../../utils/api";
import { useNavigate  } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      const res = await api.get("/api/logout");
      navigate('/signin');
    } catch (error) {
      console.error("Sign out failed: " + error?.response?.data?.error);
    }
  };
  return (
    <header className="h-12 bg-[#1b1a19] text-white flex items-center justify-between px-4">
      <h2 className="font-bold">To Do</h2>
      <form className="flex grow 2md:grow-0 h-8 2md:w-[400px] mx-4 rounded-sm bg-[#252423]">
        <div className="h-full w-10">
          <GoSearch
            className="rotate-90 relative top-2 left-2"
            color="#78bafd"
            size={16}
          />
        </div>
        <input
          type="text"
          className=" w-full h-full  cursor-pointer  focus:outline-0"
        />
      </form>
      <div className="group relative px-2">
        <button className="border border-white px-[4px] py-[5px] rounded-[50%]">
          HM
        </button>
        <div
          className="absolute hidden bg-[#1b1a19] w-20 bottom-[-40px] left-[-40px] px-2.5 py-2 z-10 cursor-pointer group-hover:block"
          onClick={handleSignOut}
        >
          <span>Sign out</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
