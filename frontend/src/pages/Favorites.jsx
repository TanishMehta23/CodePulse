import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Trash2,
  Play,
  Code2,
  Clock3,
  Loader2,
  Copy,
  Check,
} from "lucide-react";

const Favorites = () => {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [copied, setCopied] = useState(null);

  const token = localStorage.getItem("token");

  // =========================
  // FETCH FAVORITES
  // =========================

  const fetchFavorites = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/favorites",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch favorites");
      }

      setFavorites(data.favorites || []);
    } catch (error) {
      console.error("Favorites error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // =========================
  // DELETE FAVORITE
  // =========================

  const deleteFavorite = async (id) => {
    setDeleting(id);

    try {
      const response = await fetch(
        `http://localhost:5000/api/favorites/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete favorite");
      }

      setFavorites((prev) =>
        prev.filter((favorite) => favorite.id !== id)
      );
    } catch (error) {
      console.error("Delete favorite error:", error);
    } finally {
      setDeleting(null);
    }
  };

  // =========================
  // COPY CODE
  // =========================

  const copyCode = async (id, code) => {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(id);

      setTimeout(() => {
        setCopied(null);
      }, 1500);
    } catch (error) {
      console.error("Copy error:", error);
    }
  };

  // =========================
  // OPEN IN COMPILER
  // =========================

  const openInCompiler = (favorite) => {
    sessionStorage.setItem(
      "compilerFavorite",
      JSON.stringify({
        language: favorite.language,
        code: favorite.code,
        input: favorite.input || "",
      })
    );

    navigate("/compiler");
  };

  // =========================
  // LANGUAGE LABEL
  // =========================

  const getLanguageLabel = (language) => {
    const labels = {
      java: "Java",
      cpp: "C++",
      python: "Python",
      javascript: "JavaScript",
    };

    return labels[language?.toLowerCase()] || language;
  };

  // =========================
  // FORMAT DATE
  // =========================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================
  // NOT LOGGED IN
  // =========================

  if (!token) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white">
        <header className="border-b border-zinc-800/80 bg-[#09090b]">
          <div className="mx-auto flex h-[74px] max-w-[1400px] items-center px-6">
            <Link
              to="/compiler"
              className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
            >
              <ArrowLeft size={18} />
              Back to Compiler
            </Link>
          </div>
        </header>

        <div className="mx-auto flex min-h-[calc(100vh-74px)] max-w-[900px] items-center justify-center px-6">
          <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/40 p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10">
              <Star
                size={26}
                className="text-orange-400"
              />
            </div>

            <h1 className="mt-5 text-xl font-semibold">
              Sign in to view favorites
            </h1>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
              Sign in to save code snippets and access them from
              anywhere.
            </p>

            <Link
              to="/login"
              className="mt-6 inline-flex items-center rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // =========================
  // MAIN
  // =========================

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-[#09090b]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[74px] w-full max-w-[1500px] items-center justify-between px-6 lg:px-8">

          <Link
            to="/compiler"
            className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            <span>Back to Compiler</span>
          </Link>

          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span className="font-medium text-zinc-300">
              {favorites.length}
            </span>
            <span>/ 5 favorites</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto w-full max-w-[1500px] px-6 py-8 lg:px-8 lg:py-10">

        {/* Page Heading */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10">
              <Star
                size={23}
                className="fill-orange-500/10 text-orange-400"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Favorites
              </h1>

              <p className="mt-1 text-sm text-zinc-500">
                Your saved code snippets
              </p>
            </div>
          </div>

          {/* Counter */}
          <div className="inline-flex w-fit items-center rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm">
            <span className="font-medium text-zinc-200">
              {favorites.length}
            </span>

            <span className="mx-1 text-zinc-600">
              /
            </span>

            <span className="text-zinc-500">
              5 saved
            </span>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/20">
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <Loader2
                size={20}
                className="animate-spin text-orange-500"
              />
              Loading favorites...
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading && favorites.length === 0 && (
          <div className="flex min-h-[380px] flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/20 px-6 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
              <Star
                size={29}
                className="text-zinc-600"
              />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-zinc-200">
              No favorites yet
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
              Save your favorite code snippets from the compiler
              to quickly access them later.
            </p>

            <Link
              to="/compiler"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/10 transition hover:bg-orange-600"
            >
              <Code2 size={17} />
              Open Compiler
            </Link>
          </div>
        )}

        {/* Favorites */}
        {!loading && favorites.length > 0 && (
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">

            {favorites.map((favorite, index) => (
              <article
                key={favorite.id}
                className="group overflow-hidden rounded-2xl border border-zinc-800 bg-[#0d0d0f] transition hover:border-zinc-700"
              >

                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-orange-500/20 bg-orange-500/10">
                      <Code2
                        size={17}
                        className="text-orange-400"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-zinc-200">
                        {getLanguageLabel(favorite.language)}
                      </p>

                      <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-zinc-600">
                        <Clock3 size={11} />
                        {formatDate(favorite.createdAt)}
                      </div>
                    </div>

                  </div>

                  <span className="rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[10px] font-medium text-zinc-500">
                    #{index + 1}
                  </span>
                </div>

                {/* Code */}
                <div className="relative">

                  <pre className="h-[230px] overflow-auto whitespace-pre-wrap bg-[#111113] p-5 font-mono text-[12px] leading-5 text-zinc-400">
                    {favorite.code}
                  </pre>

                  {/* Copy */}
                  <button
                    onClick={() =>
                      copyCode(
                        favorite.id,
                        favorite.code
                      )
                    }
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900/90 text-zinc-500 opacity-0 backdrop-blur transition group-hover:opacity-100 hover:border-zinc-600 hover:text-white"
                    title="Copy code"
                  >
                    {copied === favorite.id ? (
                      <Check
                        size={15}
                        className="text-green-400"
                      />
                    ) : (
                      <Copy size={15} />
                    )}
                  </button>
                </div>

                {/* Input */}
                {favorite.input && (
                  <div className="border-t border-zinc-800 px-5 py-3">
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                      Input
                    </p>

                    <pre className="max-h-16 overflow-auto whitespace-pre-wrap font-mono text-xs text-zinc-500">
                      {favorite.input}
                    </pre>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 border-t border-zinc-800 p-3">

                  <button
                    onClick={() =>
                      openInCompiler(favorite)
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-600"
                  >
                    <Play
                      size={14}
                      fill="currentColor"
                    />
                    Open in Compiler
                  </button>

                  <button
                    onClick={() =>
                      deleteFavorite(favorite.id)
                    }
                    disabled={deleting === favorite.id}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                    title="Remove favorite"
                  >
                    {deleting === favorite.id ? (
                      <Loader2
                        size={15}
                        className="animate-spin"
                      />
                    ) : (
                      <Trash2 size={15} />
                    )}
                  </button>

                </div>
              </article>
            ))}

          </div>
        )}
      </div>
    </main>
  );
};

export default Favorites;