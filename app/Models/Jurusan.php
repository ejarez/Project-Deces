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
        // Bobot Kriteria SMART
        'bobot_matematika',
        'bobot_ipa',
        'bobot_bahasa',
        'bobot_ips',
        // Parameter Kuota & Program
        'target_siswa_semester',      // Target jumlah siswa per semester
        'tingkat_kelulusan',          // Tingkat kelulusan dalam persen
        'prospek_karir',              // Prospek karir lulusan
        'durasi_program',             // Durasi program dalam bulan
        'persyaratan_masuk',          // Persyaratan masuk
        'tingkat_kesulitan',          // Tingkat kesulitan 1-5
        'kuota_maksimal',             // Kuota maksimal per semester
        'tanggal_buka_pendaftaran',   // Tanggal buka pendaftaran
        'tanggal_tutup_pendaftaran'   // Tanggal tutup pendaftaran
    ];

    // Relasi dengan calon siswa
    public function calonSiswa(): HasMany
    {
        return $this->hasMany(CalonSiswa::class);
    }

    // Auto-sinkronisasi skor SMART siswa jika bobot kriteria jurusan diubah oleh admin
    protected static function booted()
    {
        static::saved(function ($jurusan) {
            if ($jurusan->wasChanged(['bobot_matematika', 'bobot_ipa', 'bobot_bahasa', 'bobot_ips'])) {
                $service = new \App\Services\SmartEvaluationService();
                $service->recalculateAll();
            }
        });
    }
}
