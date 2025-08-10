import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { JurusanList } from "@/components/JurusanList";
import { PendaftaranForm } from "@/components/PendaftaranForm";
import { Footer } from "@/components/Footer";

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
            <Navbar />
            <Hero />
            <JurusanList />
            <PendaftaranForm />
            <Footer />
        </div>
    );
}
