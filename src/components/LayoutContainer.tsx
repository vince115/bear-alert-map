// src/components/LayoutContainer.tsx
"use client";

import dynamic from "next/dynamic";
import FilterPanel from "@/components/FilterPanel";
import { useBearStore } from "@/lib/store";
import data from "@/app/data/bearSightings.json";
import { useEffect } from "react";

// ✅ 禁止 SSR 的 Leaflet map
const DynamicMap = dynamic(() => import("./MapView"), {
    ssr: false,
    loading: () => <div className="p-6 text-gray-500">載入地圖中...</div>,
});

export default function LayoutContainer() {
    const { filteredSightings, setSightings } = useBearStore();

    useEffect(() => {
        setSightings(data);
    }, [setSightings]);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-zinc-900/50">
            {/* 🔹 左側篩選欄（寬螢幕時） */}
            <aside className="md:w-80 w-full   z-10 md:h-auto">
                <FilterPanel />
            </aside>

            {/* 🔹 地圖主區塊，保持高度 100vh */}
            <main className="flex-1 relative h-[calc(100vh-64px)]">
                <div className="absolute inset-0 pr-3 pt-3">
                    <DynamicMap data={filteredSightings} />
                </div>
            </main>
        </div>
    );
}
