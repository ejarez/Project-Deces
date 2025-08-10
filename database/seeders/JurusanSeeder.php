<?php

namespace Database\Seeders;

use App\Models\Jurusan;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class JurusanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jurusans = [
            [
                'nama_jurusan' => 'Ilmu Pengetahuan Alam (IPA)',
                'deskripsi' => 'Jurusan yang mempelajari ilmu-ilmu alam seperti Fisika, Kimia, dan Biologi.',
                'total_siswa' => 0,
                'rating_rekomendasi' => 4.5,
                'target_siswa_semester' => 50,
                'tingkat_kelulusan' => 95,
                'prospek_karir' => 'Dokter, Apoteker, Insinyur, Peneliti',
                'durasi_program' => 36,
                'persyaratan_masuk' => 'Nilai minimum matematika 80, IPA 80',
                'tingkat_kesulitan' => 4,
                'kuota_maksimal' => 60,
                'tanggal_buka_pendaftaran' => Carbon::now()->subDays(30),
                'tanggal_tutup_pendaftaran' => Carbon::now()->addDays(60),
            ],
            [
                'nama_jurusan' => 'Ilmu Pengetahuan Sosial (IPS)',
                'deskripsi' => 'Jurusan yang mempelajari ilmu-ilmu sosial seperti Ekonomi, Geografi, dan Sosiologi.',
                'total_siswa' => 0,
                'rating_rekomendasi' => 4.2,
                'target_siswa_semester' => 45,
                'tingkat_kelulusan' => 92,
                'prospek_karir' => 'Ekonom, Akuntan, Pengusaha, Diplomat',
                'durasi_program' => 36,
                'persyaratan_masuk' => 'Nilai minimum IPS 80',
                'tingkat_kesulitan' => 3,
                'kuota_maksimal' => 55,
                'tanggal_buka_pendaftaran' => Carbon::now()->subDays(30),
                'tanggal_tutup_pendaftaran' => Carbon::now()->addDays(60),
            ],
            [
                'nama_jurusan' => 'Teknik Komputer dan Jaringan (TKJ)',
                'deskripsi' => 'Jurusan yang mempelajari tentang perangkat keras komputer dan jaringan.',
                'total_siswa' => 0,
                'rating_rekomendasi' => 4.7,
                'target_siswa_semester' => 40,
                'tingkat_kelulusan' => 90,
                'prospek_karir' => 'Network Engineer, IT Support, System Administrator',
                'durasi_program' => 36,
                'persyaratan_masuk' => 'Nilai minimum matematika 75',
                'tingkat_kesulitan' => 4,
                'kuota_maksimal' => 45,
                'tanggal_buka_pendaftaran' => Carbon::now()->subDays(30),
                'tanggal_tutup_pendaftaran' => Carbon::now()->addDays(60),
            ],
            [
                'nama_jurusan' => 'Rekayasa Perangkat Lunak (RPL)',
                'deskripsi' => 'Jurusan yang mempelajari tentang pengembangan perangkat lunak dan aplikasi.',
                'total_siswa' => 0,
                'rating_rekomendasi' => 4.8,
                'target_siswa_semester' => 45,
                'tingkat_kelulusan' => 88,
                'prospek_karir' => 'Programmer, Web Developer, Mobile Developer, Game Developer',
                'durasi_program' => 36,
                'persyaratan_masuk' => 'Nilai minimum matematika 75, logika 80',
                'tingkat_kesulitan' => 5,
                'kuota_maksimal' => 50,
                'tanggal_buka_pendaftaran' => Carbon::now()->subDays(30),
                'tanggal_tutup_pendaftaran' => Carbon::now()->addDays(60),
            ],
            [
                'nama_jurusan' => 'Multimedia',
                'deskripsi' => 'Jurusan yang mempelajari tentang desain grafis, animasi, dan editing video.',
                'total_siswa' => 0,
                'rating_rekomendasi' => 4.6,
                'target_siswa_semester' => 35,
                'tingkat_kelulusan' => 94,
                'prospek_karir' => 'Desainer Grafis, Animator, Video Editor, UI/UX Designer',
                'durasi_program' => 36,
                'persyaratan_masuk' => 'Nilai minimum seni 80',
                'tingkat_kesulitan' => 3,
                'kuota_maksimal' => 40,
                'tanggal_buka_pendaftaran' => Carbon::now()->subDays(30),
                'tanggal_tutup_pendaftaran' => Carbon::now()->addDays(60),
            ],
            [
                'nama_jurusan' => 'Akuntansi',
                'deskripsi' => 'Jurusan yang mempelajari tentang pencatatan dan pelaporan keuangan.',
                'total_siswa' => 0,
                'rating_rekomendasi' => 4.4,
                'target_siswa_semester' => 40,
                'tingkat_kelulusan' => 96,
                'prospek_karir' => 'Akuntan, Auditor, Tax Consultant, Financial Analyst',
                'durasi_program' => 36,
                'persyaratan_masuk' => 'Nilai minimum matematika 80, ekonomi 75',
                'tingkat_kesulitan' => 4,
                'kuota_maksimal' => 45,
                'tanggal_buka_pendaftaran' => Carbon::now()->subDays(30),
                'tanggal_tutup_pendaftaran' => Carbon::now()->addDays(60),
            ],
        ];

        foreach ($jurusans as $jurusan) {
            Jurusan::create($jurusan);
        }
    }
}
