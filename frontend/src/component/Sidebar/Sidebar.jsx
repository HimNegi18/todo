import React, { useContext } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import { GlobalContext } from "../../Context/ContextProvider";
import { Link } from "react-router-dom";


const Sidebar = () => {
  const {sidebarToggle, setSidebarToggle} = useContext(GlobalContext);

  return (
     <aside className="absolute top-0 2md:static w-[200px] lg:w-[290px] h-full bg-[#252423] text-white text-[14px] leading-[20px]">
      <div className="pt-8 pb-3 px-6">
        <RxHamburgerMenu color="white" size={20} className="cursor-pointer" onClick={ ()=> setSidebarToggle(!sidebarToggle)}/>
      </div>
      <nav>
        <Link
          to="/todo/myday"
          className="py-3 px-6 flex items-center hover:bg-[#313030]"
          onClick={ ()=> setSidebarToggle(!sidebarToggle)}
        >
          <IoSunnyOutline color="white" size={20} />
          <span className="ml-4">My Day</span>
        </Link>
        <Link
          to="/todo/important"
          className="py-3 px-6 flex items-center hover:bg-[#313030]"
          onClick={ ()=> setSidebarToggle(!sidebarToggle)}
        >
          <FaRegStar color="white" size={20} />
          <span className="ml-4">Important</span>
        </Link>
        <Link
          to="/todo/tasks"
          className="py-3 px-6 flex items-center hover:bg-[#313030]"
          onClick={ ()=> setSidebarToggle(!sidebarToggle)}
        >
          <GoHome color="white" size={20} />
          <span className="ml-4">Tasks</span>
        </Link>
      </nav>
      <div  className="bg-[#484644] h-[0.5px] mx-[9px] my-4"></div>
    </aside>
    
   
  );
};

export default Sidebar;
