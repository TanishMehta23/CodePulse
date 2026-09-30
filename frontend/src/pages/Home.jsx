import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Zap, ShieldCheck, Code2 } from "lucide-react";

const Home = () => {
  const [user, setUser] = useState(null);

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

  return (
    <div className="min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-[#09090b] dark:text-white">

      <Navbar user={user} setUser={setUser} />

      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[calc(100vh-74px)] items-center justify-center overflow-hidden bg-white px-6 transition-colors duration-300 dark:bg-[#09090b]">
        {/* Hero content */}
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">

          {/* Heading */}
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-zinc-900 sm:text-6xl md:text-7xl dark:text-white">
            Write code.
            <br />
            <span className="text-orange-500">
              Compile Instantly.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg dark:text-zinc-400">
            A fast, simple, and powerful online compiler for developers.
            Write your code, run it instantly, and get results without
            setting up a local environment.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">

            {/* Main button */}
            <Link
              to="/compiler"
              className="group rounded-lg bg-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-orange-500/30"
            >
              {user ? "Open Compiler" : "Start Coding"}

              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            {/* Create account */}
            {!user && (
              <Link
                to="/signup"
                className="rounded-lg border border-zinc-300 bg-zinc-100 px-7 py-3.5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
              >
                Create Account
              </Link>
            )}
          </div>

          {/* Logged-in message */}
          {user && (
            <p className="mt-5 text-sm text-zinc-500 dark:text-zinc-500">
              Welcome back,{" "}
              <span className="text-zinc-800 dark:text-zinc-300">
                {user.name}
              </span>
              . Your code history and favorites are available in the compiler.
            </p>
          )}

        </div>
      </section>


      {/* ================= FEATURES ================= */}
      <section
        id="features"
        className="border-t border-zinc-200 bg-zinc-50 px-6 py-24 transition-colors duration-300 dark:border-zinc-900 dark:bg-zinc-950"
      >
        <div className="mx-auto max-w-7xl">

          {/* Section Heading */}
          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-medium tracking-[0.25em] text-orange-500 dark:text-orange-300">
              FEATURES
            </p>

            <h2 className="mt-3 text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-white">
              Everything you need to code
            </h2>

            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              A simple development environment built to help you write, run,
              and test your code without unnecessary complexity.
            </p>

          </div>


          {/* Feature Cards */}
          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {/* Card 1 */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-lg hover:shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:shadow-black/20">

              <Zap
                className="h-7 w-7 text-orange-500"
                strokeWidth={2}
              />

              <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-white">
                Instant Execution
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Write your code and run it instantly with a clean output
                experience.
              </p>

            </div>


            {/* Card 2 */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-lg hover:shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:shadow-black/20">

              <ShieldCheck
                className="h-7 w-7 text-orange-500"
                strokeWidth={2}
              />

              <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-white">
                Secure Execution
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Your code will run inside an isolated environment designed
                to keep execution safe.
              </p>

            </div>


            {/* Card 3 */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-lg hover:shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:shadow-black/20">

              <Code2
                className="h-7 w-7 text-orange-500"
                strokeWidth={2}
              />

              <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-white">
                Multiple Languages
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Write and execute programs using popular programming
                languages from one place.
              </p>

            </div>

          </div>
        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how-it-works"
        className="border-t border-zinc-200 bg-white px-6 py-24 transition-colors duration-300 dark:border-zinc-900 dark:bg-zinc-950"
      >
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-medium tracking-[0.25em] text-orange-500 dark:text-orange-300">
              HOW IT WORKS
            </p>

            <h2 className="mt-3 text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-white">
              From code to output in seconds
            </h2>

            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Three simple steps to run your program.
            </p>

          </div>


          {/* Steps */}
          <div className="mt-16 grid gap-10 md:grid-cols-3">

            {/* Step 1 */}
            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-lg font-bold text-orange-500 dark:text-orange-400">
                01
              </div>

              <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-white">
                Write Code
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Open the compiler and write your program using the built-in
                code editor.
              </p>

            </div>


            {/* Step 2 */}
            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-lg font-bold text-orange-500 dark:text-orange-400">
                02
              </div>

              <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-white">
                Choose Language
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Select the programming language you want to compile and
                execute.
              </p>

            </div>


            {/* Step 3 */}
            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-lg font-bold text-orange-500 dark:text-orange-400">
                03
              </div>

              <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-white">
                Run & Get Output
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Run your program and instantly see the output or compilation
                errors.
              </p>

            </div>

          </div>
        </div>
      </section>


      {/* ================= LANGUAGES ================= */}
      <section
        id="languages"
        className="border-t border-zinc-200 bg-zinc-50 px-6 py-24 transition-colors duration-300 dark:border-zinc-900 dark:bg-zinc-950"
      >
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-medium tracking-[0.25em] text-orange-500 dark:text-orange-300">
              LANGUAGES
            </p>

            <h2 className="mt-3 text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-white">
              Code in your favorite language
            </h2>

            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Start with the languages you already know and execute your
              programs from one place.
            </p>

          </div>


          {/* Languages */}
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">

            {/* Java */}
            <div className="rounded-xl border border-zinc-200 bg-white px-6 py-8 text-center transition-all duration-200 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/50">

              <div className="text-3xl">
                ☕
              </div>

              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">
                Java
              </h3>

              <p className="mt-1 text-xs text-zinc-500">
                Java 17
              </p>

            </div>


            {/* C++ */}
            <div className="rounded-xl border border-zinc-200 bg-white px-6 py-8 text-center transition-all duration-200 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/50">

              <div className="text-3xl">
                ⚙️
              </div>

              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">
                C++
              </h3>

              <p className="mt-1 text-xs text-zinc-500">
                GCC
              </p>

            </div>


            {/* Python */}
            <div className="rounded-xl border border-zinc-200 bg-white px-6 py-8 text-center transition-all duration-200 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/50">

              <div className="text-3xl">
                🐍
              </div>

              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">
                Python
              </h3>

              <p className="mt-1 text-xs text-zinc-500">
                Python 3
              </p>

            </div>


            {/* JavaScript */}
            <div className="rounded-xl border border-zinc-200 bg-white px-6 py-8 text-center transition-all duration-200 hover:-translate-y-1 hover:border-orange-500/40 dark:border-zinc-800 dark:bg-zinc-900/50">

              <div className="text-3xl font-semibold text-zinc-900 dark:text-white">
                JS
              </div>

              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">
                JavaScript
              </h3>

              <p className="mt-1 text-xs text-zinc-500">
                Node.js
              </p>

            </div>

          </div>
        </div>
      </section>


      <Footer />

    </div>
  );
};

export default Home;