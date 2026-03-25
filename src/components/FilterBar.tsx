import { useFilterStore } from '@/store/filterStore'
import { USERS } from '@/data/mockUsers'
import type { Status, Priority } from '@/types'
import { memo, useState } from 'react'

const STATUSES: Status[] = ['todo', 'in-progress', 'in-review', 'done']
const PRIORITIES: Priority[] = ['Critical', 'High', 'Medium', 'Low']

const FilterBar = () => {
    const [filtersOpen, setFiltersOpen] = useState(false)
    const {
        filters,
        setStatuses,
        setPriorities,
        setAssigneeIds,
        setDueDateFrom,
        setDueDateTo,
        clearFilters,
        hasActiveFilters,
    } = useFilterStore()

    const active = hasActiveFilters()

    const handleStatusToggle = (status: Status) => {
        const current = filters.statuses
        const next = current.includes(status)
            ? current.filter((s) => s !== status)
            : [...current, status]
        setStatuses(next)
    }

    const handlePriorityToggle = (priority: Priority) => {
        const current = filters.priorities
        const next = current.includes(priority)
            ? current.filter((p) => p !== priority)
            : [...current, priority]
        setPriorities(next)
    }

    const handleAssigneeToggle = (assigneeId: string) => {
        const current = filters.assigneeIds
        const next = current.includes(assigneeId)
            ? current.filter((id) => id !== assigneeId)
            : [...current, assigneeId]
        setAssigneeIds(next)
    }

    return (
        <div className="flex flex-col text-sm bg-white border-b border-slate-200">
            {/* Mobile/Tablet Toggle Button */}
            <div className="flex md:hidden items-center justify-between p-4 bg-slate-50 border-b border-slate-200">
                <button
                    onClick={() => setFiltersOpen(!filtersOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium shadow-sm active:bg-slate-50"
                >
                    <div className="relative">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        {active && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                    </div>
                    <span>{filtersOpen ? 'Hide Filters' : 'Show Filters'}</span>
                </button>

                {active && (
                    <button onClick={clearFilters} className="text-red-600 font-medium px-2">
                        Clear ({filters.statuses.length + filters.priorities.length + filters.assigneeIds.length + (filters.dueDateFrom ? 1 : 0) + (filters.dueDateTo ? 1 : 0)})
                    </button>
                )}
            </div>

            {/* Filter Content */}
            <div className={`${filtersOpen ? 'flex' : 'hidden'} md:flex flex-col gap-4 p-4`}>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                    {/* Status Filters */}
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-700">Status:</span>
                        <div className="flex flex-wrap gap-2">
                            {STATUSES.map((status) => (
                                <label key={status} className="flex items-center gap-1 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={filters.statuses.includes(status)}
                                        onChange={() => handleStatusToggle(status)}
                                        className="w-4 h-4 text-blue-600 rounded border-slate-300"
                                    />
                                    <span className="text-slate-600 capitalize">{status.replace('-', ' ')}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Priority Filters */}
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-700">Priority:</span>
                        <div className="flex flex-wrap gap-2">
                            {PRIORITIES.map((priority) => (
                                <label key={priority} className="flex items-center gap-1 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={filters.priorities.includes(priority)}
                                        onChange={() => handlePriorityToggle(priority)}
                                        className="w-4 h-4 text-blue-600 rounded border-slate-300"
                                    />
                                    <span className="text-slate-600">{priority}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Assignee Filters */}
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-700">Assignee:</span>
                        <div className="flex flex-wrap gap-2">
                            {USERS.map((user) => (
                                <label key={user.id} className="flex items-center gap-1 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={filters.assigneeIds.includes(user.id)}
                                        onChange={() => handleAssigneeToggle(user.id)}
                                        className="w-4 h-4 text-blue-600 rounded border-slate-300"
                                    />
                                    <span className="text-slate-600">{user.initials}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Date Filters */}
                    <div className="flex flex-wrap items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <span className="font-semibold text-slate-700 whitespace-nowrap">Due From:</span>
                            <input
                                type="date"
                                value={filters.dueDateFrom || ''}
                                onChange={(e) => setDueDateFrom(e.target.value || null)}
                                className="px-2 py-1 border border-slate-300 rounded text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <span className="font-semibold text-slate-700 whitespace-nowrap">Due To:</span>
                            <input
                                type="date"
                                value={filters.dueDateTo || ''}
                                onChange={(e) => setDueDateTo(e.target.value || null)}
                                className="px-2 py-1 border border-slate-300 rounded text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </label>
                    </div>

                    {/* Clear Filters (Desktop) */}
                    {active && (
                        <button
                            onClick={clearFilters}
                            className="hidden md:block px-3 py-1 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 active:bg-red-200 rounded transition-colors"
                        >
                            Clear All Filters
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default memo(FilterBar)
