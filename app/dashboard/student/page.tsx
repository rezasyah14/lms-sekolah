import type { Metadata } from "next";
import Link from "next/link";
import Sidebar from "@/app/components/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard Siswa",
  description: "Dashboard belajar siswa LMS Easynomics",
};

const subjectProgress = [
  { name: "Matematika", progress: 78, color: "from-indigo-500 to-purple-600", icon: "📐" },
  { name: "Fisika", progress: 62, color: "from-blue-500 to-cyan-600", icon: "⚛️" },
  { name: "Kimia", progress: 85, color: "from-emerald-500 to-teal-600", icon: "🧪" },
  { name: "Biologi", progress: 71, color: "from-orange-500 to-amber-600", icon: "🌱" },
  { name: "B. Indonesia", progress: 90, color: "from-rose-500 to-pink-600", icon: "📖" },
  { name: "B. Inggris", progress: 55, color: "from-violet-500 to-purple-600", icon: "🌐" },
];

const upcomingAssignments = [
  { subject: "Fisika", title: "Latihan Soal Bab 3 – Dinamika", dueDate: "Besok, 23:59", urgency: "high" },
  { subject: "B. Indonesia", title: "Essay Cerpen Pilihan", dueDate: "3 Hari lagi", urgency: "medium" },
  { subject: "Matematika", title: "Latihan Integral Substitusi", dueDate: "5 Hari lagi", urgency: "low" },
  { subject: "Kimia", title: "Laporan Praktikum Titrasi", dueDate: "7 Hari lagi", urgency: "low" },
];

const recentGrades = [
  { subject: "Matematika", task: "UTS Semester 2", grade: 88, status: "Baik" },
  { subject: "Fisika", task: "Quiz Bab 2", grade: 76, status: "Cukup" },
  { subject: "Kimia", task: "Praktikum Mol", grade: 92, status: "Sangat Baik" },
];

const urgencyColors: Record<string, string> = {
  high: "text-red-400 bg-red-500/10 border border-red-500/20",
  medium: "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20",
  low: "text-green-400 bg-green-500/10 border border-green-500/20",
};

const urgencyLabel: Record<string, string> = {
  high: "Mendesak",
  medium: "Segera",
  low: "Normal",
};

export default function StudentDashboard() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <Sidebar role="student" userName="Andi Pratama" userClass="XII IPA 2" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 border-b border-white/5 bg-slate-950/80 backdrop-blur-md px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Selamat Pagi, Andi! 👋</h1>
            <p className="text-xs text-slate-500 mt-0.5">Jumat, 1 Agustus 2026 · Kelas XII IPA 2</p>
          </div>
          <div className="flex items-center gap-3">
            <button id="notif-btn" className="relative w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              🔔
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">3</span>
            </button>
            <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">A</div>
          </div>
        </div>
        <div className="p-8 space-y-8">
          <section>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { label: "Tugas Aktif", value: "12", sub: "3 mendesak", icon: "📝", color: "from-indigo-500 to-purple-600" },
                { label: "Nilai Rata-rata", value: "88.5", sub: "↑ dari semester lalu", icon: "📊", color: "from-emerald-500 to-teal-600" },
                { label: "Kehadiran", value: "92%", sub: "24 dari 26 hari", icon: "✅", color: "from-orange-500 to-amber-600" },
                { label: "Peringkat Kelas", value: "#5", sub: "dari 36 siswa", icon: "🏆", color: "from-rose-500 to-pink-600" },
              ].map((stat) => (
                <div key={stat.label} className="stat-card">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{stat.icon}</span>
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${stat.color}`} />
                  </div>
                  <div className={`text-3xl font-extrabold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-1`}>{stat.value}</div>
                  <div className="text-sm font-medium text-white mb-0.5">{stat.label}</div>
                  <div className="text-xs text-slate-500">{stat.sub}</div>
                </div>
              ))}
            </div>
          </section>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-white">Progres Mata Pelajaran</h2>
                <Link href="/dashboard/student/subjects" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Lihat Semua →</Link>
              </div>
              <div className="space-y-4">
                {subjectProgress.map((s) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{s.icon}</span>
                        <span className="text-sm text-slate-300">{s.name}</span>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">{s.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${s.color} rounded-full transition-all duration-500`} style={{ width: `${s.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-white">Tugas Mendatang</h2>
                <Link href="/dashboard/student/assignments" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Lihat Semua →</Link>
              </div>
              <div className="space-y-3">
                {upcomingAssignments.map((a) => (
                  <div key={a.title} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors border border-white/5">
                    <div className="mt-0.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${urgencyColors[a.urgency]}`}>{urgencyLabel[a.urgency]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-indigo-400 mb-0.5">{a.subject}</div>
                      <div className="text-sm text-slate-300 font-medium truncate">{a.title}</div>
                      <div className="text-xs text-slate-600 mt-0.5">⏰ {a.dueDate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-white">Nilai Terbaru</h2>
              <Link href="/dashboard/student/grades" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Lihat Semua →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-500 text-xs uppercase border-b border-white/5">
                    <th className="text-left pb-3 pr-4">Mata Pelajaran</th>
                    <th className="text-left pb-3 pr-4">Nama Tugas/Ujian</th>
                    <th className="text-center pb-3 pr-4">Nilai</th>
                    <th className="text-center pb-3">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentGrades.map((g) => (
                    <tr key={g.task} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 pr-4 text-slate-300 font-medium">{g.subject}</td>
                      <td className="py-3 pr-4 text-slate-400">{g.task}</td>
                      <td className="py-3 pr-4 text-center">
                        <span className={`font-bold text-base ${g.grade >= 90 ? "text-emerald-400" : g.grade >= 75 ? "text-indigo-400" : "text-yellow-400"}`}>{g.grade}</span>
                      </td>
                      <td className="py-3 text-center">
                        <span className={`text-xs px-2.5 py-1 rounded-full ${g.grade >= 90 ? "bg-emerald-500/10 text-emerald-400" : g.grade >= 75 ? "bg-indigo-500/10 text-indigo-400" : "bg-yellow-500/10 text-yellow-400"}`}>{g.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section>
            <h2 className="text-base font-semibold text-white mb-4">Akses Cepat</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Materi Baru", icon: "📚", href: "/dashboard/student/subjects", sub: "5 materi belum dibaca" },
                { label: "Forum Diskusi", icon: "💬", href: "/dashboard/student/forum", sub: "12 pertanyaan baru" },
                { label: "Jadwal Ujian", icon: "📅", href: "/dashboard/student/schedule", sub: "2 ujian minggu ini" },
                { label: "Prestasi Saya", icon: "🏆", href: "/dashboard/student/achievements", sub: "3 badge baru" },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="glass-card p-5 hover:bg-white/[0.07] transition-all duration-200 group text-left">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <div className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors mb-1">{item.label}</div>
                  <div className="text-xs text-slate-500">{item.sub}</div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
