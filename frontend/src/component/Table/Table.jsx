import React, { useRef, useEffect, useState } from "react";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineStarBorder, MdOutlineStar } from "react-icons/md";
import api from "../../utils/api";
import Calendar from "react-calendar";
import "../AddTask/calendar.css";
import TodoItem from "../TodoItem/TodoItem";

const Table = ({ data, setTodo, handleTodoItem }) => {
  const [showCalendar, setShowCalendar] = useState(null);
  const ref = useRef();

  useEffect(() => {
    function listner(event) {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      setShowCalendar(null);
    }

    document.addEventListener("mousedown", listner);
    document.addEventListener("touchstart", listner);
    return () => {
      document.removeEventListener("mousedown", listner);
      document.removeEventListener("touchstart", listner);
    };
  }, [ref]);

  const onCircleClick = async (id, currentComplete) => {
    try {
      const res = await api.put(`/api/update-todo/${id}`, {
        completed: !currentComplete,
      });

      if (res) {
        setTodo((prevTodo) =>
          prevTodo.map((todo) =>
            todo._id === id ? { ...todo, completed: !currentComplete } : todo
          )
        );
      }
    } catch (error) {
      console.error("Failed to update importance:", error);
    }
  };

  const onStarClick = async (id, currentImportant) => {
    try {
      const res = await api.put(`/api/update-todo/${id}`, {
        important: !currentImportant,
      });

      if (res) {
        setTodo((prevTodo) =>
          prevTodo.map((todo) =>
            todo._id === id ? { ...todo, important: !currentImportant } : todo
          )
        );
      }
    } catch (error) {
      console.error("Failed to update importance:", error);
    }
  };

  const handleDateChange = async (value, id) => {
    try {
      const formatedDate = value.toISOString().split("T")[0];
      const res = await api.put(`/api/update-todo/${id}`, {
        dueDate: formatedDate,
      });
      if (res) {
        setTodo((prevTodo) =>
          prevTodo.map((todo) =>
            todo._id === id ? { ...todo, dueDate: formatedDate } : todo
          )
        );
      }
    } catch (error) {
      console.error("Failed to update date:", error);
    }
  };
  return (
    <div className="mt-2.5 rounded-sm overflow-x-auto overflow-y-auto lg:overflow-hidden">
      <div className="grid [grid-template-columns:40px_600px_144px_100px] bg-[#201f1e] text-sm mb-0.5">
        <div className="bg-[#201f1e]"></div>
        <div className="px-4 py-2.5 bg-[#201f1e]">Title</div>
        <div className="px-4 py-2.5 bg-[#201f1e]">Due Date</div>
        <div className="px-4 py-2.5 bg-[#201f1e]">Importance</div>
      </div>
      <div className="max-h-[415px] lg:max-h-[496px] lg:overflow-y-scroll">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="grid [grid-template-columns:40px_600px_144px_100px] bg-[#201f1e] w-full mb-0.5 text-sm "
            >
              <div className="pl-2.5 pr-4 py-2.5 border border-transparent bg-[#201f1e] hover:border-white">
                {item.completed ? (
                  <RiCheckboxCircleLine
                    size={20}
                    onClick={() => onCircleClick(item._id, item.completed)}
                  />
                ) : (
                  <RiCheckboxBlankCircleLine
                    size={20}
                    onClick={() => onCircleClick(item._id, item.completed)}
                  />
                )}
              </div>
              <div className="px-4 py-2.5 border border-transparent bg-[#201f1e] hover:border-white" onClick={()=>handleTodoItem(item)}>
                {item.title}
              </div>
              <div className=" flex gap-3.5 px-4 py-2.5 border border-transparent bg-[#201f1e] hover:border-white cursor-default">
                <div className=" cursor-pointer">
                  <CiCalendar
                    size={20}
                    onClick={() => setShowCalendar(index)}
                  />
                  {showCalendar === index && (
                    <div className="absolute w-[220px] h-[211px]" ref={ref}>
                      <Calendar
                        onChange={(e) => handleDateChange(e, item._id)}
                        value={item.dueDate ? new Date(item.dueDate) : null}
                      />
                    </div>
                  )}
                </div>
                {item.dueDate || ""}
              </div>
              <div className="mx-auto py-2.5 border border-transparent bg-[#201f1e] hover:border-white w-full flex justify-center">
                {item.important ? (
                  <MdOutlineStar
                    className="hover:cursor-pointer"
                    size={20}
                    onClick={() => onStarClick(item._id, item.important)}
                  />
                ) : (
                  <MdOutlineStarBorder
                    className="hover:cursor-pointer"
                    size={20}
                    onClick={() => onStarClick(item._id, item.important)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
