<?php

namespace App\Filament\Widgets;

use App\Models\CalonSiswa;
use App\Models\Jurusan;
use Filament\Widgets\ChartWidget;
use Flowframe\Trend\Trend;
use Flowframe\Trend\TrendValue;
use Carbon\Carbon;

class JurusanTargetChart extends ChartWidget
{
    protected static ?string $heading = 'Performa Jurusan vs Target (SMART)';
    protected static ?string $pollingInterval = '60s';
    protected static ?int $sort = 2;

    protected function getData(): array
    {
        try {
            // Get all jurusan
            $jurusans = Jurusan::all();

            // If no jurusan records exist, return empty chart
            if ($jurusans->isEmpty()) {
                return $this->getEmptyChartData();
            }

            $labels = [];
            $actualData = [];
            $targetData = [];
            $colors = [];

            foreach ($jurusans as $jurusan) {
                // Add jurusan name to labels
                $labels[] = $jurusan->nama_jurusan;

                // Get current semester
                $currentSemester = $this->getCurrentSemester();

                // Count actual pendaftar for this jurusan in current semester
                $actualCount = CalonSiswa::where('jurusan_id', $jurusan->id)
                    ->where('semester_pendaftaran', $currentSemester)
                    ->count();

                // Add actual count to data
                $actualData[] = $actualCount;

                // Add target to target data
                $targetData[] = $jurusan->target_siswa_semester ?? 0;

                // Determine color based on achievement
                $percentage = ($jurusan->target_siswa_semester ?? 0) > 0
                    ? ($actualCount / $jurusan->target_siswa_semester) * 100
                    : 0;

                if ($percentage >= 100) {
                    $colors[] = 'rgb(34, 197, 94)'; // Green - success
                } elseif ($percentage >= 70) {
                    $colors[] = 'rgb(234, 179, 8)';  // Yellow - warning
                } else {
                    $colors[] = 'rgb(239, 68, 68)';  // Red - danger
                }
            }

            return [
                'datasets' => [
                    [
                        'label' => 'Pendaftar Aktual',
                        'data' => $actualData,
                        'backgroundColor' => $colors,
                    ],
                    [
                        'label' => 'Target Pendaftar',
                        'data' => $targetData,
                        'backgroundColor' => 'rgba(59, 130, 246, 0.5)', // Blue - primary
                        'type' => 'line',
                    ],
                ],
                'labels' => $labels,
            ];
        } catch (\Exception $e) {
            return $this->getEmptyChartData();
        }
    }

    protected function getType(): string
    {
        return 'bar';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'title' => [
                    'display' => true,
                    'text' => 'Target vs Aktual (' . $this->getCurrentSemester() . ')',
                ],
                'legend' => [
                    'position' => 'bottom',
                ],
            ],
            'scales' => [
                'y' => [
                    'title' => [
                        'display' => true,
                        'text' => 'Jumlah Siswa',
                    ],
                    'beginAtZero' => true,
                ],
                'x' => [
                    'title' => [
                        'display' => true,
                        'text' => 'Jurusan',
                    ],
                ],
            ],
        ];
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

    private function getEmptyChartData(): array
    {
        return [
            'datasets' => [
                [
                    'label' => 'Pendaftar Aktual',
                    'data' => [],
                    'backgroundColor' => [],
                ],
                [
                    'label' => 'Target Pendaftar',
                    'data' => [],
                    'backgroundColor' => 'rgba(59, 130, 246, 0.5)',
                    'type' => 'line',
                ],
            ],
            'labels' => [],
        ];
    }
}
