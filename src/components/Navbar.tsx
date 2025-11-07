//src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import {  Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import BearIcon from "@/../public/icons/bear_roar.svg";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dark, setDark] = useState(false);

    // 🌗 暗色模式切換（可擴充為 Redux 或 Context）
    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [dark]);

    return (
        <nav className="bg-yellow-400 dark:bg-zinc-900 text-gray-900  dark:text-white shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-1 md:py-1">
                {/* 左側 LOGO / 標題 */}
                <Link href="/" className="flex items-center gap-2">
                    <BearIcon className="w-12 h-12 text-orange-950 dark:text-orange-200/80" />
                    <span className="font-bold text-lg md:text-xl tracking-wide">
                        熊出沒警報系統
                    </span>
                </Link>

                {/* 右側控制區 */}
                <div className="flex items-center gap-4">
                    {/* 暗色切換 */}
                    <button
                        onClick={() => setDark(!dark)}
                        className="p-2 rounded hover:bg-orange-500/50 dark:hover:bg-zinc-700"
                        aria-label="Toggle dark mode"
                    >
                        {dark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* 行動版選單切換 */}
                    <button
                        className="md:hidden p-2 hover:bg-orange-500/50 dark:hover:bg-zinc-700 rounded"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* 行動版選單 */}
            {menuOpen && (
                <div className="bg-gray-400/50 dark:bg-zinc-800 px-4 py-3 space-y-2 md:hidden">
                    <Link href="/" className="block hover:underline">
                        🗺️ 地圖總覽
                    </Link>
                    <Link href="/about" className="block hover:underline">
                        📖 關於
                    </Link>
                    <Link href="/contact" className="block hover:underline">
                        📬 聯絡我們
                    </Link>
                </div>
            )}
        </nav>
    );
}
