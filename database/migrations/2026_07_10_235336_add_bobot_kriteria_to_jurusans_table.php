<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('jurusans', function (Blueprint $table) {
            $table->integer('bobot_matematika')->default(30)->after('nama_jurusan');
            $table->integer('bobot_ipa')->default(25)->after('bobot_matematika');
            $table->integer('bobot_bahasa')->default(25)->after('bobot_ipa');
            $table->integer('bobot_ips')->default(20)->after('bobot_bahasa');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jurusans', function (Blueprint $table) {
            $table->dropColumn(['bobot_matematika', 'bobot_ipa', 'bobot_bahasa', 'bobot_ips']);
        });
    }
};
