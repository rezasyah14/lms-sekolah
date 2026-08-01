-- ============================================================
-- LMS EASYNOMICS — SKEMA DATABASE LENGKAP (SUPABASE)
-- ============================================================

-- 1. TABEL PROFILES (Pengguna: Siswa / Guru)
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name   TEXT NOT NULL,
  role        TEXT NOT NULL CHECK (role IN ('siswa', 'guru')),
  nisn_nip    TEXT UNIQUE,
  avatar_url  TEXT,
  kelas       TEXT, -- Contoh: "XII IPA 2" (opsional untuk siswa)
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. TABEL SUBJECTS (Mata Pelajaran) & CLASSES (Kelas Ajar)
CREATE TABLE IF NOT EXISTS public.subjects (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,                  -- Cth: "Matematika", "Ekonomi"
  code        TEXT UNIQUE NOT NULL,           -- Cth: "MATH12", "EKO11"
  description TEXT,
  icon        TEXT DEFAULT '📚',
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.classes (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id    UUID REFERENCES public.subjects(id) ON DELETE CASCADE NOT NULL,
  teacher_id    UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name          TEXT NOT NULL,                 -- Cth: "XII IPA 2 - Matematika Lanjut"
  academic_year TEXT DEFAULT '2025/2026',
  join_code     TEXT UNIQUE NOT NULL,          -- Kode unik join kelas (Cth: "MATH12A")
  description   TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. TABEL MATERIALS (Materi Pembelajaran: Teks, Video, H5P)
CREATE TABLE IF NOT EXISTS public.materials (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id          UUID REFERENCES public.classes(id) ON DELETE CASCADE NOT NULL,
  title             TEXT NOT NULL,
  description       TEXT,
  type              TEXT NOT NULL CHECK (type IN ('text', 'video', 'h5p')),
  content_text      TEXT,                      -- Konten Teks / Markdown
  content_video_url TEXT,                      -- Link Video (YouTube / MP4 / Cloud storage)
  content_h5p_url   TEXT,                      -- Embed URL Konten Interaktif H5P
  order_index       INT DEFAULT 1 NOT NULL,     -- Urutan urutan materi dalam kelas
  is_published      BOOLEAN DEFAULT TRUE NOT NULL,
  created_at        TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. TABEL CLASS_ENROLLMENTS (Pendaftaran Siswa ke Kelas)
CREATE TABLE IF NOT EXISTS public.class_enrollments (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id    UUID REFERENCES public.classes(id) ON DELETE CASCADE NOT NULL,
  student_id  UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status      TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
  enrolled_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_student_class UNIQUE (class_id, student_id)
);

-- INDEXES UNTUK PERFORMA QUERY
CREATE INDEX IF NOT EXISTS idx_classes_teacher ON public.classes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_classes_subject ON public.classes(subject_id);
CREATE INDEX IF NOT EXISTS idx_materials_class ON public.materials(class_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON public.class_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_class ON public.class_enrollments(class_id);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public read subjects" ON public.subjects FOR SELECT USING (true);

CREATE POLICY "Public read classes" ON public.classes FOR SELECT USING (true);
CREATE POLICY "Teachers can create/update own classes" ON public.classes 
  FOR ALL USING (auth.uid() = teacher_id);

CREATE POLICY "Anyone in class can view published materials" ON public.materials 
  FOR SELECT USING (is_published = true);
CREATE POLICY "Teachers can manage materials in their classes" ON public.materials 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.classes 
      WHERE classes.id = materials.class_id AND classes.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Students can view own enrollments" ON public.class_enrollments 
  FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Teachers can view enrollments in their classes" ON public.class_enrollments 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.classes 
      WHERE classes.id = class_enrollments.class_id AND classes.teacher_id = auth.uid()
    )
  );
CREATE POLICY "Students can enroll in class" ON public.class_enrollments 
  FOR INSERT WITH CHECK (auth.uid() = student_id);

-- AUTOMATIC PROFILE TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, nisn_nip, kelas)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Pengguna Baru'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'siswa'),
    NEW.raw_user_meta_data->>'nisn_nip',
    NEW.raw_user_meta_data->>'kelas'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- DUMMY SEED DATA
INSERT INTO public.subjects (name, code, description, icon) VALUES
  ('Matematika', 'MATH12', 'Matematika Aljabar & Kalkulus SMA Kelas XII', '📐'),
  ('Fisika', 'PHYS12', 'Fisika Mekanika & Gelombang Kuantum', '⚛️'),
  ('Kimia', 'CHEM12', 'Kimia Organik & Stokiometri', '🧪'),
  ('Ekonomi', 'ECON12', 'Ekonomi Mikro, Makro & Akuntansi Dasar', '📊')
ON CONFLICT (code) DO NOTHING;
