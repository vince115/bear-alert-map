// src/lib/store.ts
import { create } from "zustand";

export interface BearSighting {
    id: string | number;  // ← 放寬
    datetime: string;
    info_type: string;
    city: string;
    address: string;
    species: string;
    count: number;
    description: string;
    lat: number;
    lng: number;
}

interface BearStore {
    sightings: BearSighting[];
    filteredSightings: BearSighting[];
    setSightings: (data: BearSighting[]) => void;
    setFilter: (filter: { startDate?: string; endDate?: string; species?: string[] }) => void;

}

export const useBearStore = create<BearStore>((set) => ({
    sightings: [],
    filteredSightings: [],
    setSightings: (data) => set({ sightings: data, filteredSightings: data }),
    setFilter: (filter) =>
        set((state) => {
            let filtered = state.sightings;
    
            if (filter.startDate)
                filtered = filtered.filter(
                    (s) => new Date(s.datetime) >= new Date(filter.startDate!)
                );
    
            if (filter.endDate)
                filtered = filtered.filter(
                    (s) => new Date(s.datetime) <= new Date(filter.endDate!)
                );
    
            // ✅ 物種篩選（支援中日文字混用）
            if (filter.species && filter.species.length > 0)
                filtered = filtered.filter((s) =>
                    filter.species!.some(
                        (sp) =>
                            s.species?.includes(sp) || // 完全比對
                            (sp === "亞洲黑熊" && s.species?.includes("ツキノワグマ")) ||
                            (sp === "野豬" && s.species?.includes("イノシシ")) ||
                            (sp === "梅花鹿" && s.species?.includes("シカ"))
                    )
                );
    
            return { filteredSightings: filtered };
        }),
}));
