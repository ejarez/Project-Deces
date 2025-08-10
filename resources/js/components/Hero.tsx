import React from "react";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section id="beranda" className="py-12 bg-gradient-to-b from-[#1E293B] to-[#334155]">
            <div className="mx-auto w-full px-4 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Pendekatan SMART untuk Masa Depan
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white">
                            Tentukan Masa Depanmu dengan Jurusan yang Tepat
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-xl">
                            Kami membantu kamu menemukan jurusan yang sesuai dengan minat dan bakatmu
                            melalui pendekatan SMART untuk kesuksesan akademik dan karir.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button onClick={() => window.location.href = '#jurusan'} size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-6 text-lg cursor-pointer">
                                Lihat Jurusan
                            </Button>
                            <Button onClick={() => window.location.href = '#pendaftaran'} variant="outline" size="lg" className="border-gray-400 bg-transparent text-white hover:bg-white/10 hover:text-white px-6 py-6 text-lg cursor-pointer">
                                Daftar Sekarang
                            </Button>
                        </div>

                        <div className="pt-4 flex items-center gap-4">
                            <div className="flex -space-x-2">
                                {['S', 'M', 'A', 'R', 'T'].map((letter, i) => (
                                    <div
                                        key={i}
                                        className={`w-10 h-10 rounded-full border-2 border-white/20 bg-blue-${(i+5)*100}/40 flex items-center justify-center text-xs font-bold text-white`}
                                    >
                                        {letter}
                                    </div>
                                ))}
                            </div>
                            <div className="text-gray-300 text-sm">
                                <span className="font-bold text-white">500+ siswa</span> telah menemukan jurusan terbaik mereka
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-indigo-500/20 rounded-full blur-xl"></div>
                        <img
                            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000"
                            alt="Siswa belajar"
                            className="mx-auto rounded-xl object-cover object-center w-full h-[500px] shadow-2xl border border-white/10"
                        />
                        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-600 text-white p-2 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">Pendekatan SMART</h3>
                                    <p className="text-sm text-slate-600">Specific, Measurable, Achievable, Relevant, Time-bound</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
