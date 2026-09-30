import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Star } from "lucide-react";

const Compiler = () => {
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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const runCode = async () => {
    if (loading) return;

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

      const response = await fetch("http://localhost:5000/api/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          "Make sure the backend server is running on port 5000.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Ctrl + Enter / Cmd + Enter
  const handleEditorMount = (editor, monaco) => {
    editor.addAction({
      id: "run-code",
      label: "Run Code",
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
      run: () => {
        runCode();
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
      const response = await fetch("http://localhost:5000/api/favorites", {
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
    <main className="h-screen overflow-hidden bg-zinc-950 text-white dark:bg-zinc-950">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-[#09090b]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[74px] w-full items-center justify-between px-7">
          {/* Left */}
          <div className="flex items-center gap-4">
            {/* Sidebar Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-lg text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
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
                className="h-9 w-9 object-contain"
              />

              <span className="text-[25px] font-bold tracking-tight text-white">
                Code<span className="text-orange-500">Pulse</span>
              </span>
            </Link>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
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
              className="cursor-pointer rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none transition hover:border-zinc-700 focus:border-orange-500"
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
                className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-400"
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
              <h2 className="text-sm font-medium text-zinc-400">Code</h2>

              <div className="flex items-center gap-3">
                <span className="hidden text-[11px] text-zinc-600 sm:block">
                  Ctrl + Enter to run
                </span>

                <span className="text-xs text-zinc-600">Editor</span>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-zinc-800">
              <Editor
                height="100%"
                language={language === "cpp" ? "cpp" : language}
                value={code}
                onChange={(value) => setCode(value || "")}
                onMount={handleEditorMount}
                theme="vs-dark"
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
