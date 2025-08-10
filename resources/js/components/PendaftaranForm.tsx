import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function PendaftaranForm() {
    return (
        <section id="pendaftaran" className="py-20 bg-gradient-to-b from-[#1E293B] to-[#334155]">
            <div className="container mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
                        Pendaftaran Jurusan
                    </h2>
                    <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed">
                        Tentukan masa depanmu dengan memilih jurusan yang tepat melalui pendekatan SMART.
                    </p>
                </div>
                <div className="mx-auto max-w-3xl">
                    <Card className="mb-8 shadow-xl bg-white/5 backdrop-blur-sm border-white/10">
                        <CardHeader className="text-white">
                            <CardTitle className="text-2xl">Metode SMART</CardTitle>
                            <CardDescription className="text-gray-200">
                                Pendaftaran ini menggunakan metode SMART untuk membantu kamu memilih jurusan yang tepat dan sesuai dengan potensimu.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 border border-l-4 border-l-blue-500 rounded-md bg-white/10 backdrop-blur-sm shadow-sm">
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        <span className="bg-blue-500/30 text-blue-200 w-7 h-7 rounded-full flex items-center justify-center text-sm">S</span>
                                        Specific
                                    </h3>
                                    <p className="text-sm text-gray-300 mt-2">Tentukan tujuan pendidikan dan karir yang spesifik</p>
                                </div>
                                <div className="p-4 border border-l-4 border-l-blue-500 rounded-md bg-white/10 backdrop-blur-sm shadow-sm">
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        <span className="bg-blue-500/30 text-blue-200 w-7 h-7 rounded-full flex items-center justify-center text-sm">M</span>
                                        Measurable
                                    </h3>
                                    <p className="text-sm text-gray-300 mt-2">Nilai dan kemampuan yang dapat diukur untuk mencapai tujuan</p>
                                </div>
                                <div className="p-4 border border-l-4 border-l-blue-500 rounded-md bg-white/10 backdrop-blur-sm shadow-sm">
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        <span className="bg-blue-500/30 text-blue-200 w-7 h-7 rounded-full flex items-center justify-center text-sm">A</span>
                                        Achievable
                                    </h3>
                                    <p className="text-sm text-gray-300 mt-2">Pilihan jurusan yang sesuai dengan kemampuan dan minat</p>
                                </div>
                                <div className="p-4 border border-l-4 border-l-blue-500 rounded-md bg-white/10 backdrop-blur-sm shadow-sm">
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        <span className="bg-blue-500/30 text-blue-200 w-7 h-7 rounded-full flex items-center justify-center text-sm">R</span>
                                        Relevant
                                    </h3>
                                    <p className="text-sm text-gray-300 mt-2">Kesesuaian dengan minat, bakat, dan tujuan karir</p>
                                </div>
                                <div className="p-4 border border-l-4 border-l-blue-500 rounded-md bg-white/10 backdrop-blur-sm shadow-sm md:col-span-2">
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        <span className="bg-blue-500/30 text-blue-200 w-7 h-7 rounded-full flex items-center justify-center text-sm">T</span>
                                        Time-bound
                                    </h3>
                                    <p className="text-sm text-gray-300 mt-2">Rencana studi dengan target waktu yang jelas dan terukur</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-xl bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
                        <CardHeader className="text-white">
                            <CardTitle className="text-2xl">Formulir Pendaftaran</CardTitle>
                            <CardDescription className="text-gray-200">
                                Lengkapi data diri dan analisis SMART untuk mendapatkan rekomendasi jurusan terbaik.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form className="space-y-6">
                                <div className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-blue-500/20">
                                    <h3 className="text-lg font-semibold text-white mb-4">Data Pribadi</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="nama" className="text-gray-300 font-medium">Nama Lengkap</Label>
                                            <Input id="nama" placeholder="Masukkan nama lengkap" className="border-blue-500/30 placeholder:!text-gray-300 bg-white/10 text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="nisn" className="text-gray-300 font-medium">NISN</Label>
                                            <Input id="nisn" placeholder="Masukkan NISN" className="border-blue-500/30 placeholder:!text-gray-300 bg-white/10 text-white" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-gray-300 font-medium">Email</Label>
                                            <Input id="email" type="email" placeholder="Masukkan email" className="border-blue-500/30 placeholder:!text-gray-300 bg-white/10 text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="telepon" className="text-gray-300 font-medium">Nomor Telepon</Label>
                                            <Input id="telepon" placeholder="Masukkan nomor telepon" className="border-blue-500/30 placeholder:!text-gray-300 bg-white/10 text-white" />
                                        </div>
                                    </div>
                                    <div className="space-y-2 mt-4">
                                        <Label htmlFor="alamat" className="text-gray-300 font-medium">Alamat</Label>
                                        <Textarea id="alamat" placeholder="Masukkan alamat lengkap" className="border-blue-500/30 placeholder:!text-gray-300 !bg-white/10 text-white" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="sekolah-asal" className="text-gray-300 font-medium">Sekolah Asal</Label>
                                            <Input id="sekolah-asal" placeholder="Masukkan sekolah asal" className="border-blue-500/30 placeholder:!text-gray-300 bg-white/10 text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="nilai-rata" className="text-gray-300 font-medium">Nilai Rata-rata Rapor</Label>
                                            <Input id="nilai-rata" placeholder="Masukkan nilai rata-rata" className="border-blue-500/30 placeholder:!text-gray-300 bg-white/10 text-white" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <h3 className="text-xl font-bold mb-6 text-white text-center">Analisis SMART untuk Pemilihan Jurusan</h3>

                                    <div className="space-y-6">
                                        <div className="bg-blue-900/20 p-5 rounded-lg border border-blue-500/30">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="bg-blue-500/30 text-blue-200 w-8 h-8 rounded-full flex items-center justify-center font-bold">S</span>
                                                <Label htmlFor="specific-goal" className="font-semibold text-white text-lg">Specific: Tujuan Spesifik</Label>
                                            </div>
                                            <p className="text-gray-300 mb-3 text-sm">Tentukan tujuan pendidikan dan karir yang spesifik yang ingin kamu capai.</p>
                                            <Textarea
                                                id="specific-goal"
                                                placeholder="Contoh: Menjadi programmer di perusahaan teknologi dalam 5 tahun dengan spesialisasi pengembangan aplikasi mobile"
                                                className="border-blue-500/30 placeholder:!text-gray-300 !bg-white/10 text-white"
                                                rows={4}
                                            />
                                        </div>

                                        <div className="bg-blue-900/20 p-5 rounded-lg border border-blue-500/30">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="bg-blue-500/30 text-blue-200 w-8 h-8 rounded-full flex items-center justify-center font-bold">M</span>
                                                <Label htmlFor="measurable" className="font-semibold text-white text-lg">Measurable: Kemampuan Terukur</Label>
                                            </div>
                                            <p className="text-gray-300 mb-3 text-sm">Nilai akademis dan kemampuan yang dapat diukur untuk mencapai tujuanmu.</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                                <div className="space-y-2">
                                                    <Label htmlFor="nilai-matematika" className="text-gray-300 font-medium">Nilai Matematika</Label>
                                                    <Input id="nilai-matematika" placeholder="Nilai rata-rata" className="border-blue-500/30 placeholder:!text-gray-300 bg-white/10 text-white" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="nilai-bahasa" className="text-gray-300 font-medium">Nilai Bahasa</Label>
                                                    <Input id="nilai-bahasa" placeholder="Nilai rata-rata" className="border-blue-500/30 placeholder:!text-gray-300 bg-white/10 text-white" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="nilai-ipa" className="text-gray-300 font-medium">Nilai IPA</Label>
                                                    <Input id="nilai-ipa" placeholder="Nilai rata-rata" className="border-blue-500/30 placeholder:!text-gray-300 bg-white/10 text-white" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="nilai-ips" className="text-gray-300 font-medium">Nilai IPS</Label>
                                                    <Input id="nilai-ips" placeholder="Nilai rata-rata" className="border-blue-500/30 placeholder:!text-gray-300 bg-white/10 text-white" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-blue-900/20 p-5 rounded-lg border border-blue-500/30">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="bg-blue-500/30 text-blue-200 w-8 h-8 rounded-full flex items-center justify-center font-bold">A</span>
                                                <Label htmlFor="achievable" className="font-semibold text-white text-lg">Achievable: Kemampuan & Minat</Label>
                                            </div>
                                            <p className="text-gray-300 mb-3 text-sm">Identifikasi kemampuan dan minat yang kamu miliki untuk mencapai tujuanmu.</p>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="kemampuan" className="text-gray-300 font-medium">Kemampuan yang Kamu Miliki</Label>
                                                    <Textarea
                                                        id="kemampuan"
                                                        placeholder="Contoh: pemrograman, desain, analisis data, komunikasi"
                                                        className="border-blue-500/30 placeholder:!text-gray-300 !bg-white/10 text-white"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="minat" className="text-gray-300 font-medium">Minat dan Hobi</Label>
                                                    <Textarea
                                                        id="minat"
                                                        placeholder="Contoh: teknologi, membaca, menulis, fotografi"
                                                        className="border-blue-500/30 placeholder:!text-gray-300 !bg-white/10 text-white"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-blue-900/20 p-5 rounded-lg border border-blue-500/30">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="bg-blue-500/30 text-blue-200 w-8 h-8 rounded-full flex items-center justify-center font-bold">R</span>
                                                <Label htmlFor="jurusan" className="font-semibold text-white text-lg">Relevant: Pilihan Jurusan</Label>
                                            </div>
                                            <p className="text-gray-300 mb-3 text-sm">Pilih jurusan yang relevan dengan minat, bakat, dan tujuan karirmu.</p>
                                            <Select>
                                                <SelectTrigger className="border-blue-500/30 bg-white/10 text-white">
                                                    <SelectValue placeholder="Pilih jurusan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ipa">Ilmu Pengetahuan Alam (IPA)</SelectItem>
                                                    <SelectItem value="ips">Ilmu Pengetahuan Sosial (IPS)</SelectItem>
                                                    <SelectItem value="tkj">Teknik Komputer dan Jaringan (TKJ)</SelectItem>
                                                    <SelectItem value="rpl">Rekayasa Perangkat Lunak (RPL)</SelectItem>
                                                    <SelectItem value="multimedia">Multimedia</SelectItem>
                                                    <SelectItem value="akuntansi">Akuntansi</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <div className="mt-4">
                                                <Label htmlFor="alasan-relevant" className="text-gray-300 font-medium">Alasan Relevansi</Label>
                                                <Textarea
                                                    id="alasan-relevant"
                                                    placeholder="Jelaskan mengapa jurusan ini relevan dengan minat, bakat, dan tujuan karirmu"
                                                    className="border-blue-500/30 mt-1 placeholder:!text-gray-300 !bg-white/10 text-white"
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-blue-900/20 p-5 rounded-lg border border-blue-500/30">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="bg-blue-500/30 text-blue-200 w-8 h-8 rounded-full flex items-center justify-center font-bold">T</span>
                                                <Label htmlFor="timebound" className="font-semibold text-white text-lg">Time-bound: Rencana Waktu</Label>
                                            </div>
                                            <p className="text-gray-300 mb-3 text-sm">Tetapkan target pencapaian dalam program studi 3 tahun.</p>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="tingkat-kelas" className="text-gray-300 font-medium">Tingkat yang Dituju</Label>
                                                    <Select>
                                                        <SelectTrigger className="border-blue-500/30 bg-white/10 text-white">
                                                            <SelectValue placeholder="Pilih tingkat kelas" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="10">Kelas 10</SelectItem>
                                                            <SelectItem value="11">Kelas 11</SelectItem>
                                                            <SelectItem value="12">Kelas 12</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="target-akademik" className="text-gray-300 font-medium">Target Akademik</Label>
                                                    <Select>
                                                        <SelectTrigger className="border-blue-500/30 bg-white/10 text-white">
                                                            <SelectValue placeholder="Pilih target akademik" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="baik">Baik (Nilai rata-rata 75-85)</SelectItem>
                                                            <SelectItem value="sangat-baik">Sangat Baik (Nilai rata-rata 86-95)</SelectItem>
                                                            <SelectItem value="sempurna">Sempurna (Nilai rata-rata &gt; 95)</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="rencana-studi" className="text-gray-300 font-medium">Rencana Pencapaian</Label>
                                                    <Textarea
                                                        id="rencana-studi"
                                                        placeholder="Contoh: Semester 1: menguasai dasar-dasar, Semester 2: mengembangkan keahlian spesifik..."
                                                        className="border-blue-500/30 placeholder:!text-gray-300 !bg-white/10 text-white"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="target-kelulusan" className="text-gray-300 font-medium">Target Pasca Kelulusan</Label>
                                                    <Select>
                                                        <SelectTrigger className="border-blue-500/30 bg-white/10 text-white">
                                                            <SelectValue placeholder="Pilih target setelah lulus" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="kuliah">Melanjutkan ke Perguruan Tinggi</SelectItem>
                                                            <SelectItem value="kerja">Langsung Bekerja</SelectItem>
                                                            <SelectItem value="wirausaha">Berwirausaha</SelectItem>
                                                            <SelectItem value="lainnya">Lainnya</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-6 text-lg font-medium cursor-pointer">
                                        Kirim Pendaftaran
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
