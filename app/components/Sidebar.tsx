import Link from "next/link";
import { logout } from "@/app/actions/auth";

interface SidebarProps {
  role: "student" | "teacher";
  userName: string;
  userClass?: string;
}

const studentLinks = [
  { href: "/dashboard/student", icon: "🏠", label: "Beranda" },
  { href: "/dashboard/student/subjects", icon: "📚", label: "Mata Pelajaran" },
  { href: "/dashboard/student/assignments", icon: "📝", label: "Tugas" },
  { href: "/dashboard/student/grades", icon: "📊", label: "Nilai" },
  { href: "/dashboard/student/schedule", icon: "🗓️", label: "Jadwal" },
  { href: "/dashboard/student/forum", icon: "💬", label: "Forum Diskusi" },
  { href: "/dashboard/student/achievements", icon: "🏆", label: "Prestasi" },
];

const teacherLinks = [
  { href: "/dashboard/teacher", icon: "🏠", label: "Beranda" },
  { href: "/dashboard/teacher/classes", icon: "🏫", label: "Kelas Saya" },
  { href: "/dashboard/teacher/assignments", icon: "📝", label: "Tugas" },
  { href: "/dashboard/teacher/grades", icon: "📊", label: "Penilaian" },
  { href: "/dashboard/teacher/students", icon: "👥", label: "Data Siswa" },
  { href: "/dashboard/teacher/schedule", icon: "🗓️", label: "Jadwal Mengajar" },
  { href: "/dashboard/teacher/forum", icon: "💬", label: "Forum Kelas" },
  { href: "/dashboard/teacher/reports", icon: "📋", label: "Laporan" },
];

export default function Sidebar({ role, userName, userClass }: SidebarProps) {
  const links = role === "student" ? studentLinks : teacherLinks;

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 flex flex-col border-r border-white/5 bg-slate-950/50 backdrop-blur-xl">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 gradient-brand rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/30">
            E
          </div>
          <div>
            <div className="font-bold text-white text-sm leading-tight">LMS Easynomics</div>
            <div className="text-xs text-slate-500 capitalize">{role === "student" ? "Portal Siswa" : "Portal Guru"}</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="sidebar-link">
            <span className="text-base">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/5">
        <div className="glass-card p-3 flex items-center gap-3">
          <div className="w-9 h-9 gradient-brand rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">{userName}</div>
            <div className="text-xs text-slate-500 truncate">
              {userClass ?? (role === "teacher" ? "Guru" : "Siswa")}
            </div>
          </div>
          <form action={logout}>
            <button
              type="submit"
              title="Keluar"
              className="text-slate-500 hover:text-slate-300 transition-colors text-sm bg-transparent border-none cursor-pointer p-1"
            >
              ↩
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
