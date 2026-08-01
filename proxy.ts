import { NextRequest, NextResponse } from "next";
import { decrypt } from "@/app/lib/session";

// Route yang memerlukan autentikasi
const protectedStudentRoutes = ["/dashboard/student"];
const protectedTeacherRoutes = ["/dashboard/teacher"];
const publicRoutes = ["/login", "/"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Baca session dari cookie
  const sessionCookie = req.cookies.get("session")?.value;
  const session = await decrypt(sessionCookie);

  const isStudentRoute = protectedStudentRoutes.some((route) =>
    path.startsWith(route)
  );
  const isTeacherRoute = protectedTeacherRoutes.some((route) =>
    path.startsWith(route)
  );
  const isProtectedRoute = isStudentRoute || isTeacherRoute;
  const isPublicRoute = publicRoutes.includes(path);

  // Tidak ada session → redirect ke login jika mencoba akses protected route
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Role siswa mencoba akses route guru → redirect ke dashboard siswa
  if (isTeacherRoute && session?.role === "siswa") {
    return NextResponse.redirect(
      new URL("/dashboard/student", req.nextUrl)
    );
  }

  // Role guru mencoba akses route siswa → redirect ke dashboard guru
  if (isStudentRoute && session?.role === "guru") {
    return NextResponse.redirect(
      new URL("/dashboard/teacher", req.nextUrl)
    );
  }

  // Sudah login tapi akses halaman publik (/, /login) → redirect ke dashboard
  if (isPublicRoute && session?.userId) {
    const dashboardUrl =
      session.role === "siswa" ? "/dashboard/student" : "/dashboard/teacher";
    return NextResponse.redirect(new URL(dashboardUrl, req.nextUrl));
  }

  return NextResponse.next();
}

// Jalankan proxy di semua route kecuali asset statis
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
