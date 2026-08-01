import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Masuk ke akun LMS Easynomics kamu",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30">E</div>
            <span className="font-bold text-xl text-white">LMS <span className="gradient-text">Easynomics</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Selamat Datang!</h1>
          <p className="text-slate-400 text-sm">Masuk untuk melanjutkan belajar</p>
        </div>

        <div className="glass-card p-8">
          <div className="flex gap-1 p-1 bg-white/5 rounded-xl mb-8">
            <button id="tab-siswa" className="flex-1 py-2.5 rounded-lg text-sm font-medium text-white bg-white/10 transition-all duration-200">👤 Siswa</button>
            <button id="tab-guru" className="flex-1 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white transition-all duration-200">🎓 Guru</button>
          </div>

          <form className="space-y-5" noValidate>
            <div>
              <label htmlFor="identity" className="block text-sm font-medium text-slate-300 mb-2">NISN / NIP</label>
              <input id="identity" type="text" placeholder="Masukkan NISN atau NIP kamu" className="input-field" autoComplete="username" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-300">Kata Sandi</label>
                <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Lupa kata sandi?</a>
              </div>
              <input id="password" type="password" placeholder="Masukkan kata sandi" className="input-field" autoComplete="current-password" />
            </div>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input id="remember" type="checkbox" className="sr-only peer" />
                <div className="w-5 h-5 rounded-md bg-white/5 border border-white/15 peer-checked:bg-indigo-500 peer-checked:border-indigo-500 transition-all" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Ingat saya selama 30 hari</span>
            </label>
            <Link href="/dashboard/student" id="btn-login" className="btn-primary w-full justify-center py-3.5 text-base">Masuk ke Akun</Link>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-slate-600">atau</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="space-y-3">
            <p className="text-center text-xs text-slate-600 mb-3">Lihat demo dashboard</p>
            <div className="flex gap-3">
              <Link href="/dashboard/student" id="demo-student" className="flex-1 btn-secondary justify-center py-2.5 text-sm">Demo Siswa</Link>
              <Link href="/dashboard/teacher" id="demo-teacher" className="flex-1 btn-secondary justify-center py-2.5 text-sm">Demo Guru</Link>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-8">© 2026 LMS Easynomics · Seluruh hak dilindungi</p>
      </div>
    </div>
  );
}
