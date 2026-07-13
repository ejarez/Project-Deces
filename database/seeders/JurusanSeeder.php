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
                'nama_jurusan' => 'Keperawatan',
                'deskripsi' => 'Jurusan yang mempelajari perawatan pasien, ilmu kesehatan, serta keterampilan medis dasar hingga lanjutan.',
                'total_siswa' => 0,
                'rating_rekomendasi' => 4.5,
                'target_siswa_semester' => 40,
                'tingkat_kelulusan' => 96,
                'prospek_karir' => 'Perawat, Tenaga Medis, Instruktur Kesehatan, Caregiver',
                'durasi_program' => 36,
                'persyaratan_masuk' => 'Nilai minimum Matematika 75, IPA 80',
                'tingkat_kesulitan' => 4,
                'kuota_maksimal' => 45,
                'tanggal_buka_pendaftaran' => Carbon::now()->subDays(10),
                'tanggal_tutup_pendaftaran' => Carbon::now()->addDays(50),
                // Bobot kriteria SMART (Total: 100)
                'bobot_matematika' => 25,
                'bobot_ipa' => 40,
                'bobot_bahasa' => 20,
                'bobot_ips' => 15,
            ],
            [
                'nama_jurusan' => 'Farmasi',
                'deskripsi' => 'Jurusan yang mempelajari obat-obatan, kimia farmasi, dan pengelolaan pelayanan farmasi di bidang kesehatan.',
                'total_siswa' => 0,
                'rating_rekomendasi' => 4.4,
                'target_siswa_semester' => 35,
                'tingkat_kelulusan' => 95,
                'prospek_karir' => 'Asisten Apoteker, Analis Obat, Asisten Laboratorium, Sales Medis',
                'durasi_program' => 36,
                'persyaratan_masuk' => 'Nilai minimum Matematika 75, IPA 80',
                'tingkat_kesulitan' => 4,
                'kuota_maksimal' => 40,
                'tanggal_buka_pendaftaran' => Carbon::now()->subDays(10),
                'tanggal_tutup_pendaftaran' => Carbon::now()->addDays(50),
                // Bobot kriteria SMART (Total: 100)
                'bobot_matematika' => 25,
                'bobot_ipa' => 40,
                'bobot_bahasa' => 20,
                'bobot_ips' => 15,
            ],
            [
                'nama_jurusan' => 'Analis Kesehatan / TLM',
                'deskripsi' => 'Jurusan yang mempelajari pemeriksaan laboratorium untuk diagnosis penyakit dan penelitian medis.',
                'total_siswa' => 0,
                'rating_rekomendasi' => 4.3,
                'target_siswa_semester' => 30,
                'tingkat_kelulusan' => 94,
                'prospek_karir' => 'Analis Laboratorium Medis, Teknisi Lab, Quality Control, Petugas Klinik',
                'durasi_program' => 36,
                'persyaratan_masuk' => 'Nilai minimum Matematika 75, IPA 80',
                'tingkat_kesulitan' => 4,
                'kuota_maksimal' => 35,
                'tanggal_buka_pendaftaran' => Carbon::now()->subDays(10),
                'tanggal_tutup_pendaftaran' => Carbon::now()->addDays(50),
                // Bobot kriteria SMART (Total: 100)
                'bobot_matematika' => 25,
                'bobot_ipa' => 40,
                'bobot_bahasa' => 20,
                'bobot_ips' => 15,
            ],
            [
                'nama_jurusan' => 'Desain Komunikasi Visual (DKV)',
                'deskripsi' => 'Jurusan yang mempelajari seni desain grafis, ilustrasi, branding, dan media komunikasi visual.',
                'total_siswa' => 0,
                'rating_rekomendasi' => 4.6,
                'target_siswa_semester' => 45,
                'tingkat_kelulusan' => 92,
                'prospek_karir' => 'Desainer Grafis, Creative Director, Animator, Illustrator, UI/UX Designer',
                'durasi_program' => 36,
                'persyaratan_masuk' => 'Nilai minimum Seni 80, Bahasa Indonesia 75',
                'tingkat_kesulitan' => 3,
                'kuota_maksimal' => 50,
                'tanggal_buka_pendaftaran' => Carbon::now()->subDays(10),
                'tanggal_tutup_pendaftaran' => Carbon::now()->addDays(50),
                // Bobot kriteria SMART (Total: 100)
                'bobot_matematika' => 20,
                'bobot_ipa' => 15,
                'bobot_bahasa' => 35,
                'bobot_ips' => 30,
            ],
            [
                'nama_jurusan' => 'Tata Kecantikan',
                'deskripsi' => 'Jurusan yang mempelajari perawatan wajah, rambut, tata rias, serta estetika kecantikan.',
                'total_siswa' => 0,
                'rating_rekomendasi' => 4.1,
                'target_siswa_semester' => 25,
                'tingkat_kelulusan' => 97,
                'prospek_karir' => 'Makeup Artist, Beauty Therapist, Konsultan Kecantikan, Hair Stylist',
                'durasi_program' => 36,
                'persyaratan_masuk' => 'Minat kuat di bidang kecantikan, interview lulus',
                'tingkat_kesulitan' => 3,
                'kuota_maksimal' => 30,
                'tanggal_buka_pendaftaran' => Carbon::now()->subDays(10),
                'tanggal_tutup_pendaftaran' => Carbon::now()->addDays(50),
                // Bobot kriteria SMART (Total: 100)
                'bobot_matematika' => 25,
                'bobot_ipa' => 25,
                'bobot_bahasa' => 25,
                'bobot_ips' => 25,
            ],
            [
                'nama_jurusan' => 'Tata Boga',
                'deskripsi' => 'Jurusan yang mempelajari seni memasak, manajemen dapur, dan pengolahan makanan modern maupun tradisional.',
                'total_siswa' => 0,
                'rating_rekomendasi' => 4.5,
                'target_siswa_semester' => 40,
                'tingkat_kelulusan' => 93,
                'prospek_karir' => 'Chef, Food Stylist, Pengusaha Kuliner, Ahli Gizi',
                'durasi_program' => 36,
                'persyaratan_masuk' => 'Fisik sehat, tidak buta warna',
                'tingkat_kesulitan' => 3,
                'kuota_maksimal' => 45,
                'tanggal_buka_pendaftaran' => Carbon::now()->subDays(10),
                'tanggal_tutup_pendaftaran' => Carbon::now()->addDays(50),
                // Bobot kriteria SMART (Total: 100)
                'bobot_matematika' => 25,
                'bobot_ipa' => 25,
                'bobot_bahasa' => 25,
                'bobot_ips' => 25,
            ],
            [
                'nama_jurusan' => 'Rekayasa Perangkat Lunak (RPL)',
                'deskripsi' => 'Jurusan yang mempelajari tentang pengembangan perangkat lunak, pemrograman web, mobile, dan basis data.',
                'total_siswa' => 0,
                'rating_rekomendasi' => 4.8,
                'target_siswa_semester' => 50,
                'tingkat_kelulusan' => 90,
                'prospek_karir' => 'Software Engineer, Web Developer, Mobile Developer, Database Administrator',
                'durasi_program' => 36,
                'persyaratan_masuk' => 'Nilai minimum Matematika 75',
                'tingkat_kesulitan' => 5,
                'kuota_maksimal' => 55,
                'tanggal_buka_pendaftaran' => Carbon::now()->subDays(10),
                'tanggal_tutup_pendaftaran' => Carbon::now()->addDays(50),
                // Bobot kriteria SMART (Total: 100)
                'bobot_matematika' => 40,
                'bobot_ipa' => 30,
                'bobot_bahasa' => 20,
                'bobot_ips' => 10,
            ],
            [
                'nama_jurusan' => 'Teknik Komputer dan Jaringan (TKJ)',
                'deskripsi' => 'Jurusan yang mempelajari instalasi jaringan LAN/WAN, administrasi server, dan sistem keamanan komputer.',
                'total_siswa' => 0,
                'rating_rekomendasi' => 4.7,
                'target_siswa_semester' => 45,
                'tingkat_kelulusan' => 91,
                'prospek_karir' => 'Network Engineer, IT Support, System Administrator, Cyber Security',
                'durasi_program' => 36,
                'persyaratan_masuk' => 'Nilai minimum Matematika 70',
                'tingkat_kesulitan' => 4,
                'kuota_maksimal' => 50,
                'tanggal_buka_pendaftaran' => Carbon::now()->subDays(10),
                'tanggal_tutup_pendaftaran' => Carbon::now()->addDays(50),
                // Bobot kriteria SMART (Total: 100)
                'bobot_matematika' => 40,
                'bobot_ipa' => 30,
                'bobot_bahasa' => 20,
                'bobot_ips' => 10,
            ],
            [
                'nama_jurusan' => 'Teknik Kendaraan Ringan (TKR)',
                'deskripsi' => 'Jurusan yang mempelajari tentang servis, perbaikan, tune-up, dan perawatan kendaraan bermotor roda empat.',
                'total_siswa' => 0,
                'rating_rekomendasi' => 4.2,
                'target_siswa_semester' => 40,
                'tingkat_kelulusan' => 94,
                'prospek_karir' => 'Mekanik Bengkel, Teknisi Otomotif, Operator Alat Berat, Service Advisor',
                'durasi_program' => 36,
                'persyaratan_masuk' => 'Fisik prima, tinggi badan minimal 155cm',
                'tingkat_kesulitan' => 4,
                'kuota_maksimal' => 45,
                'tanggal_buka_pendaftaran' => Carbon::now()->subDays(10),
                'tanggal_tutup_pendaftaran' => Carbon::now()->addDays(50),
                // Bobot kriteria SMART (Total: 100)
                'bobot_matematika' => 30,
                'bobot_ipa' => 30,
                'bobot_bahasa' => 20,
                'bobot_ips' => 20,
            ],
        ];

        foreach ($jurusans as $jurusan) {
            Jurusan::create($jurusan);
        }
    }
}
