import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <img
            src={logo}
            alt="CodePulse"
            className="h-8 w-14"
          />

          <div className="text-xl font-bold text-white">
            Code<span className="text-indigo-500">Pulse</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            How It Works
          </a>

          <a
            href="#languages"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Languages
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden text-sm text-zinc-400 transition hover:text-white sm:block cursor-pointer">
            Login
          </Link>

          <Link to="/signup" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 cursor-pointer">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
