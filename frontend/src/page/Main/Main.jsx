import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../component/Sidebar/Sidebar";
import { GlobalContext } from "../../Context/ContextProvider";
import Header from "../../component/Header/Header";

const Main = () => {
  const { sidebarToggle } = useContext(GlobalContext);
  return (
    <>
       <Header />
      <div className="flex  h-[calc(100vh-44px)]">
        {sidebarToggle && <Sidebar />}
        <Outlet />
      </div>
     
    </>
  );
};

export default Main;
