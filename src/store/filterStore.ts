import { create } from 'zustand'
import { isAfter, isBefore, parseISO, startOfDay } from 'date-fns'
import type { Task, FilterState, Status, Priority } from '@/types'

const EMPTY_FILTERS: FilterState = {
    statuses: [],
    priorities: [],
    assigneeIds: [],
    dueDateFrom: null,
    dueDateTo: null,
}

interface FilterStore {
    filters: FilterState
    setStatuses: (statuses: Status[]) => void
    setPriorities: (priorities: Priority[]) => void
    setAssigneeIds: (ids: string[]) => void
    setDueDateFrom: (date: string | null) => void
    setDueDateTo: (date: string | null) => void
    clearFilters: () => void
    hasActiveFilters: () => boolean
    applyFilters: (tasks: Task[]) => Task[]
}

export const useFilterStore = create<FilterStore>((set, get) => ({
    filters: EMPTY_FILTERS,

    setStatuses: (statuses) =>
        set((s) => ({ filters: { ...s.filters, statuses } })),

    setPriorities: (priorities) =>
        set((s) => ({ filters: { ...s.filters, priorities } })),

    setAssigneeIds: (assigneeIds) =>
        set((s) => ({ filters: { ...s.filters, assigneeIds } })),

    setDueDateFrom: (dueDateFrom) =>
        set((s) => ({ filters: { ...s.filters, dueDateFrom } })),

    setDueDateTo: (dueDateTo) =>
        set((s) => ({ filters: { ...s.filters, dueDateTo } })),

    clearFilters: () => set({ filters: EMPTY_FILTERS }),

    hasActiveFilters: () => {
        const f = get().filters
        return (
            f.statuses.length > 0 ||
            f.priorities.length > 0 ||
            f.assigneeIds.length > 0 ||
            f.dueDateFrom !== null ||
            f.dueDateTo !== null
        )
    },

    applyFilters: (tasks) => {
        const { filters } = get()
        return tasks.filter((task) => {
            if (filters.statuses.length > 0 && !filters.statuses.includes(task.status))
                return false
            if (filters.priorities.length > 0 && !filters.priorities.includes(task.priority))
                return false
            if (filters.assigneeIds.length > 0 && !filters.assigneeIds.includes(task.assigneeId))
                return false
            if (filters.dueDateFrom) {
                if (isBefore(parseISO(task.dueDate), startOfDay(parseISO(filters.dueDateFrom))))
                    return false
            }
            if (filters.dueDateTo) {
                if (isAfter(parseISO(task.dueDate), startOfDay(parseISO(filters.dueDateTo))))
                    return false
            }
            return true
        })
    },
}))
