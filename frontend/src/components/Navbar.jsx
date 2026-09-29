import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800/80 bg-[#09090b]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[74px] w-full items-center justify-between px-7">

        {/* Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <img
            src={logo}
            alt="CodePulse"
            className="h-9 w-9 object-contain"
          />

          <span className="text-[25px] font-bold tracking-tight text-white">
            Code<span className="text-orange-500">Pulse</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            How It Works
          </a>

          <a
            href="#languages"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Languages
          </a>
        </div>

        {/* Auth */}
        <div className="flex items-center gap-5">
          <Link
            to="/login"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/10 transition-all hover:bg-orange-600 hover:shadow-orange-500/20"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;