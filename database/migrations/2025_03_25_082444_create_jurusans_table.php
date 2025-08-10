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
        Schema::create('jurusans', function (Blueprint $table) {
            $table->id();
            $table->string('nama_jurusan');
            $table->text('deskripsi')->nullable();
            $table->integer('total_siswa')->default(0);
            $table->float('rating_rekomendasi')->nullable();

            // SMART metrics
            $table->integer('target_siswa_semester')->default(0);
            $table->float('tingkat_kelulusan')->nullable();
            $table->text('prospek_karir')->nullable();
            $table->integer('durasi_program')->nullable();
            $table->text('persyaratan_masuk')->nullable();
            $table->integer('tingkat_kesulitan')->nullable();
            $table->integer('kuota_maksimal')->nullable();
            $table->date('tanggal_buka_pendaftaran')->nullable();
            $table->date('tanggal_tutup_pendaftaran')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jurusans');
    }
};
