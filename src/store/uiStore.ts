import { create } from 'zustand'
import type { ViewMode, SortKey, SortDirection } from '@/types'

interface UIStore {
    currentView: ViewMode
    setView: (view: ViewMode) => void
    sortKey: SortKey
    sortDirection: SortDirection
    setSortKey: (key: SortKey) => void
    toggleSortDirection: () => void
}

export const useUIStore = create<UIStore>((set) => ({
    currentView: 'kanban',
    setView: (currentView) => set({ currentView }),

    sortKey: null,
    sortDirection: 'asc',

    setSortKey: (key) =>
        set((s) => ({
            sortKey: key,
            // clicking the same key flips direction, new key resets to asc
            sortDirection: s.sortKey === key
                ? s.sortDirection === 'asc' ? 'desc' : 'asc'
                : 'asc',
        })),

    toggleSortDirection: () =>
        set((s) => ({
            sortDirection: s.sortDirection === 'asc' ? 'desc' : 'asc',
        })),
}))
