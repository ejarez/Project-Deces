<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pendaftaran extends Model
{
    protected $fillable = [
        'calon_siswa_id',
        'tanggal_pendaftaran',
        'catatan_admin',
        'status_akhir',
        // SMART tracking fields
        'target_waktu_proses',      // Target waktu pemrosesan dalam hari (Time-bound)
        'waktu_pemrosesan_aktual',  // Waktu pemrosesan aktual dalam hari (Measurable)
        'skor_kesesuaian',          // Skor kesesuaian dengan jurusan 1-100 (Measurable)
        'rekomendasi_jurusan_alt',  // Rekomendasi jurusan alternatif (Relevant)
        'langkah_selanjutnya',      // Langkah selanjutnya yang spesifik (Specific)
        'target_tanggal_wawancara', // Target tanggal wawancara (Time-bound)
        'hasil_wawancara',          // Hasil wawancara (Measurable)
        'peluang_keberhasilan',     // Peluang keberhasilan dalam persen (Achievable)
        'semester_target_masuk'     // Semester target masuk (Time-bound, Specific)
    ];

    // Relasi dengan Calon Siswa
    public function calonSiswa(): BelongsTo
    {
        return $this->belongsTo(CalonSiswa::class);
    }
}
