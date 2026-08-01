import Link from "next/link";

const features = [
  {
    icon: "📚",
    title: "Materi Pembelajaran",
    desc: "Akses materi pelajaran kapan saja dan di mana saja dengan tampilan yang nyaman.",
  },
  {
    icon: "📝",
    title: "Tugas & Ujian",
    desc: "Kerjakan dan kumpulkan tugas secara digital, pantau nilai secara real-time.",
  },
  {
    icon: "📊",
    title: "Laporan Progres",
    desc: "Guru dan siswa dapat memantau perkembangan belajar melalui dashboard yang informatif.",
  },
  {
    icon: "🗓️",
    title: "Jadwal Pelajaran",
    desc: "Kelola jadwal kelas, pengumpulan tugas, dan ujian dalam satu kalender terpadu.",
  },
  {
    icon: "💬",
    title: "Forum Diskusi",
    desc: "Ruang diskusi interaktif antara siswa dan guru untuk tanya jawab materi.",
  },
  {
    icon: "🏆",
    title: "Prestasi & Sertifikat",
    desc: "Raih badge dan sertifikat atas pencapaian belajar yang telah diselesaikan.",
  },
];

const stats = [
  { value: "1.200+", label: "Siswa Aktif" },
  { value: "80+", label: "Guru Berpengalaman" },
  { value: "500+", label: "Materi Tersedia" },
  { value: "98%", label: "Tingkat Kepuasan" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 overflow-x-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-600/10 rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/5 bg-slate-950/80 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 gradient-brand rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/30">
              E
            </div>
            <span className="font-bold text-lg text-white">
              LMS <span className="gradient-text">Easynomics</span>
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">
              Fitur
            </a>
            <a href="#stats" className="hover:text-white transition-colors">
              Statistik
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              Tentang
            </a>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="btn-secondary text-sm py-2 px-4">
              Masuk
            </Link>
            <Link href="/login" className="btn-primary text-sm py-2 px-4">
              Mulai Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-indigo-300 font-medium mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Platform Pembelajaran Digital untuk Sekolah
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
          Belajar Jadi Lebih{" "}
          <span className="gradient-text">Mudah & Menyenangkan</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          LMS Easynomics menghadirkan pengalaman belajar digital yang modern,
          interaktif, dan efektif untuk siswa dan guru di seluruh Indonesia.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login" className="btn-primary text-base px-8 py-3.5">
            🚀 Mulai Sekarang
          </Link>
          <Link href="/login" className="btn-secondary text-base px-8 py-3.5">
            Lihat Demo
          </Link>
        </div>

        {/* Hero mockup */}
        <div className="mt-16 glass-card p-1 mx-auto max-w-4xl shadow-2xl shadow-indigo-500/10">
          <div className="bg-slate-900 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 mx-4 bg-slate-700/50 rounded-md px-3 py-1 text-xs text-slate-500">
                lms-easynomics.sch.id/dashboard
              </div>
            </div>
            <div className="p-6 grid grid-cols-3 gap-4">
              {[
                { label: "Tugas Aktif", val: "12", color: "from-indigo-500 to-purple-600" },
                { label: "Nilai Rata-rata", val: "88.5", color: "from-emerald-500 to-teal-600" },
                { label: "Hari Hadir", val: "24/26", color: "from-orange-500 to-pink-600" },
              ].map((item) => (
                <div key={item.label} className="glass-card p-4 text-left">
                  <div className={`text-2xl font-bold bg-gradient-to-br ${item.color} bg-clip-text text-transparent mb-1`}>
                    {item.val}
                  </div>
                  <div className="text-xs text-slate-500">{item.label}</div>
                </div>
              ))}
              <div className="col-span-2 glass-card p-4 text-left">
                <div className="text-xs text-slate-500 mb-3">Progres Belajar</div>
                {["Matematika", "Fisika", "Kimia"].map((subj, i) => (
                  <div key={subj} className="flex items-center gap-3 mb-2">
                    <div className="text-xs text-slate-400 w-20">{subj}</div>
                    <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full gradient-brand rounded-full" style={{ width: `${[78, 62, 85][i]}%` }} />
                    </div>
                    <div className="text-xs text-slate-500">{[78, 62, 85][i]}%</div>
                  </div>
                ))}
              </div>
              <div className="glass-card p-4 text-left">
                <div className="text-xs text-slate-500 mb-3">Tugas Terdekat</div>
                {["Fisika Ch.3", "Essay B.Ind"].map((t) => (
                  <div key={t} className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                    <div className="text-xs text-slate-400">{t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="relative z-10 py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-extrabold gradient-text mb-1">{s.value}</div>
              <div className="text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Semua yang Kamu Butuhkan</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Fitur lengkap dirancang untuk mendukung proses belajar-mengajar yang lebih efektif dan menyenangkan.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="glass-card p-6 hover:bg-white/[0.07] transition-all duration-300 group">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-indigo-300 transition-colors">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="relative z-10 py-24 max-w-7xl mx-auto px-6">
        <div className="glass-card p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 gradient-brand opacity-10 rounded-2xl" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Siap Memulai Perjalanan Belajar?</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">Bergabunglah dengan ribuan siswa dan guru yang sudah menggunakan LMS Easynomics untuk belajar lebih efektif.</p>
            <Link href="/login" className="btn-primary text-base px-10 py-4">🎓 Daftar Sekarang — Gratis</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-slate-600 text-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="font-semibold text-slate-500 mb-1">LMS Easynomics</div>
          <div>© 2026 Easynomics. Platform Pembelajaran Sekolah Digital.</div>
        </div>
      </footer>
    </div>
  );
}
