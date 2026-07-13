import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Award, GraduationCap, FileText, Settings, BookOpen } from "lucide-react";

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

interface PendaftaranFormProps {
    jurusans: JurusanData[];
}

export function PendaftaranForm({ jurusans = [] }: PendaftaranFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_lengkap: "",
        alamat: "",
        email: "",
        nomor_telepon: "",
        jurusan_id: "",
        berkas_pendaftaran: null as File | null,
        sumber_informasi: "",
        
        // SMART Measurable fields (Nilai Pelajaran)
        measurable_nilai_matematika: "",
        measurable_nilai_bahasa: "",
        measurable_nilai_ipa: "",
        measurable_nilai_ips: "",

        // SMART Goals fields
        specific_goal: "",
        achievable_kemampuan: "",
        achievable_minat: "",
        relevant_alasan: "",
        timebound_rencana_studi: "",
        timebound_target_lulus: "",
        semester_pendaftaran: "Ganjil 2024/2025",
    });

    useEffect(() => {
        const handleSelectJurusan = (e: Event) => {
            const customEvent = e as CustomEvent;
            if (customEvent.detail && customEvent.detail.jurusanId) {
                setData("jurusan_id", String(customEvent.detail.jurusanId));
            }
        };

        window.addEventListener("select-jurusan", handleSelectJurusan);
        return () => window.removeEventListener("select-jurusan", handleSelectJurusan);
    }, [setData]);


    const selectedJurusan = jurusans.find(j => j.id === Number(data.jurusan_id));

    const calculateLiveSMART = () => {
        if (!selectedJurusan) return null;

        const rawMat = data.measurable_nilai_matematika === "" ? 0 : Number(data.measurable_nilai_matematika);
        const rawIpa = data.measurable_nilai_ipa === "" ? 0 : Number(data.measurable_nilai_ipa);
        const rawBahasa = data.measurable_nilai_bahasa === "" ? 0 : Number(data.measurable_nilai_bahasa);
        const rawIps = data.measurable_nilai_ips === "" ? 0 : Number(data.measurable_nilai_ips);

        const wMat = selectedJurusan.bobot_matematika;
        const wIpa = selectedJurusan.bobot_ipa;
        const wBahasa = selectedJurusan.bobot_bahasa;
        const wIps = selectedJurusan.bobot_ips;

        const sumWeights = wMat + wIpa + wBahasa + wIps;
        if (sumWeights === 0) return null;

        const normMat = wMat / sumWeights;
        const normIpa = wIpa / sumWeights;
        const normBahasa = wBahasa / sumWeights;
        const normIps = wIps / sumWeights;

        // Utilitas KKM = 50
        const uMat = Math.max(0, (rawMat - 50) * 2);
        const uIpa = Math.max(0, (rawIpa - 50) * 2);
        const uBahasa = Math.max(0, (rawBahasa - 50) * 2);
        const uIps = Math.max(0, (rawIps - 50) * 2);

        const total = (normMat * uMat) + (normIpa * uIpa) + (normBahasa * uBahasa) + (normIps * uIps);
        
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
            total: Math.round(total * 100) / 100,
            status,
            badgeColor
        };
    };

    const liveSMART = calculateLiveSMART();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/daftar", {
            preserveScroll: true,
            onError: (errors) => {
                setTimeout(() => {
                    const firstErrorKey = Object.keys(errors)[0];
                    if (firstErrorKey) {
                        const errorElement = document.getElementById(firstErrorKey);
                        if (errorElement) {
                            errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
                            errorElement.focus();
                        }
                    }
                }, 100);
            },
            onSuccess: () => {
                reset(
                    "nama_lengkap", "alamat", "email", "nomor_telepon", "jurusan_id", "berkas_pendaftaran",
                    "measurable_nilai_matematika", "measurable_nilai_bahasa", "measurable_nilai_ipa", "measurable_nilai_ips",
                    "specific_goal", "achievable_kemampuan", "achievable_minat", "relevant_alasan",
                    "timebound_rencana_studi", "timebound_target_lulus", "sumber_informasi"
                );
            }
        });
    };

    return (
        <section id="pendaftaran" className="py-20 bg-gradient-to-b from-[#1E293B] to-[#334155]">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                        Formulir Pendaftaran Siswa Baru
                    </h2>
                    <p className="mx-auto max-w-[750px] text-slate-300 md:text-lg">
                        Daftarkan diri Anda secara online. Data nilai akademis Anda akan langsung dihitung kelayakannya terhadap jurusan pilihan menggunakan metode matematis SMART.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Panduan SMART */}
                    <Card className="shadow-xl bg-slate-900/50 backdrop-blur-sm border-slate-800 text-white">
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2 text-amber-400">
                                <Award className="w-6 h-6" />
                                Bagaimana SMART Mengevaluasi Pendaftaran Anda?
                            </CardTitle>
                            <CardDescription className="text-slate-300">
                                Sistem kami menilai kelayakan calon siswa berdasarkan 4 kriteria nilai akademis utama. Setiap kriteria memiliki bobot kepentingan yang berbeda pada setiap jurusan:
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                            <div className="p-3 bg-slate-950/40 rounded-lg border border-slate-800/60">
                                <span className="text-slate-400 text-xs block mb-0.5 font-semibold">C1: MATEMATIKA</span>
                                <p className="text-xs text-slate-300">Menilai kemampuan logika, analisis numerik, dan penalaran sistematis.</p>
                            </div>
                            <div className="p-3 bg-slate-950/40 rounded-lg border border-slate-800/60">
                                <span className="text-slate-400 text-xs block mb-0.5 font-semibold">C2: IPA</span>
                                <p className="text-xs text-slate-300">Menilai kecakapan pemahaman konsep sains dan eksperimen praktis.</p>
                            </div>
                            <div className="p-3 bg-slate-950/40 rounded-lg border border-slate-800/60">
                                <span className="text-slate-400 text-xs block mb-0.5 font-semibold">C3: BAHASA</span>
                                <p className="text-xs text-slate-300">Menilai kompetensi komunikasi verbal, pemahaman bacaan, dan ekspresi ide.</p>
                            </div>
                            <div className="p-3 bg-slate-950/40 rounded-lg border border-slate-800/60">
                                <span className="text-slate-400 text-xs block mb-0.5 font-semibold">C4: IPS</span>
                                <p className="text-xs text-slate-300">Menilai wawasan sosial, kolaborasi, dan interaksi kemasyarakatan.</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Formulir Pendaftaran */}
                    <Card className="shadow-xl bg-slate-900/60 backdrop-blur-sm border-slate-800 text-white overflow-hidden">
                        <CardHeader className="border-b border-slate-800 pb-5">
                            <CardTitle className="text-2xl font-bold">Lengkapi Data Pendaftaran</CardTitle>
                            <CardDescription className="text-slate-400">
                                Isi data pribadi, nilai rapor terakhir, serta tujuan belajar Anda di SMK.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                
                                {/* 1. Data Diri */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60">
                                        <GraduationCap className="w-5 h-5 text-blue-400" />
                                        <h3 className="text-lg font-semibold text-blue-400">1. Data Pribadi</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="nama_lengkap" className="text-slate-300">Nama Lengkap</Label>
                                            <Input 
                                                id="nama_lengkap" 
                                                placeholder="Masukkan nama lengkap" 
                                                value={data.nama_lengkap}
                                                onChange={e => setData("nama_lengkap", e.target.value)}
                                                className="border-slate-800 bg-slate-950 text-white focus:border-blue-500" 
                                            />
                                            {errors.nama_lengkap && <p className="text-xs text-rose-400">{errors.nama_lengkap}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-slate-300">Alamat Email</Label>
                                            <Input 
                                                id="email" 
                                                type="email"
                                                placeholder="contoh@email.com" 
                                                value={data.email}
                                                onChange={e => setData("email", e.target.value)}
                                                className="border-slate-800 bg-slate-950 text-white focus:border-blue-500" 
                                            />
                                            {errors.email && <p className="text-xs text-rose-400">{errors.email}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="nomor_telepon" className="text-slate-300">Nomor HP / WhatsApp</Label>
                                            <Input 
                                                id="nomor_telepon" 
                                                placeholder="0812xxxxxxxx" 
                                                value={data.nomor_telepon}
                                                onChange={e => setData("nomor_telepon", e.target.value)}
                                                className="border-slate-800 bg-slate-950 text-white focus:border-blue-500" 
                                            />
                                            {errors.nomor_telepon && <p className="text-xs text-rose-400">{errors.nomor_telepon}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="semester_pendaftaran" className="text-slate-300">Tahun Ajaran / Semester</Label>
                                            <Select 
                                                value={data.semester_pendaftaran}
                                                onValueChange={val => setData("semester_pendaftaran", val)}
                                            >
                                                <SelectTrigger className="border-slate-800 bg-slate-950 text-white" id="semester_pendaftaran">
                                                    <SelectValue placeholder="Pilih Semester" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                                    <SelectItem value="Ganjil 2024/2025">Ganjil 2024/2025</SelectItem>
                                                    <SelectItem value="Genap 2024/2025">Genap 2024/2025</SelectItem>
                                                    <SelectItem value="Ganjil 2025/2026">Ganjil 2025/2026</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.semester_pendaftaran && <p className="text-xs text-rose-400">{errors.semester_pendaftaran}</p>}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="alamat" className="text-slate-300">Alamat Lengkap Rumah</Label>
                                        <Textarea 
                                            id="alamat" 
                                            placeholder="Masukkan alamat lengkap RT/RW, Kelurahan, Kecamatan, Kota" 
                                            value={data.alamat}
                                            onChange={e => setData("alamat", e.target.value)}
                                            className="border-slate-800 bg-slate-950 text-white focus:border-blue-500 min-h-[80px]" 
                                        />
                                        {errors.alamat && <p className="text-xs text-rose-400">{errors.alamat}</p>}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="sumber_informasi" className="text-slate-300">Sumber Informasi</Label>
                                            <Select 
                                                value={data.sumber_informasi}
                                                onValueChange={val => setData("sumber_informasi", val)}
                                            >
                                                <SelectTrigger className="border-slate-800 bg-slate-950 text-white" id="sumber_informasi">
                                                    <SelectValue placeholder="Pilih Sumber" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                                    <SelectItem value="Website">Website Sekolah</SelectItem>
                                                    <SelectItem value="Media Sosial">Media Sosial (Instagram/FB/TikTok)</SelectItem>
                                                    <SelectItem value="Teman/Keluarga">Rekomendasi Teman/Alumni</SelectItem>
                                                    <SelectItem value="Brosur">Brosur / Pameran</SelectItem>
                                                    <SelectItem value="Lainnya">Lainnya</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {errors.sumber_informasi && <p className="text-xs text-rose-400">{errors.sumber_informasi}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="berkas_pendaftaran" className="text-slate-300">Berkas Rapor/Ijazah (PDF, Maks 2MB)</Label>
                                            <Input 
                                                id="berkas_pendaftaran" 
                                                type="file"
                                                accept=".pdf"
                                                onChange={e => setData("berkas_pendaftaran", e.target.files ? e.target.files[0] : null)}
                                                className="border-slate-800 bg-slate-950 text-white focus:border-blue-500 file:text-slate-200 file:bg-slate-800 file:border-none file:rounded file:px-2 file:py-1 file:cursor-pointer" 
                                            />
                                            {errors.berkas_pendaftaran && <p className="text-xs text-rose-400">{errors.berkas_pendaftaran}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Pemilihan Jurusan & Info Bobot */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60">
                                        <Settings className="w-5 h-5 text-indigo-400" />
                                        <h3 className="text-lg font-semibold text-indigo-400">2. Pilihan Jurusan & Evaluasi SMART</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="jurusan_id" className="text-slate-300">Pilih Jurusan yang Diinginkan</Label>
                                        <Select 
                                            value={data.jurusan_id}
                                            onValueChange={val => setData("jurusan_id", val)}
                                        >
                                            <SelectTrigger className="border-indigo-500/30 bg-slate-950 text-white py-6" id="jurusan_id">
                                                <SelectValue placeholder="Pilih Jurusan Utama Anda" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                                {jurusans.map(j => (
                                                    <SelectItem key={j.id} value={String(j.id)}>{j.nama_jurusan}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.jurusan_id && <p className="text-xs text-rose-400">{errors.jurusan_id}</p>}
                                    </div>

                                    {/* Informasi bobot kriteria secara real-time berdasarkan pilihan jurusan */}
                                    {selectedJurusan && (
                                        <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-500/20 text-sm space-y-2 animate-fadeIn">
                                            <p className="font-semibold text-indigo-300">
                                                Bobot Kriteria Evaluasi SMART untuk Jurusan <span className="underline text-white font-bold">{selectedJurusan.nama_jurusan}</span>:
                                            </p>
                                            <div className="grid grid-cols-4 gap-2 text-center text-xs">
                                                <div className="bg-slate-950 p-2 rounded border border-slate-850">
                                                    <span className="text-slate-400 block mb-0.5">Matematika</span>
                                                    <span className="font-bold text-blue-400 text-sm">{selectedJurusan.bobot_matematika}%</span>
                                                </div>
                                                <div className="bg-slate-950 p-2 rounded border border-slate-850">
                                                    <span className="text-slate-400 block mb-0.5">IPA</span>
                                                    <span className="font-bold text-emerald-400 text-sm">{selectedJurusan.bobot_ipa}%</span>
                                                </div>
                                                <div className="bg-slate-950 p-2 rounded border border-slate-850">
                                                    <span className="text-slate-400 block mb-0.5">Bahasa</span>
                                                    <span className="font-bold text-violet-400 text-sm">{selectedJurusan.bobot_bahasa}%</span>
                                                </div>
                                                <div className="bg-slate-950 p-2 rounded border border-slate-850">
                                                    <span className="text-slate-400 block mb-0.5">IPS</span>
                                                    <span className="font-bold text-rose-400 text-sm">{selectedJurusan.bobot_ips}%</span>
                                                </div>
                                            </div>
                                            <p className="text-[11px] text-slate-400 italic">
                                                *Nilai utilitas dihitung berdasarkan rata-rata rapor atau nilai mata pelajaran yang Anda isi di bawah.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* 3. Nilai Pelajaran */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60">
                                        <BookOpen className="w-5 h-5 text-emerald-400" />
                                        <h3 className="text-lg font-semibold text-emerald-400">3. Nilai Rapor Semester Terakhir (Skala 0-100)</h3>
                                    </div>
                                    <p className="text-xs text-slate-400 italic">
                                        Masukkan nilai mata pelajaran semester terakhir Anda untuk kalkulasi model SMART.
                                    </p>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="measurable_nilai_matematika" className="text-slate-300">Matematika</Label>
                                            <Input 
                                                id="measurable_nilai_matematika" 
                                                type="number"
                                                min="0"
                                                max="100"
                                                placeholder="Contoh: 85" 
                                                value={data.measurable_nilai_matematika}
                                                onChange={e => setData("measurable_nilai_matematika", e.target.value)}
                                                className="border-slate-800 bg-slate-950 text-white focus:border-emerald-500" 
                                            />
                                            {errors.measurable_nilai_matematika && <p className="text-xs text-rose-400">{errors.measurable_nilai_matematika}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="measurable_nilai_ipa" className="text-slate-300">IPA</Label>
                                            <Input 
                                                id="measurable_nilai_ipa" 
                                                type="number"
                                                min="0"
                                                max="100"
                                                placeholder="Contoh: 80" 
                                                value={data.measurable_nilai_ipa}
                                                onChange={e => setData("measurable_nilai_ipa", e.target.value)}
                                                className="border-slate-800 bg-slate-950 text-white focus:border-emerald-500" 
                                            />
                                            {errors.measurable_nilai_ipa && <p className="text-xs text-rose-400">{errors.measurable_nilai_ipa}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="measurable_nilai_bahasa" className="text-slate-300">Bahasa Indonesia/Inggris</Label>
                                            <Input 
                                                id="measurable_nilai_bahasa" 
                                                type="number"
                                                min="0"
                                                max="100"
                                                placeholder="Contoh: 88" 
                                                value={data.measurable_nilai_bahasa}
                                                onChange={e => setData("measurable_nilai_bahasa", e.target.value)}
                                                className="border-slate-800 bg-slate-950 text-white focus:border-emerald-500" 
                                            />
                                            {errors.measurable_nilai_bahasa && <p className="text-xs text-rose-400">{errors.measurable_nilai_bahasa}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="measurable_nilai_ips" className="text-slate-300">IPS</Label>
                                            <Input 
                                                id="measurable_nilai_ips" 
                                                type="number"
                                                min="0"
                                                max="100"
                                                placeholder="Contoh: 78" 
                                                value={data.measurable_nilai_ips}
                                                onChange={e => setData("measurable_nilai_ips", e.target.value)}
                                                className="border-slate-800 bg-slate-950 text-white focus:border-emerald-500" 
                                            />
                                            {errors.measurable_nilai_ips && <p className="text-xs text-rose-400">{errors.measurable_nilai_ips}</p>}
                                        </div>
                                    </div>

                                    {/* Live SMART Preview */}
                                    {liveSMART && (
                                        <div className="mt-5 p-4 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 animate-fadeIn">
                                            <div className="space-y-1 text-center sm:text-left">
                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estimasi Skor Kelayakan SMART Anda</h4>
                                                <p className="text-2xl font-black text-white">
                                                    {liveSMART.total} <span className="text-xs font-normal text-slate-400">/ 100</span>
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-center sm:items-end gap-1.5">
                                                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Status Kelayakan</span>
                                                <Badge className={`text-xs font-semibold px-3 py-1 border rounded-full ${liveSMART.badgeColor}`}>
                                                    {liveSMART.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* 4. Profil Minat, Bakat, & Cita-Cita (Kualitatif) */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 pb-2 border-b border-slate-800/60">
                                        <FileText className="w-5 h-5 text-amber-400" />
                                        <h3 className="text-lg font-semibold text-amber-400">4. Profil Minat, Bakat, & Cita-Cita (Kualitatif)</h3>
                                    </div>
                                    <p className="text-xs text-slate-400 italic">
                                        Isian kualitatif ini membantu sekolah memahami tujuan, motivasi belajar, dan rencana masa depan Anda (tidak mempengaruhi skor matematis SMART).
                                    </p>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="specific_goal" className="text-slate-300">Target Karir & Cita-Cita (Apa cita-cita spesifik yang ingin Anda capai setelah lulus?)</Label>
                                            <Textarea 
                                                id="specific_goal" 
                                                placeholder="Contoh: Saya ingin menjadi Software Engineer atau programmer web profesional." 
                                                value={data.specific_goal}
                                                onChange={e => setData("specific_goal", e.target.value)}
                                                className="border-slate-800 bg-slate-950 text-white focus:border-amber-500 min-h-[70px]" 
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="achievable_kemampuan" className="text-slate-300">Keterampilan / Bakat Non-Akademis</Label>
                                                <Textarea 
                                                    id="achievable_kemampuan" 
                                                    placeholder="Contoh: Logika matematika kuat, senang menggambar, atau aktif berorganisasi." 
                                                    value={data.achievable_kemampuan}
                                                    onChange={e => setData("achievable_kemampuan", e.target.value)}
                                                    className="border-slate-800 bg-slate-950 text-white focus:border-amber-500 min-h-[70px]" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="achievable_minat" className="text-slate-300">Hobi & Bidang Ketertarikan</Label>
                                                <Textarea 
                                                    id="achievable_minat" 
                                                    placeholder="Contoh: Otak-atik software komputer, mendesain logo, atau merakit robotik dasar." 
                                                    value={data.achievable_minat}
                                                    onChange={e => setData("achievable_minat", e.target.value)}
                                                    className="border-slate-800 bg-slate-950 text-white focus:border-amber-500 min-h-[70px]" 
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="relevant_alasan" className="text-slate-300">Alasan Memilih Jurusan Ini (Mengapa menurut Anda jurusan ini penting bagi masa depan Anda?)</Label>
                                            <Textarea 
                                                id="relevant_alasan" 
                                                placeholder="Jelaskan alasan kecocokan Anda secara pribadi dan motivasi masuk jurusan ini." 
                                                value={data.relevant_alasan}
                                                onChange={e => setData("relevant_alasan", e.target.value)}
                                                className="border-slate-800 bg-slate-950 text-white focus:border-amber-500 min-h-[70px]" 
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="timebound_rencana_studi" className="text-slate-300">Rencana Studi atau Karir Setelah Lulus</Label>
                                                <Textarea 
                                                    id="timebound_rencana_studi" 
                                                    placeholder="Contoh: Setelah lulus ingin langsung bekerja di Software House atau lanjut kuliah S1 Informatika." 
                                                    value={data.timebound_rencana_studi}
                                                    onChange={e => setData("timebound_rencana_studi", e.target.value)}
                                                    className="border-slate-800 bg-slate-950 text-white focus:border-amber-500 min-h-[70px]" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="timebound_target_lulus" className="text-slate-300">Perkiraan Tanggal Lulus SMP / MTs</Label>
                                                <Input 
                                                    id="timebound_target_lulus" 
                                                    type="date"
                                                    value={data.timebound_target_lulus}
                                                    onChange={e => setData("timebound_target_lulus", e.target.value)}
                                                    className="border-slate-800 bg-slate-950 text-white focus:border-amber-500 py-5" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg font-bold rounded-xl shadow-lg hover:shadow-indigo-500/20 cursor-pointer"
                                    >
                                        {processing ? "Memproses & Menghitung SMART Score..." : "Kirim Formulir Pendaftaran"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
