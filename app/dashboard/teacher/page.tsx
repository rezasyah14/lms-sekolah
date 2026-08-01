import type { Metadata } from "next";
import Link from "next/link";
import Sidebar from "@/app/components/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard Guru",
  description: "Dashboard mengajar guru LMS Easynomics",
};

const classes = [
  { name: "XII IPA 1", subject: "Matematika", students: 34, lastActivity: "1 jam lalu", completion: 82 },
  { name: "XII IPA 2", subject: "Matematika", students: 36, lastActivity: "2 jam lalu", completion: 75 },
  { name: "XI IPA 3", subject: "Matematika", students: 32, lastActivity: "Kemarin", completion: 60 },
  { name: "X IPA 1", subject: "Matematika", students: 35, lastActivity: "2 hari lalu", completion: 45 },
];

const pendingTasks = [
  { class: "XII IPA 1", title: "Latihan Integral Substitusi", submitted: 28, total: 34, deadline: "Kemarin" },
  { class: "XII IPA 2", title: "UTS Semester 2 — Review", submitted: 30, total: 36, deadline: "Hari ini" },
  { class: "XI IPA 3", title: "Tugas Bab 5 – Limit Fungsi", submitted: 20, total: 32, deadline: "Besok" },
];

const topStudents = [
  { name: "Sari Dewi", class: "XII IPA 1", avg: 95.5, rank: 1 },
  { name: "Budi Santoso", class: "XII IPA 2", avg: 93.2, rank: 2 },
  { name: "Maya Indah", class: "XII IPA 1", avg: 91.8, rank: 3 },
  { name: "Reza Firmansyah", class: "XI IPA 3", avg: 90.1, rank: 4 },
  { name: "Citra Anggraini", class: "XII IPA 2", avg: 89.7, rank: 5 },
];

const schedule = [
  { time: "07:00", class: "XII IPA 1", room: "R. 201", subject: "Matematika – Integral" },
  { time: "09:00", class: "XII IPA 2", room: "R. 202", subject: "Matematika – Integral" },
  { time: "11:00", class: "XI IPA 3", room: "R. 105", subject: "Matematika – Limit" },
  { time: "13:00", class: "X IPA 1", room: "R. 301", subject: "Matematika – Fungsi" },
];

