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
  if (!password || password.length < 6) {
    return {
      errors: { password: ["Password minimal 6 karakter."] },
    };
  }
  if (!role || !["siswa", "guru"].includes(role)) {
    return {
      errors: { role: ["Pilih peran yang valid."] },
    };
  }

  // Autentikasi via Supabase
  const supabase = createServerClient();
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({ email, password });

  if (authError || !authData.user) {
    return {
      message: "Email atau password salah. Silakan coba lagi.",
    };
  }

  // Ambil profil user dari tabel profiles
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", authData.user.id)
    .single();

  if (profileError || !profile) {
    return {
      message: "Profil pengguna tidak ditemukan. Hubungi administrator.",
    };
  }

  // Verifikasi role sesuai tab yang dipilih
  if (profile.role !== role) {
    return {
      message: `Akun ini terdaftar sebagai ${profile.role === "siswa" ? "Siswa" : "Guru"}, bukan ${role === "siswa" ? "Siswa" : "Guru"}.`,
    };
  }

  // Buat session JWT
  await createSession(authData.user.id, profile.role as Role);

  // Redirect berdasarkan role
  redirect(
    profile.role === "siswa" ? "/dashboard/student" : "/dashboard/teacher"
  );
}

/**
 * Server Action: Logout
 */
export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/login");
}
