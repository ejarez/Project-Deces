<?php

namespace App\Services;

use App\Models\CalonSiswa;
use App\Models\Jurusan;

class SmartEvaluationService
{
    /**
     * Menghitung skor SMART (Simple Multi-Attribute Rating Technique) untuk calon siswa.
     * 
     * Kriteria yang digunakan:
     * - C1: Nilai Matematika (Benefit)
     * - C2: Nilai IPA (Benefit)
     * - C3: Nilai Bahasa (Benefit)
     * - C4: Nilai IPS (Benefit)
     * 
     * @param CalonSiswa $calonSiswa
     * @return float
     */
    public function calculateScore(CalonSiswa $calonSiswa): float
    {
        $jurusan = $calonSiswa->jurusan;

        if (!$jurusan) {
            return 0.0;
        }

        // 1. Ambil nilai alternatif (raw scores)
        $nilaiMatematika = (float) ($calonSiswa->measurable_nilai_matematika ?? 0);
        $nilaiIpa = (float) ($calonSiswa->measurable_nilai_ipa ?? 0);
        $nilaiBahasa = (float) ($calonSiswa->measurable_nilai_bahasa ?? 0);
        $nilaiIps = (float) ($calonSiswa->measurable_nilai_ips ?? 0);

        // 2. Ambil bobot kriteria dari jurusan (raw weights)
        $wMat = (float) ($jurusan->bobot_matematika ?? 30);
        $wIpa = (float) ($jurusan->bobot_ipa ?? 25);
        $wBahasa = (float) ($jurusan->bobot_bahasa ?? 25);
        $wIps = (float) ($jurusan->bobot_ips ?? 20);

        $totalBobot = $wMat + $wIpa + $wBahasa + $wIps;

        // Cegah pembagian dengan nol
        if ($totalBobot <= 0) {
            $wMat = 25;
            $wIpa = 25;
            $wBahasa = 25;
            $wIps = 25;
            $totalBobot = 100;
        }

        // 3. Normalisasi bobot kriteria (Normalized Weights)
        // sum(norm_w) = 1.0
        $normMat = $wMat / $totalBobot;
        $normIpa = $wIpa / $totalBobot;
        $normBahasa = $wBahasa / $totalBobot;
        $normIps = $wIps / $totalBobot;

        // 4. Hitung Nilai Utilitas (Utility Values)
        // Nilai Rapor berskala 0 s.d 100.
        // Dengan batas minimal kelulusan (C_min/KKM) = 50 dan batas maksimal (C_max) = 100:
        // U_i = ((nilai - C_min) / (C_max - C_min)) * 100
        // U_i = ((nilai - 50) / 50) * 100 = (nilai - 50) * 2
        $uMat = $nilaiMatematika >= 50 ? ($nilaiMatematika - 50) * 2 : 0;
        $uIpa = $nilaiIpa >= 50 ? ($nilaiIpa - 50) * 2 : 0;
        $uBahasa = $nilaiBahasa >= 50 ? ($nilaiBahasa - 50) * 2 : 0;
        $uIps = $nilaiIps >= 50 ? ($nilaiIps - 50) * 2 : 0;

        // 5. Hitung Nilai Evaluasi Akhir (Total Evaluation Value)
        // V = sum(norm_w_i * U_i)
        $finalScore = ($normMat * $uMat) + 
                     ($normIpa * $uIpa) + 
                     ($normBahasa * $uBahasa) + 
                     ($normIps * $uIps);

        return round($finalScore, 2);
    }

    /**
     * Memberikan status rekomendasi kelayakan berdasarkan skor SMART.
     *
     * @param float $score
     * @return string
     */
    public function getRecommendationStatus(float $score): string
    {
        if ($score >= 80.0) {
            return 'Sangat Layak (Diterima)';
        } elseif ($score >= 60.0) {
            return 'Layak (Dipertimbangkan)';
        } else {
            return 'Kurang Layak (Cadangan)';
        }
    }
}
