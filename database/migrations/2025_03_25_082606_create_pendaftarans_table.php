<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pendaftarans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('calon_siswa_id')->constrained('calon_siswas');
            $table->date('tanggal_pendaftaran');
            $table->text('catatan_admin')->nullable();
            $table->enum('status_akhir', [
                'Menunggu',
                'Diproses',
                'Diterima',
                'Ditolak'
            ])->default('Menunggu');

            // SMART tracking fields
            $table->integer('target_waktu_proses')->nullable();
            $table->integer('waktu_pemrosesan_aktual')->nullable();
            $table->integer('skor_kesesuaian')->nullable();
            $table->string('rekomendasi_jurusan_alt')->nullable();
            $table->text('langkah_selanjutnya')->nullable();
            $table->date('target_tanggal_wawancara')->nullable();
            $table->string('hasil_wawancara')->nullable();
            $table->integer('peluang_keberhasilan')->nullable();
            $table->string('semester_target_masuk')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pendaftarans');
    }
};
