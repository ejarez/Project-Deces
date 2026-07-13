<?php

namespace App\Http\Controllers;

use App\Models\CalonSiswa;
use App\Models\Jurusan;
use App\Models\Pendaftaran;
use App\Services\SmartEvaluationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PendaftaranController extends Controller
{
    protected $smartService;

    public function __construct(SmartEvaluationService $smartService)
    {
        $this->smartService = $smartService;
    }

    /**
     * Menyajikan landing page dengan list jurusan dinamis.
     */
    public function index()
    {
        return Inertia::render('welcome', [
            'jurusans' => Jurusan::all(),
            'flash' => [
                'success_data' => session('success_data'),
                'error' => session('error'),
            ]
        ]);
    }

    /**
     * Memproses pendaftaran siswa baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'alamat' => 'required|string',
            'email' => 'required|email|unique:calon_siswas,email',
            'nomor_telepon' => 'required|string|max:20',
            'jurusan_id' => 'required|exists:jurusans,id',
            'berkas_pendaftaran' => 'nullable|file|mimes:pdf|max:2048',
            
            // SMART fields - Measurable (Nilai)
            'measurable_nilai_matematika' => 'required|numeric|min:0|max:100',
            'measurable_nilai_bahasa' => 'required|numeric|min:0|max:100',
            'measurable_nilai_ipa' => 'required|numeric|min:0|max:100',
            'measurable_nilai_ips' => 'required|numeric|min:0|max:100',

            // SMART fields - Lainnya
            'specific_goal' => 'nullable|string',
            'achievable_kemampuan' => 'nullable|string',
            'achievable_minat' => 'nullable|string',
            'relevant_alasan' => 'nullable|string',
            'timebound_rencana_studi' => 'nullable|string',
            'timebound_target_lulus' => 'nullable|date',
            'semester_pendaftaran' => 'required|string',
            'sumber_informasi' => 'required|string',
        ]);

        try {
            // Upload berkas jika ada
            $filePath = null;
            if ($request->hasFile('berkas_pendaftaran')) {
                $filePath = $request->file('berkas_pendaftaran')->store('berkas-pendaftaran', 'public');
            }

            // Simpan data calon siswa (ini otomatis memicu event booted/saved dan kalkulasi SMART di model)
            $calonSiswa = new CalonSiswa();
            $calonSiswa->fill(array_merge($validated, [
                'berkas_pendaftaran' => $filePath,
                'status_pendaftaran' => 'Menunggu'
            ]));
            $calonSiswa->save();

            // Ambil pendaftaran terkait untuk membaca skor SMART
            $pendaftaran = Pendaftaran::where('calon_siswa_id', $calonSiswa->id)->first();
            $score = $pendaftaran ? $pendaftaran->skor_kesesuaian : 0;
            
            $statusRekomendasi = $this->smartService->getRecommendationStatus($score);
            $jurusanName = $calonSiswa->jurusan ? $calonSiswa->jurusan->nama_jurusan : '-';

            // Flash data sukses ke session
            $successData = [
                'nama' => $calonSiswa->nama_lengkap,
                'email' => $calonSiswa->email,
                'jurusan' => $jurusanName,
                'skor_smart' => $score,
                'status_rekomendasi' => $statusRekomendasi,
                'semester' => $calonSiswa->semester_pendaftaran,
            ];

            return redirect()->back()->with('success_data', $successData);

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan saat memproses pendaftaran: ' . $e->getMessage());
        }
    }
}
