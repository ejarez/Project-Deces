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
}
