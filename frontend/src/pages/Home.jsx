import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar />
      <section className="relative flex min-h-[calc(100vh-74px)] items-center justify-center overflow-hidden bg-[#09090b] px-6">
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[140px]" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">


          {/* Heading */}
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
            Write code.
            <br />
            <span className="text-zinc-300">Compile instantly.</span>
            <br />
            <span className="text-orange-500">Build anything.</span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            A fast, simple, and powerful online compiler for developers. Write
            your code, run it instantly, and get results without setting up a
            local environment.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              to="/compiler"
              className="group rounded-lg bg-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-orange-500/30"
            >
              Start Coding
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="bg-zinc-950 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          {/* Section Heading */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium tracking-[0.25em] text-orange-300">
              FEATURES
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Everything you need to code
            </h2>

            <p className="mt-4 text-zinc-400">
              A simple development environment built to help you write, run, and
              test your code without unnecessary complexity.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7 transition hover:-translate-y-1 hover:border-orange-500/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-2xl">
                ⚡
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">
                Instant Execution
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Write your code and run it instantly with a clean output
                experience.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7 transition hover:-translate-y-1 hover:border-orange-500/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-2xl">
                🔒
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">
                Secure Execution
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Your code will run inside an isolated environment designed to
                keep execution safe.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7 transition hover:-translate-y-1 hover:border-orange-500/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-2xl">
                💻
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">
                Multiple Languages
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Write and execute programs using popular programming languages
                from one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="border-t border-zinc-900 bg-zinc-950 px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          {/* Heading */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium tracking-[0.25em] text-orange-300">
              HOW IT WORKS
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              From code to output in seconds
            </h2>

            <p className="mt-4 text-zinc-400">
              Three simple steps to run your program.
            </p>
          </div>

          {/* Steps */}
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-lg font-bold text-orange-400">
                01
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">
                Write Code
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Open the compiler and write your program using the built-in code
                editor.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-lg font-bold text-orange-400">
                02
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">
                Choose Language
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Select the programming language you want to compile and execute.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-lg font-bold text-orange-400">
                03
              </div>

              <h3 className="mt-6 text-lg font-semibold text-white">
                Run & Get Output
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Run your program and instantly see the output or compilation
                errors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="languages"
        className="border-t border-zinc-900 bg-zinc-950 px-6 py-24"
      >
        <div className="mx-auto max-w-7xl">
          {/* Heading */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium tracking-[0.25em] text-orange-300">
              LANGUAGES
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Code in your favorite language
            </h2>

            <p className="mt-4 text-zinc-400">
              Start with the languages you already know and execute your
              programs from one place.
            </p>
          </div>

          {/* Languages */}
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {/* Java */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-8 text-center transition hover:-translate-y-1 hover:border-orange-500/40">
              <div className="text-3xl">☕</div>

              <h3 className="mt-4 font-semibold text-white">Java</h3>

              <p className="mt-1 text-xs text-zinc-500">Java 17</p>
            </div>

            {/* C++ */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-8 text-center transition hover:-translate-y-1 hover:border-orange-500/40">
              <div className="text-3xl">⚙️</div>

              <h3 className="mt-4 font-semibold text-white">C++</h3>

              <p className="mt-1 text-xs text-zinc-500">GCC</p>
            </div>

            {/* Python */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-8 text-center transition hover:-translate-y-1 hover:border-orange-500/40">
              <div className="text-3xl">🐍</div>

              <h3 className="mt-4 font-semibold text-white">Python</h3>

              <p className="mt-1 text-xs text-zinc-500">Python 3</p>
            </div>

            {/* JavaScript */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-8 text-center transition hover:-translate-y-1 hover:border-orange-500/40">
              <div className="text-3xl">JS</div>

              <h3 className="mt-4 font-semibold text-white">JavaScript</h3>

              <p className="mt-1 text-xs text-zinc-500">Node.js</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
