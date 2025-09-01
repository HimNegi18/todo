import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import api from "../../utils/api";

const Signin = () => {
  const [inputs, setInputs] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/login", inputs);
      console.log("Login Successful:" + response.data.user);
      setInputs({});
      navigate("/todo");
    } catch (error) {
      console.error("Login Failed:" + error?.response?.data?.error);
    }
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="w-[350px] sm:w-[520px] flex mx-auto items-center min-h-screen px-2">
      <div className="border-gray-400 border rounded-[8px] w-full px-6 py-5">
        <h2 className="pb-4 text-4xl font-bold text-center">SignIn</h2>

        <div className="w-full space-y-3  border-b-[0.5px] border-[#484644] pb-6">
          <div className="flex items-center  px-6 py-3 bg-white  text-black text-[14px] cursor-pointer transition hover:scale-105 hover:bg-[#bdbcbc]">
            <FcGoogle size={20} />
            <span className="grow text-center">Continue with Google</span>
          </div>
          <div className="flex items-center px-6 py-3 bg-white  text-black text-[14px] cursor-pointer transition hover:scale-105 hover:bg-[#bdbcbc]">
            <FaFacebook size={20} />
            <span className="grow text-center">Continue with Facebook</span>
          </div>
          <div className="flex items-center px-6 py-3 bg-white  text-black text-[14px] cursor-pointer transition hover:scale-105 hover:bg-[#bdbcbc]">
            <FaGithub size={20} />
            <span className="grow text-center">Continue with Github</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            className="w-full mt-6 px-4 py-3 bg-[#201f1e]"
            autoComplete="off"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={inputs.email || ""}
            onChange={handleChange}
            required
          />
          <div className="relative">
            <input
              className="w-full mt-6 px-4 py-3 bg-[#201f1e] "
              autoComplete="off"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={inputs.password || ""}
              onChange={handleChange}
              required
            />
            <div className="absolute top-[15px] right-4 cursor-pointer">
              {showPassword ? (
                <IoEyeOffOutline onClick={handlePassword} size={20} />
              ) : (
                <IoEyeOutline onClick={handlePassword} size={20} />
              )}
            </div>
          </div>
          {/* Forgat password functionality and page left to do */}
          <Link
            to="/signin"
            className="mt-6 inline-block cursor-pointer text-[13px] text-[#6d96fd] hover:text-[#9cb7fa]"
          >
            Forgat Password?
          </Link>

          <div className="mt-2 text-[13px]">
            New to ToDo?{" "}
            <Link
              to="/signup"
              className="cursor-pointer text-[#6d96fd] hover:text-[#9cb7fa]"
            >
              Sing Up
            </Link>
          </div>
          <button className="w-full mt-6 px-8 py-3 bg-[#2987e6] text-[#fff] rounded-lg text-lg font-medium hover:bg-[#126bc5] transition inline-block cursor-pointer">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
