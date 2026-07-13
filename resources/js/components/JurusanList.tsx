import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { X, Award, Target, BookOpen, Layers, DollarSign } from "lucide-react";

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

interface JurusanListProps {
    jurusans: JurusanData[];
}

// Mapper untuk memperkaya tampilan UI Jurusan
const jurusanMeta: Record<string, {
    icon: string;
    kompetensiUtama: string[];
    fasilitas: string[];
    keunggulan: string[];
    biaya: string;
    prospekKuliah: string[];
}> = {
    "Keperawatan": {
        icon: "🏥",
        kompetensiUtama: ["Asuhan Keperawatan Dasar", "Etika Profesi Kesehatan", "Komunikasi Terapeutik", "Teknik Perawatan Pasien"],
        fasilitas: ["Laboratorium Keperawatan", "Ruang Simulasi Klinik", "Praktik di RS Mitra", "Perpustakaan Kesehatan"],
        keunggulan: ["Sertifikasi Kompetensi Kemenkes", "Kerjasama dengan Rumah Sakit Ternama", "Lulusan Langsung Terserap Kerja", "Peluang Karir Global"],
        biaya: "Rp 1.500.000 - Rp 2.000.000 per semester",
        prospekKuliah: ["S1 Keperawatan", "D4 Kebidanan", "Ilmu Kesehatan Masyarakat", "Farmasi Klinik"]
    },
    "Farmasi": {
        icon: "💊",
        kompetensiUtama: ["Identifikasi Zat Obat", "Peracikan & Pembuatan Obat", "Manajemen Inventori Apotek", "Farmakologi Dasar"],
        fasilitas: ["Laboratorium Kimia Farmasi", "Ruang Peracikan & Sterilisasi", "Apotek Simulasi", "Perpustakaan Farmasi"],
        keunggulan: ["Sertifikasi Asisten Apoteker", "Kerjasama dengan Apotek & Industri Farmasi", "Latihan Pembuatan Kosmetik Herbal", "Prospek Kerja Sangat Stabil"],
        biaya: "Rp 1.600.000 - Rp 2.100.000 per semester",
        prospekKuliah: ["S1 Farmasi", "Kimia Murni", "Bioteknologi", "Pendidikan Apoteker"]
    },
    "Analis Kesehatan / TLM": {
        icon: "🧪",
        kompetensiUtama: ["Analisis Sampel Biologis", "Hematologi & Kimia Klinik", "Pengoperasian Alat Lab Modern", "Quality Control Laboratorium"],
        fasilitas: ["Laboratorium Patologi Klinik", "Mikroskop Binokuler & Digital", "Alat Analisis Darah Otomatis", "Ruang Media & Sterilisasi"],
        keunggulan: ["Sertifikasi Kompetensi Analis", "Kerjasama dengan Laboratorium Klinik Nasional", "Keterampilan Teknik Tinggi", "Tingkat Kebutuhan Lulusan Tinggi"],
        biaya: "Rp 1.700.000 - Rp 2.200.000 per semester",
        prospekKuliah: ["D4 Teknologi Laboratorium Medis", "Biomedis", "Kedokteran", "Kesehatan Masyarakat"]
    },
    "Desain Komunikasi Visual (DKV)": {
        icon: "🎨",
        kompetensiUtama: ["Desain Grafis & Layouting", "Ilustrasi Digital & Vektor", "Branding & Logo Design", "Fotografi & Videografi"],
        fasilitas: ["Studio Desain Grafis", "Laboratorium Komputer iMac", "Tablet Grafis Wacom", "Kamera DSLR & Mirrorless", "Studio Hijau"],
        keunggulan: ["Portfolio Siap Kerja", "Sertifikasi Adobe Certified Professional", "Magang di Creative Agency Nasional", "Peluang Freelance Terbuka Lebar"],
        biaya: "Rp 1.800.000 - Rp 2.300.000 per semester",
        prospekKuliah: ["S1 DKV", "Seni Rupa Murni", "Broadcasting", "Manajemen Periklanan"]
    },
    "Tata Kecantikan": {
        icon: "💄",
        kompetensiUtama: ["Tata Rias Wajah (MUA)", "Perawatan Kulit (Facial & Body Treatment)", "Styling & Hairdressing", "Manajemen Spa & Salon"],
        fasilitas: ["Salon Mini Simulasi", "Ruang Treatment Kulit Wajah", "Peralatan Spa & Relaksasi", "Model Rambut Praktik"],
        keunggulan: ["Sertifikasi Keahlian Beauty", "Kerjasama Brand Kosmetik Ternama", "Portfolio Hasil Karya Tata Rias", "Siap Membuka Bengkel Usaha Salon Mandiri"],
        biaya: "Rp 1.400.000 - Rp 1.900.000 per semester",
        prospekKuliah: ["Pendidikan Tata Rias", "Kecantikan dan Estetika", "Manajemen Bisnis Wellness"]
    },
    "Tata Boga": {
        icon: "🍳",
        kompetensiUtama: ["Teknik Dasar Memasak & Baking", "Manajemen Operasional Dapur", "Food Styling & Garnishing", "Nutrisi & Gizi Makanan"],
        fasilitas: ["Dapur Standar Hotel Bintang 5", "Peralatan Memasak & Oven Modern", "Restoran Simulasi", "Kebun Hidroponik Bahan Baku"],
        keunggulan: ["Sertifikasi Kompetensi Chef", "Kerjasama Magang dengan Hotel Berbintang", "Kompetisi Masak Rutin", "Modal Keterampilan Wirausaha Kuliner"],
        biaya: "Rp 1.500.000 - Rp 2.000.000 per semester",
        prospekKuliah: ["S1 Tata Boga", "Pariwisata & Perhotelan", "Ilmu Gizi", "Manajemen Kuliner"]
    },
    "Rekayasa Perangkat Lunak (RPL)": {
        icon: "🖥️",
        kompetensiUtama: ["Web Development (HTML, CSS, JS, PHP)", "Mobile Development (Android/iOS)", "Database Management (MySQL, SQL Server)", "Object-Oriented Programming"],
        fasilitas: ["Laboratorium Komputer Modern", "Server Lokal untuk Hosting Mandiri", "Internet Gigabit", "Perangkat IoT Eksperimen"],
        keunggulan: ["Portfolio Aplikasi Mandiri", "Kerjasama Perusahaan IT & Software House", "Sertifikasi Internasional Oracle/Microsoft", "Kesiapan Membangun Tech Startup"],
        biaya: "Rp 1.900.000 - Rp 2.400.000 per semester",
        prospekKuliah: ["S1 Teknik Informatika", "Sistem Informasi", "Teknik Komputer", "Sains Data"]
    },
    "Teknik Komputer dan Jaringan (TKJ)": {
        icon: "💻",
        kompetensiUtama: ["Troubleshooting Hardware & PC", "Konfigurasi Jaringan (Routing & Switching)", "Cyber Security & Firewall", "Sistem Administrasi Server"],
        fasilitas: ["Lab Jaringan Standar Cisco", "Server Room Khusus", "Perangkat Router & Switch Industri", "Peralatan Fiber Optic"],
        keunggulan: ["Sertifikasi Cisco (CCNA)", "Kerjasama Penyedia ISP & Jaringan Nasional", "Pengalaman Praktik Konfigurasi Riil", "Kebutuhan IT Administrator Sangat Tinggi"],
        biaya: "Rp 1.800.000 - Rp 2.300.000 per semester",
        prospekKuliah: ["S1 Teknik Komputer", "Teknik Telekomunikasi", "Jaringan Informasi", "Keamanan Siber"]
    },
    "Teknik Kendaraan Ringan (TKR)": {
        icon: "🚗",
        kompetensiUtama: ["Diagnosis Kerusakan Mesin Mobil", "Servis Sistem Transmisi & Rem", "Kelistrikan & AC Mobil", "Teknologi Kendaraan EFI & Hybrid"],
        fasilitas: ["Workshop Otomotif Mobil Lengkap", "Car Lift Hidrolik", "Scanner Sensor EFI", "Mesin Trainer & Bongkar Pasang"],
        keunggulan: ["Sertifikasi Mekanik Kelas Industri", "Kerjasama ATPM Astra & Dealer Resmi", "Keterampilan Servis Standar Bengkel Resmi", "Kebutuhan Mekanik yang Konsisten Tinggi"],
        biaya: "Rp 1.600.000 - Rp 2.100.000 per semester",
        prospekKuliah: ["S1 Teknik Mesin", "Teknik Otomotif", "Pendidikan Teknik Vokasi", "Teknik Manufaktur"]
    }
};

