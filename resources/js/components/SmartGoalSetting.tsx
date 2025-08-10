// import React, { useState } from "react";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { CheckCircle, AlertCircle, Clock, Target, ArrowRight } from "lucide-react";

// export function SmartGoalSetting() {
//     const [activeTab, setActiveTab] = useState("specific");
//     const [formData, setFormData] = useState({
//         specific: "",
//         measurable: "",
//         achievable: "",
//         relevant: "",
//         timebound: "",
//     });
//     const [showResult, setShowResult] = useState(false);
//     const [isValid, setIsValid] = useState({
//         specific: false,
//         measurable: false,
//         achievable: false,
//         relevant: false,
//         timebound: false,
//     });

//     const handleInputChange = (field: string, value: string) => {
//         setFormData({
//             ...formData,
//             [field]: value,
//         });

//         // Validasi sederhana untuk setiap bidang
//         let valid = false;
//         switch (field) {
//             case "specific":
//                 valid = value.length >= 10;
//                 break;
//             case "measurable":
//                 valid = value.length >= 10 && /\d/.test(value);
//                 break;
//             case "achievable":
//                 valid = value.length >= 10;
//                 break;
//             case "relevant":
//                 valid = value.length >= 10;
//                 break;
//             case "timebound":
//                 valid = value.length >= 10 && /\b(hari|minggu|bulan|tahun|semester)\b/i.test(value);
//                 break;
//         }

//         setIsValid({
//             ...isValid,
//             [field]: valid,
//         });
//     };

//     const nextTab = () => {
//         const tabs = ["specific", "measurable", "achievable", "relevant", "timebound", "result"];
//         const currentIndex = tabs.indexOf(activeTab);
//         if (currentIndex < tabs.length - 1) {
//             setActiveTab(tabs[currentIndex + 1]);
//             if (tabs[currentIndex + 1] === "result") {
//                 setShowResult(true);
//             }
//         }
//     };

//     const prevTab = () => {
//         const tabs = ["specific", "measurable", "achievable", "relevant", "timebound", "result"];
//         const currentIndex = tabs.indexOf(activeTab);
//         if (currentIndex > 0) {
//             setActiveTab(tabs[currentIndex - 1]);
//         }
//     };

//     const generateSmartGoal = () => {
//         return `${formData.specific} dengan target ${formData.measurable}. Saya akan mencapainya dengan ${formData.achievable}. Tujuan ini relevan karena ${formData.relevant}. Saya akan menyelesaikannya dalam ${formData.timebound}.`;
//     };

