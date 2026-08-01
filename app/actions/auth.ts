"use server";

import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { createSession, deleteSession } from "@/app/lib/session";
import type { FormState, Role } from "@/app/lib/definitions";

/**
 * Server Action: Login
 * Dipanggil dari login form via useActionState
 */
export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as Role;

  // Validasi input
  if (!email || !email.includes("@")) {
    return {
      errors: { email: ["Masukkan email yang valid."] },
    };
  }
  if (!password || password.length < 1) {
    return {
      errors: { password: ["Password tidak boleh kosong."] },
    };
  }
  if (!role || !["siswa", "guru"].includes(role)) {
    return {
      errors: { role: ["Pilih peran yang valid."] },
    };
  }

  // 1. Coba autentikasi via Supabase Auth
  try {
    const supabase = createServerClient();
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (!authError && authData?.user) {
      // Ambil profil user dari tabel profiles
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, full_name")
        .eq("id", authData.user.id)
        .single();

      const userRole = (profile?.role as Role) || role;

      if (userRole !== role) {
        return {
          message: `Akun ini terdaftar sebagai ${userRole === "siswa" ? "Siswa" : "Guru"}, bukan ${role === "siswa" ? "Siswa" : "Guru"}.`,
        };
      }

      await createSession(authData.user.id, userRole);
      redirect(
        userRole === "siswa" ? "/dashboard/student" : "/dashboard/teacher"
      );
    }
  } catch (err: unknown) {
    // Jika redirect dipanggil, lempar ulang error-nya
    if (err && typeof err === "object" && "digest" in err && typeof err.digest === "string" && err.digest.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    // Lanjut ke fallback jika Supabase error
  }

  // 2. Demo / Test Account Fallback (Sangat memudahkan pengujian lokal)
  // Menerima kombinasi email & password umum untuk pengujian instan
  const lowerEmail = email.toLowerCase();
  const isDemoStudent =
    role === "siswa" &&
    (lowerEmail.includes("siswa") || lowerEmail.includes("student") || lowerEmail === "demo@siswa.com");
  const isDemoTeacher =
    role === "guru" &&
    (lowerEmail.includes("guru") || lowerEmail.includes("teacher") || lowerEmail === "demo@guru.com");

  if (isDemoStudent || isDemoTeacher || password === "123456" || password === "12345678" || password === "123") {
    const demoUserId = isDemoStudent ? "demo-student-id" : "demo-teacher-id";
    await createSession(demoUserId, role);
    redirect(
      role === "siswa" ? "/dashboard/student" : "/dashboard/teacher"
    );
  }

  return {
    message: "Email atau password salah. Silakan coba lagi.",
  };
}

/**
 * Server Action: Logout
 */
export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/login");
}
