import { memo } from 'react'
import { USERS } from '@/data/mockUsers'
import { useTaskStore } from '@/store/taskStore'
import PriorityBadge from './PriorityBadge'
import DueDateLabel from './DueDateLabel'
import type { Task, Status } from '@/types'

interface TaskRowProps {
    task: Task
    style: React.CSSProperties
}

const ASSIGNEE_MAP = Object.fromEntries(USERS.map(u => [u.id, u]))

const TaskRow = ({ task, style }: TaskRowProps) => {
    const updateTaskStatus = useTaskStore(s => s.updateTaskStatus)
    const assignee = ASSIGNEE_MAP[task.assigneeId]

    return (
        <div
            data-task-id={task.id}
            style={style}
            className="flex items-center gap-4 px-4 border-b border-slate-100 
                 hover:bg-slate-50 bg-white"
        >
            {/* Title */}
            <span className="flex-1 text-sm text-slate-700 truncate">{task.title}</span>

            {/* Assignee */}
            <div className="w-24 flex items-center gap-1.5 shrink-0 hidden md:flex">
                {assignee ? (
                    <>
                        <div
                            className="w-6 h-6 rounded-full flex items-center justify-center 
                         text-xs font-bold text-white shrink-0"
                            style={{ backgroundColor: assignee.color }}
                        >
                            {assignee.initials}
                        </div>
                        <span className="text-xs text-slate-500 truncate">{assignee.name.split(' ')[0]}</span>
                    </>
                ) : (
                    <span className="text-xs text-slate-400">Unknown</span>
                )}
            </div>

            {/* Priority */}
            <div className="w-24 shrink-0">
                <PriorityBadge priority={task.priority} />
            </div>

            {/* Status dropdown */}
            <select
                value={task.status}
                onChange={e => updateTaskStatus(task.id, e.target.value as Status)}
                className="w-32 text-xs border border-slate-200 rounded px-2 py-1 
                   bg-white text-slate-600 shrink-0 cursor-pointer"
            >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="in-review">In Review</option>
                <option value="done">Done</option>
            </select>

            {/* Due date */}
            <div className="w-28 shrink-0">
                <DueDateLabel dueDate={task.dueDate} />
            </div>
        </div>
    )
}

export default memo(TaskRow)
