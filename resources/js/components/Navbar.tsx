import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-lg">
            <div className="mx-auto w-full px-4 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-6 w-6 text-white"
                            >
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                <path d="M6 12v5c3 3 9 3 12 0v-5" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-white">Pemilihan Jurusan</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#beranda" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Beranda
                        </a>
                        <a href="#jurusan" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Jurusan
                        </a>
                        <a href="#pendaftaran" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Pendaftaran
                        </a>
                        <a href="#kontak" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Kontak
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-white/10">
                        <nav className="flex flex-col space-y-4 px-2">
                            <a
                                href="#beranda"
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Beranda
                            </a>
                            <a
                                href="#jurusan"
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Jurusan
                            </a>
                            <a
                                href="#pendaftaran"
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Pendaftaran
                            </a>
                            <a
                                href="#kontak"
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Kontak
                            </a>
                            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white w-full">
                                Masuk
                            </Button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
