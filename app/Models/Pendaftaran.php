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

    // Sinkronisasi status, kirim email kelulusan, dan total siswa di Jurusan
    protected static function booted()
    {
        static::saved(function ($pendaftaran) {
            // Sinkronkan status pendaftaran di CalonSiswa secara langsung (menghindari event loop)
            $calonSiswa = $pendaftaran->calonSiswa;
            if ($calonSiswa && $calonSiswa->status_pendaftaran !== $pendaftaran->status_akhir) {
                \Illuminate\Support\Facades\DB::table('calon_siswas')
                    ->where('id', $pendaftaran->calon_siswa_id)
                    ->update(['status_pendaftaran' => $pendaftaran->status_akhir]);
            }

            // Kirim email pengumuman jika status berubah menjadi Diterima atau Ditolak
            if ($calonSiswa && ($pendaftaran->wasChanged('status_akhir') || $pendaftaran->wasRecentlyCreated)) {
                if (in_array($pendaftaran->status_akhir, ['Diterima', 'Ditolak'])) {
                    try {
                        \Illuminate\Support\Facades\Mail::to($calonSiswa->email)
                            ->send(new \App\Mail\StatusPendaftaranMail($calonSiswa, $pendaftaran));
                    } catch (\Exception $e) {
                        \Illuminate\Support\Facades\Log::error("Gagal mengirim email pengumuman status pendaftaran: " . $e->getMessage());
                    }
                }
            }

            // Perbarui total_siswa di Jurusan yang bersangkutan berdasarkan jumlah siswa dengan status 'Diterima'
            if ($calonSiswa && $calonSiswa->jurusan_id) {
                $totalAccepted = \App\Models\CalonSiswa::where('jurusan_id', $calonSiswa->jurusan_id)
                    ->where('status_pendaftaran', 'Diterima')
                    ->count();

                \App\Models\Jurusan::where('id', $calonSiswa->jurusan_id)
                    ->update(['total_siswa' => $totalAccepted]);
            }
        });
    }
}

