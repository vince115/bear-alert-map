// src/components/MapView.tsx
"use client";

import dynamic from "next/dynamic";

// ✅ 延遲載入 MapViewClient，禁用 SSR
const MapViewClient = dynamic(() => import("./MapViewClient"), {
  ssr: false,
  loading: () => (
    <div className="p-6 text-gray-500 text-center">地圖載入中...</div>
  ),
});

export default function MapViewWrapper({ data }: { data: any[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        尚無資料
      </div>
    );
  }
  return <MapViewClient data={data} />;
}
