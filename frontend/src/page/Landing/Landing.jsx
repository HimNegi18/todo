import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import checkAuth from "../../utils/auth";

const Landing = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [loading, setLoading] = useState(true);

  useEffect(()=>{
    
     const verifyAuth =async()=>{
        try {
          const user = await checkAuth();
          setIsAuthenticated(!!user);// using !! to convert to boolean value;
        } catch (error) {
          console.error('Auth check failed:', error);
          setIsAuthenticated(false);
        }
        finally{
          setLoading(false);
        }
        
      }
      verifyAuth();
  },[])

  if (loading) {
    return <div>
      Page is Loading. Please wait
    </div>
  }

  return (
    isAuthenticated ? <Navigate to={'/todo'}/> : <div>
      <header className="h-12 bg-[#1b1a19] text-white flex items-center justify-between px-4">
        <h2 className="font-bold">To Do</h2>
      </header>
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl lg:w-[60%] mx-auto font-bold mb-4 text-gray-200 ">
          Organize Your <span className="text-[#2987e6]">Tasks</span>{" "}
          Effortlessly
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          The simplest way to track your to-dos and boost productivity.
        </p>
        <Link
          to="/signin"
          className="px-8 py-3 bg-[#2987e6] text-[#fff] rounded-lg text-lg font-medium hover:bg-[#126bc5] transition inline-block cursor-pointer"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default Landing;
