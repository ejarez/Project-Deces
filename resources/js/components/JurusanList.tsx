import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const jurusanData = [
    {
        id: 1,
        nama: "Keperawatan",
        deskripsi: "Jurusan yang mempelajari perawatan pasien, ilmu kesehatan, serta keterampilan medis dasar hingga lanjutan.",
        prospekKerja: ["Perawat", "Tenaga Medis", "Instruktur Kesehatan", "Caregiver"],
        prospekKuliah: ["Keperawatan", "Kebidanan", "Ilmu Kesehatan Masyarakat", "Pendidikan Keperawatan"],
        icon: "🏥",
        smartRating: {
            simple: "Proses pembelajaran yang mudah dipahami dengan praktik langsung",
            multi: "Mempertimbangkan berbagai aspek kompetensi dan kemampuan",
            attribute: "Fokus pada kemampuan klinis, komunikasi, dan tanggung jawab",
            rating: "Skala 1-5 untuk setiap kompetensi yang dinilai",
            technique: "Metode pembelajaran berbasis kasus dan simulasi"
        },
        detailInfo: {
            kompetensiUtama: ["Asuhan Keperawatan Dasar", "Etika Profesi Kesehatan", "Komunikasi Terapeutik", "Teknik Perawatan Pasien"],
            fasilitas: ["Laboratorium Keperawatan", "Ruang Simulasi Klinik", "Praktik di RS Mitra", "Perpustakaan Kesehatan"],
            keunggulan: ["Sertifikasi Kompetensi", "Kerjasama dengan Rumah Sakit", "Lulusan Siap Kerja", "Peluang Karir Luas"],
            biaya: "Rp 1.500.000 - Rp 2.000.000 per semester"
        }
    },
    {
        id: 2,
        nama: "Farmasi",
        deskripsi: "Jurusan yang mempelajari obat-obatan, kimia farmasi, dan pengelolaan pelayanan farmasi di bidang kesehatan.",
        prospekKerja: ["Apoteker Asisten", "Analis Obat", "Asisten Laboratorium", "Sales Medis"],
        prospekKuliah: ["Farmasi", "Kimia", "Bioteknologi", "Ilmu Kesehatan"],
        icon: "💊",
        smartRating: {
            simple: "Metode pembelajaran yang sistematis dan terstruktur",
            multi: "Mempertimbangkan berbagai aspek pengetahuan dan praktik",
            attribute: "Fokus pada identifikasi obat, peracikan, dan etika farmasi",
            rating: "Penilaian berbasis kompetensi dengan skala 1-5",
            technique: "Pembelajaran berbasis praktik dan studi kasus"
        },
        detailInfo: {
            kompetensiUtama: ["Identifikasi Obat", "Peracikan Obat", "Manajemen Apotek", "Analisis Kimia Farmasi"],
            fasilitas: ["Laboratorium Kimia", "Ruang Peracikan", "Apotek Mini", "Perpustakaan Farmasi"],
            keunggulan: ["Sertifikasi Asisten Apoteker", "Kerjasama dengan Apotek", "Prakiraan Obat Modern", "Lulusan Siap Kerja"],
            biaya: "Rp 1.600.000 - Rp 2.100.000 per semester"
        }
    },
    {
        id: 3,
        nama: "Analis Kesehatan / TLM",
        deskripsi: "Jurusan yang mempelajari pemeriksaan laboratorium untuk diagnosis penyakit dan penelitian medis.",
        prospekKerja: ["Analis Laboratorium Medis", "Teknisi Lab", "Quality Control", "Petugas Klinik"],
        prospekKuliah: ["Teknologi Laboratorium Medis", "Biologi", "Kedokteran", "Kesehatan Masyarakat"],
        icon: "🧪",
        smartRating: {
            simple: "Pembelajaran step-by-step dengan praktik langsung",
            multi: "Mempertimbangkan berbagai aspek pengetahuan dan keterampilan",
            attribute: "Fokus pada analisis sampel, pengoperasian alat, dan interpretasi",
            rating: "Evaluasi melalui uji kompetensi dan praktik laboratorium",
            technique: "Metode pembelajaran hands-on dengan alat modern"
        },
        detailInfo: {
            kompetensiUtama: ["Analisis Sampel Biologis", "Pengoperasian Alat Lab", "Interpretasi Hasil", "Quality Control"],
            fasilitas: ["Laboratorium Medis", "Mikroskop Digital", "Alat Analisis Modern", "Ruang Steril"],
            keunggulan: ["Sertifikasi Analis Kesehatan", "Kerjasama dengan Lab Klinis", "Teknologi Terbaru", "Peluang Kerja Tinggi"],
            biaya: "Rp 1.700.000 - Rp 2.200.000 per semester"
        }
    },
    {
        id: 4,
        nama: "Desain Komunikasi Visual (DKV)",
        deskripsi: "Jurusan yang mempelajari seni desain grafis, ilustrasi, branding, dan media komunikasi visual.",
        prospekKerja: ["Desainer Grafis", "Creative Director", "Animator", "Illustrator"],
        prospekKuliah: ["DKV", "Seni Rupa", "Multimedia", "Periklanan"],
        icon: "🎨",
        smartRating: {
            simple: "Pembelajaran kreatif yang menyenangkan dan mudah dipahami",
            multi: "Mempertimbangkan berbagai aspek kreativitas dan teknis",
            attribute: "Fokus pada software mastery, prinsip visual, dan portfolio",
            rating: "Penilaian berbasis portfolio dan kompetisi desain",
            technique: "Project-based learning dengan mentorship profesional"
        },
        detailInfo: {
            kompetensiUtama: ["Desain Grafis", "Ilustrasi Digital", "Branding", "Multimedia"],
            fasilitas: ["Studio Desain", "Komputer Apple", "Tablet Grafis", "Printer Large Format"],
            keunggulan: ["Portfolio Profesional", "Kerjasama dengan Agency", "Sertifikasi Adobe", "Freelance Ready"],
            biaya: "Rp 1.800.000 - Rp 2.300.000 per semester"
        }
    },
    {
        id: 5,
        nama: "Tata Kecantikan",
        deskripsi: "Jurusan yang mempelajari perawatan wajah, rambut, tata rias, serta estetika kecantikan.",
        prospekKerja: ["Makeup Artist", "Beauty Therapist", "Konsultan Kecantikan", "Hair Stylist"],
        prospekKuliah: ["Tata Rias", "Kecantikan dan Estetika", "Manajemen Spa", "Manajemen Bisnis"],
        icon: "💄",
        smartRating: {
            simple: "Pembelajaran praktis dengan model langsung",
            multi: "Mempertimbangkan berbagai aspek keterampilan dan kreativitas",
            attribute: "Fokus pada tata rias, perawatan kulit, dan styling",
            rating: "Penilaian melalui demonstrasi dan sertifikasi",
            technique: "Hands-on training dengan praktik langsung"
        },
        detailInfo: {
            kompetensiUtama: ["Tata Rias Wajah", "Perawatan Kulit", "Styling Rambut", "Manajemen Spa"],
            fasilitas: ["Salon Mini", "Ruang Treatment", "Peralatan Kecantikan", "Model Praktik"],
            keunggulan: ["Sertifikasi Beauty", "Kerjasama dengan Salon", "Portfolio Karya", "Siap Berwirausaha"],
            biaya: "Rp 1.400.000 - Rp 1.900.000 per semester"
        }
    },
    {
        id: 6,
        nama: "Tata Boga",
        deskripsi: "Jurusan yang mempelajari seni memasak, manajemen dapur, dan pengolahan makanan modern maupun tradisional.",
        prospekKerja: ["Chef", "Food Stylist", "Pengusaha Kuliner", "Ahli Gizi"],
        prospekKuliah: ["Tata Boga", "Pariwisata", "Gizi", "Manajemen Perhotelan"],
        icon: "🍳",
        smartRating: {
            simple: "Pembelajaran memasak yang menyenangkan dan praktis",
            multi: "Mempertimbangkan berbagai aspek teknik dan kreativitas",
            attribute: "Fokus pada culinary skills, menu development, dan hygiene",
            rating: "Penilaian melalui praktik dan kompetisi kuliner",
            technique: "Pembelajaran berbasis praktik di dapur profesional"
        },
        detailInfo: {
            kompetensiUtama: ["Teknik Memasak", "Manajemen Dapur", "Food Styling", "Nutrisi & Gizi"],
            fasilitas: ["Dapur Profesional", "Alat Masak Modern", "Ruang Penyajian", "Garden Hidroponik"],
            keunggulan: ["Sertifikasi Chef", "Kerjasama dengan Hotel", "Kompetisi Kuliner", "Siap Berwirausaha"],
            biaya: "Rp 1.500.000 - Rp 2.000.000 per semester"
        }
    },
    {
        id: 7,
        nama: "Rekayasa Perangkat Lunak (RPL)",
        deskripsi: "Jurusan yang mempelajari pengembangan software, aplikasi mobile, hingga sistem informasi.",
        prospekKerja: ["Software Engineer", "Web Developer", "Mobile Developer", "Game Developer"],
        prospekKuliah: ["Informatika", "Teknik Komputer", "Sistem Informasi", "Ilmu Komputer"],
        icon: "🖥️",
        smartRating: {
            simple: "Pembelajaran coding yang terstruktur dan mudah diikuti",
            multi: "Mempertimbangkan berbagai aspek programming dan problem solving",
            attribute: "Fokus pada bahasa pemrograman, database, dan software engineering",
            rating: "Penilaian berbasis project portfolio dan coding test",
            technique: "Project-based learning dengan real-world applications"
        },
        detailInfo: {
            kompetensiUtama: ["Web Development", "Mobile Development", "Database Management", "Software Engineering"],
            fasilitas: ["Lab Komputer Modern", "Server Development", "Software Terbaru", "Internet High Speed"],
            keunggulan: ["Portfolio Digital", "Kerjasama dengan Tech Company", "Sertifikasi IT", "Startup Ready"],
            biaya: "Rp 1.900.000 - Rp 2.400.000 per semester"
        }
    },
    {
        id: 8,
        nama: "Teknik Komputer dan Jaringan (TKJ)",
        deskripsi: "Jurusan yang mempelajari perangkat keras komputer, jaringan, dan sistem keamanan jaringan.",
        prospekKerja: ["Network Engineer", "IT Support", "System Administrator", "Cyber Security Analyst"],
        prospekKuliah: ["Teknik Komputer", "Jaringan", "Sistem Informasi", "Informatika"],
        icon: "💻",
        smartRating: {
            simple: "Pembelajaran teknis yang sistematis dan terstruktur",
            multi: "Mempertimbangkan berbagai aspek hardware, networking, dan security",
            attribute: "Fokus pada troubleshooting, konfigurasi, dan maintenance",
            rating: "Penilaian melalui praktik laboratorium dan sertifikasi",
            technique: "Hands-on learning dengan peralatan industri"
        },
        detailInfo: {
            kompetensiUtama: ["Troubleshooting Hardware", "Konfigurasi Jaringan", "Cyber Security", "System Administration"],
            fasilitas: ["Lab Jaringan Cisco", "Server Room", "Alat Networking", "Security Lab"],
            keunggulan: ["Sertifikasi Cisco", "Kerjasama dengan IT Company", "Hands-on Experience", "High Demand"],
            biaya: "Rp 1.800.000 - Rp 2.300.000 per semester"
        }
    },
    {
        id: 9,
        nama: "Teknik Kendaraan Ringan (TKR)",
        deskripsi: "Jurusan yang mempelajari perbaikan, perawatan, dan teknologi kendaraan bermotor roda empat.",
        prospekKerja: ["Mekanik Mobil", "Teknisi Otomotif", "Service Advisor", "Wirausaha Bengkel"],
        prospekKuliah: ["Teknik Mesin", "Teknik Otomotif", "Manufaktur", "Rekayasa Transportasi"],
        icon: "🚗",
        smartRating: {
            simple: "Pembelajaran praktis dengan kendaraan nyata",
            multi: "Mempertimbangkan berbagai aspek pengetahuan mesin dan teknis",
            attribute: "Fokus pada diagnosis, perbaikan, dan teknologi otomotif",
            rating: "Penilaian melalui praktik workshop dan sertifikasi",
            technique: "Pembelajaran hands-on dengan kendaraan modern"
        },
        detailInfo: {
            kompetensiUtama: ["Diagnosis Mesin", "Perbaikan Sistem Otomotif", "Service Kendaraan", "Teknologi Modern"],
            fasilitas: ["Workshop Otomotif", "Lift Kendaraan", "Alat Diagnosis", "Bengkel Mini"],
            keunggulan: ["Sertifikasi Mekanik", "Kerjasama dengan Dealer", "Hands-on Experience", "Siap Berwirausaha"],
            biaya: "Rp 1.600.000 - Rp 2.100.000 per semester"
        }
    }
];



