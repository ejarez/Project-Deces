<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CalonSiswa extends Model
{
    protected $fillable = [
        'jurusan_id',
        'nama_lengkap',
        'alamat',
        'email',
        'nomor_telepon',
        'berkas_pendaftaran',
        'status_pendaftaran',
        // SMART fields
        'specific_goal',       // Tujuan spesifik siswa
        'measurable_nilai_matematika', // Nilai terukur matematika
        'measurable_nilai_bahasa',     // Nilai terukur bahasa
        'measurable_nilai_ipa',        // Nilai terukur IPA
        'measurable_nilai_ips',        // Nilai terukur IPS
        'achievable_kemampuan',        // Kemampuan yang dimiliki
        'achievable_minat',            // Minat dan hobi
        'relevant_alasan',             // Alasan relevansi jurusan
        'timebound_target_lulus',      // Target waktu lulus
        'timebound_rencana_studi',     // Rencana studi
        'semester_pendaftaran',        // Semester saat mendaftar
        'sumber_informasi'             // Sumber informasi tentang sekolah
    ];

    // Relasi dengan Jurusan
    public function jurusan(): BelongsTo
    {
        return $this->belongsTo(Jurusan::class);
    }

    // Relasi dengan Pendaftaran
    public function pendaftaran(): HasOne
    {
        return $this->hasOne(Pendaftaran::class);
    }

    // Menghitung & sinkronisasi otomatis skor SMART
    protected static function booted()
    {
        static::saved(function ($calonSiswa) {
            $service = new \App\Services\SmartEvaluationService();
            $score = $service->calculateScore($calonSiswa);

            // Update atau buat record pendaftaran terkait
            $pendaftaran = $calonSiswa->pendaftaran;
            if (!$pendaftaran) {
                $pendaftaran = new Pendaftaran();
                $pendaftaran->calon_siswa_id = $calonSiswa->id;
                $pendaftaran->tanggal_pendaftaran = now();
                $pendaftaran->status_akhir = $calonSiswa->status_pendaftaran;
            } else {
                // Sinkronkan status akhir jika status pendaftaran berubah
                $pendaftaran->status_akhir = $calonSiswa->status_pendaftaran;
            }

            $pendaftaran->skor_kesesuaian = $score;
            $pendaftaran->peluang_keberhasilan = (int) $score;
            $pendaftaran->semester_target_masuk = $calonSiswa->semester_pendaftaran ?? 'Ganjil 2024/2025';
            $pendaftaran->target_waktu_proses = $pendaftaran->target_waktu_proses ?? 7;

            // Atur rekomendasi jurusan alternatif jika skor kurang
            if ($score < 70) {
                $altJurusan = Jurusan::where('id', '!=', $calonSiswa->jurusan_id)
                    ->orderBy('target_siswa_semester', 'desc')
                    ->first();
                if ($altJurusan) {
                    $pendaftaran->rekomendasi_jurusan_alt = $altJurusan->nama_jurusan;
                }
            } else {
                $pendaftaran->rekomendasi_jurusan_alt = null;
            }

            $pendaftaran->save();
        });
    }
}

