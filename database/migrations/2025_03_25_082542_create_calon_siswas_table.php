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
        Schema::create('calon_siswas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jurusan_id')->constrained('jurusans');
            $table->string('nama_lengkap');
            $table->text('alamat');
            $table->string('email')->unique();
            $table->string('nomor_telepon');
            $table->string('berkas_pendaftaran')->nullable();
            $table->enum('status_pendaftaran', [
                'Menunggu',
                'Diproses',
                'Diterima',
                'Ditolak'
            ])->default('Menunggu');

            // SMART fields
            $table->text('specific_goal')->nullable();
            $table->float('measurable_nilai_matematika')->nullable();
            $table->float('measurable_nilai_bahasa')->nullable();
            $table->float('measurable_nilai_ipa')->nullable();
            $table->float('measurable_nilai_ips')->nullable();
            $table->text('achievable_kemampuan')->nullable();
            $table->text('achievable_minat')->nullable();
            $table->text('relevant_alasan')->nullable();
            $table->date('timebound_target_lulus')->nullable();
            $table->text('timebound_rencana_studi')->nullable();
            $table->string('semester_pendaftaran')->nullable();
            $table->string('sumber_informasi')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calon_siswas');
    }
};
