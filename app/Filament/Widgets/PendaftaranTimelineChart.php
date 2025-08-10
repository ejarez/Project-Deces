<?php

namespace App\Filament\Widgets;

use App\Models\CalonSiswa;
use App\Models\Jurusan;
use Filament\Widgets\ChartWidget;
use Flowframe\Trend\Trend;
use Flowframe\Trend\TrendValue;
use Carbon\Carbon;

class PendaftaranTimelineChart extends ChartWidget
{
    protected static ?string $heading = 'Tren Pendaftaran (Time-bound)';
    protected static ?string $pollingInterval = '60s';
    protected static ?int $sort = 3;

    protected function getData(): array
    {
        try {
            // Get current semester
            $currentSemester = $this->getCurrentSemester();

            // Get start and end dates for current semester
            $dateRange = $this->getSemesterDateRange($currentSemester);
            $startDate = $dateRange['start'];
            $endDate = $dateRange['end'];

            // Get all pendaftar for current semester
            $pendaftaranTrend = Trend::model(CalonSiswa::class)
                ->between(
                    start: $startDate,
                    end: $endDate,
                )
                ->perDay()
                ->count();

            // Extract data from TrendValue objects
            $labels = [];
            $aggregateValues = [];

            // Check if we have any data
            if (count($pendaftaranTrend) > 0) {
                foreach ($pendaftaranTrend as $trendValue) {
                    $labels[] = Carbon::parse($trendValue->date)->format('d M');
                    $aggregateValues[] = $trendValue->aggregate;
                }
            }

            // Calculate target trend line
            $targetTrend = $this->calculateTargetTrend($startDate, $endDate, count($labels));

            return [
                'datasets' => [
                    [
                        'label' => 'Pendaftar Aktual',
                        'data' => $aggregateValues,
                        'fill' => false,
                        'borderColor' => 'rgb(59, 130, 246)', // Blue
                        'tension' => 0.1,
                    ],
                    [
                        'label' => 'Target Pendaftar',
                        'data' => $targetTrend,
                        'fill' => false,
                        'borderColor' => 'rgb(107, 114, 128)', // Gray
                        'borderDash' => [5, 5],
                        'tension' => 0,
                    ],
                ],
                'labels' => $labels,
            ];
        } catch (\Exception $e) {
            // Return empty chart data in case of error
            return [
                'datasets' => [
                    [
                        'label' => 'Pendaftar Aktual',
                        'data' => [],
                        'fill' => false,
                        'borderColor' => 'rgb(59, 130, 246)',
                        'tension' => 0.1,
                    ],
                    [
                        'label' => 'Target Pendaftar',
                        'data' => [],
                        'fill' => false,
                        'borderColor' => 'rgb(107, 114, 128)',
                        'borderDash' => [5, 5],
                        'tension' => 0,
                    ],
                ],
                'labels' => [],
            ];
        }
    }

    protected function getType(): string
    {
        return 'line';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'title' => [
                    'display' => true,
                    'text' => 'Progres Pendaftaran Terhadap Target (' . $this->getCurrentSemester() . ')',
                ],
                'tooltip' => [
                    'mode' => 'index',
                    'intersect' => false,
                ],
                'legend' => [
                    'position' => 'bottom',
                ],
            ],
            'scales' => [
                'y' => [
                    'title' => [
                        'display' => true,
                        'text' => 'Jumlah Pendaftar (Kumulatif)',
                    ],
                    'beginAtZero' => true,
                ],
                'x' => [
                    'title' => [
                        'display' => true,
                        'text' => 'Tanggal',
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

    private function getSemesterDateRange(string $semester): array
    {
        // Parse semester string
        preg_match('/(\w+) (\d{4})\/(\d{4})/', $semester, $matches);

        // Check if matches were found
        if (empty($matches)) {
            // Default to current semester if parsing fails
            $now = Carbon::now();
            $year = $now->year;

            if ($now->month >= 7) {
                return [
                    'start' => Carbon::createFromDate($year, 7, 1)->startOfDay(),
                    'end' => Carbon::createFromDate($year, 12, 31)->endOfDay(),
                ];
            } else {
                return [
                    'start' => Carbon::createFromDate($year, 1, 1)->startOfDay(),
                    'end' => Carbon::createFromDate($year, 6, 30)->endOfDay(),
                ];
            }
        }

        $type = $matches[1]; // Ganjil or Genap
        $firstYear = $matches[2];
        $secondYear = $matches[3];

        if ($type == 'Ganjil') {
            // July to December of firstYear
            return [
                'start' => Carbon::createFromDate($firstYear, 7, 1)->startOfDay(),
                'end' => Carbon::createFromDate($firstYear, 12, 31)->endOfDay(),
            ];
        } else {
            // January to June of secondYear
            return [
                'start' => Carbon::createFromDate($secondYear, 1, 1)->startOfDay(),
                'end' => Carbon::createFromDate($secondYear, 6, 30)->endOfDay(),
            ];
        }
    }

    private function calculateTargetTrend(Carbon $startDate, Carbon $endDate, int $dataPointCount = 0): array
    {
        // Get total target for all jurusan
        $totalTarget = Jurusan::sum('target_siswa_semester');

        // If we have data points, use that count for the target trend
        if ($dataPointCount > 0) {
            $targetTrend = [];
            $dailyTarget = $totalTarget / $dataPointCount;

            for ($i = 0; $i < $dataPointCount; $i++) {
                $targetTrend[] = round($dailyTarget * ($i + 1));
            }

            return $targetTrend;
        }

        // Otherwise use the date range to calculate
        // Calculate days in semester
        $daysInSemester = $startDate->diffInDays($endDate) + 1;

        // Ensure we have at least one day to avoid division by zero
        $daysInSemester = max(1, $daysInSemester);

        // Calculate daily target (linear progression)
        $targetTrend = [];
        $cumulativeTarget = 0;
        $dailyTarget = $totalTarget / $daysInSemester;

        $currentDate = clone $startDate;
        while ($currentDate <= $endDate) {
            $daysPassed = $startDate->diffInDays($currentDate);
            $cumulativeTarget = round($dailyTarget * $daysPassed);
            $targetTrend[] = $cumulativeTarget;
            $currentDate->addDay();
        }

        return $targetTrend;
    }
}
