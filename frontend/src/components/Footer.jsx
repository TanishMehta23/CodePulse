import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

        {/* Brand */}
        <div>
          <h2 className="text-lg font-bold text-white">
            Code<span className="text-orange  -500">Pulse</span>
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Write. Compile. Create.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-6 text-sm text-zinc-500">
          <a
            href="#features"
            className="transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="transition hover:text-white"
          >
            How It Works
          </a>

          <a
            href="#languages"
            className="transition hover:text-white"
          >
            Languages
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-zinc-600">
          © 2026 CodePulse
        </p>

      </div>
    </footer>
  );
};

export default Footer;