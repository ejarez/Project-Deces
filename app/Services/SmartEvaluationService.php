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
    /**
     * Menghitung skor SMART untuk calon siswa pada jurusan tertentu.
     */
    public function calculateScoreForJurusan(CalonSiswa $calonSiswa, ?Jurusan $jurusan): float
    {
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

        // 3. Normalisasi bobot kriteria (Normalized Weights: sum = 1.0)
        $normMat = $wMat / $totalBobot;
        $normIpa = $wIpa / $totalBobot;
        $normBahasa = $wBahasa / $totalBobot;
        $normIps = $wIps / $totalBobot;

        // 4. Hitung Nilai Utilitas (Linear Utility Function)
        // Batas minimal KKM (C_min) = 50, Batas maksimal (C_max) = 100
        $uMat = $nilaiMatematika >= 50 ? ($nilaiMatematika - 50) * 2 : 0;
        $uIpa = $nilaiIpa >= 50 ? ($nilaiIpa - 50) * 2 : 0;
        $uBahasa = $nilaiBahasa >= 50 ? ($nilaiBahasa - 50) * 2 : 0;
        $uIps = $nilaiIps >= 50 ? ($nilaiIps - 50) * 2 : 0;

        // 5. Total Evaluasi SMART: V = sum(w_i * U_i)
        $finalScore = ($normMat * $uMat) + 
                     ($normIpa * $uIpa) + 
                     ($normBahasa * $uBahasa) + 
                     ($normIps * $uIps);

        return round($finalScore, 2);
    }

    /**
     * Menghitung skor SMART (Simple Multi-Attribute Rating Technique) untuk calon siswa pada jurusan pilihannya.
     * 
     * @param CalonSiswa $calonSiswa
     * @return float
     */
    public function calculateScore(CalonSiswa $calonSiswa): float
    {
        return $this->calculateScoreForJurusan($calonSiswa, $calonSiswa->jurusan);
    }

    /**
     * Mencari jurusan alternatif terbaik untuk calon siswa berdasarkan skor SMART tertinggi di jurusan lain.
     *
     * @param CalonSiswa $calonSiswa
     * @return array|null [ 'jurusan' => Jurusan, 'score' => float, 'status' => string ]
     */
    public function getBestAlternativeJurusan(CalonSiswa $calonSiswa): ?array
    {
        $otherJurusans = Jurusan::where('id', '!=', $calonSiswa->jurusan_id)->get();
        if ($otherJurusans->isEmpty()) {
            return null;
        }

        $best = null;
        $highestScore = -1.0;

        foreach ($otherJurusans as $jurusan) {
            $score = $this->calculateScoreForJurusan($calonSiswa, $jurusan);
            if ($score > $highestScore) {
                $highestScore = $score;
                $best = $jurusan;
            }
        }

        if (!$best) {
            return null;
        }

        return [
            'jurusan' => $best,
            'score' => $highestScore,
            'status' => $this->getRecommendationStatus($highestScore),
        ];
    }

    /**
     * Menghitung ulang seluruh skor SMART pendaftaran di database (misalnya setelah admin mengubah bobot jurusan).
     *
     * @return int Jumlah pendaftaran yang berhasil diperbarui
     */
    public function recalculateAll(): int
    {
        $calonSiswas = CalonSiswa::with(['jurusan', 'pendaftaran'])->get();
        $count = 0;

        foreach ($calonSiswas as $calonSiswa) {
            $score = $this->calculateScore($calonSiswa);
            $pendaftaran = $calonSiswa->pendaftaran;

            if ($pendaftaran) {
                $pendaftaran->skor_kesesuaian = $score;
                $pendaftaran->peluang_keberhasilan = $score;

                if ($score < 70) {
                    $alt = $this->getBestAlternativeJurusan($calonSiswa);
                    if ($alt) {
                        $pendaftaran->rekomendasi_jurusan_alt = "{$alt['jurusan']->nama_jurusan} (Skor: {$alt['score']})";
                    }
                } else {
                    $pendaftaran->rekomendasi_jurusan_alt = null;
                }

                $pendaftaran->saveQuietly();
                $count++;
            }
        }

        return $count;
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
