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
              <div className="flex justify-center">
                {/* Java official logo */}
                <svg viewBox="0 0 128 128" className="h-10 w-10">
                  <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zM44.629 84.455s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
                  <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"/>
                  <path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zM90.609 93.041c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"/>
                  <path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"/>
                  <path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.382 17.647 3.331z"/>
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">Java</h3>
              <p className="mt-1 text-xs text-zinc-500">Java 17</p>
            </div>


            {/* C++ */}
            <div className="rounded-xl border border-zinc-200 bg-white px-6 py-8 text-center transition-all duration-200 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex justify-center">
                {/* C++ logo — hexagon + clear rect-based ++ */}
                <svg viewBox="0 0 128 128" className="h-10 w-10" xmlns="http://www.w3.org/2000/svg">
                  {/* Hexagon */}
                  <path d="M64 4L117 34V94L64 124L11 94V34Z" fill="#004482"/>
                  <path d="M64 4L117 34V94L64 124L11 94V34Z" fill="#659BD2" opacity="0.3"/>
                  {/* C shape */}
                  <path fill="white" d="M79 75C76 81 70 85 63 85c-11.6 0-21-9.4-21-21s9.4-21 21-21c7 0 13 3.6 16.5 9l11-6.4C84 35.5 74 30 63 30c-18.8 0-34 15.2-34 34s15.2 34 34 34c11 0 21-5.6 26.5-14.4L79 75z"/>
                  {/* First + */}
                  <rect x="90" y="57" width="5" height="19" rx="1" fill="white"/>
                  <rect x="83" y="64" width="19" height="5" rx="1" fill="white"/>
                  {/* Second + */}
                  <rect x="106" y="57" width="5" height="19" rx="1" fill="white"/>
                  <rect x="99" y="64" width="19" height="5" rx="1" fill="white"/>
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">C++</h3>
              <p className="mt-1 text-xs text-zinc-500">GCC</p>
            </div>


            {/* Python */}
            <div className="rounded-xl border border-zinc-200 bg-white px-6 py-8 text-center transition-all duration-200 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex justify-center">
                {/* Python official logo */}
                <svg viewBox="0 0 128 128" className="h-10 w-10">
                  <linearGradient id="py-a" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.563 0 0 -.568 -29.15 707.817)">
                    <stop offset="0" stopColor="#5A9FD4"/>
                    <stop offset="1" stopColor="#306998"/>
                  </linearGradient>
                  <linearGradient id="py-b" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.563 0 0 -.568 -29.15 707.817)">
                    <stop offset="0" stopColor="#FFD43B"/>
                    <stop offset="1" stopColor="#FFE873"/>
                  </linearGradient>
                  <path fill="url(#py-a)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"/>
                  <path fill="url(#py-b)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.548v23.515c0 6.693 5.818 10.622 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"/>
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">Python</h3>
              <p className="mt-1 text-xs text-zinc-500">Python 3</p>
            </div>


            {/* JavaScript */}
            <div className="rounded-xl border border-zinc-200 bg-white px-6 py-8 text-center transition-all duration-200 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/50">
              <div className="flex justify-center">
                {/* JavaScript official logo */}
                <svg viewBox="0 0 128 128" className="h-10 w-10">
                  <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z"/>
                  <path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"/>
                </svg>
              </div>
              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">JavaScript</h3>
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