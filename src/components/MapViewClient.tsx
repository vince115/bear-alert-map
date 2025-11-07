//src/components/MapViewClient.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useMemo } from "react";
import type { Cluster } from "leaflet";

export default function MapViewClient({ data }: { data: any[] }) {
    const defaultCenter: [number, number] = [39.72, 140.1];

    // ✅ 用 useMemo 延後到客戶端再解析 public 路徑
    const icons = useMemo(() => {
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        const bearIcon = `${origin}/icons/icon_bear.svg`;
        const boarIcon = `${origin}/icons/icon_boar.svg`;
        const deerIcon = `${origin}/icons/icon_deer.svg`;

        const createIcon = (url: string) =>
            L.icon({
                iconUrl: url,
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -35],
            });

        return {
            "亞洲黑熊": createIcon(bearIcon),
            "ツキノワグマ": createIcon(bearIcon),
            "野豬": createIcon(boarIcon),
            "イノシシ": createIcon(boarIcon),
            "梅花鹿": createIcon(deerIcon),
            "シカ": createIcon(deerIcon),
        };
    }, []);

    const getIconForSpecies = (species: string) => {
        if (!species) return icons["亞洲黑熊"];
        if (species.includes("熊") || species.includes("グマ"))
            return icons["亞洲黑熊"];
        if (species.includes("イノシシ") || species.includes("豬"))
            return icons["野豬"];
        if (species.includes("シカ") || species.includes("鹿"))
            return icons["梅花鹿"];
        return icons["亞洲黑熊"];
    };

    const jitter = () => (Math.random() - 0.5) * 0.02; // ±0.0005 offset

    return (
        <MapContainer
            center={defaultCenter}
            zoom={8}
            scrollWheelZoom
            className="z-0 shadow-lg w-full h-full"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MarkerClusterGroup
                chunkedLoading
                showCoverageOnHover={false}
                spiderfyOnEveryZoom={false}
                iconCreateFunction={(cluster: Cluster) => {
                    const count = cluster.getChildCount();
                    const size = count < 10 ? 40 : count < 100 ? 50 : 60;
                    return L.divIcon({
                        html: `<div style="
                        background: rgba(255,0,0,0.8);
                        color: white;
                        border-radius: 50%;
                        width: ${size}px;
                        height: ${size}px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                        font-size: 14px;
                        border: 2px solid white;
                        box-shadow: 0 0 5px rgba(0,0,0,0.3);
                        ">${count}</div>`,
                        className: "cluster-marker",
                        iconSize: [size, size],
                    });
                }}
            >
                {data.map((s) => {
                    if (!s.lat || !s.lng) return null;
                    const icon = getIconForSpecies(s.species);
                    const lat = s.lat + jitter();
                    const lng = s.lng + jitter();

                    return (
                        <Marker key={s.id} position={[lat, lng]} icon={icon}>
                            <Popup>
                                <div className="space-y-1">
                                    <h3 className="font-bold text-red-600">
                                        {s.species?.includes("イノシシ") || s.species === "野豬"
                                            ? "🐗 野豬"
                                            : s.species?.includes("シカ") || s.species === "梅花鹿"
                                                ? "🦌 梅花鹿"
                                                : "🐻 熊出沒"}
                                    </h3>
                                    <p>📅 {s.datetime}</p>
                                    <p>📍 {s.city}</p>
                                    <p>📫 {s.address}</p>
                                    <p>🐾 數量：{s.count}</p>
                                    <p className="text-sm">{s.description}</p>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MarkerClusterGroup>
        </MapContainer>
    );
}