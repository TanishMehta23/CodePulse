import React from "react";
import { Link } from "react-router-dom";
import {
  Terminal,
  ArrowUp,
  Heart,
} from "lucide-react";
import logo from "../assets/logo.png";
import logoLight from "../assets/logo-light.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative border-t border-zinc-200 bg-zinc-50 text-zinc-600 transition-colors duration-300 dark:border-zinc-800/80 dark:bg-[#09090b] dark:text-zinc-400">
      {/* Decorative gradient glow on top border */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column (Span 5) */}
          <div className="lg:col-span-5">
            <Link
              to="/"
              onClick={scrollToTop}
              className="inline-flex items-center gap-3 transition-opacity hover:opacity-90"
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

              <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Code<span className="text-orange-500">Pulse</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              The next-generation cloud compiler & IDE. Write, compile, and debug your code in real-time with instant execution and zero configuration.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://github.com/TanishMehta23/CodePulse"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 shadow-xs transition hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-orange-500/40 dark:hover:text-orange-400"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:col-span-3 lg:pl-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              Product
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  to="/compiler"
                  className="transition hover:text-orange-500 dark:hover:text-orange-400"
                >
                  Online Compiler
                </Link>
              </li>
              <li>
                <a
                  href="/#features"
                  className="transition hover:text-orange-500 dark:hover:text-orange-400"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/#how-it-works"
                  className="transition hover:text-orange-500 dark:hover:text-orange-400"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="/#languages"
                  className="transition hover:text-orange-500 dark:hover:text-orange-400"
                >
                  Supported Languages
                </a>
              </li>
              <li>
                <Link
                  to="/history"
                  className="transition hover:text-orange-500 dark:hover:text-orange-400"
                >
                  Execution History
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="transition hover:text-orange-500 dark:hover:text-orange-400"
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Action & Highlights */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-200">
              Start Coding
            </h3>
            <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
              No setup required. Jump straight into the editor and execute code in seconds.
            </p>
            <div className="mt-4">
              <Link
                to="/compiler"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange-500/20 transition hover:bg-orange-600 active:scale-[0.98]"
              >
                <Terminal size={16} />
                <span>Launch Editor</span>
              </Link>
            </div>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
              Ultra-low latency code execution sandbox.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 sm:flex-row dark:border-zinc-800">
          <p className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-500">
            © {new Date().getFullYear()} CodePulse. Built with{" "}
            <Heart size={13} className="text-orange-500 fill-orange-500" /> for developers.
          </p>

          {/* Quick links & Scroll to Top */}
          <div className="flex items-center gap-6 text-xs text-zinc-500">
            <button
              onClick={scrollToTop}
              className="group flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 transition hover:bg-zinc-200/70 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-white"
              title="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp
                size={14}
                className="transition-transform group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;