<?php

namespace App\Filament\Widgets;

use App\Models\CalonSiswa;
use App\Models\Jurusan;
use App\Models\Pendaftaran;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Carbon\Carbon;

class PendaftaranStatsOverview extends BaseWidget
{
    protected static ?string $pollingInterval = '30s';

    protected function getStats(): array
    {
        try {
            // Get current semester
            $currentSemester = $this->getCurrentSemester();

            // Get total pendaftar for current semester
            $totalPendaftar = CalonSiswa::where('semester_pendaftaran', $currentSemester)->count();

            // Get target siswa for all jurusan
            $targetSiswa = Jurusan::sum('target_siswa_semester');

            // Calculate percentage of target achieved
            $percentageAchieved = $targetSiswa > 0 ? round(($totalPendaftar / $targetSiswa) * 100, 1) : 0;

            // Get average processing time
            $avgProcessingTime = Pendaftaran::whereNotNull('waktu_pemrosesan_aktual')->avg('waktu_pemrosesan_aktual') ?? 0;

            // Get acceptance rate
            $acceptanceRate = $this->getAcceptanceRate();

            // Get trending jurusan
            $trendingJurusan = $this->getTrendingJurusan();

            return [
                // Specific & Measurable
                Stat::make('Total Pendaftar ' . $currentSemester, $totalPendaftar)
                    ->description($percentageAchieved . '% dari target ' . $targetSiswa)
                    ->descriptionIcon($percentageAchieved >= 80 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                    ->color($percentageAchieved >= 80 ? 'success' : ($percentageAchieved >= 50 ? 'warning' : 'danger')),

                // Time-bound
                Stat::make('Rata-rata Waktu Proses', round($avgProcessingTime, 1) . ' hari')
                    ->description('Target: 7 hari')
                    ->descriptionIcon($avgProcessingTime <= 7 ? 'heroicon-m-check-circle' : 'heroicon-m-clock')
                    ->color($avgProcessingTime <= 7 ? 'success' : 'warning'),

                // Achievable
                Stat::make('Tingkat Penerimaan', $acceptanceRate . '%')
                    ->description('Dari total pendaftar yang diproses')
                    ->descriptionIcon('heroicon-m-academic-cap')
                    ->color('primary'),

                // Relevant
                Stat::make('Jurusan Terpopuler', $trendingJurusan['nama'] ?? '-')
                    ->description($trendingJurusan['count'] . ' pendaftar')
                    ->descriptionIcon('heroicon-m-fire')
                    ->color('success'),
            ];
        } catch (\Exception $e) {
            // Return basic stats in case of error
            return [
                Stat::make('Total Pendaftar', '0')
                    ->description('0% dari target')
                    ->descriptionIcon('heroicon-m-arrow-trending-down')
                    ->color('danger'),

                Stat::make('Rata-rata Waktu Proses', '0 hari')
                    ->description('Target: 7 hari')
                    ->descriptionIcon('heroicon-m-clock')
                    ->color('warning'),

                Stat::make('Tingkat Penerimaan', '0%')
                    ->description('Dari total pendaftar yang diproses')
                    ->descriptionIcon('heroicon-m-academic-cap')
                    ->color('primary'),

                Stat::make('Jurusan Terpopuler', '-')
                    ->description('0 pendaftar')
                    ->descriptionIcon('heroicon-m-fire')
                    ->color('success'),
            ];
        }
    }

    private function getCurrentSemester(): string
    {
        $now = Carbon::now();
        $year = $now->year;
        $nextYear = $year + 1;

        // Ganjil: July-December, Genap: January-June
        if ($now->month >= 7) {
            return "Ganjil $year/" . $nextYear;
        } else {
            $prevYear = $year - 1;
            return "Genap $prevYear/$year";
        }
    }

    private function getAcceptanceRate(): float
    {
        try {
            $processed = Pendaftaran::whereIn('status_akhir', ['Diterima', 'Ditolak'])->count();
            $accepted = Pendaftaran::where('status_akhir', 'Diterima')->count();

            return $processed > 0 ? round(($accepted / $processed) * 100, 1) : 0;
        } catch (\Exception $e) {
            return 0;
        }
    }

    private function getTrendingJurusan(): array
    {
        try {
            $result = CalonSiswa::selectRaw('jurusan_id, count(*) as count')
                ->groupBy('jurusan_id')
                ->orderByDesc('count')
                ->first();

            if ($result) {
                $jurusan = Jurusan::find($result->jurusan_id);
                return [
                    'nama' => $jurusan ? $jurusan->nama_jurusan : 'Unknown',
                    'count' => $result->count
                ];
            }

            return [
                'nama' => '-',
                'count' => 0
            ];
        } catch (\Exception $e) {
            return [
                'nama' => '-',
                'count' => 0
            ];
        }
    }
}
