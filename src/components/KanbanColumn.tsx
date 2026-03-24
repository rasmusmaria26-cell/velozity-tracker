import React, { memo } from 'react'
import type { Status, Task } from '@/types'
import TaskCard from './TaskCard'
import EmptyState from './EmptyState'
import { useDragAndDrop } from '@/hooks/useDragAndDrop'

interface KanbanColumnProps {
    status: Status
    label: string
    colorClass: string
    tasks: Task[]
    getCardProps?: any
}

const KanbanColumn = ({ status, label, colorClass, tasks }: KanbanColumnProps) => {
    const { getCardProps, isDragging } = useDragAndDrop()

    return (
        <div className={`flex flex-col min-w-[280px] w-[280px] bg-slate-50/50 rounded-xl border-t-4 ${colorClass} shadow-sm overflow-hidden ${isDragging ? 'cursor-grabbing' : ''}`}>
            <div className="flex items-center justify-between p-3 bg-slate-100 border-b border-slate-200">
                <h3 className="font-semibold text-slate-700">{label}</h3>
                <span className="text-xs font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                    {tasks.length}
                </span>
            </div>

            <div
                data-column-status={status}
                className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 min-h-[150px] custom-scrollbar"
            >
                {tasks.length > 0 ? (
                    tasks.map((task) => <TaskCard key={task.id} task={task} getCardProps={getCardProps} />)
                ) : (
                    <EmptyState type="kanban-column" columnLabel={label} />
                )}
            </div>
        </div>
    )
}

export default memo(KanbanColumn)
