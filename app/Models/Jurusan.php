<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Jurusan extends Model
{
    protected $fillable = [
        'nama_jurusan',
        'deskripsi',
        'total_siswa',
        'rating_rekomendasi',
        // SMART metrics
        'target_siswa_semester',      // Target jumlah siswa per semester (Specific, Measurable)
        'tingkat_kelulusan',          // Tingkat kelulusan dalam persen (Measurable)
        'prospek_karir',              // Prospek karir lulusan (Relevant)
        'durasi_program',             // Durasi program dalam bulan (Time-bound)
        'persyaratan_masuk',          // Persyaratan masuk (Achievable)
        'tingkat_kesulitan',          // Tingkat kesulitan 1-5 (Achievable)
        'kuota_maksimal',             // Kuota maksimal per semester (Specific)
        'tanggal_buka_pendaftaran',   // Tanggal buka pendaftaran (Time-bound)
        'tanggal_tutup_pendaftaran'   // Tanggal tutup pendaftaran (Time-bound)
    ];

    // Relasi dengan calon siswa
    public function calonSiswa(): HasMany{
        return $this->hasMany(CalonSiswa::class);
    }
}
