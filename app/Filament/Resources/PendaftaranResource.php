<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PendaftaranResource\Pages;
use App\Filament\Resources\PendaftaranResource\RelationManagers;
use App\Models\Pendaftaran;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PendaftaranResource extends Resource
{
    protected static ?string $model = Pendaftaran::class;

    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-check';
    protected static ?string $navigationLabel = 'Pendaftaran';
    protected static ?string $navigationGroup = 'Pendaftaran';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Pendaftaran')
                    ->schema([
                        Forms\Components\Select::make('calon_siswa_id')
                            ->relationship('calonSiswa', 'nama_lengkap')
                            ->searchable()
                            ->preload()
                            ->required(),
                        Forms\Components\DatePicker::make('tanggal_pendaftaran')
                            ->required()
                            ->default(now()),
                        Forms\Components\Select::make('status_akhir')
                            ->options([
                                'Menunggu' => 'Menunggu',
                                'Diproses' => 'Diproses',
                                'Diterima' => 'Diterima',
                                'Ditolak' => 'Ditolak',
                            ])
                            ->required(),
                        Forms\Components\Select::make('semester_target_masuk')
                            ->options([
                                'Ganjil 2023/2024' => 'Ganjil 2023/2024',
                                'Genap 2023/2024' => 'Genap 2023/2024',
                                'Ganjil 2024/2025' => 'Ganjil 2024/2025',
                                'Genap 2024/2025' => 'Genap 2024/2025',
                            ])
                            ->required(),
                    ])->columns(2),

                Forms\Components\Section::make('Target Waktu Pemrosesan & Tindak Lanjut')
                    ->schema([
                        Forms\Components\TextInput::make('target_waktu_proses')
                            ->label('Target Waktu Proses (hari)')
                            ->helperText('Target waktu pemrosesan pendaftaran dalam hari')
                            ->numeric()
                            ->required(),
                        Forms\Components\TextInput::make('waktu_pemrosesan_aktual')
                            ->label('Waktu Pemrosesan Aktual (hari)')
                            ->helperText('Waktu pemrosesan aktual dalam hari')
                            ->numeric(),
                        Forms\Components\DatePicker::make('target_tanggal_wawancara')
                            ->label('Target Tanggal Wawancara'),
                        Forms\Components\Textarea::make('langkah_selanjutnya')
                            ->label('Langkah Selanjutnya')
                            ->placeholder('Langkah spesifik yang harus dilakukan selanjutnya')
                            ->columnSpanFull(),
                    ])->columns(3),

                Forms\Components\Section::make('Hasil Evaluasi SMART & Wawancara')
                    ->schema([
                        Forms\Components\TextInput::make('skor_kesesuaian')
                            ->label('Skor Kesesuaian SMART')
                            ->helperText('Skor kesesuaian hasil evaluasi SMART (0-100)')
                            ->numeric()
                            ->minValue(0)
                            ->maxValue(100),
                        Forms\Components\TextInput::make('peluang_keberhasilan')
                            ->label('Peluang Keberhasilan (%)')
                            ->helperText('Perkiraan peluang keberhasilan calon siswa')
                            ->numeric()
                            ->minValue(0)
                            ->maxValue(100)
                            ->suffix('%'),
                        Forms\Components\Select::make('hasil_wawancara')
                            ->label('Hasil Wawancara')
                            ->options([
                                'Belum Wawancara' => 'Belum Wawancara',
                                'Sangat Baik' => 'Sangat Baik',
                                'Baik' => 'Baik',
                                'Cukup' => 'Cukup',
                                'Kurang' => 'Kurang',
                                'Tidak Hadir' => 'Tidak Hadir',
                            ])
                            ->default('Belum Wawancara'),
                    ])->columns(3),

                Forms\Components\Section::make('Rekomendasi Alternatif & Catatan')
                    ->schema([
                        Forms\Components\Select::make('rekomendasi_jurusan_alt')
                            ->label('Rekomendasi Jurusan Alternatif')
                            ->relationship('calonSiswa.jurusan', 'nama_jurusan')
                            ->searchable()
                            ->preload(),
                        Forms\Components\Textarea::make('catatan_admin')
                            ->label('Catatan Admin')
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('ranking')
                    ->label('Rank')
                    ->state(function (Pendaftaran $record): string {
                        $jurusanId = $record->calonSiswa?->jurusan_id;
                        if (!$jurusanId) return '-';

                        $rank = Pendaftaran::join('calon_siswas', 'pendaftarans.calon_siswa_id', '=', 'calon_siswas.id')
                            ->where('calon_siswas.jurusan_id', $jurusanId)
                            ->where('pendaftarans.skor_kesesuaian', '>', $record->skor_kesesuaian)
                            ->count() + 1;

                        $total = Pendaftaran::join('calon_siswas', 'pendaftarans.calon_siswa_id', '=', 'calon_siswas.id')
                            ->where('calon_siswas.jurusan_id', $jurusanId)
                            ->count();

                        return "#{$rank} dari {$total}";
                    })
                    ->weight('bold')
                    ->color('warning'),
                Tables\Columns\TextColumn::make('calonSiswa.nama_lengkap')
                    ->label('Nama Calon Siswa')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('calonSiswa.jurusan.nama_jurusan')
                    ->label('Jurusan')
                    ->sortable(),
                Tables\Columns\TextColumn::make('skor_kesesuaian')
                    ->label('Skor SMART')
                    ->numeric()
                    ->sortable()
                    ->fontFamily('mono')
                    ->weight('bold')
                    ->color(fn (int $state): string => match (true) {
                        $state >= 80 => 'success',
                        $state >= 70 => 'warning',
                        default => 'danger',
                    }),
                Tables\Columns\TextColumn::make('rekomendasi')
                    ->label('Rekomendasi SMART')
                    ->state(function (Pendaftaran $record): string {
                        $service = new \App\Services\SmartEvaluationService();
                        return $service->getRecommendationStatus($record->skor_kesesuaian ?? 0.0);
                    })
                    ->badge()
                    ->color(fn (string $state): string => match (true) {
                        str_contains($state, 'Sangat') => 'success',
                        str_contains($state, 'Layak') => 'warning',
                        default => 'danger',
                    }),
                Tables\Columns\TextColumn::make('tanggal_pendaftaran')
                    ->date()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('status_akhir')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Menunggu' => 'gray',
                        'Diproses' => 'warning',
                        'Diterima' => 'success',
                        'Ditolak' => 'danger',
                    }),
                Tables\Columns\TextColumn::make('semester_target_masuk')
                    ->label('Semester')
                    ->searchable()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('skor_kesesuaian', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status_akhir')
                    ->options([
                        'Menunggu' => 'Menunggu',
                        'Diproses' => 'Diproses',
                        'Diterima' => 'Diterima',
                        'Ditolak' => 'Ditolak',
                    ]),
                Tables\Filters\SelectFilter::make('jurusan')
                    ->relationship('calonSiswa.jurusan', 'nama_jurusan'),
                Tables\Filters\SelectFilter::make('semester_target_masuk')
                    ->options([
                        'Ganjil 2023/2024' => 'Ganjil 2023/2024',
                        'Genap 2023/2024' => 'Genap 2023/2024',
                        'Ganjil 2024/2025' => 'Ganjil 2024/2025',
                        'Genap 2024/2025' => 'Genap 2024/2025',
                    ]),
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\Action::make('terima')
                        ->label('Terima Siswa')
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->requiresConfirmation()
                        ->visible(fn (Pendaftaran $record): bool => in_array($record->status_akhir, ['Menunggu', 'Diproses']))
                        ->action(function (Pendaftaran $record) {
                            $record->update(['status_akhir' => 'Diterima']);
                            // Observer Pendaftaran akan otomatis mensinkronisasi CalonSiswa & total_siswa di Jurusan!
                            \Filament\Notifications\Notification::make()
                                ->title('Siswa Diterima')
                                ->body("Siswa {$record->calonSiswa->nama_lengkap} berhasil diterima di jurusan {$record->calonSiswa->jurusan->nama_jurusan}.")
                                ->success()
                                ->send();
                        }),
                    Tables\Actions\Action::make('tolak')
                        ->label('Tolak Siswa')
                        ->icon('heroicon-o-x-circle')
                        ->color('danger')
                        ->requiresConfirmation()
                        ->visible(fn (Pendaftaran $record): bool => in_array($record->status_akhir, ['Menunggu', 'Diproses']))
                        ->action(function (Pendaftaran $record) {
                            $record->update(['status_akhir' => 'Ditolak']);
                            // Observer Pendaftaran akan otomatis mensinkronisasi CalonSiswa!
                            \Filament\Notifications\Notification::make()
                                ->title('Siswa Ditolak')
                                ->body("Siswa {$record->calonSiswa->nama_lengkap} telah ditolak.")
                                ->danger()
                                ->send();
                        }),
                    Tables\Actions\ViewAction::make(),
                    Tables\Actions\EditAction::make(),
                ])
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPendaftarans::route('/'),
            'create' => Pages\CreatePendaftaran::route('/create'),
            'view' => Pages\ViewPendaftaran::route('/{record}'),
            'edit' => Pages\EditPendaftaran::route('/{record}/edit'),
        ];
    }
}
