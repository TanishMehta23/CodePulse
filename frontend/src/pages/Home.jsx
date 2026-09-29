import React from "react";

const Home = () => {
  return (
    <div>
      <section className="min-h-screen flex flex-col items-center justify-center text-center bg-zinc-950 px-6">
        <p className="mb-4 text-sm font-medium tracking-[0.25em] text-indigo-400">
          ONLINE CODE COMPILER
        </p>

        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
          Write. Compile. <span className="text-indigo-500">Create.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
          A simple and powerful online compiler for developers. Write code, run
          it instantly, and see the results.
        </p>

        <button className="mt-8 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 cursor-pointer">
          Start Coding
        </button>
      </section>

      <section id="features" className="bg-zinc-950 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          {/* Section Heading */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium tracking-[0.25em] text-indigo-400">
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
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7 transition hover:-translate-y-1 hover:border-indigo-500/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl">
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
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7 transition hover:-translate-y-1 hover:border-indigo-500/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl">
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
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7 transition hover:-translate-y-1 hover:border-indigo-500/40">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl">
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
            <p className="text-sm font-medium tracking-[0.25em] text-indigo-400">
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
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 text-lg font-bold text-indigo-400">
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
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 text-lg font-bold text-indigo-400">
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
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 text-lg font-bold text-indigo-400">
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
            <p className="text-sm font-medium tracking-[0.25em] text-indigo-400">
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
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-8 text-center transition hover:-translate-y-1 hover:border-indigo-500/40">
              <div className="text-3xl">☕</div>

              <h3 className="mt-4 font-semibold text-white">Java</h3>

              <p className="mt-1 text-xs text-zinc-500">Java 17</p>
            </div>

            {/* C++ */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-8 text-center transition hover:-translate-y-1 hover:border-indigo-500/40">
              <div className="text-3xl">⚙️</div>

              <h3 className="mt-4 font-semibold text-white">C++</h3>

              <p className="mt-1 text-xs text-zinc-500">GCC</p>
            </div>

            {/* Python */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-8 text-center transition hover:-translate-y-1 hover:border-indigo-500/40">
              <div className="text-3xl">🐍</div>

              <h3 className="mt-4 font-semibold text-white">Python</h3>

              <p className="mt-1 text-xs text-zinc-500">Python 3</p>
            </div>

            {/* JavaScript */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-8 text-center transition hover:-translate-y-1 hover:border-indigo-500/40">
              <div className="text-3xl">JS</div>

              <h3 className="mt-4 font-semibold text-white">JavaScript</h3>

              <p className="mt-1 text-xs text-zinc-500">Node.js</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
