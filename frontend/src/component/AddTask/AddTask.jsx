import React, { useRef, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import api from "../../utils/api";
import useOutsideClick from "../../hooks/useOutsideClick";

const AddTask = ({ data, setTodo }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [input, setInput] = useState({});
  const ref = useRef();
  useOutsideClick(ref, () => {
    setShowCalendar(false);
  });

  const handleChange = (e, fieldName) => {
    if (fieldName == "dueDate") {
      setInput((prev) => ({ ...prev, dueDate: e }));
      console.log(input);
    } else {
      const { name, value } = e.target;
      setInput((prev) => ({ ...prev, [name]: value }));
      console.log(input);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formattedDate = null;

      if (input.dueDate) {
        const dateObj =
          input.dueDate instanceof Date
            ? input.dueDate
            : new Date(input.dueDate);

        formattedDate = dateObj.toISOString().split("T")[0];
      }

      const res = await api.post("/api/create-todo", {
        ...input,
        dueDate: formattedDate,
      });

      setTodo((prev) => [...prev, res.data]);
      setInput({});
    } catch (error) {
      console.error("Failed to submit data : " + error);
    }
  };
  return (
    <div className="rounded-sm mt-6 px-4 bg-[#201f1e]">
      <form className="flex items-center">
        <input
          type="text"
          name="title"
          value={input.title || ""}
          onChange={handleChange}
          placeholder="Add Task"
          className="w-full px-3.5 py-4 focus:outline-none text-white"
        />
        <div className="flex items-center relative">
          <div ref={ref} className="mr-4">
            <CiCalendar
            title="Add due date"
            size={30}
            className=" p-1 cursor-pointer hover:bg-[#323130] rounded-sm"
            onClick={() => setShowCalendar(true)}
          ></CiCalendar>
          {showCalendar && (
            <div className="w-[220px] h-[211px] bg-[#252423] text-sm  absolute top-[40px] right-0">
              <Calendar
                onChange={(e) => {
                  handleChange(e, "dueDate");
                }}
                value={input.dueDate || null}
              />
            </div>
          )}
          </div>
          

          <button
            className="border border-[#605e5c] text-[12px] text-[#a19f9d] font-medium px-2 h-8"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
