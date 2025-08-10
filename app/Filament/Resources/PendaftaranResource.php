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

                Forms\Components\Section::make('SMART - Specific & Time-bound')
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

                Forms\Components\Section::make('SMART - Measurable & Achievable')
                    ->schema([
                        Forms\Components\TextInput::make('skor_kesesuaian')
                            ->label('Skor Kesesuaian (1-100)')
                            ->helperText('Skor kesesuaian calon siswa dengan jurusan yang dipilih')
                            ->numeric()
                            ->minValue(1)
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

                Forms\Components\Section::make('SMART - Relevant')
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
                Tables\Columns\TextColumn::make('calonSiswa.nama_lengkap')
                    ->label('Nama Calon Siswa')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('calonSiswa.jurusan.nama_jurusan')
                    ->label('Jurusan')
                    ->sortable(),
                Tables\Columns\TextColumn::make('tanggal_pendaftaran')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('status_akhir')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Menunggu' => 'gray',
                        'Diproses' => 'warning',
                        'Diterima' => 'success',
                        'Ditolak' => 'danger',
                    }),
                Tables\Columns\TextColumn::make('target_waktu_proses')
                    ->numeric()
                    ->suffix(' hari')
                    ->sortable(),
                Tables\Columns\TextColumn::make('waktu_pemrosesan_aktual')
                    ->numeric()
                    ->suffix(' hari')
                    ->sortable(),
                Tables\Columns\TextColumn::make('skor_kesesuaian')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('semester_target_masuk')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
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
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
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