export default function TeacherDashboard() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <Sidebar role="teacher" userName="Bpk. Hendra, S.Pd" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 border-b border-white/5 bg-slate-950/80 backdrop-blur-md px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Dashboard Guru 👨‍🏫</h1>
            <p className="text-xs text-slate-500 mt-0.5">Jumat, 1 Agustus 2026 · Matematika — 4 Kelas Aktif</p>
          </div>
          <div className="flex items-center gap-3">
            <button id="teacher-notif" className="relative w-10 h-10 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              🔔
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">7</span>
            </button>
            <button id="add-material" className="btn-primary py-2 px-4 text-sm">+ Tambah Materi</button>
          </div>
        </div>
        <div className="p-8 space-y-8">
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: "Total Siswa", value: "137", sub: "di 4 kelas", icon: "👥", color: "from-indigo-500 to-purple-600" },
              { label: "Tugas Belum Dinilai", value: "48", sub: "dari 3 kelas", icon: "📝", color: "from-red-500 to-orange-600" },
              { label: "Rata-rata Kelas", value: "82.4", sub: "↑ 3.2 dari bulan lalu", icon: "📊", color: "from-emerald-500 to-teal-600" },
              { label: "Materi Dipublish", value: "24", sub: "12 materi baru bulan ini", icon: "📚", color: "from-violet-500 to-purple-600" },
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
          </section>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-white">Kelas Saya</h2>
                <Link href="/dashboard/teacher/classes" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Kelola Kelas →</Link>
              </div>
              <div className="space-y-3">
                {classes.map((cls) => (
                  <div key={cls.name + cls.subject} className="p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm font-semibold text-white">{cls.name}</div>
                        <div className="text-xs text-indigo-400">{cls.subject}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500">{cls.students} siswa</div>
                        <div className="text-xs text-slate-600">{cls.lastActivity}</div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Progress Materi</span>
                        <span>{cls.completion}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500" style={{ width: `${cls.completion}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-white">Jadwal Hari Ini</h2>
                <Link href="/dashboard/teacher/schedule" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Lihat Semua →</Link>
              </div>
              <div className="relative">
                <div className="absolute left-10 top-0 bottom-0 w-px bg-white/5" />
                <div className="space-y-4">
                  {schedule.map((item, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      <div className="w-10 text-xs text-slate-500 text-right shrink-0 pt-0.5">{item.time}</div>
                      <div className="relative z-10 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mt-1 shrink-0 -ml-1.5 shadow-sm shadow-indigo-500/50" />
                      <div className="flex-1 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
                        <div className="text-sm font-medium text-white">{item.class}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{item.subject}</div>
                        <div className="text-xs text-slate-600 mt-0.5">🏫 {item.room}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-white">Tugas Menunggu Penilaian</h2>
              <Link href="/dashboard/teacher/grades" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Nilai Semua →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-500 text-xs uppercase border-b border-white/5">
                    <th className="text-left pb-3 pr-4">Kelas</th>
                    <th className="text-left pb-3 pr-4">Nama Tugas</th>
                    <th className="text-center pb-3 pr-4">Sudah Kumpul</th>
                    <th className="text-center pb-3 pr-4">Batas Waktu</th>
                    <th className="text-center pb-3">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {pendingTasks.map((t) => (
                    <tr key={t.title} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 pr-4 text-indigo-400 font-medium text-sm">{t.class}</td>
                      <td className="py-3 pr-4 text-slate-300">{t.title}</td>
                      <td className="py-3 pr-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-slate-300 font-medium">{t.submitted}/{t.total}</span>
                          <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600" style={{ width: `${(t.submitted / t.total) * 100}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-center text-xs text-slate-500">{t.deadline}</td>
                      <td className="py-3 text-center">
                        <button id={`grade-${t.class}`} className="text-xs px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 rounded-lg transition-colors border border-indigo-500/20">Nilai →</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-semibold text-white">Siswa Terbaik</h2>
                <Link href="/dashboard/teacher/students" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Lihat Data Siswa →</Link>
              </div>
              <div className="space-y-3">
                {topStudents.map((student) => (
                  <div key={student.name} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${student.rank === 1 ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : student.rank === 2 ? "bg-slate-500/20 text-slate-300 border border-slate-500/30" : student.rank === 3 ? "bg-orange-700/20 text-orange-500 border border-orange-700/30" : "bg-white/5 text-slate-500 border border-white/10"}`}>
                      {student.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white truncate">{student.name}</div>
                      <div className="text-xs text-slate-500">{student.class}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-400">{student.avg}</div>
                      <div className="text-xs text-slate-600">rata-rata</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-6">
              <h2 className="text-base font-semibold text-white mb-6">Aksi Cepat</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Buat Tugas Baru", icon: "✏️", href: "/dashboard/teacher/assignments", color: "from-indigo-500/20 to-purple-500/20 border-indigo-500/20" },
                  { label: "Upload Materi", icon: "📤", href: "/dashboard/teacher/classes", color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/20" },
                  { label: "Buat Soal Ujian", icon: "📋", href: "/dashboard/teacher/assignments", color: "from-orange-500/20 to-amber-500/20 border-orange-500/20" },
                  { label: "Kirim Pengumuman", icon: "📢", href: "/dashboard/teacher/forum", color: "from-violet-500/20 to-purple-500/20 border-violet-500/20" },
                  { label: "Laporan Kelas", icon: "📊", href: "/dashboard/teacher/reports", color: "from-rose-500/20 to-pink-500/20 border-rose-500/20" },
                  { label: "Forum Diskusi", icon: "💬", href: "/dashboard/teacher/forum", color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/20" },
                ].map((action) => (
                  <Link key={action.label} href={action.href} className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br ${action.color} border hover:opacity-80 transition-opacity`}>
                    <span className="text-xl">{action.icon}</span>
                    <span className="text-xs font-medium text-slate-300 leading-tight">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
