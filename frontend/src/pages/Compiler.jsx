import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Compiler = () => {
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

            setOutput(data.output || "No output");
        } catch (error) {
            console.error(error);

            setOutput(
                "Could not connect to the backend.\nMake sure the backend server is running."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="h-screen overflow-hidden bg-zinc-950 text-white">

            {/* Top Bar / Navbar */}
            <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-[#09090b]/95 backdrop-blur-md">
                <div className="mx-auto flex h-[74px] w-full items-center justify-between px-7">

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

                    {/* Controls */}
                    <div className="flex items-center gap-4">

                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="cursor-pointer rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none transition focus:border-orange-500 hover:border-zinc-700"
                        >
                            <option value="java">Java</option>
                            <option value="cpp">C++</option>
                            <option value="python">Python</option>
                            <option value="javascript">JavaScript</option>
                        </select>

                        <button
                            onClick={runCode}
                            disabled={loading}
                            className="cursor-pointer rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/10 transition-all hover:bg-orange-600 hover:shadow-orange-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Running..." : "Run Code"}
                        </button>

                    </div>
                </div>
            </header>

            {/* Compiler Workspace */}
            <div className="h-[calc(100vh-74px)] p-6">

                <div className="grid h-full gap-5 lg:grid-cols-2">

                    {/* LEFT - CODE */}
                    <section className="flex min-h-0 flex-col">

                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-sm font-medium text-zinc-400">
                                Code
                            </h2>

                            <span className="text-xs text-zinc-600">
                                Editor
                            </span>
                        </div>

                        <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-zinc-800">

                            <Editor
                                height="100%"
                                language={language === "cpp" ? "cpp" : language}
                                value={code}
                                onChange={(value) => setCode(value || "")}
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
                                }}
                            />

                        </div>

                    </section>

                    {/* RIGHT SIDE */}
                    <section className="grid min-h-0 grid-rows-2 gap-5">

                        {/* INPUT */}
                        <div className="flex min-h-0 flex-col">

                            <div className="mb-3 flex items-center justify-between">
                                <h2 className="text-sm font-medium text-zinc-400">
                                    Input
                                </h2>

                                <span className="text-xs text-zinc-600">
                                    stdin
                                </span>
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
                                <h2 className="text-sm font-medium text-zinc-400">
                                    Output
                                </h2>

                                <span className="text-xs text-zinc-600">
                                    stdout
                                </span>
                            </div>

                            <div className="min-h-0 flex-1 overflow-auto rounded-xl border border-zinc-800 bg-zinc-900/80 p-5 font-mono text-sm leading-6 text-zinc-300 whitespace-pre-wrap">

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