//     const renderTabContent = (tab) => {
//         switch (tab) {
//             case "specific":
//                 return (
//                     <>
//                         <CardDescription className="mb-4">
//                             Tentukan tujuan pendidikan yang spesifik. Apa yang ingin kamu capai dengan memilih jurusan ini?
//                         </CardDescription>
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="specific-goal">Tujuan Spesifik</Label>
//                                 <Textarea
//                                     id="specific-goal"
//                                     placeholder="Contoh: Saya ingin menguasai pemrograman web untuk membuat aplikasi yang bermanfaat"
//                                     value={formData.specific}
//                                     onChange={(e) => handleInputChange("specific", e.target.value)}
//                                     className="min-h-[100px]"
//                                 />
//                                 {formData.specific && !isValid.specific && (
//                                     <p className="text-sm text-red-500">Tujuan harus lebih spesifik dan minimal 10 karakter</p>
//                                 )}
//                             </div>
//                             <Alert>
//                                 <Target className="h-4 w-4" />
//                                 <AlertTitle>Tips</AlertTitle>
//                                 <AlertDescription>
//                                     Tujuan spesifik menjawab pertanyaan: Apa yang ingin dicapai? Siapa yang terlibat? Di mana? Mengapa penting?
//                                 </AlertDescription>
//                             </Alert>
//                         </div>
//                     </>
//                 );
//             case "measurable":
//                 return (
//                     <>
//                         <CardDescription className="mb-4">
//                             Tentukan bagaimana kamu akan mengukur keberhasilan. Indikator apa yang akan kamu gunakan?
//                         </CardDescription>
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="measurable-goal">Tujuan Terukur</Label>
//                                 <Textarea
//                                     id="measurable-goal"
//                                     placeholder="Contoh: Mendapatkan nilai minimal 85 di mata kuliah pemrograman dan menyelesaikan 3 proyek portofolio"
//                                     value={formData.measurable}
//                                     onChange={(e) => handleInputChange("measurable", e.target.value)}
//                                     className="min-h-[100px]"
//                                 />
//                                 {formData.measurable && !isValid.measurable && (
//                                     <p className="text-sm text-red-500">Tujuan harus terukur dan mengandung angka/nilai</p>
//                                 )}
//                             </div>
//                             <Alert>
//                                 <Target className="h-4 w-4" />
//                                 <AlertTitle>Tips</AlertTitle>
//                                 <AlertDescription>
//                                     Tujuan terukur menjawab pertanyaan: Berapa banyak? Bagaimana kamu tahu sudah tercapai? Apa indikator keberhasilannya?
//                                 </AlertDescription>
//                             </Alert>
//                         </div>
//                     </>
//                 );
//             case "achievable":
//                 return (
//                     <>
//                         <CardDescription className="mb-4">
//                             Pastikan tujuanmu dapat dicapai. Bagaimana kamu akan mencapainya?
//                         </CardDescription>
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="achievable-goal">Tujuan Dapat Dicapai</Label>
//                                 <Textarea
//                                     id="achievable-goal"
//                                     placeholder="Contoh: Belajar secara konsisten 2 jam setiap hari dan mengikuti kursus online tambahan"
//                                     value={formData.achievable}
//                                     onChange={(e) => handleInputChange("achievable", e.target.value)}
//                                     className="min-h-[100px]"
//                                 />
//                                 {formData.achievable && !isValid.achievable && (
//                                     <p className="text-sm text-red-500">Jelaskan lebih detail bagaimana kamu akan mencapai tujuan ini</p>
//                                 )}
//                             </div>
//                             <Alert>
//                                 <Target className="h-4 w-4" />
//                                 <AlertTitle>Tips</AlertTitle>
//                                 <AlertDescription>
//                                     Tujuan dapat dicapai menjawab pertanyaan: Apakah realistis? Apakah kamu memiliki sumber daya yang diperlukan? Apa langkah-langkahnya?
//                                 </AlertDescription>
//                             </Alert>
//                         </div>
//                     </>
//                 );
//             case "relevant":
//                 return (
//                     <>
//                         <CardDescription className="mb-4">
//                             Pastikan tujuanmu relevan dengan karir dan minatmu. Mengapa tujuan ini penting?
//                         </CardDescription>
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="relevant-goal">Tujuan Relevan</Label>
//                                 <Textarea
//                                     id="relevant-goal"
//                                     placeholder="Contoh: Tujuan ini sesuai dengan minat saya di bidang teknologi dan akan membantu saya mendapatkan pekerjaan sebagai web developer"
//                                     value={formData.relevant}
//                                     onChange={(e) => handleInputChange("relevant", e.target.value)}
//                                     className="min-h-[100px]"
//                                 />
//                                 {formData.relevant && !isValid.relevant && (
//                                     <p className="text-sm text-red-500">Jelaskan lebih detail mengapa tujuan ini relevan dengan masa depanmu</p>
//                                 )}
//                             </div>
//                             <Alert>
//                                 <Target className="h-4 w-4" />
//                                 <AlertTitle>Tips</AlertTitle>
//                                 <AlertDescription>
//                                     Tujuan relevan menjawab pertanyaan: Mengapa ini penting? Apakah sesuai dengan tujuan jangka panjang? Apakah sesuai dengan minat dan bakat?
//                                 </AlertDescription>
//                             </Alert>
//                         </div>
//                     </>
//                 );
//             case "timebound":
//                 return (
//                     <>
//                         <CardDescription className="mb-4">
//                             Tentukan batas waktu untuk mencapai tujuanmu. Kapan kamu akan menyelesaikannya?
//                         </CardDescription>
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="timebound-goal">Tujuan Berbatas Waktu</Label>
//                                 <Textarea
//                                     id="timebound-goal"
//                                     placeholder="Contoh: Saya akan menguasai dasar-dasar pemrograman dalam 6 bulan pertama dan menyelesaikan proyek portofolio dalam 1 tahun"
//                                     value={formData.timebound}
//                                     onChange={(e) => handleInputChange("timebound", e.target.value)}
//                                     className="min-h-[100px]"
//                                 />
//                                 {formData.timebound && !isValid.timebound && (
//                                     <p className="text-sm text-red-500">Tentukan batas waktu yang jelas (hari, minggu, bulan, tahun, atau semester)</p>
//                                 )}
//                             </div>
//                             <Alert>
//                                 <Clock className="h-4 w-4" />
//                                 <AlertTitle>Tips</AlertTitle>
//                                 <AlertDescription>
//                                     Tujuan berbatas waktu menjawab pertanyaan: Kapan? Apa tenggat waktunya? Kapan kamu akan memulai dan menyelesaikannya?
//                                 </AlertDescription>
//                             </Alert>
//                         </div>
//                     </>
//                 );
//             case "result":
//                 return (
//                     <>
//                         <CardDescription className="mb-4">
//                             Berikut adalah rumusan tujuan SMART berdasarkan input kamu:
//                         </CardDescription>
//                         <div className="space-y-4">
//                             <Alert className="bg-green-50 border-green-200">
//                                 <CheckCircle className="h-4 w-4 text-green-500" />
//                                 <AlertTitle className="text-green-700">Tujuan SMART Kamu</AlertTitle>
//                                 <AlertDescription className="text-green-700 font-medium">
//                                     {generateSmartGoal()}
//                                 </AlertDescription>
//                             </Alert>

