//src/components/FilterPanel.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useBearStore } from "@/lib/store";

export default function FilterPanel() {
    const [open, setOpen] = useState(true);
    const [isDesktop, setIsDesktop] = useState(false);

    // 🗓️ 日期狀態
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // 🐻 物種狀態
    const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);

    const { setFilter } = useBearStore();

    // ✅ 螢幕寬度偵測（行動版可收合）
    useEffect(() => {
        const checkWidth = () => {
            const desktop = window.innerWidth >= 768;
            setIsDesktop(desktop);
            setOpen(desktop);
        };
        checkWidth();
        window.addEventListener("resize", checkWidth);
        return () => window.removeEventListener("resize", checkWidth);
    }, []);

    // ✅ 即時更新篩選條件
    useEffect(() => {
        setFilter({ startDate, endDate, species: selectedSpecies });
    }, [startDate, endDate, selectedSpecies, setFilter]);

    // ✅ 切換 checkbox 狀態
    const toggleSpecies = (name: string) => {
        setSelectedSpecies((prev) =>
            prev.includes(name)
                ? prev.filter((s) => s !== name)
                : [...prev, name]
        );
    };

    return (
        <div className="border-b md:border-none bg-white dark:bg-zinc-900/80 dark:text-gray-100 m-3 rounded-lg shadow-md">
            {/* 標題 */}
            <button
                onClick={() => !isDesktop && setOpen(!open)}
                className="w-full flex items-center justify-between p-4 font-bold text-lg"
            >
                <div className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    搜尋條件
                </div>
                {!isDesktop && (open ? <ChevronUp /> : <ChevronDown />)}
            </button>

            {/* 展開內容 */}
            <AnimatePresence initial={false}>
                {(open || isDesktop) && (
                    <motion.div
                        key="filter-content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden p-4 space-y-6 border-t md:border-none"
                    >
                        {/* 📅 日期篩選 */}
                        <div>
                            <label className="block font-bold mb-2">觀測期</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="date"
                                    className="border p-1 rounded dark:border-zinc-400/50 flex-1 min-w-0 dark:bg-zinc-500"
                                />
                                <span className="text-gray-500">~</span>
                                <input
                                    type="date"
                                    className="border p-1 rounded dark:border-zinc-400/50 flex-1 min-w-0 dark:bg-zinc-500"
                                />
                            </div>
                        </div>

                        {/* 🐻 野獸物種 */}
                        <div>
                            <h3 className="font-bold mb-2">野獸物種</h3>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedSpecies.includes("亞洲黑熊")}
                                        onChange={() => toggleSpecies("亞洲黑熊")}
                                    />
                                    🐻 亞洲黑熊
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedSpecies.includes("野豬")}
                                        onChange={() => toggleSpecies("野豬")}
                                    />
                                    🐗 野豬
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedSpecies.includes("梅花鹿")}
                                        onChange={() => toggleSpecies("梅花鹿")}
                                    />
                                    🦌 梅花鹿
                                </label>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
