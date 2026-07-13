import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { JurusanList } from "@/components/JurusanList";
import { PendaftaranForm } from "@/components/PendaftaranForm";
import { SmartCalculator } from "@/components/SmartCalculator";
import { Footer } from "@/components/Footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Award, ClipboardCheck } from "lucide-react";

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

interface SuccessData {
    nama: string;
    email: string;
    jurusan: string;
    skor_smart: number;
    status_rekomendasi: string;
    semester: string;
}

interface WelcomeProps {
    jurusans: JurusanData[];
    flash: {
        success_data: SuccessData | null;
        error: string | null;
    };
}

export default function Welcome({ jurusans, flash }: WelcomeProps) {
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const successData = flash?.success_data;
    const errorMessage = flash?.error;

    useEffect(() => {
        if (successData) {
            setIsSuccessOpen(true);
        }
        if (errorMessage) {
            setIsErrorOpen(true);
        }
    }, [successData, errorMessage]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
            <Navbar />
            <Hero />
            <JurusanList jurusans={jurusans} />
            <SmartCalculator jurusans={jurusans} />
            <PendaftaranForm jurusans={jurusans} />
            <Footer />

            {/* Modal Sukses Kalkulasi SMART */}
            {successData && (
                <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
                    <DialogContent className="max-w-lg bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 shadow-2xl">
                        <DialogHeader className="items-center text-center">
                            <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-full mb-2 animate-bounce">
                                <CheckCircle2 className="w-12 h-12" />
                            </div>
                            <DialogTitle className="text-2xl font-bold text-emerald-400">Pendaftaran Berhasil!</DialogTitle>
                            <DialogDescription className="text-slate-400 mt-1">
                                Data pendaftaran Anda telah berhasil disimpan dan dievaluasi menggunakan metode SMART.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="my-6 space-y-4 bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
                            <div className="flex justify-between items-center pb-3 border-b border-slate-800/60">
                                <span className="text-slate-400 text-sm">Nama Lengkap</span>
                                <span className="font-semibold text-white text-sm">{successData.nama}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-slate-800/60">
                                <span className="text-slate-400 text-sm">Email</span>
                                <span className="font-medium text-slate-300 text-sm">{successData.email}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-slate-800/60">
                                <span className="text-slate-400 text-sm">Jurusan Pilihan</span>
                                <span className="font-bold text-blue-400 text-sm">{successData.jurusan}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-slate-800/60">
                                <span className="text-slate-400 text-sm">Semester</span>
                                <span className="font-medium text-slate-300 text-sm">{successData.semester}</span>
                            </div>

                            {/* Section Perhitungan SMART */}
                            <div className="mt-4 pt-2">
                                <div className="flex items-center gap-2 mb-3">
                                    <Award className="w-5 h-5 text-amber-400" />
                                    <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Hasil Evaluasi SMART</h4>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-center">
                                        <p className="text-xs text-slate-400">Skor Kesesuaian</p>
                                        <p className="text-3xl font-extrabold text-white mt-1">
                                            {successData.skor_smart}
                                            <span className="text-sm font-normal text-slate-400">/100</span>
                                        </p>
                                    </div>
                                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex flex-col items-center justify-center">
                                        <p className="text-xs text-slate-400 mb-1">Rekomendasi</p>
                                        <Badge 
                                            className={`font-semibold text-xs py-1 px-2.5 rounded-full ${
                                                successData.skor_smart >= 80 
                                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                                                    : successData.skor_smart >= 60 
                                                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" 
                                                        : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                                            }`}
                                        >
                                            {successData.status_rekomendasi}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-xs text-slate-500 text-center flex items-center justify-center gap-1">
                            <ClipboardCheck className="w-4 h-4 text-slate-500" />
                            <span>Silakan cek email atau login ke dashboard guru untuk status penerimaan resmi.</span>
                        </div>

                        <DialogFooter className="mt-6">
                            <Button 
                                onClick={() => setIsSuccessOpen(false)} 
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-xl cursor-pointer"
                            >
                                Selesai
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {errorMessage && (
                <Dialog open={isErrorOpen} onOpenChange={setIsErrorOpen}>
                    <DialogContent className="max-w-md bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 shadow-2xl">
                        <DialogHeader className="items-center text-center">
                            <div className="bg-rose-500/20 text-rose-400 p-3 rounded-full mb-2 animate-pulse">
                                <span className="text-2xl">⚠️</span>
                            </div>
                            <DialogTitle className="text-xl font-bold text-rose-400">Pendaftaran Gagal</DialogTitle>
                            <DialogDescription className="text-slate-400 mt-1">
                                {errorMessage}
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-4">
                            <Button 
                                onClick={() => setIsErrorOpen(false)} 
                                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 rounded-xl cursor-pointer"
                            >
                                Tutup
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
