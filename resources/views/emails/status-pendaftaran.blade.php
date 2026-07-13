@component('mail::message')
# Pengumuman Hasil Seleksi Pendaftaran Siswa Baru

Halo **{{ $calonSiswa->nama_lengkap }}**,

Terima kasih telah melakukan pendaftaran siswa baru di sekolah kami. Panitia penerimaan siswa baru telah selesai mengevaluasi nilai rapor Anda menggunakan metode Sistem Pendukung Keputusan **SMART (Simple Multi-Attribute Rating Technique)**.

Berikut adalah rincian evaluasi seleksi Anda:

*   **Nama Lengkap:** {{ $calonSiswa->nama_lengkap }}
*   **Pilihan Jurusan:** {{ $calonSiswa->jurusan->nama_jurusan }}
*   **Skor Kelayakan SMART:** **{{ $pendaftaran->skor_kesesuaian }} / 100**

---

@if($pendaftaran->status_akhir === 'Diterima')
## 🎉 SELAMAT! Anda Dinyatakan DITERIMA (Lolos Seleksi)

Berdasarkan kriteria bobot nilai pelajaran dan kapasitas kuota jurusan, Anda dinilai **Sangat Layak** untuk bergabung di jurusan **{{ $calonSiswa->jurusan->nama_jurusan }}**.

### Langkah Selanjutnya:
1. Silakan lakukan proses daftar ulang ke sekolah.
2. Membawa cetak bukti pendaftaran online dan fotokopi Rapor SMP asli.
3. Batas waktu daftar ulang adalah 7 hari sejak email ini diterima.

@component('mail::button', ['url' => config('app.url') . '/login'])
Masuk ke Akun Pendaftaran
@endcomponent

@else
## 👋 Pengumuman Hasil Seleksi: Belum Lolos (Cadangan)

Mohon maaf, berdasarkan kuota penerimaan maksimal dan hasil perangkingan nilai metode SMART, saat ini skor kelayakan Anda belum mencukupi batas kelulusan utama untuk jurusan **{{ $calonSiswa->jurusan->nama_jurusan }}**.

@if($pendaftaran->rekomendasi_jurusan_alt)
**💡 Rekomendasi Jurusan Alternatif:**  
Berdasarkan profil nilai pelajaran Anda, sistem merekomendasikan Anda untuk mempertimbangkan jurusan alternatif: **{{ $pendaftaran->rekomendasi_jurusan_alt }}** yang memiliki kecocokan lebih tinggi dengan nilai Anda.
@endif

Tetap semangat dan jangan berkecil hati! Anda dapat menghubungi panitia pendaftaran di sekolah jika ingin berkonsultasi mengenai pemindahan berkas ke jurusan alternatif di atas.

@endif

Salam Hangat,<br>
**Panitia PPDB Sekolah**
@endcomponent
