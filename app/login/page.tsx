"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { login } from "@/app/actions/auth";
import type { FormState, Role } from "@/app/lib/definitions";

export default function LoginPage() {
  const [activeRole, setActiveRole] = useState<Role>("siswa");
  const [state, action, pending] = useActionState<FormState, FormData>(
    login,
    undefined
  );

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30">
              E
            </div>
            <span className="font-bold text-xl text-white">
              LMS <span className="gradient-text">Easynomics</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">
            Selamat Datang!
          </h1>
          <p className="text-slate-400 text-sm">
            Masuk untuk melanjutkan belajar
          </p>
        </div>

        <div className="glass-card p-8">
          {/* Role Tabs */}
          <div className="flex gap-1 p-1 bg-white/5 rounded-xl mb-8">
            <button
              id="tab-siswa"
              type="button"
              onClick={() => setActiveRole("siswa")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeRole === "siswa"
                  ? "text-white bg-white/10"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              👤 Siswa
            </button>
            <button
              id="tab-guru"
              type="button"
              onClick={() => setActiveRole("guru")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeRole === "guru"
                  ? "text-white bg-white/10"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🎓 Guru
            </button>
          </div>

          {/* Login Form */}
          <form action={action} className="space-y-5" noValidate>
            {/* Hidden role field */}
            <input type="hidden" name="role" value={activeRole} />

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder={
                  activeRole === "siswa"
                    ? "email.siswa@sekolah.sch.id"
                    : "email.guru@sekolah.sch.id"
                }
                className="input-field"
                autoComplete="email"
                disabled={pending}
              />
              {state?.errors?.email && (
                <p className="mt-1.5 text-xs text-red-400">
                  {state.errors.email[0]}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-300"
                >
                  Kata Sandi
                </label>
                <a
                  href="#"
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Lupa kata sandi?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Masukkan kata sandi"
                className="input-field"
                autoComplete="current-password"
                disabled={pending}
              />
              {state?.errors?.password && (
                <p className="mt-1.5 text-xs text-red-400">
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            {/* Error umum */}
            {state?.message && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
                ⚠️ {state.message}
              </div>
            )}

            {/* Submit */}
            <button
              id="btn-login"
              type="submit"
              disabled={pending}
              className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {pending ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memproses...
                </>
              ) : (
                `Masuk sebagai ${activeRole === "siswa" ? "Siswa" : "Guru"}`
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-600 mt-8">
          © 2026 LMS Easynomics · Seluruh hak dilindungi
        </p>
      </div>
    </div>
  );
}
