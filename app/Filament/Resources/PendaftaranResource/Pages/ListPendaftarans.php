<?php

namespace App\Filament\Resources\PendaftaranResource\Pages;

use App\Filament\Resources\PendaftaranResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPendaftarans extends ListRecords
{
    protected static string $resource = PendaftaranResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('hitung_ulang_smart')
                ->label('Hitung Ulang Skor SMART')
                ->icon('heroicon-o-calculator')
                ->color('info')
                ->requiresConfirmation()
                ->modalHeading('Hitung Ulang Seluruh Skor SMART')
                ->modalDescription('Aksi ini akan menghitung ulang nilai utilitas dan skor kesesuaian seluruh calon siswa berdasarkan bobot kriteria jurusan terbaru saat ini.')
                ->action(function () {
                    $service = new \App\Services\SmartEvaluationService();
                    $count = $service->recalculateAll();

                    \Filament\Notifications\Notification::make()
                        ->title('Kalkulasi SMART Berhasil')
                        ->body("Sebanyak {$count} data pendaftaran berhasil dihitung ulang dan disinkronkan.")
                        ->success()
                        ->send();
                }),
        ];
    }
}
