import { useMemo } from 'react'
import { useTaskStore } from '@/store/taskStore'
import { useFilterStore } from '@/store/filterStore'
import type { Status } from '@/types'
import KanbanColumn from '@/components/KanbanColumn'
import { useDragAndDrop } from '@/hooks/useDragAndDrop'

const COLUMNS = [
    { status: 'todo' as Status, label: 'To Do', color: 'border-slate-300' },
    { status: 'in-progress' as Status, label: 'In Progress', color: 'border-blue-400' },
    { status: 'in-review' as Status, label: 'In Review', color: 'border-amber-400' },
    { status: 'done' as Status, label: 'Done', color: 'border-green-400' },
]

const KanbanView = () => {
    const tasks = useTaskStore((s) => s.tasks)
    const applyFilters = useFilterStore((s) => s.applyFilters)
    const filters = useFilterStore((s) => s.filters)
    const filteredTasks = useMemo(
        () => applyFilters(tasks),
        [tasks, filters, applyFilters]
    )

    const { getCardProps, isDragging } = useDragAndDrop()

    return (
        <div className={`flex gap-4 h-full overflow-x-auto px-4 pb-4 pt-4 ${isDragging ? 'cursor-grabbing' : ''}`}>
            {COLUMNS.map((col) => (
                <KanbanColumn
                    key={col.status}
                    status={col.status}
                    label={col.label}
                    colorClass={col.color}
                    tasks={filteredTasks.filter((t) => t.status === col.status)}
                    getCardProps={getCardProps}
                />
            ))}
        </div>
    )
}

export default KanbanView // dependencies verified
