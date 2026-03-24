import { useMemo, useState } from 'react'
import { useTaskStore } from '@/store/taskStore'
import { useFilterStore } from '@/store/filterStore'
import { useVirtualScroll } from '@/hooks/useVirtualScroll'
import TaskRow from '@/components/TaskRow'
import EmptyState from '@/components/EmptyState'
import type { SortKey, SortDirection } from '@/types'

const ROW_HEIGHT = 64
const BUFFER = 5
const CONTAINER_HEIGHT = window.innerHeight - 200

const PRIORITY_ORDER = { Critical: 0, High: 1, Medium: 2, Low: 3 }

const ListView = () => {
    const tasks = useTaskStore(s => s.tasks)
    const filters = useFilterStore(s => s.filters)
    const applyFilters = useFilterStore(s => s.applyFilters)
    const clearFilters = useFilterStore(s => s.clearFilters)

    const [sortKey, setSortKeyState] = useState<SortKey>(null)
    const [sortDir, setSortDir] = useState<SortDirection>('asc')

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDir(d => d === 'asc' ? 'desc' : 'asc')
        } else {
            setSortKeyState(key)
            setSortDir('asc')
        }
    }

    const filteredTasks = useMemo(
        () => applyFilters(tasks),
        [tasks, filters, applyFilters]
    )

    const sortedTasks = useMemo(() => {
        if (!sortKey) return filteredTasks
        return [...filteredTasks].sort((a, b) => {
            let result = 0
            if (sortKey === 'title') result = a.title.localeCompare(b.title)
            else if (sortKey === 'priority') result = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
            else if (sortKey === 'dueDate') result = a.dueDate.localeCompare(b.dueDate)
            return sortDir === 'asc' ? result : -result
        })
    }, [filteredTasks, sortKey, sortDir])

    const { visibleItems, totalHeight, onScroll, scrollContainerRef } = useVirtualScroll({
        totalCount: sortedTasks.length,
        rowHeight: ROW_HEIGHT,
        containerHeight: CONTAINER_HEIGHT,
        buffer: BUFFER,
    })

    const SortArrow = ({ col }: { col: SortKey }) => {
        if (sortKey !== col) return <span className="text-slate-300 ml-1">↕</span>
        return <span className="text-blue-500 ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>
    }

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
            {/* Column headers */}
            <div className="flex items-center gap-4 px-4 py-2 bg-slate-50 border-b 
                      border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <button onClick={() => handleSort('title')}
                    className="flex-1 text-left hover:text-slate-700 flex items-center">
                    Title <SortArrow col="title" />
                </button>
                <span className="w-24 shrink-0">Assignee</span>
                <button onClick={() => handleSort('priority')}
                    className="w-24 text-left shrink-0 hover:text-slate-700 flex items-center">
                    Priority <SortArrow col="priority" />
                </button>
                <span className="w-32 shrink-0">Status</span>
                <button onClick={() => handleSort('dueDate')}
                    className="w-28 text-left shrink-0 hover:text-slate-700 flex items-center">
                    Due Date <SortArrow col="dueDate" />
                </button>
            </div>

            {sortedTasks.length === 0 ? (
                <EmptyState type="no-results" onClearFilters={clearFilters} />
            ) : (
                <div
                    ref={scrollContainerRef}
                    style={{ height: CONTAINER_HEIGHT, overflowY: 'scroll', position: 'relative' }}
                    onScroll={onScroll}
                >
                    <div style={{ height: totalHeight, position: 'relative' }}>
                        {visibleItems.map(({ index, offsetTop }) => (
                            <TaskRow
                                key={sortedTasks[index].id}
                                task={sortedTasks[index]}
                                style={{
                                    position: 'absolute',
                                    top: offsetTop,
                                    left: 0,
                                    right: 0,
                                    height: ROW_HEIGHT,
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ListView
