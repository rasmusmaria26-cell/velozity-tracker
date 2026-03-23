import { useFilterStore } from '@/store/filterStore'
import { USERS } from '@/data/mockUsers'
import type { Status, Priority } from '@/types'
import { memo } from 'react'

const STATUSES: Status[] = ['todo', 'in-progress', 'in-review', 'done']
const PRIORITIES: Priority[] = ['Critical', 'High', 'Medium', 'Low']

const FilterBar = () => {
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
        <div className="flex flex-col gap-4 p-4 text-sm bg-white border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-6">
                {/* Status Filters */}
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">Status:</span>
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

                {/* Priority Filters */}
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">Priority:</span>
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

                {/* Assignee Filters */}
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">Assignee:</span>
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

                {/* Date Filters */}
                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <span className="font-semibold text-slate-700">Due From:</span>
                        <input
                            type="date"
                            value={filters.dueDateFrom || ''}
                            onChange={(e) => setDueDateFrom(e.target.value || null)}
                            className="px-2 py-1 border border-slate-300 rounded text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <span className="font-semibold text-slate-700">Due To:</span>
                        <input
                            type="date"
                            value={filters.dueDateTo || ''}
                            onChange={(e) => setDueDateTo(e.target.value || null)}
                            className="px-2 py-1 border border-slate-300 rounded text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters() && (
                    <button
                        onClick={clearFilters}
                        className="px-3 py-1 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 active:bg-red-200 rounded transition-colors"
                    >
                        Clear All Filters
                    </button>
                )}
            </div>
        </div>
    )
}

export default memo(FilterBar)
