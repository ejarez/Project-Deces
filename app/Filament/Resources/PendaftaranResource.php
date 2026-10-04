<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PendaftaranResource\Pages;
use App\Filament\Resources\PendaftaranResource\RelationManagers;
use App\Models\Jurusan;
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
    protected static ?string $navigationLabel = 'Pendaftaran Siswa Baru';
    protected static ?string $navigationGroup = 'Pendaftaran';

    public static function canCreate(): bool
    {
        return false;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Biodata Calon Siswa')
                    ->description('Data pendaftaran yang diisi calon siswa dari website')
                    ->schema([
                        Forms\Components\Grid::make(2)
                            ->schema([
                                Forms\Components\Placeholder::make('nama_siswa')
                                    ->label('Nama Lengkap')
                                    ->content(fn ($record) => $record?->calonSiswa?->nama_lengkap ?? '-'),
                                Forms\Components\Placeholder::make('jurusan_siswa')
                                    ->label('Jurusan Pilihan')
                                    ->content(fn ($record) => $record?->calonSiswa?->jurusan?->nama_jurusan ?? '-'),
                                Forms\Components\Placeholder::make('kontak_siswa')
                                    ->label('No. Telepon / WhatsApp')
                                    ->content(fn ($record) => $record?->calonSiswa?->nomor_telepon ?? '-'),
                                Forms\Components\Placeholder::make('email_siswa')
                                    ->label('Email')
                                    ->content(fn ($record) => $record?->calonSiswa?->email ?? '-'),
                                Forms\Components\Placeholder::make('alamat_siswa')
                                    ->label('Alamat Lengkap')
                                    ->content(fn ($record) => $record?->calonSiswa?->alamat ?? '-'),
                                Forms\Components\Placeholder::make('semester_pendaftaran')
                                    ->label('Semester Pendaftaran')
                                    ->content(fn ($record) => $record?->calonSiswa?->semester_pendaftaran ?? $record?->semester_target_masuk ?? '-'),
                                Forms\Components\Placeholder::make('nilai_rapor')
                                    ->label('Nilai Rapor (MTK | IPA | BHS | IPS)')
                                    ->content(fn ($record) => $record?->calonSiswa ?
                                        "Matematika: {$record->calonSiswa->measurable_nilai_matematika}  |  IPA: {$record->calonSiswa->measurable_nilai_ipa}  |  Bahasa: {$record->calonSiswa->measurable_nilai_bahasa}  |  IPS: {$record->calonSiswa->measurable_nilai_ips}"
                                        : '-'),
                                Forms\Components\Placeholder::make('berkas_pdf')
                                    ->label('Berkas Persyaratan')
                                    ->content(function ($record) {
                                        if (!$record?->calonSiswa?->berkas_pendaftaran) {
                                            return 'Tidak ada berkas yang diunggah';
                                        }
                                        $url = route('calon-siswa.berkas', $record->calonSiswa);
                                        return new \Illuminate\Support\HtmlString(
                                            "<a href='{$url}' target='_blank' style='color: #2563eb; font-weight: 600; text-decoration: underline;'>📄 Buka Berkas PDF di Tab Baru</a>"
                                        );
                                    }),
                            ]),
                    ]),

                Forms\Components\Section::make('Profil Minat, Bakat & Motivasi Belajar')
                    ->description('Isian kualitatif minat, bakat, dan rencana masa depan yang diinput oleh calon siswa')
                    ->collapsible()
                    ->schema([
                        Forms\Components\Grid::make(2)
                            ->schema([
                                Forms\Components\Placeholder::make('specific_goal')
                                    ->label('Target Karir & Cita-Cita')
                                    ->content(fn ($record) => $record?->calonSiswa?->specific_goal ?: '-'),
                                Forms\Components\Placeholder::make('relevant_alasan')
                                    ->label('Alasan Memilih Jurusan Ini')
                                    ->content(fn ($record) => $record?->calonSiswa?->relevant_alasan ?: '-'),
                                Forms\Components\Placeholder::make('achievable_kemampuan')
                                    ->label('Keterampilan / Bakat Non-Akademis')
                                    ->content(fn ($record) => $record?->calonSiswa?->achievable_kemampuan ?: '-'),
                                Forms\Components\Placeholder::make('achievable_minat')
                                    ->label('Hobi & Bidang Ketertarikan')
                                    ->content(fn ($record) => $record?->calonSiswa?->achievable_minat ?: '-'),
                                Forms\Components\Placeholder::make('timebound_rencana_studi')
                                    ->label('Rencana Studi / Karir Pasca Lulus')
                                    ->content(fn ($record) => $record?->calonSiswa?->timebound_rencana_studi ?: '-'),
                                Forms\Components\Placeholder::make('timebound_target_lulus')
                                    ->label('Perkiraan Tanggal Lulus SMP/MTs')
                                    ->content(fn ($record) => !empty($record?->calonSiswa?->timebound_target_lulus)
                                        ? \Carbon\Carbon::parse($record->calonSiswa->timebound_target_lulus)->translatedFormat('d F Y')
                                        : '-'),
                            ]),
                    ]),

                Forms\Components\Section::make('Keputusan & Evaluasi Seleksi')
                    ->description('Keputusan penerimaan dan hasil evaluasi calon siswa')
                    ->schema([
                        Forms\Components\Grid::make(2)
                            ->schema([
                                Forms\Components\Select::make('status_akhir')
                                    ->label('Status Pendaftaran')
                                    ->options([
                                        'Menunggu' => 'Menunggu',
                                        'Diproses' => 'Diproses',
                                        'Diterima' => 'Diterima',
                                        'Ditolak' => 'Ditolak',
                                    ])
                                    ->required(),
                                Forms\Components\TextInput::make('skor_kesesuaian')
                                    ->label('Skor SMART (0-100)')
                                    ->numeric()
                                    ->minValue(0)
                                    ->maxValue(100)
                                    ->helperText('Skor dihitung otomatis dari nilai rapor dan bobot kriteria jurusan'),
                                Forms\Components\Select::make('rekomendasi_jurusan_alt')
                                    ->label('Rekomendasi Jurusan Alternatif')
                                    ->options(fn () => Jurusan::pluck('nama_jurusan', 'nama_jurusan'))
                                    ->searchable()
                                    ->placeholder('Pilih jurusan cadangan jika tidak lolos'),
                                Forms\Components\DatePicker::make('tanggal_pendaftaran')
                                    ->label('Tanggal Pendaftaran')
                                    ->default(now()),
                                Forms\Components\Textarea::make('catatan_admin')
                                    ->label('Catatan Panitia / Admin')
                                    ->placeholder('Tambahkan catatan seleksi atau pertimbangan jika ada')
                                    ->rows(3)
                                    ->columnSpanFull(),
                            ]),
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
                    ->sortable()
                    ->description(fn (Pendaftaran $record): string => $record->calonSiswa?->email ?? ''),
                Tables\Columns\TextColumn::make('calonSiswa.jurusan.nama_jurusan')
                    ->label('Jurusan Pilihan')
                    ->badge()
                    ->color('info')
                    ->sortable(),
                Tables\Columns\TextColumn::make('calonSiswa.nomor_telepon')
                    ->label('No. WA')
                    ->searchable()
                    ->copyable()
                    ->copyMessage('Nomor telepon disalin'),
                Tables\Columns\TextColumn::make('skor_kesesuaian')
                    ->label('Skor SMART')
                    ->sortable()
                    ->formatStateUsing(fn ($state) => number_format((float) $state, 2))
                    ->fontFamily('mono')
                    ->weight('bold')
                    ->color(fn (mixed $state): string => match (true) {
                        (float)$state >= 80 => 'success',
                        (float)$state >= 70 => 'warning',
                        default => 'danger',
                    }),
                Tables\Columns\TextColumn::make('rekomendasi')
                    ->label('Rekomendasi SMART')
                    ->state(function (Pendaftaran $record): string {
                        $service = new \App\Services\SmartEvaluationService();
                        return $service->getRecommendationStatus((float) ($record->skor_kesesuaian ?? 0.0));
                    })
                    ->badge()
                    ->color(fn (string $state): string => match (true) {
                        str_contains($state, 'Sangat') => 'success',
                        str_contains($state, 'Layak') => 'warning',
                        default => 'danger',
                    }),
                Tables\Columns\TextColumn::make('status_kuota')
                    ->label('Batas Kuota')
                    ->state(function (Pendaftaran $record): string {
                        $jurusan = $record->calonSiswa?->jurusan;
                        if (!$jurusan || empty($jurusan->kuota_maksimal)) return '-';

                        $rank = Pendaftaran::join('calon_siswas', 'pendaftarans.calon_siswa_id', '=', 'calon_siswas.id')
                            ->where('calon_siswas.jurusan_id', $jurusan->id)
                            ->where('pendaftarans.skor_kesesuaian', '>', $record->skor_kesesuaian)
                            ->count() + 1;

                        if ($rank <= $jurusan->kuota_maksimal) {
                            return "Lolos Kuota (#{$rank}/{$jurusan->kuota_maksimal})";
                        }
                        return "Di Luar Kuota (Cadangan)";
                    })
                    ->badge()
                    ->color(fn (string $state): string => match (true) {
                        str_contains($state, 'Lolos') => 'success',
                        str_contains($state, 'Luar') => 'warning',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('rekomendasi_jurusan_alt')
                    ->label('Saran Alternatif')
                    ->placeholder('-')
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('calonSiswa.berkas_pendaftaran')
                    ->label('Berkas Persyaratan')
                    ->formatStateUsing(fn ($state) => $state ? 'Lihat PDF' : 'Belum Ada')
                    ->url(fn (Pendaftaran $record): ?string => $record->calonSiswa?->berkas_pendaftaran ? route('calon-siswa.berkas', $record->calonSiswa) : null)
                    ->openUrlInNewTab()
                    ->badge()
                    ->color(fn ($state) => $state ? 'success' : 'gray'),
                Tables\Columns\TextColumn::make('status_akhir')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Menunggu' => 'gray',
                        'Diproses' => 'warning',
                        'Diterima' => 'success',
                        'Ditolak' => 'danger',
                    }),
                Tables\Columns\TextColumn::make('tanggal_pendaftaran')
                    ->label('Tanggal Daftar')
                    ->date('d M Y')
                    ->sortable(),
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
                    Tables\Actions\Action::make('lihat_berkas')
                        ->label('Lihat Berkas PDF')
                        ->icon('heroicon-o-document-text')
                        ->color('success')
                        ->url(fn (Pendaftaran $record): ?string => $record->calonSiswa?->berkas_pendaftaran ? route('calon-siswa.berkas', $record->calonSiswa) : null)
                        ->openUrlInNewTab()
                        ->visible(fn (Pendaftaran $record): bool => !empty($record->calonSiswa?->berkas_pendaftaran)),
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
            'view' => Pages\ViewPendaftaran::route('/{record}'),
            'edit' => Pages\EditPendaftaran::route('/{record}/edit'),
        ];
    }
}
