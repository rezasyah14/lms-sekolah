/**
 * Type definitions untuk Auth & Session
 */

export type Role = "siswa" | "guru";

export interface SessionPayload {
  userId: string;
  role: Role;
  expiresAt: Date;
}

export interface UserProfile {
  id: string;
  full_name: string;
  role: Role;
  nisn_nip: string | null;
  kelas: string | null;
}

export type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
        role?: string[];
      };
      message?: string;
    }
  | undefined;
