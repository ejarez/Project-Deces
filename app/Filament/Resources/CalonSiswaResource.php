<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CalonSiswaResource\Pages;
use App\Filament\Resources\CalonSiswaResource\RelationManagers;
use App\Models\CalonSiswa;
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
                        Forms\Components\Select::make('status_pendaftaran')
                            ->options([
                                'Menunggu' => 'Menunggu',
                                'Diproses' => 'Diproses',
                                'Diterima' => 'Diterima',
                                'Ditolak' => 'Ditolak',
                            ])
                            ->required(),
                    ])->columns(2),

                Forms\Components\Section::make('SMART - Specific')
                    ->description('Tujuan spesifik pendaftaran')
                    ->schema([
                        Forms\Components\Textarea::make('specific_goal')
                            ->label('Tujuan Spesifik')
                            ->placeholder('Apa tujuan pendidikan dan karir spesifik yang ingin dicapai?')
                            ->helperText('Contoh: Menjadi programmer di perusahaan teknologi dalam 5 tahun')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('SMART - Measurable')
                    ->description('Nilai dan kemampuan terukur')
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

                Forms\Components\Section::make('SMART - Achievable')
                    ->description('Kemampuan dan minat')
                    ->schema([
                        Forms\Components\Textarea::make('achievable_kemampuan')
                            ->label('Kemampuan yang Dimiliki')
                            ->placeholder('Sebutkan kemampuan atau keterampilan yang dimiliki')
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('achievable_minat')
                            ->label('Minat dan Hobi')
                            ->placeholder('Sebutkan minat dan hobi yang dimiliki')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('SMART - Relevant')
                    ->description('Kesesuaian dengan minat, bakat, dan tujuan')
                    ->schema([
                        Forms\Components\Textarea::make('relevant_alasan')
                            ->label('Alasan Relevansi')
                            ->placeholder('Jelaskan mengapa jurusan ini relevan dengan minat, bakat, dan tujuan karir')
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('SMART - Time-bound')
                    ->description('Rencana waktu')
                    ->schema([
                        Forms\Components\DatePicker::make('timebound_target_lulus')
                            ->label('Target Waktu Lulus'),
                        Forms\Components\Textarea::make('timebound_rencana_studi')
                            ->label('Rencana Studi')
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
                Tables\Columns\TextColumn::make('nama_lengkap')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('jurusan.nama_jurusan')
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable(),
                Tables\Columns\TextColumn::make('nomor_telepon')
                    ->searchable(),
                Tables\Columns\TextColumn::make('status_pendaftaran')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Menunggu' => 'gray',
                        'Diproses' => 'warning',
                        'Diterima' => 'success',
                        'Ditolak' => 'danger',
                    }),
                Tables\Columns\TextColumn::make('semester_pendaftaran')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
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
            'index' => Pages\ListCalonSiswas::route('/'),
            'create' => Pages\CreateCalonSiswa::route('/create'),
            'view' => Pages\ViewCalonSiswa::route('/{record}'),
            'edit' => Pages\EditCalonSiswa::route('/{record}/edit'),
        ];
    }
}
