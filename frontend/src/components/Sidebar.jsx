import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  X,
  Monitor,
  History,
  Star,
  Settings,
  LogOut,
  Lock,
  User,
} from "lucide-react";

import logo from "../assets/logo.png";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // Get user from localStorage
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Invalid user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadUser();

    // Update sidebar if login/logout happens elsewhere
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  // Close sidebar
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Login
  const handleLogin = () => {
    closeSidebar();
    navigate("/login");
  };

  // Signup
  const handleSignup = () => {
    closeSidebar();
    navigate("/signup");
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    closeSidebar();

    navigate("/");
  };

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-[2px]"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-[100]
          flex h-screen w-[300px] flex-col
          border-r border-zinc-800
          bg-[#0b0b0d]
          shadow-2xl
          transition-transform duration-300 ease-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex h-[74px] items-center justify-between border-b border-zinc-800 px-5">
          <Link
            to="/"
            onClick={closeSidebar}
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <img
              src={logo}
              alt="CodePulse"
              className="h-8 w-8 object-contain"
            />

            <span className="text-xl font-bold tracking-tight text-white">
              Code<span className="text-orange-500">Pulse</span>
            </span>
          </Link>

          <button
            onClick={closeSidebar}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================= LOGGED IN ================= */}
        {user ? (
          <>
            {/* User */}
            <div className="border-b border-zinc-800 px-5 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-orange-500/40 bg-orange-500/10 text-lg font-semibold text-orange-400">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {user.name || "User"}
                  </p>

                  <p className="truncate text-xs text-zinc-500">
                    {user.email || "Account"}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 px-3 py-4">
              {/* Compiler */}
              <button
                onClick={closeSidebar}
                className="flex w-full cursor-pointer items-center gap-3 rounded-lg bg-orange-500/10 px-4 py-3 text-left text-sm font-medium text-orange-400 transition hover:bg-orange-500/15"
              >
                <Monitor size={18} />

                <span className="flex-1">Compiler</span>
              </button>

              {/* Run History */}
              <Link
                to="/history"
                onClick={closeSidebar}
                className="mt-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
              >
                <History size={18} />

                <span className="flex-1">Run History</span>

                <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400">
                  10
                </span>
              </Link>

              {/* Favorites */}
              <Link
                to="/favorites"
                onClick={closeSidebar}
                className="mt-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
              >
                <Star size={18} />

                <span className="flex-1">Favorites</span>

                <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400">
                  5
                </span>
              </Link>
            </nav>

            {/* Bottom */}
            <div className="border-t border-zinc-800 p-3">
              <button
                onClick={handleLogout}
                className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-sm text-zinc-400 transition hover:bg-red-500/10 hover:text-red-400"
              >
                <LogOut size={18} />

                <span>Logout</span>
              </button>
            </div>
          </>
        ) : (
          /* ================= LOGGED OUT ================= */
          <div className="relative flex flex-1 flex-col">
            {/* Blurred menu */}
            <div className="pointer-events-none flex-1 select-none blur-[5px]">
              <nav className="px-3 py-5">
                <div className="flex items-center gap-3 rounded-lg bg-zinc-900 px-4 py-3 text-sm text-zinc-300">
                  <Monitor size={18} />
                  Compiler
                </div>

                <div className="mt-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-zinc-500">
                  <History size={18} />

                  <span className="flex-1">Run History</span>

                  <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px]">
                    10
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-zinc-500">
                  <Star size={18} />

                  <span className="flex-1">Favorites</span>

                  <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px]">
                    0/5
                  </span>
                </div>
              </nav>
            </div>

            {/* Login Card */}
            <div className="absolute inset-x-4 bottom-8">
              <div className="rounded-2xl border border-zinc-800 bg-[#111113]/95 p-5 text-center shadow-2xl backdrop-blur-xl">
                {/* Lock */}
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-400">
                  <Lock size={21} />
                </div>

                <h3 className="text-base font-semibold text-white">
                  Sign in to unlock
                </h3>

                <p className="mt-2 text-xs leading-5 text-zinc-500">
                  Save your code, view run history and manage your favorites.
                </p>

                {/* Sign In */}
                <button
                  onClick={handleLogin}
                  className="mt-5 w-full cursor-pointer rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/10 transition hover:bg-orange-600"
                >
                  Sign In
                </button>

                {/* Sign Up */}
                <button
                  onClick={handleSignup}
                  className="mt-2 w-full cursor-pointer rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
                >
                  Create Account
                </button>

                <p className="mt-4 text-center text-[11px] text-zinc-600">
                  Your compiler remains free to use without an account.
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;