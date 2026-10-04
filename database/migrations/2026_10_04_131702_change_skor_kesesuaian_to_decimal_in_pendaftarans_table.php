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
        Schema::table('pendaftarans', function (Blueprint $table) {
            $table->decimal('skor_kesesuaian', 5, 2)->nullable()->change();
            $table->decimal('peluang_keberhasilan', 5, 2)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pendaftarans', function (Blueprint $table) {
            $table->integer('skor_kesesuaian')->nullable()->change();
            $table->integer('peluang_keberhasilan')->nullable()->change();
        });
    }
};
