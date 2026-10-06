import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import logo from "../assets/logo.png";
import logoLight from "../assets/logo-light.png";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Star, Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import API_BASE_URL from "../config/api";

const Compiler = () => {
  const { theme, changeTheme, isDark } = useTheme();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const themeRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeRef.current && !themeRef.current.contains(event.target)) {
        setShowThemeMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const boilerplates = {
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,

    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,

    python: `print("Hello, World!")`,

    javascript: `console.log("Hello, World!");`,
  };

  const [language, setLanguage] = useState("java");

  const [code, setCode] = useState(`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`);

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isStale, setIsStale] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Always points to the latest runCode — fixes stale closure in Monaco editor action
  const runCodeRef = useRef(null);

  const runCode = async () => {
    if (loading) return;

    setIsStale(false);
    setLoading(true);
    setOutput("Running...");

    try {
      const token = localStorage.getItem("token");

      const headers = {
        "Content-Type": "application/json",
      };

      // Send JWT only when the user is logged in
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/compile`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          language,
          code,
          input,
        }),
      });

      const data = await response.json();

      console.log("Backend response:", data);

      if (!response.ok) {
        setOutput(
          data.output ||
            data.error ||
            data.stderr ||
            data.message ||
            "Compilation failed.",
        );
        return;
      }

      setOutput(
        data.output ||
          data.stderr ||
          data.error ||
          "Program executed successfully with no output.",
      );
    } catch (error) {
      console.error("Compiler error:", error);

      setOutput(
        "Could not connect to the backend.\n\n" +
          "Make sure the backend server is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Keep ref in sync on every render
  runCodeRef.current = runCode;

  // Ctrl + Enter / Cmd + Enter
  const handleEditorMount = (editor, monaco) => {
    editor.addAction({
      id: "run-code",
      label: "Run Code",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      run: () => {
        // Call via ref so we always get the latest code/input/language state
        runCodeRef.current?.();
      },
    });
  };

  const addToFavorites = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to save favorites.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          language,
          code,
          input,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add favorite");
        return;
      }

      alert("Added to favorites ⭐");
    } catch (error) {
      console.error("Favorite error:", error);
      alert("Could not connect to backend.");
    }
  };

  return (
    <main className="h-screen overflow-hidden bg-zinc-100 text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-white">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-md transition-colors duration-300 dark:border-zinc-800/80 dark:bg-[#09090b]/95">
        <div className="mx-auto flex h-[74px] w-full items-center justify-between px-7">
          {/* Left */}
          <div className="flex items-center gap-4">
            {/* Sidebar Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-lg text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-white"
              aria-label="Open sidebar"
              title="Open menu"
            >
              ☰
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 transition-opacity hover:opacity-90"
            >
              <img
                src={logo}
                alt="CodePulse"
                className="hidden h-9 w-9 object-contain dark:block"
              />
              <img
                src={logoLight}
                alt="CodePulse"
                className="block h-9 w-9 object-contain dark:hidden"
              />

              <span className="text-[25px] font-bold tracking-tight text-zinc-900 dark:text-white">
                Code<span className="text-orange-500">Pulse</span>
              </span>
            </Link>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Switcher */}
            <div className="relative" ref={themeRef}>
              <button
                onClick={() => setShowThemeMenu((prev) => !prev)}
                title="Change theme"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                {getThemeIcon()}
              </button>

              {/* Theme Dropdown */}
              {showThemeMenu && (
                <div className="absolute right-0 top-full mt-2 w-36 overflow-hidden rounded-xl border border-zinc-200 bg-white p-1.5 shadow-xl shadow-black/10 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/40">
                  <button
                    onClick={() => handleThemeChange("light")}
                    className={`flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition ${
                      theme === "light"
                        ? "bg-orange-500/10 text-orange-500"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    <Sun size={15} />
                    <span>Light</span>
                    {theme === "light" && <span className="ml-auto">✓</span>}
                  </button>

                  <button
                    onClick={() => handleThemeChange("dark")}
                    className={`flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition ${
                      theme === "dark"
                        ? "bg-orange-500/10 text-orange-500"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    <Moon size={15} />
                    <span>Dark</span>
                    {theme === "dark" && <span className="ml-auto">✓</span>}
                  </button>

                  <button
                    onClick={() => handleThemeChange("system")}
                    className={`flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition ${
                      theme === "system"
                        ? "bg-orange-500/10 text-orange-500"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    <Monitor size={15} />
                    <span>System</span>
                    {theme === "system" && <span className="ml-auto">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Language */}
            <select
              value={language}
              onChange={(e) => {
                const newLanguage = e.target.value;

                setLanguage(newLanguage);
                setCode(boilerplates[newLanguage]);
                setOutput("");
                setInput("");
              }}
              className="cursor-pointer rounded-lg border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-zinc-800 outline-none transition hover:border-zinc-300 focus:border-orange-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:border-zinc-700"
            >
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
            </select>

            {/* Run */}
            <div className="flex items-center gap-2">
              <button
                onClick={addToFavorites}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-orange-500/40 dark:hover:text-orange-400"
                title="Add to favorites"
              >
                <Star size={18} />
              </button>

              <button
                onClick={runCode}
                disabled={loading}
                className="cursor-pointer rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/10 transition-all hover:bg-orange-600 hover:shadow-orange-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Running..." : "Run Code"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Workspace */}
      <div className="h-[calc(100vh-74px)] p-6">
        <div className="grid h-full gap-5 lg:grid-cols-2">
          {/* LEFT - CODE */}
          <section className="flex min-h-0 flex-col">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Code</h2>

              <div className="flex items-center gap-3">
                <span className="hidden text-[11px] text-zinc-500 sm:block dark:text-zinc-600">
                  Ctrl + Enter to run
                </span>

                <span className="text-xs text-zinc-500 dark:text-zinc-600">Editor</span>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-950">
              <Editor
                height="100%"
                language={language === "cpp" ? "cpp" : language}
                value={code}
                onChange={(value) => {
                setCode(value || "");
                if (output && output !== "Running...") setIsStale(true);
              }}
                onMount={handleEditorMount}
                theme={isDark ? "vs-dark" : "light"}
                options={{
                  fontSize: 14,

                  minimap: {
                    enabled: false,
                  },

                  padding: {
                    top: 16,
                  },

                  scrollBeyondLastLine: false,

                  automaticLayout: true,

                  tabSize: 4,

                  wordWrap: "on",
                }}
              />
            </div>
          </section>

          {/* RIGHT SIDE */}
          <section className="grid min-h-0 grid-rows-2 gap-5">
            {/* INPUT */}
            <div className="flex min-h-0 flex-col">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Input</h2>

                <span className="text-xs text-zinc-500 dark:text-zinc-600">stdin</span>
              </div>

              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (output && output !== "Running...") setIsStale(true);
                }}
                className="min-h-0 flex-1 resize-none rounded-xl border border-zinc-200 bg-white p-5 font-mono text-sm leading-6 text-zinc-800 shadow-xs outline-none transition placeholder:text-zinc-400 focus:border-orange-500 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200 dark:placeholder:text-zinc-600"
                placeholder="Enter input..."
                spellCheck="false"
              />
            </div>

            {/* OUTPUT */}
            <div className="flex min-h-0 flex-col">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Output</h2>

                <div className="flex items-center gap-2">
                  {isStale && output && output !== "Running..." && (
                    <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-500">
                      Outdated
                    </span>
                  )}
                  <span className="text-xs text-zinc-500 dark:text-zinc-600">stdout</span>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-auto whitespace-pre-wrap rounded-xl border border-zinc-200 bg-white p-5 font-mono text-sm leading-6 text-zinc-800 shadow-xs dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-300">
                {output ? (
                  output
                ) : (
                  <span className="text-zinc-400 dark:text-zinc-600">
                    Output will appear here...
                  </span>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Compiler;