export function JurusanList() {
    const [selectedJurusan, setSelectedJurusan] = useState<number | null>(null);

    const handleDetailClick = (id: number) => {
        setSelectedJurusan(id);
    };

    const handleCloseModal = () => {
        setSelectedJurusan(null);
    };

    // Prevent scroll when modal is open
    useEffect(() => {
        if (selectedJurusan) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup function
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
                    <h3 className="text-2xl font-bold mb-6 text-center text-white">Metode SMART (Simple, Multi, Attribute, Rating, Technique)</h3>
                    <p className="text-gray-300 text-center mb-8 max-w-4xl mx-auto">
                        Metode SMART adalah teknik penilaian yang terdiri dari 5 komponen terpisah untuk membantu pemilihan jurusan berdasarkan kriteria yang telah ditentukan dengan sistem rating yang objektif.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 rounded-xl border border-blue-500/20 shadow-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-blue-500/20 text-blue-300 w-8 h-8 rounded-sm flex items-center justify-center font-bold">S</span>
                                <h4 className="font-bold text-xl text-blue-300">Simple</h4>
                            </div>
                            <p className="text-gray-300 text-sm">
                                Proses evaluasi yang sederhana dan mudah dipahami oleh siswa.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 rounded-xl border border-emerald-500/20 shadow-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-blue-500/20 text-blue-300 w-8 h-8 rounded-sm flex items-center justify-center font-bold">M</span>
                                <h4 className="font-bold text-xl text-blue-300">Multi</h4>
                            </div>
                            <p className="text-gray-300 text-sm">
                                Mempertimbangkan berbagai aspek dan perspektif dalam penilaian.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 rounded-xl border border-violet-500/20 shadow-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-blue-500/20 text-blue-300 w-8 h-8 rounded-sm flex items-center justify-center font-bold">A</span>
                                <h4 className="font-bold text-xl text-blue-300">Attribute</h4>
                            </div>
                            <p className="text-gray-300 text-sm">
                                Fokus pada atribut-atribut spesifik seperti minat, bakat, nilai, dan prospek karir.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 rounded-xl border border-amber-500/20 shadow-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-blue-500/20 text-blue-300 w-8 h-8 rounded-sm flex items-center justify-center font-bold">R</span>
                                <h4 className="font-bold text-xl text-blue-300">Rating</h4>
                            </div>
                            <p className="text-gray-300 text-sm">
                                Sistem rating numerik untuk setiap kriteria yang dinilai.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 rounded-xl border border-rose-500/20 shadow-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-blue-500/20 text-blue-300 w-8 h-8 rounded-sm flex items-center justify-center font-bold">T</span>
                                <h4 className="font-bold text-xl text-blue-300">Technique</h4>
                            </div>
                            <p className="text-gray-300 text-sm">
                                Teknik yang telah terbukti efektif untuk pengambilan keputusan.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Grid Cards Normal */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jurusanData.map((jurusan) => (
                        <Card key={jurusan.id} className="overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group">
                            <CardHeader className="pb-2 border-b border-blue-500/20">
                                <div className="flex items-center gap-4">
                                    <div className="text-4xl p-3 bg-blue-500/20 rounded-xl">{jurusan.icon}</div>
                                    <CardTitle className="text-white">{jurusan.nama}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <CardDescription className="text-gray-400 mb-4">
                                    {jurusan.deskripsi}
                                </CardDescription>

                                {/* Rating SMART yang dinamis per jurusan */}
                                <div className="space-y-3 mb-6">
                                    <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/20">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="bg-blue-500/30 text-blue-300 w-5 h-5 rounded flex items-center justify-center text-xs font-bold">S</span>
                                            <h4 className="text-xs font-bold text-blue-300">SIMPLE</h4>
                                        </div>
                                        <p className="text-xs text-blue-200/80">
                                            {jurusan.smartRating.simple}
                                        </p>
                                    </div>
                                    <div className="bg-emerald-900/30 p-3 rounded-lg border border-emerald-500/20">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="bg-emerald-500/30 text-emerald-300 w-5 h-5 rounded flex items-center justify-center text-xs font-bold">M</span>
                                            <h4 className="text-xs font-bold text-emerald-300">MULTI</h4>
                                        </div>
                                        <p className="text-xs text-emerald-200/80">
                                            {jurusan.smartRating.multi}
                                        </p>
                                    </div>
                                    <div className="bg-violet-900/30 p-3 rounded-lg border border-violet-500/20">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="bg-violet-500/30 text-violet-300 w-5 h-5 rounded flex items-center justify-center text-xs font-bold">A</span>
                                            <h4 className="text-xs font-bold text-violet-300">ATTRIBUTE</h4>
                                        </div>
                                        <p className="text-xs text-violet-200/80">
                                            {jurusan.smartRating.attribute}
                                        </p>
                                    </div>
                                    <div className="bg-amber-900/30 p-3 rounded-lg border border-amber-500/20">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="bg-amber-500/30 text-amber-300 w-5 h-5 rounded flex items-center justify-center text-xs font-bold">R</span>
                                            <h4 className="text-xs font-bold text-amber-300">RATING</h4>
                                        </div>
                                        <p className="text-xs text-amber-200/80">
                                            {jurusan.smartRating.rating}
                                        </p>
                                    </div>
                                    <div className="bg-rose-900/30 p-3 rounded-lg border border-rose-500/20">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="bg-rose-500/30 text-rose-300 w-5 h-5 rounded flex items-center justify-center text-xs font-bold">T</span>
                                            <h4 className="text-xs font-bold text-rose-300">TECHNIQUE</h4>
                                        </div>
                                        <p className="text-xs text-rose-200/80">
                                            {jurusan.smartRating.technique}
                                        </p>
                                    </div>
                                </div>

                                {/* Prospek Kerja */}
                                <div className="space-y-2 mb-4">
                                    <h4 className="text-sm font-medium text-gray-300">Prospek Kerja:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {jurusan.prospekKerja.map((prospek, index) => (
                                            <Badge key={index} variant="secondary" className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30">
                                                {prospek}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Prospek Kuliah */}
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-gray-300">Prospek Kuliah:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {jurusan.prospekKuliah.map((prospek, index) => (
                                            <Badge key={index} variant="secondary" className="bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30">
                                                {prospek}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t border-white/5 pt-4">
                                <Button 
                                    variant="outline" 
                                    className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:text-white group-hover:border-blue-400/50"
                                    onClick={() => handleDetailClick(jurusan.id)}
                                >
                                    Lihat Detail
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Modal Overlay */}
                {selectedJurusan && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div 
                            className="bg-gradient-to-b from-[#334155] to-[#1E293B] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {(() => {
                                const jurusan = jurusanData.find(j => j.id === selectedJurusan);
                                if (!jurusan) return null;

                                return (
                                    <div className="p-8">
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-blue-500/20">
                                            <div className="flex items-center gap-6">
                                                <div className="text-6xl p-4 bg-blue-500/20 rounded-2xl">{jurusan.icon}</div>
                                                <div>
                                                    <h2 className="text-3xl font-bold text-white mb-2">{jurusan.nama}</h2>
                                                    <p className="text-gray-400 text-lg max-w-2xl">
                                                        {jurusan.deskripsi}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={handleCloseModal}
                                                className="border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-white hover:border-red-400/50"
                                            >
                                                <X className="w-4 h-4 mr-2" />
                                                Tutup
                                            </Button>
                                        </div>

                                        {/* Content */}
                                        <div className="space-y-6">
                                            {/* Kompetensi Utama */}
                                            <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 p-6 rounded-xl border border-blue-500/20">
                                                <h4 className="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-3">
                                                    <span className="bg-blue-500/30 text-blue-300 w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold">K</span>
                                                    Kompetensi Utama
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {jurusan.detailInfo.kompetensiUtama.map((kompetensi, index) => (
                                                        <div key={index} className="flex items-center gap-3">
                                                            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                                                            <span className="text-gray-300">{kompetensi}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Fasilitas */}
                                            <div className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 p-6 rounded-xl border border-emerald-500/20">
                                                <h4 className="text-xl font-semibold text-emerald-300 mb-4 flex items-center gap-3">
                                                    <span className="bg-emerald-500/30 text-emerald-300 w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold">F</span>
                                                    Fasilitas Unggulan
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {jurusan.detailInfo.fasilitas.map((fasilitas, index) => (
                                                        <div key={index} className="flex items-center gap-3">
                                                            <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                                                            <span className="text-gray-300">{fasilitas}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Keunggulan */}
                                            <div className="bg-gradient-to-r from-purple-900/30 to-violet-900/30 p-6 rounded-xl border border-purple-500/20">
                                                <h4 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-3">
                                                    <span className="bg-purple-500/30 text-purple-300 w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold">U</span>
                                                    Keunggulan Program
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {jurusan.detailInfo.keunggulan.map((keunggulan, index) => (
                                                        <div key={index} className="flex items-center gap-3">
                                                            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                                                            <span className="text-gray-300">{keunggulan}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Biaya */}
                                            <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 p-6 rounded-xl border border-amber-500/20">
                                                <h4 className="text-xl font-semibold text-amber-300 mb-4 flex items-center gap-3">
                                                    <span className="bg-amber-500/30 text-amber-300 w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold">B</span>
                                                    Biaya Pendidikan
                                                </h4>
                                                <p className="text-2xl font-bold text-amber-200 mb-2">{jurusan.detailInfo.biaya}</p>
                                                <p className="text-gray-400">*Biaya dapat berubah sesuai kebijakan sekolah</p>
                                            </div>

                                            {/* Prospek Kerja & Kuliah */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/20">
                                                    <h4 className="text-lg font-semibold text-blue-300 mb-4">Prospek Kerja</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {jurusan.prospekKerja.map((prospek, index) => (
                                                            <Badge key={index} variant="secondary" className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30">
                                                                {prospek}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="bg-emerald-900/20 p-6 rounded-xl border border-emerald-500/20">
                                                    <h4 className="text-lg font-semibold text-emerald-300 mb-4">Prospek Kuliah</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {jurusan.prospekKuliah.map((prospek, index) => (
                                                            <Badge key={index} variant="secondary" className="bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30">
                                                                {prospek}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
