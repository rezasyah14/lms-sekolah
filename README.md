# 🎓 LMS Easynomics

Platform Pembelajaran Digital untuk Sekolah — modern, interaktif, dan efektif.

## ✨ Fitur

- **Landing Page** — Hero section, statistik, fitur unggulan
- **Autentikasi** — Halaman login dengan tab Siswa / Guru
- **Dashboard Siswa** — Progres mata pelajaran, tugas mendatang, nilai terbaru, akses cepat
- **Dashboard Guru** — Manajemen kelas, jadwal mengajar, penilaian tugas, siswa terbaik
- **Sidebar Navigasi** — Navigasi dinamis berdasarkan peran (siswa/guru)
- **Design System** — Glassmorphism, dark theme, gradient brand

## 🛠️ Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)

## 🚀 Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📁 Struktur Project

```
lms-easynomics/
├── app/
│   ├── components/
│   │   └── Sidebar.tsx        # Sidebar navigasi (siswa & guru)
│   ├── dashboard/
│   │   ├── student/page.tsx   # Dashboard siswa
│   │   └── teacher/page.tsx   # Dashboard guru
│   ├── login/page.tsx         # Halaman login
│   ├── globals.css            # Global styles & design system
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── public/
├── next.config.ts
├── package.json
└── tsconfig.json
```

## 🎨 Demo

| Halaman | URL |
|---------|-----|
| Landing | `/` |
| Login | `/login` |
| Dashboard Siswa | `/dashboard/student` |
| Dashboard Guru | `/dashboard/teacher` |

---

© 2026 LMS Easynomics · Platform Pembelajaran Sekolah Digital
