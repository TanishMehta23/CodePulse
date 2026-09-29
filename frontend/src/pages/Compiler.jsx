import React from "react";
import { useState } from "react";
import Editor from "@monaco-editor/react";

const Compiler = () => {

    const [language, setLanguage] = useState("java");


  return (
    <main className="h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Top Bar */}
      <header className="flex h-[74px] items-center justify-between border-b border-zinc-800 px-7">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          Code<span className="text-indigo-500">Pulse</span>
        </h1>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <select onChange={(e) => setLanguage(e.target.value)} value={language} className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm text-white outline-none transition focus:border-indigo-500">
            <option>Java</option>
            <option>C++</option>
            <option>Python</option>
            <option>JavaScript</option>
          </select>

          <button className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold transition hover:bg-indigo-500">
            Run Code
          </button>
        </div>
      </header>

      {/* Compiler Workspace */}
      <div className="h-[calc(100vh-74px)] p-6">
        <div className="grid h-full gap-5 lg:grid-cols-2">
          {/* LEFT - CODE EDITOR */}
          <section className="flex min-h-0 flex-col">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-medium text-zinc-400">Code</h2>

              <span className="text-xs text-zinc-600">Editor</span>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-zinc-800">
              <Editor
                height="100%"
                language={language}
                defaultValue={`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, CodePulse!");
    }
}`}
                theme="vs-dark"
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
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
                className="min-h-0 flex-1 resize-none rounded-xl border border-zinc-800 bg-zinc-900/80 p-5 font-mono text-sm leading-6 text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-indigo-500"
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

              <div className="min-h-0 flex-1 overflow-auto rounded-xl border border-zinc-800 bg-zinc-900/80 p-5 font-mono text-sm leading-6 text-zinc-300">
                <span className="text-zinc-600">
                  Output will appear here...
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Compiler;