const defaultMeta = {
    icon: "🎓",
    kompetensiUtama: ["Kompetensi Keahlian Dasar", "Teori Kejuruan", "Praktik Kerja Industri"],
    fasilitas: ["Ruang Kelas Nyaman", "Laboratorium Praktik", "Perpustakaan"],
    keunggulan: ["Lulusan Siap Kerja", "Sertifikasi Sekolah", "Peluang Karir Luas"],
    biaya: "Rp 1.500.000 per semester",
    prospekKuliah: ["Melanjutkan ke Universitas", "Politeknik Vokasi"]
};

export function JurusanList({ jurusans = [] }: JurusanListProps) {
    const [selectedJurusan, setSelectedJurusan] = useState<number | null>(null);

    const handleDetailClick = (id: number) => {
        setSelectedJurusan(id);
    };

    const handleCloseModal = () => {
        setSelectedJurusan(null);
    };

    const handleDaftarClick = (jurusanId: number) => {
        const event = new CustomEvent("select-jurusan", { detail: { jurusanId } });
        window.dispatchEvent(event);
        handleCloseModal();
        setTimeout(() => {
            const pendaftaranSection = document.getElementById("pendaftaran");
            if (pendaftaranSection) {
                pendaftaranSection.scrollIntoView({ behavior: "smooth" });
                const firstInput = document.getElementById("nama_lengkap");
                if (firstInput) {
                    firstInput.focus();
                }
            }
        }, 150);
    };

    // Prevent scroll when modal is open
    useEffect(() => {
        if (selectedJurusan) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedJurusan]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && selectedJurusan) {
                handleCloseModal();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [selectedJurusan]);

    return (
        <section id="jurusan" className="py-20 bg-gradient-to-b from-[#334155] to-[#1E293B]">
            <div className="mx-auto w-full px-4 lg:px-8">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                        Jurusan Unggulan
                    </h2>
                    <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl/relaxed">
                        Pilih jurusan yang sesuai dengan minat, bakat, dan tujuan karirmu untuk masa depan yang lebih cerah.
                    </p>
                </div>

                {/* Penjelasan SMART */}
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl mt-8 mb-12 border border-white/10 shadow-xl">
                    <h3 className="text-2xl font-bold mb-6 text-center text-white">Metode SMART (Simple Multi Attribute Rating Technique)</h3>
                    <p className="text-gray-300 text-center mb-8 max-w-4xl mx-auto">
                        Sistem pendukung keputusan kami menggunakan model matematika **SMART** untuk mengukur kecocokan akademis calon siswa terhadap kriteria unggulan tiap jurusan.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 rounded-xl border border-blue-500/20 shadow-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-blue-500/20 text-blue-300 w-8 h-8 rounded-sm flex items-center justify-center font-bold">S</span>
                                <h4 className="font-bold text-lg text-blue-300">Simple</h4>
                            </div>
                            <p className="text-gray-300 text-sm">
                                Pembobotan kriteria yang sederhana, transparan, dan mudah dipahami oleh calon siswa.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-[#10B981]/10 to-emerald-800/20 p-6 rounded-xl border border-emerald-500/20 shadow-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-emerald-500/20 text-emerald-300 w-8 h-8 rounded-sm flex items-center justify-center font-bold">M</span>
                                <h4 className="font-bold text-lg text-emerald-300">Multi-Attribute</h4>
                            </div>
                            <p className="text-gray-300 text-sm">
                                Evaluasi pendaftaran menggunakan multi-kriteria nilai mata pelajaran utama.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-violet-900/40 to-violet-800/20 p-6 rounded-xl border border-violet-500/20 shadow-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-violet-500/20 text-violet-300 w-8 h-8 rounded-sm flex items-center justify-center font-bold">A</span>
                                <h4 className="font-bold text-lg text-violet-300">Attribute Weight</h4>
                            </div>
                            <p className="text-gray-300 text-sm">
                                Penentuan bobot prioritas kriteria yang disesuaikan secara adil untuk tiap jurusan.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-900/40 to-amber-800/20 p-6 rounded-xl border border-amber-500/20 shadow-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-amber-500/20 text-amber-300 w-8 h-8 rounded-sm flex items-center justify-center font-bold">R</span>
                                <h4 className="font-bold text-lg text-amber-300">Rating Utility</h4>
                            </div>
                            <p className="text-gray-300 text-sm">
                                Menstandarisasi nilai rapor Anda menjadi nilai utilitas (skala 0 s.d 100) berdasarkan KKM.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-rose-900/40 to-rose-800/20 p-6 rounded-xl border border-rose-500/20 shadow-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-rose-500/20 text-rose-300 w-8 h-8 rounded-sm flex items-center justify-center font-bold">T</span>
                                <h4 className="font-bold text-lg text-rose-300">Technique</h4>
                            </div>
                            <p className="text-gray-300 text-sm">
                                Teknik perangkingan objektif untuk memeringkat calon siswa secara ilmiah.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Grid Cards Dinamis */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jurusans.map((jurusan) => {
                        const meta = jurusanMeta[jurusan.nama_jurusan] || defaultMeta;
                        const prospekKerja = jurusan.prospek_karir 
                            ? jurusan.prospek_karir.split(',').map(s => s.trim()) 
                            : [];

                        return (
                            <Card key={jurusan.id} className="overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group flex flex-col justify-between">
                                <div>
                                    <CardHeader className="pb-2 border-b border-blue-500/20">
                                        <div className="flex items-center gap-4">
                                            <div className="text-4xl p-3 bg-blue-500/20 rounded-xl">{meta.icon}</div>
                                            <div>
                                                <CardTitle className="text-white text-xl">{jurusan.nama_jurusan}</CardTitle>
                                                <div className="flex items-center gap-1.5 mt-1 text-xs text-amber-300">
                                                    <span>⭐</span>
                                                    <span>{jurusan.rating_rekomendasi || '4.5'} Rating Sekolah</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-4">
                                        <CardDescription className="text-gray-300 mb-4 line-clamp-3">
                                            {jurusan.deskripsi}
                                        </CardDescription>

                                        {/* Tampilan Bobot SMART */}
                                        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3 mb-6">
                                            <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider pb-2 border-b border-slate-800">
                                                <span>Kriteria Evaluasi SMART</span>
                                                <span className="text-amber-400">Bobot Penilaian</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-xs">
                                                <div className="flex justify-between items-center bg-slate-950/40 p-2 rounded border border-slate-800/40">
                                                    <span className="text-slate-400 font-medium">📐 MTK</span>
                                                    <span className="font-bold text-blue-400">{jurusan.bobot_matematika}%</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-slate-950/40 p-2 rounded border border-slate-800/40">
                                                    <span className="text-slate-400 font-medium">🔬 IPA</span>
                                                    <span className="font-bold text-emerald-400">{jurusan.bobot_ipa}%</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-slate-950/40 p-2 rounded border border-slate-800/40">
                                                    <span className="text-slate-400 font-medium">💬 BHS</span>
                                                    <span className="font-bold text-violet-400">{jurusan.bobot_bahasa}%</span>
                                                </div>
                                                <div className="flex justify-between items-center bg-slate-950/40 p-2 rounded border border-slate-800/40">
                                                    <span className="text-slate-400 font-medium">🌍 IPS</span>
                                                    <span className="font-bold text-rose-400">{jurusan.bobot_ips}%</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Prospek Kerja */}
                                        {prospekKerja.length > 0 && (
                                            <div className="space-y-2 mb-4">
                                                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Prospek Karir:</h4>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {prospekKerja.slice(0, 3).map((prospek, index) => (
                                                        <Badge key={index} variant="secondary" className="bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs">
                                                            {prospek}
                                                        </Badge>
                                                    ))}
                                                    {prospekKerja.length > 3 && (
                                                        <Badge variant="secondary" className="bg-slate-800 text-slate-400 text-xs">
                                                            +{prospekKerja.length - 3} lainnya
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </div>
                                <CardFooter className="border-t border-white/5 pt-4 mt-auto">
                                    <Button 
                                        variant="outline" 
                                        className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:text-white group-hover:border-blue-400/50 cursor-pointer"
                                        onClick={() => handleDetailClick(jurusan.id)}
                                    >
                                        Lihat Detail Kejuruan
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>

                {/* Modal Overlay Detail Jurusan */}
                {selectedJurusan && (
                    <div 
                        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6 transition-all duration-300 animate-in fade-in"
                        onClick={handleCloseModal}
                    >
                        <style dangerouslySetInnerHTML={{__html: `
                            .custom-modal-scrollbar::-webkit-scrollbar {
                                width: 6px;
                            }
                            .custom-modal-scrollbar::-webkit-scrollbar-track {
                                background: transparent;
                            }
                            .custom-modal-scrollbar::-webkit-scrollbar-thumb {
                                background: #334155;
                                border-radius: 9999px;
                            }
                            .custom-modal-scrollbar::-webkit-scrollbar-thumb:hover {
                                background: #475569;
                            }
                        `}} />

                        <div 
                            className="bg-slate-900 border border-slate-800 w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-transform duration-300 scale-95 md:scale-100 animate-in zoom-in-95"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {(() => {
                                const jurusan = jurusans.find(j => j.id === selectedJurusan);
                                if (!jurusan) return null;
                                const meta = jurusanMeta[jurusan.nama_jurusan] || defaultMeta;
                                const prospekKerja = jurusan.prospek_karir 
                                    ? jurusan.prospek_karir.split(',').map(s => s.trim()) 
                                    : [];

                                return (
                                    <>
                                        {/* Header - Sticky di bagian atas */}
                                        <div className="relative p-5 md:p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 shrink-0">
                                            {/* Decorative Background Glow */}
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                                            
                                            <div className="flex items-center gap-4 md:gap-5 justify-between relative z-10">
                                                <div className="flex items-center gap-4">
                                                    <div className="text-4xl md:text-5xl p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-inner flex items-center justify-center shrink-0">
                                                        {meta.icon}
                                                    </div>
                                                    <div>
                                                        <h2 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight">{jurusan.nama_jurusan}</h2>
                                                        <div className="flex items-center gap-1.5 mt-1 text-xs text-amber-400 font-medium">
                                                            <span>⭐</span>
                                                            <span>{jurusan.rating_rekomendasi || '4.5'} Rating Sekolah</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <button 
                                                    onClick={handleCloseModal}
                                                    className="bg-slate-950/50 hover:bg-rose-500/20 border border-slate-800 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 p-2 rounded-lg cursor-pointer transition-all duration-200"
                                                    aria-label="Tutup"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Content - Scrollable di bagian tengah */}
                                        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-modal-scrollbar">
                                            {/* Deskripsi */}
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Deskripsi Program Keahlian</h4>
                                                <p className="text-slate-200 leading-relaxed text-sm md:text-base">
                                                    {jurusan.deskripsi}
                                                </p>
                                            </div>

                                            {/* SMART Weights */}
                                            <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800/80">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Award className="w-5 h-5 text-amber-400" />
                                                    <h4 className="text-xs font-bold text-slate-300 tracking-wider uppercase">Sistem Penilaian & Bobot Kriteria SMART</h4>
                                                </div>
                                                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                                                    PPDB SMK memakai metode SMART untuk menilai rapor Anda. Setiap mata pelajaran memiliki bobot pengaruh berbeda untuk kelayakan pendaftaran jurusan ini:
                                                </p>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {[
                                                        { label: "C1: Matematika", weight: jurusan.bobot_matematika, color: "from-blue-500 to-indigo-600", text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                                                        { label: "C2: IPA", weight: jurusan.bobot_ipa, color: "from-emerald-500 to-teal-600", text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                                                        { label: "C3: Bahasa", weight: jurusan.bobot_bahasa, color: "from-violet-500 to-purple-600", text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
                                                        { label: "C4: IPS", weight: jurusan.bobot_ips, color: "from-rose-500 to-pink-600", text: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" }
                                                    ].map((c, i) => (
                                                        <div key={i} className={`bg-slate-900/80 p-4 rounded-xl border ${c.border} flex flex-col justify-between shadow-sm`}>
                                                            <div>
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <span className={`text-[10px] font-bold ${c.text} uppercase tracking-wider`}>{c.label}</span>
                                                                    <span className="text-[9px] text-slate-500">Bobot</span>
                                                                </div>
                                                                <p className="text-2xl font-black text-white">{c.weight}%</p>
                                                            </div>
                                                            <div className="w-full bg-slate-950 h-1.5 rounded-full mt-3 overflow-hidden">
                                                                <div className={`bg-gradient-to-r ${c.color} h-full rounded-full`} style={{ width: `${c.weight}%` }} />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Baris Informasi Vokasi */}
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                {[
                                                    { icon: <Target className="w-5 h-5 text-blue-400" />, label: "Kuota Maksimal", value: `${jurusan.kuota_maksimal || '36'} Siswa`, bg: "bg-blue-500/5", border: "border-blue-500/10" },
                                                    { icon: <Layers className="w-5 h-5 text-emerald-400" />, label: "Durasi Pendidikan", value: `${(jurusan.durasi_program / 12) || 3} Tahun`, bg: "bg-emerald-500/5", border: "border-emerald-500/10" },
                                                    { icon: <BookOpen className="w-5 h-5 text-violet-400" />, label: "Tingkat Kelulusan", value: `${jurusan.tingkat_kelulusan || '100'}% Alumnus`, bg: "bg-violet-500/5", border: "border-violet-500/10" }
                                                ].map((item, idx) => (
                                                    <div key={idx} className={`bg-slate-900/60 p-4 rounded-xl border ${item.border} flex items-center gap-4`}>
                                                        <div className={`p-2.5 rounded-lg ${item.bg} border ${item.border}`}>
                                                            {item.icon}
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{item.label}</p>
                                                            <p className="text-sm font-bold text-white mt-0.5">{item.value}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Detail Kompetensi & Fasilitas */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800/80">
                                                    <h5 className="text-xs font-bold text-blue-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                                        Materi & Kompetensi Utama
                                                    </h5>
                                                    <ul className="space-y-2.5">
                                                        {meta.kompetensiUtama.map((kompetensi, index) => (
                                                            <li key={index} className="flex gap-2.5 items-start text-xs text-slate-200 leading-normal">
                                                                <span className="text-blue-500 font-bold">•</span>
                                                                <span>{kompetensi}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800/80">
                                                    <h5 className="text-xs font-bold text-emerald-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                        Fasilitas & Lab Unggulan
                                                    </h5>
                                                    <ul className="space-y-2.5">
                                                        {meta.fasilitas.map((fasilitas, index) => (
                                                            <li key={index} className="flex gap-2.5 items-start text-xs text-slate-200 leading-normal">
                                                                <span className="text-emerald-500 font-bold">•</span>
                                                                <span>{fasilitas}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Prospek Kerja & Kuliah */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800/80">
                                                    <h5 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Prospek Karir Alumnus</h5>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {prospekKerja.map((prospek, index) => (
                                                            <Badge key={index} variant="secondary" className="bg-slate-950 text-slate-300 border border-slate-800 text-[10px] py-1 px-2.5 rounded-md">
                                                                {prospek}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-800/80">
                                                    <h5 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Rencana Studi Lanjut (Kuliah)</h5>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {meta.prospekKuliah.map((prospek, index) => (
                                                            <Badge key={index} variant="secondary" className="bg-slate-950 text-slate-300 border border-slate-800 text-[10px] py-1 px-2.5 rounded-md">
                                                                {prospek}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Biaya & Persyaratan */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/50">
                                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Persyaratan Masuk Fisik/Administrasi</span>
                                                    <p className="text-xs text-slate-200 leading-relaxed">{jurusan.persyaratan_masuk || 'Tidak ada persyaratan khusus.'}</p>
                                                </div>
                                                <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/50 flex flex-col justify-between">
                                                    <div>
                                                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Estimasi Biaya Pendidikan</span>
                                                        <p className="text-base font-bold text-amber-400">{meta.biaya}</p>
                                                    </div>
                                                    <p className="text-[9px] text-slate-500 mt-2">*Biaya bersifat estimasi mengikuti kebijakan SPP sekolah.</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer - Sticky di bagian bawah */}
                                        <div className="p-5 md:p-6 border-t border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row gap-3 justify-end items-center mt-auto shrink-0 animate-in slide-in-from-bottom-5 duration-200">
                                            <Button 
                                                variant="outline"
                                                onClick={handleCloseModal}
                                                className="w-full sm:w-auto border-slate-800 hover:bg-slate-800 hover:text-white text-slate-350 cursor-pointer rounded-xl px-5 text-xs h-9"
                                            >
                                                Kembali
                                            </Button>
                                            <Button 
                                                onClick={() => handleDaftarClick(jurusan.id)}
                                                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl px-6 text-xs h-9 shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-200 cursor-pointer"
                                            >
                                                Daftar Jurusan Ini Sekarang
                                            </Button>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
