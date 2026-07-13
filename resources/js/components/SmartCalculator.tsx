import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calculator, HelpCircle, ArrowRight, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

interface JurusanData {
    id: number;
    nama_jurusan: string;
    deskripsi: string;
    total_siswa: number;
    rating_rekomendasi: number;
    target_siswa_semester: number;
    tingkat_kelulusan: number;
    prospek_karir: string;
    durasi_program: number;
    persyaratan_masuk: string;
    tingkat_kesulitan: number;
    kuota_maksimal: number;
    bobot_matematika: number;
    bobot_ipa: number;
    bobot_bahasa: number;
    bobot_ips: number;
}

interface SmartCalculatorProps {
    jurusans: JurusanData[];
}

export function SmartCalculator({ jurusans = [] }: SmartCalculatorProps) {
    const [selectedId, setSelectedId] = useState<string>("");
    const [grades, setGrades] = useState<{
        matematika: number | "";
        ipa: number | "";
        bahasa: number | "";
        ips: number | "";
    }>({
        matematika: 80,
        ipa: 80,
        bahasa: 80,
        ips: 80
    });

    // Pilih jurusan pertama secara default jika jurusans dimuat
    useEffect(() => {
        if (jurusans.length > 0 && !selectedId) {
            setSelectedId(String(jurusans[0].id));
        }
    }, [jurusans]);

    const selectedJurusan = jurusans.find(j => j.id === Number(selectedId));

    // Perhitungan SMART secara matematis
    const calculateSMART = () => {
        if (!selectedJurusan) return {
            normalized: { mat: 0, ipa: 0, bahasa: 0, ips: 0 },
            utilities: { mat: 0, ipa: 0, bahasa: 0, ips: 0 },
            subtotals: { mat: 0, ipa: 0, bahasa: 0, ips: 0 },
            total: 0,
            status: "Belum Memilih Jurusan"
        };

        const wMat = selectedJurusan.bobot_matematika;
        const wIpa = selectedJurusan.bobot_ipa;
        const wBahasa = selectedJurusan.bobot_bahasa;
        const wIps = selectedJurusan.bobot_ips;

        const sumWeights = wMat + wIpa + wBahasa + wIps;
        
        // 1. Normalisasi Bobot (w_i)
        const normMat = sumWeights > 0 ? wMat / sumWeights : 0.25;
        const normIpa = sumWeights > 0 ? wIpa / sumWeights : 0.25;
        const normBahasa = sumWeights > 0 ? wBahasa / sumWeights : 0.25;
        const normIps = sumWeights > 0 ? wIps / sumWeights : 0.25;

        // 2. Nilai Utilitas (U_i) -> Skala 0-100, KKM = 50, Maksimal = 100
        // U_i = ((nilai - C_min) / (C_max - C_min)) * 100
        // U_i = ((nilai - 50) / 50) * 100 = (nilai - 50) * 2
        const rawMat = grades.matematika === "" ? 0 : grades.matematika;
        const rawIpa = grades.ipa === "" ? 0 : grades.ipa;
        const rawBahasa = grades.bahasa === "" ? 0 : grades.bahasa;
        const rawIps = grades.ips === "" ? 0 : grades.ips;

        const uMat = Math.max(0, (rawMat - 50) * 2);
        const uIpa = Math.max(0, (rawIpa - 50) * 2);
        const uBahasa = Math.max(0, (rawBahasa - 50) * 2);
        const uIps = Math.max(0, (rawIps - 50) * 2);

        // 3. Hasil evaluasi per kriteria (w_i * U_i)
        const subMat = normMat * uMat;
        const subIpa = normIpa * uIpa;
        const subBahasa = normBahasa * uBahasa;
        const subIps = normIps * uIps;

        // 4. Skor Akhir (V)
        const total = subMat + subIpa + subBahasa + subIps;

        // 5. Tentukan Status Kelayakan
        let status = "Kurang Layak (Cadangan)";
        let badgeColor = "bg-rose-500/20 text-rose-400 border-rose-500/30";
        if (total >= 80) {
            status = "Sangat Layak (Diterima)";
            badgeColor = "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
        } else if (total >= 60) {
            status = "Layak (Dipertimbangkan)";
            badgeColor = "bg-amber-500/20 text-yellow-400 border-yellow-500/30";
        }

        return {
            normalized: { mat: normMat, ipa: normIpa, bahasa: normBahasa, ips: normIps },
            utilities: { mat: uMat, ipa: uIpa, bahasa: uBahasa, ips: uIps },
            subtotals: { mat: subMat, ipa: subIpa, bahasa: subBahasa, ips: subIps },
            total: Math.round(total * 100) / 100,
            status,
            badgeColor
        };
    };

    const result = calculateSMART();

    const handleGradeChange = (subject: keyof typeof grades, value: string) => {
        if (value === "") {
            setGrades(prev => ({
                ...prev,
                [subject]: ""
            }));
            return;
        }
        let num = parseInt(value);
        if (isNaN(num)) return;
        if (num < 0) num = 0;
        if (num > 100) num = 100;
        setGrades(prev => ({
            ...prev,
            [subject]: num
        }));
    };

    return (
        <section id="smart-simulasi" className="py-20 bg-gradient-to-b from-[#1E293B] to-[#0F172A] text-white">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="bg-blue-500/10 text-blue-400 p-3 rounded-full">
                        <Calculator className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Simulasi SPK SMART
                    </h2>
                    <p className="mx-auto max-w-[700px] text-slate-400 md:text-lg">
                        Gunakan simulator ini untuk melihat bagaimana rumus keputusan **SMART** merangking kelayakan pendaftaran Anda secara transparan dan instan.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Panel Kiri: Input Nilai & Pilihan Jurusan */}
                    <div className="lg:col-span-5 space-y-6">
                        <Card className="bg-slate-900/60 border-slate-800 text-white shadow-xl backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold flex items-center gap-2">
                                    <span>⚙️</span> Atur Parameter Simulasi
                                </CardTitle>
                                <CardDescription className="text-slate-400">
                                    Pilih jurusan target dan masukkan nilai estimasi Anda.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Pilih Jurusan Uji Coba</Label>
                                    <Select value={selectedId} onValueChange={setSelectedId}>
                                        <SelectTrigger className="border-slate-800 bg-slate-950 text-white py-5">
                                            <SelectValue placeholder="Pilih Jurusan" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                            {jurusans.map(j => (
                                                <SelectItem key={j.id} value={String(j.id)}>{j.nama_jurusan}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-4 pt-2">
                                    <Label className="text-slate-300 font-semibold block border-b border-slate-800 pb-2">Estimasi Nilai Rapor (0-100)</Label>
                                    
                                    <div className="space-y-4">
                                        {/* Matematika */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <Label htmlFor="sim-mat" className="text-xs font-semibold text-blue-400">📐 Matematika</Label>
                                                <span className="text-xs font-bold text-blue-400">{grades.matematika === "" ? 0 : grades.matematika}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <input 
                                                    type="range" 
                                                    min="0" 
                                                    max="100" 
                                                    value={grades.matematika === "" ? 0 : grades.matematika} 
                                                    onChange={e => handleGradeChange("matematika", e.target.value)}
                                                    className="flex-1 h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                                />
                                                <Input
                                                    id="sim-mat"
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={grades.matematika}
                                                    onChange={e => handleGradeChange("matematika", e.target.value)}
                                                    className="border-slate-800 bg-slate-950 text-white w-20 text-center"
                                                />
                                            </div>
                                        </div>

                                        {/* IPA */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <Label htmlFor="sim-ipa" className="text-xs font-semibold text-emerald-400">🔬 IPA</Label>
                                                <span className="text-xs font-bold text-emerald-400">{grades.ipa === "" ? 0 : grades.ipa}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <input 
                                                    type="range" 
                                                    min="0" 
                                                    max="100" 
                                                    value={grades.ipa === "" ? 0 : grades.ipa} 
                                                    onChange={e => handleGradeChange("ipa", e.target.value)}
                                                    className="flex-1 h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                                />
                                                <Input
                                                    id="sim-ipa"
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={grades.ipa}
                                                    onChange={e => handleGradeChange("ipa", e.target.value)}
                                                    className="border-slate-800 bg-slate-950 text-white w-20 text-center"
                                                />
                                            </div>
                                        </div>

                                        {/* Bahasa */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <Label htmlFor="sim-bahasa" className="text-xs font-semibold text-violet-400">💬 Bahasa</Label>
                                                <span className="text-xs font-bold text-violet-400">{grades.bahasa === "" ? 0 : grades.bahasa}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <input 
                                                    type="range" 
                                                    min="0" 
                                                    max="100" 
                                                    value={grades.bahasa === "" ? 0 : grades.bahasa} 
                                                    onChange={e => handleGradeChange("bahasa", e.target.value)}
                                                    className="flex-1 h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-violet-500"
                                                />
                                                <Input
                                                    id="sim-bahasa"
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={grades.bahasa}
                                                    onChange={e => handleGradeChange("bahasa", e.target.value)}
                                                    className="border-slate-800 bg-slate-950 text-white w-20 text-center"
                                                />
                                            </div>
                                        </div>

                                        {/* IPS */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <Label htmlFor="sim-ips" className="text-xs font-semibold text-rose-400">🌍 IPS</Label>
                                                <span className="text-xs font-bold text-rose-400">{grades.ips === "" ? 0 : grades.ips}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <input 
                                                    type="range" 
                                                    min="0" 
                                                    max="100" 
                                                    value={grades.ips === "" ? 0 : grades.ips} 
                                                    onChange={e => handleGradeChange("ips", e.target.value)}
                                                    className="flex-1 h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-rose-500"
                                                />
                                                <Input
                                                    id="sim-ips"
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={grades.ips}
                                                    onChange={e => handleGradeChange("ips", e.target.value)}
                                                    className="border-slate-800 bg-slate-950 text-white w-20 text-center"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Panel Kanan: Tabel Penghitungan Matematika SMART Langkah demi Langkah */}
                    <div className="lg:col-span-7 space-y-6">
                        <Card className="bg-slate-900/60 border-slate-800 text-white shadow-xl backdrop-blur-sm overflow-hidden">
                            <CardHeader className="bg-slate-900/80 border-b border-slate-800/80 pb-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                                            <span>📊</span> Simulasi Penilaian Jurusan
                                        </CardTitle>
                                        <CardDescription className="text-slate-400">
                                            Penjelasan kecocokan nilai rapor Anda dengan jurusan {selectedJurusan?.nama_jurusan}.
                                        </CardDescription>
                                    </div>
                                    {selectedJurusan && (
                                        <div className="text-right">
                                            <span className="text-xs text-slate-500 block">Skor Kelayakan</span>
                                            <span className="text-2xl font-black text-blue-400">{result.total} <span className="text-xs text-slate-400">/100</span></span>
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                
                                {/* Tabel SMART */}
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left text-slate-300">
                                        <thead className="text-xs text-slate-400 bg-slate-950/60 border-b border-slate-850 uppercase tracking-wider">
                                            <tr>
                                                <th scope="col" className="px-5 py-3.5">Mata Pelajaran</th>
                                                <th scope="col" className="px-3 py-3.5 text-center">Bobot Jurusan</th>
                                                <th scope="col" className="px-3 py-3.5 text-center">Porsi Nilai Bobot</th>
                                                <th scope="col" className="px-3 py-3.5 text-center">Nilai Rapor Anda</th>
                                                <th scope="col" className="px-3 py-3.5 text-center">Nilai Setelah KKM</th>
                                                <th scope="col" className="px-5 py-3.5 text-right">Poin Kelayakan</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-850">
                                            <tr>
                                                <td className="px-5 py-3 font-semibold text-white">Matematika</td>
                                                <td className="px-3 py-3 text-center font-mono">{selectedJurusan?.bobot_matematika || 0}%</td>
                                                <td className="px-3 py-3 text-center font-mono text-blue-400">{result.normalized.mat.toFixed(2)}</td>
                                                <td className="px-3 py-3 text-center font-mono">{grades.matematika === "" ? 0 : grades.matematika}</td>
                                                <td className="px-3 py-3 text-center font-mono text-blue-300 font-bold">{result.utilities.mat}</td>
                                                <td className="px-5 py-3 text-right font-mono font-bold text-white">{result.subtotals.mat.toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td className="px-5 py-3 font-semibold text-white">IPA</td>
                                                <td className="px-3 py-3 text-center font-mono">{selectedJurusan?.bobot_ipa || 0}%</td>
                                                <td className="px-3 py-3 text-center font-mono text-emerald-400">{result.normalized.ipa.toFixed(2)}</td>
                                                <td className="px-3 py-3 text-center font-mono">{grades.ipa === "" ? 0 : grades.ipa}</td>
                                                <td className="px-3 py-3 text-center font-mono text-emerald-300 font-bold">{result.utilities.ipa}</td>
                                                <td className="px-5 py-3 text-right font-mono font-bold text-white">{result.subtotals.ipa.toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td className="px-5 py-3 font-semibold text-white">Bahasa Indonesia/Inggris</td>
                                                <td className="px-3 py-3 text-center font-mono">{selectedJurusan?.bobot_bahasa || 0}%</td>
                                                <td className="px-3 py-3 text-center font-mono text-violet-400">{result.normalized.bahasa.toFixed(2)}</td>
                                                <td className="px-3 py-3 text-center font-mono">{grades.bahasa === "" ? 0 : grades.bahasa}</td>
                                                <td className="px-3 py-3 text-center font-mono text-violet-300 font-bold">{result.utilities.bahasa}</td>
                                                <td className="px-5 py-3 text-right font-mono font-bold text-white">{result.subtotals.bahasa.toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td className="px-5 py-3 font-semibold text-white">IPS</td>
                                                <td className="px-3 py-3 text-center font-mono">{selectedJurusan?.bobot_ips || 0}%</td>
                                                <td className="px-3 py-3 text-center font-mono text-rose-400">{result.normalized.ips.toFixed(2)}</td>
                                                <td className="px-3 py-3 text-center font-mono">{grades.ips === "" ? 0 : grades.ips}</td>
                                                <td className="px-3 py-3 text-center font-mono text-rose-300 font-bold">{result.utilities.ips}</td>
                                                <td className="px-5 py-3 text-right font-mono font-bold text-white">{result.subtotals.ips.toFixed(2)}</td>
                                            </tr>
                                            <tr className="bg-slate-950/40 font-bold text-white border-t-2 border-slate-800">
                                                <td className="px-5 py-4">Total Hasil Kecocokan</td>
                                                <td className="px-3 py-4 text-center font-mono">100%</td>
                                                <td className="px-3 py-4 text-center font-mono text-slate-400">1.00</td>
                                                <td className="px-3 py-4 text-center">-</td>
                                                <td className="px-3 py-4 text-center font-mono">-</td>
                                                <td className="px-5 py-4 text-right font-mono text-blue-400 text-base">{result.total.toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Penjelasan Keputusan SMART */}
                                <div className="p-5 bg-slate-950/20 border-t border-slate-850 space-y-4">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <HelpCircle className="w-5 h-5 text-slate-400 shrink-0" />
                                            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Status Kelayakan Anda</span>
                                        </div>
                                        <Badge className={`font-semibold text-xs py-1 px-3 border rounded-full ${result.badgeColor}`}>
                                            {result.status}
                                        </Badge>
                                    </div>

                                    {/* Alert Box Penjelasan */}
                                    <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-350 leading-relaxed space-y-3">
                                        <p className="font-bold text-slate-200 text-sm">Bagaimana Skor Kelayakan Anda Dihitung?</p>
                                        <div className="space-y-3 text-slate-300">
                                            <div className="flex gap-2.5">
                                                <span className="bg-blue-500/20 text-blue-400 w-5 h-5 rounded-full flex items-center justify-center font-bold shrink-0">1</span>
                                                <p>
                                                    <strong>Menyesuaikan Nilai Rapor dengan Batas KKM (Batas Lulus Minimal = 50):</strong><br/>
                                                    Nilai rapor Anda disesuaikan dengan rumus: <code>(Nilai Rapor - 50) × 2</code>. Nilai penyesuaian berkisar 0 sampai 100.
                                                    <span className="text-blue-300 block mt-1 font-semibold">
                                                        Hasil penyesuaian Anda: Matematika ({result.utilities.mat}), IPA ({result.utilities.ipa}), Bahasa ({result.utilities.bahasa}), IPS ({result.utilities.ips}).
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="flex gap-2.5 border-t border-slate-900 pt-3">
                                                <span className="bg-blue-500/20 text-blue-400 w-5 h-5 rounded-full flex items-center justify-center font-bold shrink-0">2</span>
                                                <p>
                                                    <strong>Mengalikan dengan tingkat pentingnya pelajaran (bobot) jurusan:</strong><br/>
                                                    Porsi bobot dikalikan dengan nilai penyesuaian Anda, lalu semuanya dijumlahkan untuk mendapatkan Skor Akhir Kelayakan.
                                                    <span className="text-amber-400 block mt-1 font-semibold font-mono text-[11px] overflow-x-auto">
                                                        Rumus: ({result.normalized.mat.toFixed(2)} × {result.utilities.mat}) + ({result.normalized.ipa.toFixed(2)} × {result.utilities.ipa}) + ({result.normalized.bahasa.toFixed(2)} × {result.utilities.bahasa}) + ({result.normalized.ips.toFixed(2)} × {result.utilities.ips}) = <span className="text-sm text-amber-300 font-extrabold font-sans">{result.total.toFixed(2)}</span>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-slate-450 font-medium">
                                            {result.total >= 80 
                                                ? "Selamat! Nilai rapor Anda sangat sesuai dengan kriteria yang diutamakan oleh jurusan ini. Peluang lolos pendaftaran Anda sangat besar."
                                                : result.total >= 60
                                                    ? "Nilai rapor Anda mencukupi tingkat kecocokan minimal jurusan. Status pendaftaran Anda akan dipertimbangkan bersama dengan sisa kuota yang tersedia."
                                                    : "Skor kesesuaian nilai Anda di bawah kriteria utama jurusan ini. Anda disarankan untuk menaikkan nilai atau memilih alternatif jurusan lain yang lebih sesuai dengan kekuatan nilai Anda."
                                            }
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </section>
    );
}
