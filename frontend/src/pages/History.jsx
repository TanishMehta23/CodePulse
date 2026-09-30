import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Trash2,
  Code2,
  Clock,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Play,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // =========================
  // FETCH HISTORY
  // =========================

  const fetchHistory = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/history", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch history");
      }

      setHistory(data.history || []);
    } catch (err) {
      console.error("History error:", err);
      setError(err.message || "Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // =========================
  // DELETE ONE
  // =========================

  const deleteHistory = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/history/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete history");
      }

      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete history error:", err);
      setError(err.message || "Failed to delete history");
    }
  };

  // =========================
  // CLEAR ALL
  // =========================

  const clearHistory = async () => {
    if (history.length === 0) return;

    const confirmed = window.confirm(
      "Are you sure you want to clear your entire run history?",
    );

    if (!confirmed) return;

    try {
      setClearing(true);
      setError("");

      const response = await fetch("http://localhost:5000/api/history", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to clear history");
      }

      setHistory([]);
    } catch (err) {
      console.error("Clear history error:", err);
      setError(err.message || "Failed to clear history");
    } finally {
      setClearing(false);
    }
  };

  // =========================
  // OPEN IN COMPILER
  // =========================

  const openInCompiler = (item) => {
    navigate("/compiler", {
      state: {
        language: item.language,
        code: item.code,
        input: item.input || "",
      },
    });
  };

  // =========================
  // DATE FORMAT
  // =========================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =========================
  // LANGUAGE LABEL
  // =========================

  const getLanguageName = (language) => {
    const names = {
      java: "Java",
      cpp: "C++",
      python: "Python",
      javascript: "JavaScript",
    };

    return names[language?.toLowerCase()] || language;
  };

  // =========================
  // NOT LOGGED IN
  // =========================

  if (!token) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
        <div className="mx-auto flex min-h-[80vh] max-w-4xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400">
              <Code2 size={28} />
            </div>

            <h1 className="text-2xl font-bold">Sign in to view your history</h1>

            <p className="mt-2 text-sm text-zinc-500">
              Your previous code runs will appear here.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="mt-6 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Sign In
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* HEADER */}

      <header className="border-b border-zinc-800/80 bg-[#09090b]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[74px] w-full items-center justify-between px-7">
          <button
            onClick={() => navigate("/compiler")}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white cursor-pointer"
          >
            <ArrowLeft size={18} />
            Back to Compiler
          </button>

          {history.length > 0 && (
            <button
              onClick={clearHistory}
              disabled={clearing}
              className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {clearing ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Trash2 size={16} />
              )}

              {clearing ? "Clearing..." : "Clear History"}
            </button>
          )}
        </div>
      </header>

      {/* CONTENT */}

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* TITLE */}

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-400">
              <Clock size={21} />
            </div>

            <div>
              <h1 className="text-2xl font-bold">Run History</h1>

              <p className="mt-1 text-sm text-zinc-500">
                Your last 10 code executions
              </p>
            </div>
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* LOADING */}

        {loading ? (
          <>
            <style>
              {`
        @keyframes codepulse-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .codepulse-loader {
          animation: codepulse-spin 1s linear infinite;
        }
      `}
            </style>

            <div className="flex min-h-[300px] items-center justify-center">
              <div className="flex items-center gap-3">
                <Loader2
                  size={24}
                  strokeWidth={2}
                  className="codepulse-loader text-zinc-500"
                />

                <span className="text-sm text-zinc-400">
                  Loading history...
                </span>
              </div>
            </div>
          </>
        ) : history.length === 0 ? (
          /* EMPTY */

          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/30">
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-600">
                <Clock size={28} />
              </div>

              <h2 className="text-lg font-semibold text-zinc-300">
                No runs yet
              </h2>

              <p className="mt-2 text-sm text-zinc-600">
                Run some code in the compiler and it will appear here.
              </p>

              <button
                onClick={() => navigate("/compiler")}
                className="mt-6 flex mx-auto items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                <Play size={16} />
                Open Compiler
              </button>
            </div>
          </div>
        ) : (
          /* HISTORY LIST */

          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 transition hover:border-zinc-700"
              >
                {/* CARD HEADER */}

                <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-400">
                      {getLanguageName(item.language)}
                    </div>

                    {item.status === "success" ? (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                        <CheckCircle2 size={15} />
                        Success
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs text-red-400">
                        <AlertCircle size={15} />
                        Error
                      </div>
                    )}

                    <span className="text-xs text-zinc-600">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openInCompiler(item)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-white cursor-pointer"
                    >
                      <Play size={14} />
                      Open
                    </button>

                    <button
                      onClick={() => deleteHistory(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
                      aria-label="Delete history"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* CODE */}

                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                      Code
                    </span>
                  </div>

                  <pre className="max-h-56 overflow-auto rounded-xl border border-zinc-800 bg-[#09090b] p-4 font-mono text-xs leading-5 text-zinc-400">
                    <code>{item.code}</code>
                  </pre>

                  {/* INPUT / OUTPUT */}

                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                        Input
                      </div>

                      <pre className="max-h-32 overflow-auto rounded-xl border border-zinc-800 bg-[#09090b] p-4 font-mono text-xs leading-5 text-zinc-500">
                        {item.input || "No input"}
                      </pre>
                    </div>

                    <div>
                      <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-zinc-600">
                        Output
                      </div>

                      <pre
                        className={`max-h-32 overflow-auto rounded-xl border p-4 font-mono text-xs leading-5 ${
                          item.status === "success"
                            ? "border-zinc-800 bg-[#09090b] text-zinc-400"
                            : "border-red-500/10 bg-red-500/5 text-red-400"
                        }`}
                      >
                        {item.output || "No output"}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default History;