//                             <div className="space-y-2 mt-4">
//                                 <h3 className="font-medium">Langkah Selanjutnya:</h3>
//                                 <ul className="list-disc pl-5 space-y-1">
//                                     <li>Simpan tujuan SMART ini dan tinjau secara berkala</li>
//                                     <li>Buat rencana aksi mingguan untuk mencapai tujuan ini</li>
//                                     <li>Bagikan tujuan ini dengan guru atau mentor untuk mendapatkan masukan</li>
//                                     <li>Lanjutkan ke pendaftaran jurusan yang sesuai dengan tujuanmu</li>
//                                 </ul>
//                             </div>

//                             <div className="flex justify-center mt-4">
//                                 <Button onClick={() => window.location.href = "#pendaftaran"}>
//                                     Lanjut ke Pendaftaran <ArrowRight className="ml-2 h-4 w-4" />
//                                 </Button>
//                             </div>
//                         </div>
//                     </>
//                 );
//         }
//     };

//     return (
//         <section id="smart-goals" className="py-16 bg-[#1E293B]">
//             <div className="container mx-auto lg:px-0 px-4">
//                 <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
//                     <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//                         Rumuskan Tujuan SMART
//                     </h2>
//                     <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                         Tentukan tujuan pendidikan yang Spesifik, Terukur, Dapat Dicapai, Relevan, dan Berbatas Waktu.
//                     </p>
//                 </div>

//                 <div className="mx-auto max-w-2xl">
//                     <Card>
//                         <CardHeader>
//                             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//                                 <TabsList className="grid grid-cols-5 w-full">
//                                     <TabsTrigger value="specific" disabled={activeTab !== "specific" && !showResult}>
//                                         S
//                                     </TabsTrigger>
//                                     <TabsTrigger
//                                         value="measurable"
//                                         disabled={!isValid.specific && activeTab !== "measurable" && !showResult}
//                                     >
//                                         M
//                                     </TabsTrigger>
//                                     <TabsTrigger
//                                         value="achievable"
//                                         disabled={!isValid.measurable && activeTab !== "achievable" && !showResult}
//                                     >
//                                         A
//                                     </TabsTrigger>
//                                     <TabsTrigger
//                                         value="relevant"
//                                         disabled={!isValid.achievable && activeTab !== "relevant" && !showResult}
//                                     >
//                                         R
//                                     </TabsTrigger>
//                                     <TabsTrigger
//                                         value="timebound"
//                                         disabled={!isValid.relevant && activeTab !== "timebound" && !showResult}
//                                     >
//                                         T
//                                     </TabsTrigger>
//                                 </TabsList>
//                             </Tabs>
//                             <CardTitle className="mt-4">
//                                 {activeTab === "specific" && "Specific (Spesifik)"}
//                                 {activeTab === "measurable" && "Measurable (Terukur)"}
//                                 {activeTab === "achievable" && "Achievable (Dapat Dicapai)"}
//                                 {activeTab === "relevant" && "Relevant (Relevan)"}
//                                 {activeTab === "timebound" && "Time-bound (Berbatas Waktu)"}
//                                 {activeTab === "result" && "Tujuan SMART Kamu"}
//                             </CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                             {renderTabContent(activeTab)}
//                         </CardContent>
//                         <CardFooter className="flex justify-between">
//                             <Button
//                                 variant="outline"
//                                 onClick={prevTab}
//                                 disabled={activeTab === "specific"}
//                             >
//                                 Sebelumnya
//                             </Button>
//                             <Button
//                                 onClick={nextTab}
//                                 disabled={
//                                     (activeTab === "specific" && !isValid.specific) ||
//                                     (activeTab === "measurable" && !isValid.measurable) ||
//                                     (activeTab === "achievable" && !isValid.achievable) ||
//                                     (activeTab === "relevant" && !isValid.relevant) ||
//                                     (activeTab === "timebound" && !isValid.timebound) ||
//                                     activeTab === "result"
//                                 }
//                             >
//                                 {activeTab === "timebound" ? "Lihat Hasil" : "Selanjutnya"}
//                             </Button>
//                         </CardFooter>
//                     </Card>
//                 </div>
//             </div>
//         </section>
//     );
// }