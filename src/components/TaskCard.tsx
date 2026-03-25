import React, { memo } from 'react'
import type { Task } from '@/types'
import { useCollabStore } from '@/store/collaborationStore'
import { USERS } from '@/data/mockUsers'
import PriorityBadge from './PriorityBadge'
import DueDateLabel from './DueDateLabel'

interface TaskCardProps {
    task: Task
    getCardProps: (task: Task) => { onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void }
}

const TaskCard = ({ task, getCardProps }: TaskCardProps) => {
    const collabUsers = useCollabStore((s) => s.collabUsers)
    const usersOnThisCard = collabUsers.filter((u) => u.currentTaskId === task.id)
    const assignee = USERS.find(u => u.id === task.assigneeId)

    return (
        <div
            data-task-id={task.id}
            className={`bg-white p-3 rounded-lg border border-slate-200 shadow-sm cursor-grab select-none touch-none hover:border-blue-300 transition-colors`}
            {...getCardProps(task)}
        >
            <div className="flex flex-col gap-2">
                <h4 className="text-sm font-medium text-slate-700 leading-snug">
                    {task.title}
                </h4>

                <div className="flex items-center gap-1.5">
                    <div
                        className="w-5 h-5 rounded-full flex items-center justify-center 
                 text-white text-[9px] font-bold shrink-0"
                        style={{ backgroundColor: assignee?.color ?? '#94a3b8' }}
                    >
                        {assignee?.initials ?? '?'}
                    </div>
                    <span className="text-xs text-slate-400 truncate">
                        {assignee?.name.split(' ')[0] ?? 'Unknown'}
                    </span>
                </div>

                <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-2 relative z-10 pointer-events-none">
                        <PriorityBadge priority={task.priority} />
                        <DueDateLabel dueDate={task.dueDate} />
                    </div>

                    {usersOnThisCard.length > 0 && (
                        <div className="flex -space-x-1 relative z-10 pointer-events-none">
                            {usersOnThisCard.slice(0, 2).map((u) => (
                                <div
                                    key={u.id}
                                    style={{ backgroundColor: u.color }}
                                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-medium border-2 border-white animate-fade-in shadow-sm"
                                    title={u.name}
                                >
                                    {u.initials}
                                </div>
                            ))}
                            {usersOnThisCard.length > 2 && (
                                <div className="w-6 h-6 rounded-full bg-slate-400 flex items-center justify-center text-white text-[10px] border-2 border-white shadow-sm">
                                    +{usersOnThisCard.length - 2}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default memo(TaskCard, (prev, next) => {
    return prev.task === next.task
})
