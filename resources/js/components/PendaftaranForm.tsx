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
                            <CardTitle className="text-2xl">Metode SMART (Simple, Multi, Attribute, Rating, Technique)</CardTitle>
                            <CardDescription className="text-gray-200">
                                Pendaftaran ini menggunakan metode SMART untuk membantu kamu memilih jurusan yang tepat melalui 5 komponen penilaian yang objektif dan terstruktur.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div className="p-4 border border-l-4 border-l-blue-500 rounded-md bg-white/10 backdrop-blur-sm shadow-sm">
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        <span className="bg-blue-500/30 text-blue-200 w-7 h-7 rounded-full flex items-center justify-center text-sm">S</span>
                                        Simple
                                    </h3>
                                    <p className="text-sm text-gray-300 mt-2">Proses evaluasi yang sederhana dan mudah dipahami</p>
                                </div>
                                <div className="p-4 border border-l-4 border-l-emerald-500 rounded-md bg-white/10 backdrop-blur-sm shadow-sm">
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        <span className="bg-emerald-500/30 text-emerald-200 w-7 h-7 rounded-full flex items-center justify-center text-sm">M</span>
                                        Multi
                                    </h3>
                                    <p className="text-sm text-gray-300 mt-2">Mempertimbangkan berbagai aspek dan perspektif</p>
                                </div>
                                <div className="p-4 border border-l-4 border-l-violet-500 rounded-md bg-white/10 backdrop-blur-sm shadow-sm">
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        <span className="bg-violet-500/30 text-violet-200 w-7 h-7 rounded-full flex items-center justify-center text-sm">A</span>
                                        Attribute
                                    </h3>
                                    <p className="text-sm text-gray-300 mt-2">Fokus pada atribut-atribut spesifik yang relevan</p>
                                </div>
                                <div className="p-4 border border-l-4 border-l-amber-500 rounded-md bg-white/10 backdrop-blur-sm shadow-sm">
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        <span className="bg-amber-500/30 text-amber-200 w-7 h-7 rounded-full flex items-center justify-center text-sm">R</span>
                                        Rating
                                    </h3>
                                    <p className="text-sm text-gray-300 mt-2">Sistem rating numerik untuk setiap kriteria</p>
                                </div>
                                <div className="p-4 border border-l-4 border-l-rose-500 rounded-md bg-white/10 backdrop-blur-sm shadow-sm">
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        <span className="bg-rose-500/30 text-rose-200 w-7 h-7 rounded-full flex items-center justify-center text-sm">T</span>
                                        Technique
                                    </h3>
                                    <p className="text-sm text-gray-300 mt-2">Teknik yang terbukti efektif untuk pengambilan keputusan</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-xl bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
                        <CardHeader className="text-white">
                            <CardTitle className="text-2xl">Formulir Pendaftaran</CardTitle>
                            <CardDescription className="text-gray-200">
                                Lengkapi data diri dan penilaian menggunakan 5 komponen metode SMART untuk mendapatkan rekomendasi jurusan terbaik.
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
                                    <h3 className="text-xl font-bold mb-6 text-white text-center">Penilaian dengan 5 Komponen Metode SMART</h3>

                                    <div className="space-y-6">
                                        <div className="bg-blue-900/20 p-5 rounded-lg border border-blue-500/30">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="bg-blue-500/30 text-blue-200 w-8 h-8 rounded-full flex items-center justify-center font-bold">S</span>
                                                <Label htmlFor="simple-evaluation" className="font-semibold text-white text-lg">Simple: Evaluasi Sederhana</Label>
                                            </div>
                                            <p className="text-gray-300 mb-3 text-sm">Bagaimana tingkat kesulitan pembelajaran jurusan ini menurutmu? (Skala 1-5, 1 = Sangat Mudah, 5 = Sangat Sulit)</p>
                                            <div className="grid grid-cols-5 gap-2 mb-3">
                                                {[1, 2, 3, 4, 5].map((rating) => (
                                                    <label key={rating} className="flex flex-col items-center p-2 border border-blue-500/30 rounded cursor-pointer hover:bg-blue-500/20">
                                                        <input type="radio" name="simple-rating" value={rating} className="sr-only" />
                                                        <span className="text-white font-bold">{rating}</span>
                                                        <span className="text-xs text-gray-300">{rating === 1 ? 'Mudah' : rating === 5 ? 'Sulit' : ''}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-emerald-900/20 p-5 rounded-lg border border-emerald-500/30">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="bg-emerald-500/30 text-emerald-200 w-8 h-8 rounded-full flex items-center justify-center font-bold">M</span>
                                                <Label htmlFor="multi" className="font-semibold text-white text-lg">Multi: Penilaian Beragam</Label>
                                            </div>
                                            <p className="text-gray-300 mb-3 text-sm">Beri rating untuk berbagai aspek berikut (Skala 1-5, 1 = Sangat Rendah, 5 = Sangat Tinggi)</p>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <Label className="text-gray-300 font-medium">Minat pada Bidang</Label>
                                                        <div className="grid grid-cols-5 gap-1 mt-1">
                                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                                <label key={rating} className="flex justify-center p-1 border border-emerald-500/30 rounded cursor-pointer hover:bg-emerald-500/20">
                                                                    <input type="radio" name="minat-rating" value={rating} className="sr-only" />
                                                                    <span className="text-white text-xs">{rating}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label className="text-gray-300 font-medium">Kemampuan Akademik</Label>
                                                        <div className="grid grid-cols-5 gap-1 mt-1">
                                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                                <label key={rating} className="flex justify-center p-1 border border-emerald-500/30 rounded cursor-pointer hover:bg-emerald-500/20">
                                                                    <input type="radio" name="akademik-rating" value={rating} className="sr-only" />
                                                                    <span className="text-white text-xs">{rating}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <Label className="text-gray-300 font-medium">Prospek Karir</Label>
                                                        <div className="grid grid-cols-5 gap-1 mt-1">
                                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                                <label key={rating} className="flex justify-center p-1 border border-emerald-500/30 rounded cursor-pointer hover:bg-emerald-500/20">
                                                                    <input type="radio" name="karir-rating" value={rating} className="sr-only" />
                                                                    <span className="text-white text-xs">{rating}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label className="text-gray-300 font-medium">Kesesuaian Bakat</Label>
                                                        <div className="grid grid-cols-5 gap-1 mt-1">
                                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                                <label key={rating} className="flex justify-center p-1 border border-emerald-500/30 rounded cursor-pointer hover:bg-emerald-500/20">
                                                                    <input type="radio" name="bakat-rating" value={rating} className="sr-only" />
                                                                    <span className="text-white text-xs">{rating}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-violet-900/20 p-5 rounded-lg border border-violet-500/30">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="bg-violet-500/30 text-violet-200 w-8 h-8 rounded-full flex items-center justify-center font-bold">A</span>
                                                <Label htmlFor="attribute" className="font-semibold text-white text-lg">Attribute: Atribut Spesifik</Label>
                                            </div>
                                            <p className="text-gray-300 mb-3 text-sm">Beri rating untuk atribut-atribut spesifik berikut (Skala 1-5, 1 = Sangat Rendah, 5 = Sangat Tinggi)</p>
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <Label className="text-gray-300 font-medium">Kemampuan Teknis</Label>
                                                        <div className="grid grid-cols-5 gap-1 mt-1">
                                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                                <label key={rating} className="flex justify-center p-1 border border-violet-500/30 rounded cursor-pointer hover:bg-violet-500/20">
                                                                    <input type="radio" name="teknis-weight" value={rating} className="sr-only" />
                                                                    <span className="text-white text-xs">{rating}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label className="text-gray-300 font-medium">Kreativitas</Label>
                                                        <div className="grid grid-cols-5 gap-1 mt-1">
                                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                                <label key={rating} className="flex justify-center p-1 border border-violet-500/30 rounded cursor-pointer hover:bg-violet-500/20">
                                                                    <input type="radio" name="kreativitas-weight" value={rating} className="sr-only" />
                                                                    <span className="text-white text-xs">{rating}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <Label className="text-gray-300 font-medium">Komunikasi</Label>
                                                        <div className="grid grid-cols-5 gap-1 mt-1">
                                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                                <label key={rating} className="flex justify-center p-1 border border-violet-500/30 rounded cursor-pointer hover:bg-violet-500/20">
                                                                    <input type="radio" name="komunikasi-weight" value={rating} className="sr-only" />
                                                                    <span className="text-white text-xs">{rating}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label className="text-gray-300 font-medium">Problem Solving</Label>
                                                        <div className="grid grid-cols-5 gap-1 mt-1">
                                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                                <label key={rating} className="flex justify-center p-1 border border-violet-500/30 rounded cursor-pointer hover:bg-violet-500/20">
                                                                    <input type="radio" name="problemsolving-weight" value={rating} className="sr-only" />
                                                                    <span className="text-white text-xs">{rating}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-amber-900/20 p-5 rounded-lg border border-amber-500/30">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="bg-amber-500/30 text-amber-200 w-8 h-8 rounded-full flex items-center justify-center font-bold">R</span>
                                                <Label htmlFor="rating" className="font-semibold text-white text-lg">Rating: Sistem Penilaian</Label>
                                            </div>
                                            <p className="text-gray-300 mb-3 text-sm">Beri rating untuk jurusan yang dipilih berdasarkan kriteria berikut (Skala 1-5, 1 = Sangat Buruk, 5 = Sangat Baik)</p>
                                            <div className="space-y-4">
                                                <Select>
                                                    <SelectTrigger className="border-amber-500/30 bg-white/10 text-white">
                                                        <SelectValue placeholder="Pilih jurusan" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="keperawatan">Keperawatan</SelectItem>
                                                        <SelectItem value="farmasi">Farmasi</SelectItem>
                                                        <SelectItem value="analis-kesehatan">Analis Kesehatan / TLM</SelectItem>
                                                        <SelectItem value="dkv">Desain Komunikasi Visual (DKV)</SelectItem>
                                                        <SelectItem value="tata-kecantikan">Tata Kecantikan</SelectItem>
                                                        <SelectItem value="tata-boga">Tata Boga</SelectItem>
                                                        <SelectItem value="rpl">Rekayasa Perangkat Lunak (RPL)</SelectItem>
                                                        <SelectItem value="tkj">Teknik Komputer dan Jaringan (TKJ)</SelectItem>
                                                        <SelectItem value="tkr">Teknik Kendaraan Ringan (TKR)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <Label className="text-gray-300 font-medium">Kesesuaian Minat</Label>
                                                        <div className="grid grid-cols-5 gap-1 mt-1">
                                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                                <label key={rating} className="flex justify-center p-1 border border-amber-500/30 rounded cursor-pointer hover:bg-amber-500/20">
                                                                    <input type="radio" name="minat-jurusan-rating" value={rating} className="sr-only" />
                                                                    <span className="text-white text-xs">{rating}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Label className="text-gray-300 font-medium">Prospek Karir</Label>
                                                        <div className="grid grid-cols-5 gap-1 mt-1">
                                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                                <label key={rating} className="flex justify-center p-1 border border-amber-500/30 rounded cursor-pointer hover:bg-amber-500/20">
                                                                    <input type="radio" name="prospek-jurusan-rating" value={rating} className="sr-only" />
                                                                    <span className="text-white text-xs">{rating}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-rose-900/20 p-5 rounded-lg border border-rose-500/30">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="bg-rose-500/30 text-rose-200 w-8 h-8 rounded-full flex items-center justify-center font-bold">T</span>
                                                <Label htmlFor="technique" className="font-semibold text-white text-lg">Technique: Kesimpulan & Rekomendasi</Label>
                                            </div>
                                            <p className="text-gray-300 mb-3 text-sm">Berdasarkan 5 komponen penilaian SMART, berikan kesimpulan dan rekomendasi untuk pemilihan jurusan.</p>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="kesimpulan-smart" className="text-gray-300 font-medium">Kesimpulan Penilaian SMART</Label>
                                                    <Textarea
                                                        id="kesimpulan-smart"
                                                        placeholder="Berdasarkan 5 komponen penilaian SMART, jurusan yang paling sesuai adalah..."
                                                        className="border-rose-500/30 placeholder:!text-gray-300 !bg-white/10 text-white"
                                                        rows={3}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="rekomendasi" className="text-gray-300 font-medium">Rekomendasi & Alasan</Label>
                                                    <Textarea
                                                        id="rekomendasi"
                                                        placeholder="Rekomendasi jurusan berdasarkan skor tertinggi dan kesesuaian dengan profil siswa..."
                                                        className="border-rose-500/30 placeholder:!text-gray-300 !bg-white/10 text-white"
                                                        rows={3}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="target-kelulusan" className="text-gray-300 font-medium">Target Pasca Kelulusan</Label>
                                                    <Select>
                                                        <SelectTrigger className="border-rose-500/30 bg-white/10 text-white">
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
