import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const jurusanData = [
    {
        id: 1,
        nama: "Ilmu Pengetahuan Alam (IPA)",
        deskripsi: "Jurusan yang mempelajari ilmu-ilmu alam seperti Fisika, Kimia, dan Biologi.",
        prospek: ["Dokter", "Apoteker", "Insinyur", "Peneliti"],
        icon: "🔬"
    },
    {
        id: 2,
        nama: "Ilmu Pengetahuan Sosial (IPS)",
        deskripsi: "Jurusan yang mempelajari ilmu-ilmu sosial seperti Ekonomi, Geografi, dan Sosiologi.",
        prospek: ["Ekonom", "Akuntan", "Pengusaha", "Diplomat"],
        icon: "📊"
    },
    {
        id: 3,
        nama: "Teknik Komputer dan Jaringan (TKJ)",
        deskripsi: "Jurusan yang mempelajari tentang perangkat keras komputer dan jaringan.",
        prospek: ["Network Engineer", "IT Support", "System Administrator"],
        icon: "💻"
    },
    {
        id: 4,
        nama: "Rekayasa Perangkat Lunak (RPL)",
        deskripsi: "Jurusan yang mempelajari tentang pengembangan perangkat lunak dan aplikasi.",
        prospek: ["Programmer", "Web Developer", "Mobile Developer", "Game Developer"],
        icon: "🖥️"
    },
    {
        id: 5,
        nama: "Multimedia",
        deskripsi: "Jurusan yang mempelajari tentang desain grafis, animasi, dan editing video.",
        prospek: ["Desainer Grafis", "Animator", "Video Editor", "UI/UX Designer"],
        icon: "🎨"
    },
    {
        id: 6,
        nama: "Akuntansi",
        deskripsi: "Jurusan yang mempelajari tentang pencatatan dan pelaporan keuangan.",
        prospek: ["Akuntan", "Auditor", "Tax Consultant", "Financial Analyst"],
        icon: "📝"
    }
];

export function JurusanList() {
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
                    <h3 className="text-2xl font-bold mb-6 text-center text-white">Metode SMART untuk Pemilihan Jurusan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 rounded-xl border border-blue-500/20 shadow-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-blue-500/20 text-blue-300 w-8 h-8 rounded-sm flex items-center justify-center font-bold">S/M</span>
                                <h4 className="font-bold text-xl text-blue-300">Specific & Measurable</h4>
                            </div>
                            <p className="text-gray-300">
                                Setiap jurusan memiliki tujuan pembelajaran yang spesifik dan hasil yang terukur melalui nilai dan kompetensi.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 rounded-xl border border-emerald-500/20 shadow-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-blue-500/20 text-blue-300 w-8 h-8 rounded-sm flex items-center justify-center font-bold">A/R</span>
                                <h4 className="font-bold text-xl text-blue-300">Achievable & Relevant</h4>
                            </div>
                            <p className="text-gray-300">
                                Jurusan yang kami tawarkan dirancang agar dapat dicapai oleh siswa dan relevan dengan kebutuhan industri saat ini.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 rounded-xl border border-violet-500/20 shadow-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="bg-blue-500/20 text-blue-300 w-8 h-8 rounded-sm flex items-center justify-center font-bold">T</span>
                                <h4 className="font-bold text-xl text-blue-300">Time-bound</h4>
                            </div>
                            <p className="text-gray-300">
                                Program pembelajaran dengan jadwal yang terstruktur dan target waktu penyelesaian yang jelas.
                            </p>
                        </div>
                    </div>
                </div>

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

                                {/* Tambahan informasi SMART */}
                                <div className="space-y-3 mb-6">
                                    <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/20">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="bg-blue-500/30 text-blue-300 w-5 h-5 rounded flex items-center justify-center text-xs font-bold">S</span>
                                            <h4 className="text-xs font-bold text-blue-300">SPECIFIC</h4>
                                        </div>
                                        <p className="text-xs text-blue-200/80">
                                            Fokus pada bidang {jurusan.nama.toLowerCase()} dengan kurikulum yang spesifik
                                        </p>
                                    </div>
                                    <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/20">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="bg-blue-500/30 text-blue-300 w-5 h-5 rounded flex items-center justify-center text-xs font-bold">M</span>
                                            <h4 className="text-xs font-bold text-blue-300">MEASURABLE</h4>
                                        </div>
                                        <p className="text-xs text-blue-200/80">
                                            Evaluasi berkala dengan standar kompetensi yang jelas
                                        </p>
                                    </div>
                                    <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/20">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="bg-blue-500/30 text-blue-300 w-5 h-5 rounded flex items-center justify-center text-xs font-bold">A</span>
                                            <h4 className="text-xs font-bold text-blue-300">ACHIEVABLE</h4>
                                        </div>
                                        <p className="text-xs text-blue-200/80">
                                            Dirancang sesuai dengan kemampuan dan potensi siswa
                                        </p>
                                    </div>
                                    <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/20">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="bg-blue-500/30 text-blue-300 w-5 h-5 rounded flex items-center justify-center text-xs font-bold">R</span>
                                            <h4 className="text-xs font-bold text-blue-300">RELEVANT</h4>
                                        </div>
                                        <p className="text-xs text-blue-200/80">
                                            Sesuai dengan kebutuhan industri dan karir masa depan
                                        </p>
                                    </div>
                                    <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/20">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="bg-blue-500/30 text-blue-300 w-5 h-5 rounded flex items-center justify-center text-xs font-bold">T</span>
                                            <h4 className="text-xs font-bold text-blue-300">TIME-BOUND</h4>
                                        </div>
                                        <p className="text-xs text-blue-200/80">
                                            Program 3 tahun dengan target pencapaian per semester
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-gray-300">Prospek Karir:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {jurusan.prospek.map((prospek, index) => (
                                            <Badge key={index} variant="secondary" className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30">
                                                {prospek}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t border-white/5 pt-4">
                                <Button variant="outline" className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-500/20 group-hover:border-blue-400/50">
                                    Lihat Detail
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg">
                        Lihat Semua Jurusan
                    </Button>
                </div>
            </div>
        </section>
    );
}
