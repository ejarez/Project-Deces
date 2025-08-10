<?php

namespace App\Filament\Resources;

use App\Filament\Resources\JurusanResource\Pages;
use App\Filament\Resources\JurusanResource\RelationManagers;
use App\Models\Jurusan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class JurusanResource extends Resource
{
    protected static ?string $model = Jurusan::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';
    protected static ?string $navigationLabel = 'Jurusan';
    protected static ?string $navigationGroup = 'Akademik';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Jurusan')
                    ->schema([
                        Forms\Components\TextInput::make('nama_jurusan')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Textarea::make('deskripsi')
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('total_siswa')
                            ->numeric()
                            ->default(0)
                            ->disabled()
                            ->dehydrated(false)
                            ->helperText('Diperbarui otomatis berdasarkan jumlah siswa yang terdaftar'),
                        Forms\Components\TextInput::make('rating_rekomendasi')
                            ->numeric()
                            ->minValue(1)
                            ->maxValue(5)
                            ->step(0.1),
                    ])->columns(2),

                Forms\Components\Section::make('SMART - Specific & Measurable')
                    ->schema([
                        Forms\Components\TextInput::make('target_siswa_semester')
                            ->label('Target Siswa per Semester')
                            ->helperText('Target jumlah siswa yang ingin dicapai per semester')
                            ->numeric()
                            ->required(),
                        Forms\Components\TextInput::make('kuota_maksimal')
                            ->label('Kuota Maksimal')
                            ->helperText('Jumlah maksimal siswa yang dapat diterima per semester')
                            ->numeric()
                            ->required(),
                        Forms\Components\TextInput::make('tingkat_kelulusan')
                            ->label('Tingkat Kelulusan (%)')
                            ->helperText('Persentase tingkat kelulusan siswa di jurusan ini')
                            ->numeric()
                            ->minValue(0)
                            ->maxValue(100)
                            ->suffix('%'),
                    ])->columns(3),

                Forms\Components\Section::make('SMART - Achievable')
                    ->schema([
                        Forms\Components\Textarea::make('persyaratan_masuk')
                            ->label('Persyaratan Masuk')
                            ->helperText('Persyaratan yang harus dipenuhi calon siswa')
                            ->columnSpanFull(),
                        Forms\Components\Select::make('tingkat_kesulitan')
                            ->label('Tingkat Kesulitan')
                            ->options([
                                '1' => '1 - Sangat Mudah',
                                '2' => '2 - Mudah',
                                '3' => '3 - Sedang',
                                '4' => '4 - Sulit',
                                '5' => '5 - Sangat Sulit',
                            ])
                            ->required(),
                    ])->columns(2),

                Forms\Components\Section::make('SMART - Relevant')
                    ->schema([
                        Forms\Components\Textarea::make('prospek_karir')
                            ->label('Prospek Karir')
                            ->helperText('Prospek karir lulusan dari jurusan ini')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('SMART - Time-bound')
                    ->schema([
                        Forms\Components\TextInput::make('durasi_program')
                            ->label('Durasi Program (bulan)')
                            ->helperText('Durasi program dalam bulan')
                            ->numeric()
                            ->required(),
                        Forms\Components\DatePicker::make('tanggal_buka_pendaftaran')
                            ->label('Tanggal Buka Pendaftaran')
                            ->required(),
                        Forms\Components\DatePicker::make('tanggal_tutup_pendaftaran')
                            ->label('Tanggal Tutup Pendaftaran')
                            ->required()
                            ->after('tanggal_buka_pendaftaran'),
                    ])->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('nama_jurusan')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('total_siswa')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('target_siswa_semester')
                    ->numeric()
                    ->sortable()
                    ->label('Target Siswa'),
                Tables\Columns\TextColumn::make('progress_pendaftaran')
                    ->label('Progress Pendaftaran')
                    ->state(function (Jurusan $record): string {
                        if ($record->target_siswa_semester <= 0) {
                            return '0%';
                        }
                        $percentage = min(100, round(($record->total_siswa / $record->target_siswa_semester) * 100));
                        return $percentage . '%';
                    })
                    ->badge()
                    ->color(fn (string $state): string => match (true) {
                        (int) $state >= 100 => 'success',
                        (int) $state >= 75 => 'warning',
                        (int) $state >= 50 => 'info',
                        default => 'danger',
                    }),
                Tables\Columns\TextColumn::make('tingkat_kelulusan')
                    ->numeric()
                    ->suffix('%')
                    ->sortable(),
                Tables\Columns\TextColumn::make('tanggal_buka_pendaftaran')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('tanggal_tutup_pendaftaran')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
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
            'index' => Pages\ListJurusans::route('/'),
            'create' => Pages\CreateJurusan::route('/create'),
            'view' => Pages\ViewJurusan::route('/{record}'),
            'edit' => Pages\EditJurusan::route('/{record}/edit'),
        ];
    }
}
