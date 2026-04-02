import {single_page_info} from "@/types/page_info";
import {devtools} from "zustand/middleware";
import {create} from "zustand";

interface PageInfoStore {
    items: single_page_info[];
    setPageInfo: (newItems: single_page_info[]) => void;
    addPageStep: (item: single_page_info) => void;
    clear: () => void;
}

export const usePageInfoStore = create<PageInfoStore>()(
    devtools((set) => ({

        items: [], // 初始状态为空

        setPageInfo: (newItems) => set({items: newItems}),

        addPageStep: (item) => set((state) => ({
            items: [...state.items, item]
        })),

        clear: () => set({items: []}),

    }))
);