import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Compiler = () => {
  const navigate = useNavigate();

  const boilerplates = {
    java: `import java.util.*;

public class Main {
    public static void main(String[] args) {

    }
}`,

    cpp: `#include <iostream>
using namespace std;

int main() {

    return 0;
}`,

    python: `def main():

    pass


if __name__ == "__main__":
    main()`,

    javascript: `const fs = require("fs");

function main() {

}

main();`,
  };

  const [language, setLanguage] = useState("java");

  const [code, setCode] = useState(`import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int a = sc.nextInt();
        int b = sc.nextInt();

        System.out.println(a + b);
    }
}`);

  const [input, setInput] = useState("1\n2");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Keep latest runCode function available to Monaco
  const runCodeRef = useRef(null);

  const runCode = async () => {
    setLoading(true);
    setOutput("Running...");

    try {
      const response = await fetch("http://localhost:5000/api/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
          data.error || data.stderr || data.message || "Compilation failed.",
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
          "Make sure the backend server is running on port 5000.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Always keep the latest runCode function
  runCodeRef.current = runCode;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setSidebarOpen(false);

    navigate("/login");
  };

  return (
    <main className="h-screen overflow-hidden bg-zinc-950 text-white">
      {/* ================= SIDEBAR OVERLAY ================= */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed left-0 top-0 z-[100] flex h-screen w-[375px] flex-col border-r border-zinc-800 bg-[#09090b] shadow-2xl transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-[114px] items-center justify-between border-b border-zinc-800 px-7">
          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3"
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

          <button
            onClick={() => setSidebarOpen(false)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-2xl text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
          >
            ×
          </button>
        </div>

        {/* ================= LOGGED IN ================= */}
        {isLoggedIn ? (
          <div className="flex flex-1 flex-col px-5 py-6">
            {/* User Section */}
            <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/15 text-lg">
                  👤
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {JSON.parse(localStorage.getItem("user") || "{}").name ||
                      "CodePulse User"}
                  </p>

                  <p className="truncate text-xs text-zinc-500">
                    {JSON.parse(localStorage.getItem("user") || "{}").email ||
                      "Account"}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu */}
            <nav className="space-y-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex w-full cursor-pointer items-center gap-4 rounded-xl bg-orange-500/10 px-4 py-3 text-left text-sm font-medium text-orange-400 transition hover:bg-orange-500/15"
              >
                <span className="text-lg">⌨</span>
                Compiler
              </button>

              <button className="flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-3 text-left text-sm font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
                <span className="text-lg">↺</span>
                Run History
              </button>

              <button className="flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-3 text-left text-sm font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
                <span className="text-lg">★</span>
                Favorites
              </button>

              <button className="flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-3 text-left text-sm font-medium text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
                <span className="text-lg">◉</span>
                Saved Code
              </button>
            </nav>

            {/* Bottom */}
            <div className="mt-auto border-t border-zinc-800 pt-5">
              <button
                onClick={handleLogout}
                className="flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-3 text-left text-sm font-medium text-red-400 transition hover:bg-red-500/10"
              >
                <span className="text-lg">↪</span>
                Logout
              </button>
            </div>
          </div>
        ) : (
          /* ================= NOT LOGGED IN ================= */
          <div className="flex flex-1 flex-col px-5 py-6">
            <div className="relative flex-1 overflow-hidden">
              {/* Blur content */}
              <div className="pointer-events-none select-none space-y-2 opacity-40 blur-[5px]">
                <div className="flex items-center gap-4 rounded-xl bg-zinc-900 px-4 py-4">
                  <span className="text-lg">⌨</span>
                  <span>Compiler</span>
                </div>

                <div className="flex items-center gap-4 rounded-xl px-4 py-4">
                  <span className="text-lg">↺</span>
                  <span>Run History</span>
                </div>

                <div className="flex items-center gap-4 rounded-xl px-4 py-4">
                  <span className="text-lg">★</span>
                  <span>Favorites</span>
                </div>

                <div className="flex items-center gap-4 rounded-xl px-4 py-4">
                  <span className="text-lg">◉</span>
                  <span>Saved Code</span>
                </div>
              </div>

              {/* Login Card */}
              <div className="absolute inset-x-0 bottom-5 rounded-2xl border border-zinc-800 bg-zinc-900/95 p-6 text-center shadow-2xl">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-orange-500/40 bg-orange-500/10 text-2xl">
                  🔒
                </div>

                <h2 className="text-xl font-semibold text-white">
                  Sign in to unlock
                </h2>

                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  Save your code, view run history and manage your favorites.
                </p>

                <Link
                  to="/login"
                  onClick={() => setSidebarOpen(false)}
                  className="mt-6 block w-full rounded-xl bg-orange-500 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setSidebarOpen(false)}
                  className="mt-3 block w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                >
                  Create Account
                </Link>

                <p className="mt-5 text-xs leading-5 text-zinc-600">
                  Your compiler remains free to use without an account.
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* ================= TOP BAR ================= */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-[#09090b]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[74px] w-full items-center justify-between px-7">
          {/* Left */}
          <div className="flex items-center gap-6">
            {/* Hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
            >
              <div className="space-y-1.5">
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
                <span className="block h-0.5 w-5 bg-current" />
              </div>
            </button>

            {/* Logo */}
            <Link
              to="/"
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
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            <select
              value={language}
              onChange={(e) => {
                const newLanguage = e.target.value;

                setLanguage(newLanguage);
                setCode(boilerplates[newLanguage]);
                setOutput("");
                setInput("");
              }}
              className="cursor-pointer rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none transition hover:border-zinc-700 focus:border-orange-500"
            >
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
            </select>

            <div className="group relative">
              <button
                onClick={runCode}
                disabled={loading}
                className="cursor-pointer rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/10 transition-all hover:bg-orange-600 hover:shadow-orange-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Running..." : "Run Code"}
              </button>

              {/* Shortcut tooltip */}
              <div className="pointer-events-none absolute right-0 top-full z-50 mt-2 w-max rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs text-zinc-300 opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100">
                Press{" "}
                <kbd className="mx-1 rounded border border-zinc-600 bg-zinc-800 px-1.5 py-0.5 font-mono text-orange-400">
                  Ctrl
                </kbd>
                +
                <kbd className="ml-1 rounded border border-zinc-600 bg-zinc-800 px-1.5 py-0.5 font-mono text-orange-400">
                  Enter
                </kbd>{" "}
                to run
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================= COMPILER WORKSPACE ================= */}
      <div className="h-[calc(100vh-74px)] p-6">
        <div className="grid h-full gap-5 lg:grid-cols-2">
          {/* LEFT - CODE */}
          <section className="flex min-h-0 flex-col">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium text-zinc-400">Code</h2>

              <span className="text-xs text-zinc-600">Ctrl + Enter to run</span>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-zinc-800">
              <Editor
                height="100%"
                language={language === "cpp" ? "cpp" : language}
                value={code}
                onChange={(value) => setCode(value || "")}
                theme="vs-dark"
                onMount={(editor, monaco) => {
                  editor.addCommand(
                    monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
                    () => {
                      runCodeRef.current?.();
                    },
                  );
                }}
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
                }}
              />
            </div>
          </section>

          {/* RIGHT SIDE */}
          <section className="grid min-h-0 grid-rows-2 gap-5">
            {/* INPUT */}
            <div className="flex min-h-0 flex-col">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-medium text-zinc-400">Input</h2>

                <span className="text-xs text-zinc-600">stdin</span>
              </div>

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-0 flex-1 resize-none rounded-xl border border-zinc-800 bg-zinc-900/80 p-5 font-mono text-sm leading-6 text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-orange-500"
                placeholder="Enter input..."
                spellCheck="false"
              />
            </div>

            {/* OUTPUT */}
            <div className="flex min-h-0 flex-col">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-medium text-zinc-400">Output</h2>

                <span className="text-xs text-zinc-600">stdout</span>
              </div>

              <div className="min-h-0 flex-1 overflow-auto whitespace-pre-wrap rounded-xl border border-zinc-800 bg-zinc-900/80 p-5 font-mono text-sm leading-6 text-zinc-300">
                {output ? (
                  output
                ) : (
                  <span className="text-zinc-600">
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
