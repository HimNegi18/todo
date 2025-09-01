import React, { useContext, useRef, useState } from "react";
import { GlobalContext } from "../../Context/ContextProvider";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdWindow } from "react-icons/md";
import { HiOutlineBars3 } from "react-icons/hi2";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FaRegStar } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import useOutsideClick from "../../hooks/useOutsideClick";

const Title = ({ Icon, title, showDate, handleSort }) => {
  const { sidebarToggle, setSidebarToggle } = useContext(GlobalContext);
  const [showSort, setShowSort] = useState(false);
  const ref = useRef();
  useOutsideClick(ref, () => {
    setShowSort(false);
  });

  const today = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return (
    <div className="flex justify-between">
      <div className="flex ">
        {!sidebarToggle && (
          <RxHamburgerMenu
            color="white"
            size={20}
            className="cursor-pointer mt-1.5 mr-2"
            onClick={() => setSidebarToggle(!sidebarToggle)}
          />
        )}
        <div>
          <div className="flex items-center gap-2">
            {sidebarToggle && <Icon size={26} />}
            <span className="text-[20px] font-[600]">{title}</span>
          </div>
          {showDate && (
            <time className="text-[12px] font-extralight text-[#a5a3a1]">
              {formattedDate}
            </time>
          )}
        </div>
        {/* <div className="flex gap-1 ml-4">
          <button className="flex items-center h-fit gap-2 py-[9px] px-3 mt-[-8px] text-[#a5a3a1] hover:bg-[#313030] rounded-sm">
            <MdWindow size={22} />
            <span className="text-[14px] leading-6 fontv hidden xl:block">
              Grid
            </span>
          </button>
          <button className="flex items-center gap-2 h-fit py-[9px] px-3 mt-[-8px] text-[#a5a3a1] hover:bg-[#313030] rounded-sm">
            <HiOutlineBars3 size={22} />
            <span className="text-[14px] leading-6 font hidden xl:block">
              List
            </span>
          </button>
        </div> */}
      </div>
      <div className="relative" ref={ref}>
        <button
          className="flex items-center gap-2 h-fit py-[9px] px-3 mt-[-8px] text-[#a5a3a1] hover:bg-[#313030] rounded-sm"
          onClick={() => setShowSort(true)}
        >
          <HiArrowsUpDown size={22} />
          <span className="text-[14px] leading-6 font hidden xl:block">
            Sort
          </span>
        </button>

        {showSort && (
          <div
            className="absolute right-0 w-[200px] bg-[#201f1e] py-1.5 rounded-md z-20"
            
          >
            <h6 className="font-semibold px-2 pt-2 pb-3 mb-2 border-b border-[#484644] text-center text-[14px]">
              Sort by
            </h6>
            <ul className="text-[14px]">
              {title !== "Important" && (
                <li
                  className="flex gap-3 items-center px-3 py-2 hover:bg-[#292826] cursor-pointer"
                  onClick={() => {
                    handleSort("important");
                    setShowSort(!showSort);
                  }}
                >
                  <FaRegStar size={18} />
                  <span>Important</span>
                </li>
              )}
              <li
                className="flex gap-3 items-center px-3 py-2 hover:bg-[#292826] cursor-pointer"
                onClick={() => {
                  handleSort("alphabetical");
                  setShowSort(!showSort);
                }}
              >
                <HiArrowsUpDown size={18} />
                <span>Alphabetical</span>
              </li>
              <li
                className="flex gap-3 items-center px-3 py-2 hover:bg-[#292826] cursor-pointer"
                onClick={() => {
                  handleSort("createdAt");
                  setShowSort(!showSort);
                }}
              >
                <CiCalendarDate size={18} />
                <span>Creation date</span>
              </li>
              <li
                className="flex gap-3 items-center px-3 py-2 hover:bg-[#292826] cursor-pointer"
                onClick={() => {
                  handleSort("dueDate");
                  setShowSort(!showSort);
                }}
              >
                <CiCalendarDate size={18} />
                <span>Due date</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Title;
