<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CalonSiswaResource\Pages;
use App\Filament\Resources\CalonSiswaResource\RelationManagers;
use App\Models\CalonSiswa;
use App\Models\Pendaftaran;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class CalonSiswaResource extends Resource
{
    protected static ?string $model = CalonSiswa::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $navigationLabel = 'Calon Siswa';
    protected static ?string $navigationGroup = 'Pendaftaran';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Data Diri')
                    ->schema([
                        Forms\Components\TextInput::make('nama_lengkap')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Textarea::make('alamat')
                            ->required()
                            ->columnSpanFull(),
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('nomor_telepon')
                            ->tel()
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Select::make('semester_pendaftaran')
                            ->options([
                                'Ganjil 2023/2024' => 'Ganjil 2023/2024',
                                'Genap 2023/2024' => 'Genap 2023/2024',
                                'Ganjil 2024/2025' => 'Ganjil 2024/2025',
                                'Genap 2024/2025' => 'Genap 2024/2025',
                            ])
                            ->required(),
                        Forms\Components\Select::make('sumber_informasi')
                            ->options([
                                'Media Sosial' => 'Media Sosial',
                                'Teman/Keluarga' => 'Teman/Keluarga',
                                'Website' => 'Website',
                                'Iklan' => 'Iklan',
                                'Lainnya' => 'Lainnya',
                            ])
                            ->required(),
                    ])->columns(2),

                Forms\Components\Section::make('Pemilihan Jurusan')
                    ->schema([
                        Forms\Components\Select::make('jurusan_id')
                            ->relationship('jurusan', 'nama_jurusan')
                            ->required(),
                        Forms\Components\FileUpload::make('berkas_pendaftaran')
                            ->directory('berkas-pendaftaran')
                            ->acceptedFileTypes(['application/pdf']),
                        Forms\Components\Placeholder::make('status_pendaftaran')
                            ->label('Status Pendaftaran')
                            ->content(fn ($record) => $record?->status_pendaftaran ?? 'Menunggu'),
                    ])->columns(3),

                Forms\Components\Section::make('Rencana Karir & Cita-Cita')
                    ->description('Target karir spesifik calon siswa setelah lulus')
                    ->schema([
                        Forms\Components\Textarea::make('specific_goal')
                            ->label('Cita-Cita / Target Karir')
                            ->placeholder('Apa target pendidikan dan karir spesifik yang ingin dicapai?')
                            ->helperText('Contoh: Menjadi programmer di perusahaan teknologi dalam 5 tahun')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Nilai Akademis (Kriteria SMART)')
                    ->description('Nilai rapor mata pelajaran utama untuk seleksi keputusan SMART')
                    ->schema([
                        Forms\Components\TextInput::make('measurable_nilai_matematika')
                            ->label('Nilai Matematika')
                            ->numeric()
                            ->minValue(0)
                            ->maxValue(100),
                        Forms\Components\TextInput::make('measurable_nilai_bahasa')
                            ->label('Nilai Bahasa')
                            ->numeric()
                            ->minValue(0)
                            ->maxValue(100),
                        Forms\Components\TextInput::make('measurable_nilai_ipa')
                            ->label('Nilai IPA')
                            ->numeric()
                            ->minValue(0)
                            ->maxValue(100),
                        Forms\Components\TextInput::make('measurable_nilai_ips')
                            ->label('Nilai IPS')
                            ->numeric()
                            ->minValue(0)
                            ->maxValue(100),
                    ])->columns(2),

                Forms\Components\Section::make('Keterampilan & Minat')
                    ->description('Potensi non-akademis pendukung kejuruan')
                    ->schema([
                        Forms\Components\Textarea::make('achievable_kemampuan')
                            ->label('Keterampilan / Bakat Non-Akademis')
                            ->placeholder('Sebutkan kemampuan atau keterampilan yang dimiliki')
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('achievable_minat')
                            ->label('Hobi & Bidang Minat')
                            ->placeholder('Sebutkan minat dan hobi yang dimiliki')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Relevansi & Motivasi')
                    ->description('Kesesuaian dengan minat dan motivasi masuk jurusan')
                    ->schema([
                        Forms\Components\Textarea::make('relevant_alasan')
                            ->label('Alasan Memilih Jurusan')
                            ->placeholder('Jelaskan mengapa jurusan ini penting untuk masa depan Anda')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Rencana Studi & Kelulusan')
                    ->description('Komitmen waktu belajar dan kelulusan')
                    ->schema([
                        Forms\Components\DatePicker::make('timebound_target_lulus')
                            ->label('Tanggal Lulus SMP/MTs'),
                        Forms\Components\Textarea::make('timebound_rencana_studi')
                            ->label('Rencana Studi Pasca-Masuk')
                            ->placeholder('Jelaskan rencana studi dan target waktu pencapaian')
                            ->helperText('Contoh: Tahun 1: menguasai dasar-dasar, Tahun 2: spesialisasi, dst.')
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
                    ->state(function (CalonSiswa $record): string {
                        $jurusanId = $record->jurusan_id;
                        if (!$jurusanId) return '-';

                        $rank = Pendaftaran::join('calon_siswas', 'pendaftarans.calon_siswa_id', '=', 'calon_siswas.id')
                            ->where('calon_siswas.jurusan_id', $jurusanId)
                            ->where('pendaftarans.skor_kesesuaian', '>', $record->pendaftaran?->skor_kesesuaian ?? 0)
                            ->count() + 1;

                        $total = CalonSiswa::where('jurusan_id', $jurusanId)->count();

                        return "#{$rank} dari {$total}";
                    })
                    ->weight('bold')
                    ->color('warning'),
                Tables\Columns\TextColumn::make('nama_lengkap')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('jurusan.nama_jurusan')
                    ->label('Jurusan Pilihan')
                    ->sortable(),
                Tables\Columns\TextColumn::make('pendaftaran.skor_kesesuaian')
                    ->label('Skor SMART')
                    ->numeric()
                    ->sortable()
                    ->fontFamily('mono')
                    ->weight('bold')
                    ->color(fn (mixed $state): string => match (true) {
                        (float)$state >= 80 => 'success',
                        (float)$state >= 70 => 'warning',
                        default => 'danger',
                    }),
                Tables\Columns\TextColumn::make('status_pendaftaran')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Menunggu' => 'gray',
                        'Diproses' => 'warning',
                        'Diterima' => 'success',
                        'Ditolak' => 'danger',
                    }),
                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('nomor_telepon')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('semester_pendaftaran')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('pendaftaran.skor_kesesuaian', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status_pendaftaran')
                    ->options([
                        'Menunggu' => 'Menunggu',
                        'Diproses' => 'Diproses',
                        'Diterima' => 'Diterima',
                        'Ditolak' => 'Ditolak',
                    ]),
                Tables\Filters\SelectFilter::make('jurusan')
                    ->relationship('jurusan', 'nama_jurusan'),
                Tables\Filters\SelectFilter::make('semester_pendaftaran')
                    ->options([
                        'Ganjil 2023/2024' => 'Ganjil 2023/2024',
                        'Genap 2023/2024' => 'Genap 2023/2024',
                        'Ganjil 2024/2025' => 'Ganjil 2024/2025',
                        'Genap 2024/2025' => 'Genap 2024/2025',
                    ]),
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
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
            'index' => Pages\ListCalonSiswas::route('/'),
            'create' => Pages\CreateCalonSiswa::route('/create'),
            'view' => Pages\ViewCalonSiswa::route('/{record}'),
            'edit' => Pages\EditCalonSiswa::route('/{record}/edit'),
        ];
    }
}
