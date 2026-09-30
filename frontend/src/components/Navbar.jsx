import React, { useEffect, useRef, useState } from "react";
import { Moon, Sun, Monitor, ChevronDown, LogOut } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/logo.png";
import logoLight from "../assets/logo-light.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const menuRef = useRef(null);
  const themeRef = useRef(null);

  const navigate = useNavigate();

  const { theme, changeTheme } = useTheme();

  // Get logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }

      if (themeRef.current && !themeRef.current.contains(event.target)) {
        setShowThemeMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setShowMenu(false);

    navigate("/");
  };

  const getThemeIcon = () => {
    if (theme === "light") {
      return <Sun size={17} />;
    }

    if (theme === "dark") {
      return <Moon size={17} />;
    }

    return <Monitor size={17} />;
  };

  const handleThemeChange = (newTheme) => {
    changeTheme(newTheme);
    setShowThemeMenu(false);
  };

  return (
    <nav
      className="
        sticky top-0 z-50
        border-b border-zinc-200
        bg-white/95
        backdrop-blur-md
        transition-colors
        dark:border-zinc-800/80
        dark:bg-[#09090b]/95
      "
    >
      <div className="mx-auto flex h-[74px] w-full items-center justify-between px-7">
        {/* ================= LOGO ================= */}
        <Link
          to="/"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          {/* Dark mode logo */}
          <img
            src={logo}
            alt="CodePulse"
            className="hidden h-9 w-9 object-contain dark:block"
          />

          {/* Light mode logo */}
          <img
            src={logoLight}
            alt="CodePulse"
            className="block h-9 w-9 object-contain dark:hidden"
          />

          <span
            className="
      text-[25px] font-bold tracking-tight
      text-zinc-900
      dark:text-white
    "
          >
            Code<span className="text-orange-500">Pulse</span>
          </span>
        </Link>

        {/* ================= NAVIGATION ================= */}
        <div className="hidden items-center gap-10 md:flex">
          <a
            href="#features"
            className="
              text-sm font-medium
              text-zinc-600
              transition-colors
              hover:text-zinc-900
              dark:text-zinc-400
              dark:hover:text-white
            "
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="
              text-sm font-medium
              text-zinc-600
              transition-colors
              hover:text-zinc-900
              dark:text-zinc-400
              dark:hover:text-white
            "
          >
            How It Works
          </a>

          <a
            href="#languages"
            className="
              text-sm font-medium
              text-zinc-600
              transition-colors
              hover:text-zinc-900
              dark:text-zinc-400
              dark:hover:text-white
            "
          >
            Languages
          </a>

          <Link
            to="/compiler"
            className="
              text-sm font-medium
              text-zinc-600
              transition-colors
              hover:text-zinc-900
              dark:text-zinc-400
              dark:hover:text-white
            "
          >
            Compiler
          </Link>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center gap-4">
          {/* ================= THEME SWITCHER ================= */}
          <div className="relative" ref={themeRef}>
            <button
              onClick={() => setShowThemeMenu((prev) => !prev)}
              title="Change theme"
              className="
                flex h-10 w-10 cursor-pointer
                items-center justify-center
                rounded-lg
                border border-zinc-200
                bg-zinc-50
                text-zinc-600
                transition-all
                hover:border-zinc-300
                hover:bg-zinc-100
                hover:text-zinc-900
                dark:border-zinc-800
                dark:bg-zinc-900
                dark:text-zinc-400
                dark:hover:border-zinc-700
                dark:hover:bg-zinc-800
                dark:hover:text-white
              "
            >
              {getThemeIcon()}
            </button>

            {/* Theme Dropdown */}
            {showThemeMenu && (
              <div
                className="
                  absolute right-0 top-full mt-3
                  w-40 overflow-hidden
                  rounded-xl
                  border border-zinc-200
                  bg-white
                  p-1.5
                  shadow-xl shadow-black/10
                  dark:border-zinc-800
                  dark:bg-zinc-950
                  dark:shadow-black/40
                "
              >
                {/* Light */}
                <button
                  onClick={() => handleThemeChange("light")}
                  className={`
                    flex w-full cursor-pointer
                    items-center gap-3
                    rounded-lg px-3 py-2.5
                    text-sm
                    transition
                    ${
                      theme === "light"
                        ? "bg-orange-500/10 text-orange-500"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
                    }
                  `}
                >
                  <Sun size={16} />
                  <span>Light</span>

                  {theme === "light" && (
                    <span className="ml-auto text-xs">✓</span>
                  )}
                </button>

                {/* Dark */}
                <button
                  onClick={() => handleThemeChange("dark")}
                  className={`
                    flex w-full cursor-pointer
                    items-center gap-3
                    rounded-lg px-3 py-2.5
                    text-sm
                    transition
                    ${
                      theme === "dark"
                        ? "bg-orange-500/10 text-orange-500"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
                    }
                  `}
                >
                  <Moon size={16} />
                  <span>Dark</span>

                  {theme === "dark" && (
                    <span className="ml-auto text-xs">✓</span>
                  )}
                </button>

                {/* System */}
                <button
                  onClick={() => handleThemeChange("system")}
                  className={`
                    flex w-full cursor-pointer
                    items-center gap-3
                    rounded-lg px-3 py-2.5
                    text-sm
                    transition
                    ${
                      theme === "system"
                        ? "bg-orange-500/10 text-orange-500"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
                    }
                  `}
                >
                  <Monitor size={16} />
                  <span>System</span>

                  {theme === "system" && (
                    <span className="ml-auto text-xs">✓</span>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* ================= AUTH ================= */}
          {!user ? (
            <div className="flex items-center gap-5">
              {/* Login */}
              <Link
                to="/login"
                className="
                  text-sm font-medium
                  text-zinc-600
                  transition-colors
                  hover:text-zinc-900
                  dark:text-zinc-400
                  dark:hover:text-white
                "
              >
                Login
              </Link>

              {/* Sign Up */}
              <Link
                to="/signup"
                className="
                  rounded-lg
                  bg-orange-500
                  px-5 py-2.5
                  text-sm font-semibold
                  text-white
                  shadow-lg
                  shadow-orange-500/10
                  transition-all
                  hover:bg-orange-600
                  hover:shadow-orange-500/20
                "
              >
                Sign Up
              </Link>
            </div>
          ) : (
            /* ================= LOGGED IN USER ================= */
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="
                  flex cursor-pointer
                  items-center gap-3
                  rounded-lg
                  px-2 py-1.5
                  transition
                  hover:bg-zinc-100
                  dark:hover:bg-zinc-900
                "
              >
                {/* Avatar */}
                <div
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-full
                    border border-orange-500/40
                    bg-orange-500/10
                    text-sm font-semibold
                    text-orange-500
                  "
                >
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>

                {/* Name */}
                <span
                  className="
                    text-sm font-semibold
                    text-zinc-700
                    dark:text-zinc-300
                  "
                >
                  {user.name || "User"}
                </span>

                {/* Arrow */}
                <ChevronDown
                  size={16}
                  className={`
                    text-zinc-500
                    transition-transform
                    ${showMenu ? "rotate-180" : ""}
                  `}
                />
              </button>

              {/* ================= USER DROPDOWN ================= */}
              {showMenu && (
                <div
                  className="
                    absolute right-0 top-full mt-3
                    w-56 overflow-hidden
                    rounded-xl
                    border border-zinc-200
                    bg-white
                    p-2
                    shadow-2xl shadow-black/10
                    dark:border-zinc-800
                    dark:bg-zinc-950
                    dark:shadow-black/40
                  "
                >
                  {/* User Info */}
                  <div
                    className="
                      border-b border-zinc-200
                      px-3 py-3
                      dark:border-zinc-800
                    "
                  >
                    <p
                      className="
                        truncate text-sm font-medium
                        text-zinc-900
                        dark:text-white
                      "
                    >
                      {user.name}
                    </p>

                    <p
                      className="
                        mt-1 truncate text-xs
                        text-zinc-500
                      "
                    >
                      {user.email}
                    </p>
                  </div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="
                      mt-2 flex w-full
                      cursor-pointer
                      items-center
                      rounded-lg
                      px-3 py-2.5
                      text-left text-sm
                      font-medium
                      text-zinc-600
                      transition
                      hover:bg-red-500/10
                      hover:text-red-500
                      dark:text-zinc-300
                      dark:hover:text-red-400
                    "
                  >
                    <LogOut size={16} className="mr-3" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
