import React from "react";
import Sidebar from "../components/moscati/Sidebar";
import ConsultationRoom from "../components/recording/ConsultationRoom";
import { SearchHeader } from "../components/search/SearchHeader";

export default function RecordingPage() {
    return (
        <div className="bg-surface text-on-surface h-screen overflow-hidden flex flex-col antialiased">
            {/* TopAppBar Reutilizado */}
            <SearchHeader />

            <div className="flex flex-1 overflow-hidden h-full relative">
                <Sidebar />

                <main className="flex-1 overflow-y-auto bg-[#f9f9f9] relative">
                    <ConsultationRoom />
                </main>
            </div>
        </div>
    );
}
